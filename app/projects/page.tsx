import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'
import { getAllPosts } from '@/lib/posts'

export default function ProjectsPage() {
  const projects = getAllProjects()
  const posts = getAllPosts()

  return (
    <>
      <div className="hero" style={{ paddingBottom: 40 }}>
        <div className="hero-bg-text">[ ]</div>
        <div className="hero-label">// projects</div>
        <h1 className="hero-title" style={{ fontSize: 32 }}>
          Things I&apos;m<br /><span className="accent">building.</span>
        </h1>
        <p className="hero-desc">
          Each project gets its own page — stack, status, progress, and all devlog entries for it.
        </p>
      </div>

      <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)' }}>
        {projects.map((project) => {
          const projectPosts = posts.filter((p) => p.project === project.slug)
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="project-card"
              style={{ '--project-color': project.color } as React.CSSProperties}
            >
              <div className="project-card-inner">
                <div className="project-card-left">
                  <div className="project-card-accent" />
                  <div>
                    <div className="project-card-name">{project.name}</div>
                    <div className="project-card-tagline">{project.tagline}</div>
                    <div className="project-card-stack">
                      {project.stack.map((t) => (
                        <span key={t} className="fp-tech">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="project-card-right">
                  <div className="project-card-stat">
                    <div className="about-stat-label">status</div>
                    <div className="project-card-status">
                      <span className="status-dot" />
                      {project.status}
                    </div>
                  </div>
                  <div className="project-card-stat">
                    <div className="about-stat-label">log entries</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--project-color)' }}>
                      {String(projectPosts.length).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="project-card-arrow">→</div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
