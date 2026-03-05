'use client'

import { useState } from 'react'
import PostCard from '@/components/PostCard'
import { PostMeta } from '@/lib/posts'

const FILTERS = ['all', 'inkwell', 'meta', 'learnings']

export default function DevlogClient({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? posts : posts.filter((p) => p.tags.includes(active))

  return (
    <>
      <div className="filter-bar">
        <span className="filter-label">filter:</span>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn ${active === f ? 'active' : ''}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div>
        {filtered.length === 0 ? (
          <div style={{ padding: '40px', color: 'var(--text-dim)', fontSize: 12 }}>
            no entries yet for this filter.
          </div>
        ) : (
          filtered.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </>
  )
}
