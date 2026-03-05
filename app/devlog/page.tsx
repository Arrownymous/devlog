import { getAllPosts } from '@/lib/posts'
import DevlogClient from './DevlogClient'

export default function DevlogPage() {
  const posts = getAllPosts()
  return <DevlogClient posts={posts} />
}
