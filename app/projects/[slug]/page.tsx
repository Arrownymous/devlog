import { getAllProjects, getProject } from '@/lib/projects'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

function renderContent(content: string) {
  return content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="width:300px;max-width:100%;margin:20px 0;display:block;" />')
    .replace(/- \[x\] (.+)/g, '<li class="check done">$1</li>')
    .replace(/- \[ \] (.+)/g, '<li class="check todo">$1</li>')
    .replace(/(<li class="check[^>]*>.*<\/li>\n?)+/g, (m) => `<ul class="checklist">${m}</ul>`)
    .replace(/^(?!<[h|p|u|li|img])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const posts = getAllPosts().filter((p) => p.project === project.slug)
  const html = renderContent(project.content)

  const statusColor = project.status.includes('development') ? 'var(--green)' : 'var(--text-dim)'

  return (
    <>
      {/* Project hero — accent color tints the left bar */}
      <div
        className="project-hero"
        style={{ '--project-color': project.color } as React.CSSProperties}
      >
        <div className="project-hero-bar" />
        <div className="project-hero-content">
          <Link href="/projects" className="back-link">← all projects</Link>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <h1 className="project-name">{project.name}</h1>
              <p className="project-tagline">{project.tagline}</p>
            </div>
            <div className="project-meta-block">
              <div className="project-meta-row">
                <span className="about-stat-label">status</span>
                <span style={{ fontSize: 11, color: statusColor, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="status-dot" style={{ background: statusColor }} />
                  {project.status}
                </span>
              </div>
              <div className="project-meta-row">
                <span className="about-stat-label">started</span>
                <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{project.started}</span>
              </div>
              <div className="project-meta-row">
                <span className="about-stat-label">entries</span>
                <span style={{ fontSize: 11, color: 'var(--project-color)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {String(posts.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Stack */}
          <div className="fp-stack" style={{ marginTop: 20 }}>
            {project.stack.map((t) => (
              <span key={t} className="fp-tech">{t}</span>
            ))}
          </div>

          {/* Links */}
          {project.links.length > 0 && (
            <div className="project-links">
              {project.links.map((l) => (
                <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="about-link">
                  {l.label} →
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description + progress */}
      <div
        className="prose project-prose"
        style={{ borderBottom: '1px solid var(--border)', maxWidth: '100%', padding: '40px 40px 40px' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Devlog entries for this project */}
      <div className="section-label" style={{ paddingTop: 28 }}>
        Devlog entries
      </div>

      {posts.length === 0 ? (
        <div style={{ padding: '24px 40px', fontSize: 12, color: 'var(--text-dim)' }}>
          no entries yet.
        </div>
      ) : (
        posts.map((post) => <PostCard key={post.slug} post={post} />)
      )}

      <div className="terminal-prompt">
        <span className="prompt-symbol" style={{ color: project.color }}>→</span>
        <span>end of {project.name} log</span>
        <span className="prompt-cursor" />
      </div>
    </>
  )
}