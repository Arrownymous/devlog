'use client'

import { usePathname } from 'next/navigation'

export default function Topbar() {
  const pathname = usePathname()

  const pathDisplay = pathname === '/'
    ? '/home'
    : pathname.startsWith('/devlog/')
    ? pathname.replace('/devlog/', '/devlog/')
    : pathname

  return (
    <div className="topbar">
      <div className="topbar-path">
        <span className="path-root">~/arrownymous</span>
        {pathDisplay}
      </div>
      <div className="topbar-right">
        <span className="topbar-tag">NL — based</span>
      </div>
    </div>
  )
}
