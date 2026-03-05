import { getAllPosts, getPost } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  // Very simple markdown → HTML (for a real project, use next-mdx-remote or remark)
  const html = post.content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/^(?!<[h|p|pre|ul|ol])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')

  return (
    <>
      <div className="post-detail-header">
        <Link href="/devlog" className="back-link">← back to log</Link>
        <div className="post-project">{post.project}</div>
        <h1 className="post-detail-title">{post.title}</h1>
        <div className="post-detail-meta">
          <div>{post.date}</div>
          <div>entry <span className="accent">#{post.number}</span></div>
        </div>
      </div>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}
