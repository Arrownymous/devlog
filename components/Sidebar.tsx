'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

export default function Sidebar({ postCount }: { postCount: number }) {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()

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
