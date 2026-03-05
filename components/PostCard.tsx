import Link from 'next/link'
import { PostMeta } from '@/lib/posts'

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/devlog/${post.slug}`} className="post-item">
      <div className="post-meta">
        <div className="post-date">{post.date}</div>
        <div className="post-number">#{post.number}</div>
      </div>
      <div className="post-content">
        <div className="post-project">{post.project}</div>
        <div className="post-title">{post.title}</div>
        <div className="post-excerpt">{post.excerpt}</div>
        <div className="post-tags">
          {post.tags.map((t) => (
            <span key={t} className={`tag ${post.featured && t === post.project ? 'tag-featured' : ''}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="post-arrow">→</div>
    </Link>
  )
}
