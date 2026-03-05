import { NextRequest, NextResponse } from 'next/server'

// This route is called by the GitHub Action when a new post is pushed.
// It's protected by a secret token to prevent unauthorized access.

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.BROADCAST_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { title, excerpt, slug, date } = await req.json()

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    return NextResponse.json({ error: 'server misconfiguration.' }, { status: 500 })
  }

  // 1. Fetch all subscribers from Resend audience
  const contactsRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })

  if (!contactsRes.ok) {
    return NextResponse.json({ error: 'failed to fetch subscribers.' }, { status: 500 })
  }

  const { data: contacts } = await contactsRes.json()
  const subscribers: { email: string }[] = (contacts ?? []).filter(
    (c: { unsubscribed: boolean }) => !c.unsubscribed
  )

  if (subscribers.length === 0) {
    return NextResponse.json({ message: 'no subscribers to notify.' })
  }

  const from = `${process.env.RESEND_SENDER_NAME ?? 'Arrownymous'} <${process.env.RESEND_SENDER_EMAIL ?? 'onboarding@resend.dev'}>`
  const postUrl = `${process.env.SITE_URL ?? 'https://arrownymous.dev'}/devlog/${slug}`

  // 2. Send email to each subscriber
  const results = await Promise.allSettled(
    subscribers.map((contact) =>
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [contact.email],
          subject: `new devlog entry: ${title}`,
          html: `
            <div style="background:#0a0a0a;color:#e8e8e8;font-family:'IBM Plex Mono',monospace;font-size:13px;line-height:1.8;max-width:480px;margin:0 auto;padding:40px 32px;border:1px solid #222;">
              <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#ff4d00;margin-bottom:20px;">// new entry — ${date}</div>
              <div style="font-family:'Space Mono',monospace;font-size:20px;font-weight:700;margin-bottom:16px;">${title}</div>
              ${excerpt ? `<p style="color:#666;margin-bottom:24px;line-height:1.8;">${excerpt}</p>` : ''}
              <a href="${postUrl}" style="display:inline-block;background:#181818;border:1px solid #333;color:#e8e8e8;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.1em;padding:10px 20px;text-decoration:none;transition:border-color 0.15s;">
                read entry →
              </a>
              <div style="border-top:1px solid #222;margin-top:32px;padding-top:20px;font-size:10px;color:#333;">
                <span style="color:#ff4d00;">→</span> you're subscribed to arrownymous devlog
              </div>
            </div>
          `,
        }),
      })
    )
  )

  const sent = results.filter((r) => r.status === 'fulfilled').length
  const failed = results.filter((r) => r.status === 'rejected').length

  return NextResponse.json({ sent, failed, total: subscribers.length })
}