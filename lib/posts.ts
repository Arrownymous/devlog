import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export type PostMeta = {
  slug: string
  title: string
  date: string
  number: string
  project: string
  excerpt: string
  tags: string[]
  featured: boolean
}

export type Post = PostMeta & {
  content: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title ?? '',
        date: data.date ?? '',
        number: data.number ?? '000',
        project: data.project ?? '',
        excerpt: data.excerpt ?? '',
        tags: data.tags ?? [],
        featured: data.featured ?? false,
      } as PostMeta
    })
    .sort((a, b) => (a.number > b.number ? -1 : 1))
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    number: data.number ?? '000',
    project: data.project ?? '',
    excerpt: data.excerpt ?? '',
    tags: data.tags ?? [],
    featured: data.featured ?? false,
    content,
  }
}
