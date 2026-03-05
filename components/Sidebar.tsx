'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { useState } from 'react'

export default function Sidebar({ postCount }: { postCount: number }) {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async () => {
    if (!email.includes('@')) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setEmail('')
    } catch {
      setStatus('error')
    }
  }

  const navLink = (href: string, label: string) => {
    const active = pathname === href || (href !== '/' && pathname.startsWith(href))
    return (
      <Link href={href} className={`nav-link ${active ? 'active' : ''}`}>
        <span className="nav-dot" />
        {label}
      </Link>
    )
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link href="/" className="logo">
          <span className="logo-arrow">→</span> arrownymous
        </Link>
        <div className="logo-sub">devlog / build journal</div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Navigate</div>
        {navLink('/', 'home')}
        {navLink('/devlog', 'devlog')}
        {navLink('/projects', 'projects')}
        {navLink('/about', 'about')}

        <div className="nav-section-label" style={{ marginTop: 24 }}>Projects</div>
        {navLink('/projects/inkwell', 'inkwell')}
      </nav>

      <div className="sidebar-footer">
        {/* Subscribe */}
        <div className="sidebar-subscribe">
          <div className="nav-section-label" style={{ padding: 0, marginBottom: 8 }}>// updates</div>
          {status === 'success' ? (
            <div className="sidebar-subscribe-success">
              <span className="prompt-symbol">→</span> subscribed!
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                disabled={status === 'loading'}
                className="sidebar-subscribe-input"
              />
              <button
                onClick={handleSubscribe}
                disabled={status === 'loading' || !email.includes('@')}
                className="sidebar-subscribe-btn"
              >
                {status === 'loading' ? 'sending...' : 'subscribe →'}
              </button>
              {status === 'error' && (
                <div className="sidebar-subscribe-error">! try again</div>
              )}
            </>
          )}
        </div>

        <button className="theme-toggle" onClick={toggle}>
          {theme === 'dark' ? '☀ light mode' : '◑ dark mode'}
        </button>
        <div className="status-line">
          <span className="status-dot" />
          actively building
        </div>
      </div>
    </aside>
  )
}