import { getAllPosts } from '@/lib/posts'

export default function AboutPage() {
  const posts = getAllPosts()

  return (
    <div className="about-content">
      <div className="about-label">// whoami</div>
      <h2 className="about-name">Stijn Schoonderwoerd</h2>
      <div className="about-handle">
        goes by <span className="accent">@Arrownymous</span> online
      </div>

      <div className="about-bio">
        <p>
          Developer based in the <strong>Netherlands</strong>. I build web apps, mostly for
          problems I personally run into. I care about <strong>good software</strong> — fast,
          focused, and honest about what it is.
        </p>
        <p>
          This devlog is where I write about what I&apos;m building, what breaks,
          and what I figure out along the way. No polish, just signal.
        </p>
        <p>
          Currently focused on <strong>Inkwell</strong> — a writing webapp I&apos;m designing
          around how writers actually think, not how productivity culture says they should.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-stat">
          <div className="about-stat-label">location</div>
          <div className="about-stat-value" style={{ fontSize: 14, letterSpacing: '0.02em' }}>
            Netherlands
          </div>
        </div>
        <div className="about-stat">
          <div className="about-stat-label">active project</div>
          <div className="about-stat-value" style={{ fontSize: 14, color: 'var(--accent)' }}>
            Inkwell
          </div>
        </div>
        <div className="about-stat">
          <div className="about-stat-label">log entries</div>
          <div className="about-stat-value" style={{ color: 'var(--green)' }}>
            {String(posts.length).padStart(2, '0')}
          </div>
        </div>
        <div className="about-stat">
          <div className="about-stat-label">status</div>
          <div className="about-stat-value" style={{ fontSize: 12, color: 'var(--green)' }}>
            building
          </div>
        </div>
      </div>

      <div className="about-links">
        <a href="https://github.com/" target="_blank" rel="noreferrer" className="about-link">
          github →
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="about-link">
          twitter →
        </a>
        <a href="mailto:hi@arrownymous.dev" className="about-link">
          email →
        </a>
      </div>
    </div>
  )
}
