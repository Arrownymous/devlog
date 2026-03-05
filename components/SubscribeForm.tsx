'use client'

import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('subscribed. welcome to the devlog.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error ?? 'something went wrong. try again.')
      }
    } catch {
      setStatus('error')
      setMessage('network error. please try again.')
    }
  }

  return (
    <div className="subscribe-block">
      <div className="subscribe-label">// stay in the loop</div>

      {status === 'success' ? (
        <div className="subscribe-success-line">
          <span className="prompt-symbol">→</span>
          <span>{message}</span>
          <span className="prompt-cursor" />
        </div>
      ) : (
        <>
          <p className="subscribe-desc">
            Get notified when new entries drop — no noise, just updates.
          </p>
          <form onSubmit={handleSubmit} className="subscribe-form">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="subscribe-input"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="subscribe-button"
            >
              {status === 'loading' ? 'sending...' : 'subscribe →'}
            </button>
          </form>
          {status === 'error' && (
            <div className="subscribe-error">
              <span style={{ color: 'var(--accent)' }}>!</span> {message}
            </div>
          )}
        </>
      )}
    </div>
  )
}
