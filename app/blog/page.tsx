import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Entrepreneurial Journey',
  description: 'Follow my journey as an entrepreneur, from the first steps to lessons learned along the way.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Entrepreneurial Journey</h1>
      <BlogPosts />
    </section>
  )
}
