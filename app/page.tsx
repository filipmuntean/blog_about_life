import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Navigating Life After AI MSc
      </h1>
      <p className="mb-4">
        {`I'm a recent AI MSc graduate stepping into a world full of possibilities
        and uncertainties. This blog chronicles my journey as I navigate the rapidly
        evolving landscape of artificial intelligence, search for my path, and figure
        out what comes next in these transformative times.`}
      </p>
      <p className="mb-4">
        {`Here, I share honest reflections on the challenges of being a new graduate
        in the AI field, the opportunities I'm exploring, the lessons I'm learning,
        and the decisions I'm making as I chart my course forward. If you're in a
        similar phase of life or curious about the AI journey, I hope you'll find
        something valuable here.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
