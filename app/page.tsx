import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default function HomePage() {
  const posts = getAllPosts()
  const recent = posts.slice(0, 2)

  return (
    <>
      {/* Hero */}
      <div className="hero">
        <div className="hero-bg-text">{'{ }'}</div>
        <div className="hero-label">// build journal</div>
        <h1 className="hero-title">
          Ship.<br />Break.<br /><span className="accent">Iterate.</span>
        </h1>
        <p className="hero-desc">
          I&apos;m <strong>Arrownymous</strong> — building things in public, writing about what I
          learn, and documenting the messy reality of indie development.
          Currently deep in <strong>Inkwell</strong>.
        </p>
      </div>

      {/* Featured project */}
      <div className="featured-project">
        <div className="fp-label">// current project</div>
        <div className="fp-title">Inkwell</div>
        <div className="fp-desc">
          A webapp built for writers. Clean, distraction-free, and designed around the way
          creative writing actually works — not how productivity apps think it should.
        </div>
        <div className="fp-stack">
          {['Next.js', 'TypeScript', 'Supabase', 'TailwindCSS'].map((t) => (
            <span key={t} className="fp-tech">{t}</span>
          ))}
        </div>
        <div className="fp-status">
          <span className="status-dot" />
          in active development
        </div>
      </div>

      {/* Recent posts */}
      <div className="section-label">Recent entries</div>
      <div>
        {recent.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="terminal-prompt">
        <span className="prompt-symbol">→</span>
        <Link href="/devlog" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
          view all entries in /devlog
        </Link>
        <span className="prompt-cursor" />
      </div>
    </>
  )
}
