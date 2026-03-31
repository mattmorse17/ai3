import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const posts = [
  {
    slug: 'actual-artificial-agentic',
    title: 'Actual + Artificial + Agentic: Why Three Intelligences Beat One',
    category: 'Methodology',
    readTime: '6 min',
    excerpt:
      'The world has access to the same AI models. The differentiation isn\'t the model — it\'s the orchestration of three distinct intelligences working as one.',
  },
  {
    slug: 'why-ai-fails-without-humans',
    title: 'Why AI Fails Without Humans in the Loop',
    category: 'Intelligence',
    readTime: '5 min',
    excerpt:
      'Pure AI approaches hallucinate, lack context, and produce generic output. The fix isn\'t better models — it\'s better orchestration with human intelligence at the foundation.',
  },
  {
    slug: 'agents-not-chatbots',
    title: 'Agents, Not Chatbots: What Real AI Operations Look Like',
    category: 'Product',
    readTime: '7 min',
    excerpt:
      'Chatbots answer questions. Agents execute workflows. Here\'s what a named agent fleet looks like in practice — and why it changes everything.',
  },
  {
    slug: 'personalization-at-scale',
    title: 'The End of One-Size-Fits-All: Personalization at Scale',
    category: 'Now',
    readTime: '6 min',
    excerpt:
      'Every message, every sermon, every newsletter is one-size-fits-all. Now changes that by personalizing content for every individual in real-time.',
  },
]

export default function Blog() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mb-16">
            Thinking on intelligence, orchestration, and why the future belongs to organizations that fuse human expertise with agentic AI.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block bg-bg-card border border-border rounded-2xl p-8 no-underline hover:border-accent/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                  Read article <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
