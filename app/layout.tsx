import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Arrownymous — Devlog',
  description: 'Building in public. Devlog by Stijn Schoonderwoerd.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = getAllPosts()

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="site-wrapper">
            <Sidebar postCount={posts.length} />
            <main className="main">
              <Topbar />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
