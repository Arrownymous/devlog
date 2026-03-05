import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')

export type ProjectLink = {
  label: string
  url: string
}

export type ProjectMeta = {
  slug: string
  name: string
  tagline: string
  status: string
  started: string
  stack: string[]
  color: string
  links: ProjectLink[]
}

export type Project = ProjectMeta & {
  content: string
}

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(PROJECTS_DIR)) return []
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: file.replace(/\.md$/, ''),
        name: data.name ?? '',
        tagline: data.tagline ?? '',
        status: data.status ?? '',
        started: data.started ?? '',
        stack: data.stack ?? [],
        color: data.color ?? 'var(--accent)',
        links: data.links ?? [],
      } as ProjectMeta
    })
}

export function getProject(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    name: data.name ?? '',
    tagline: data.tagline ?? '',
    status: data.status ?? '',
    started: data.started ?? '',
    stack: data.stack ?? [],
    color: data.color ?? 'var(--accent)',
    links: data.links ?? [],
    content,
  }
}
