import { motion } from 'framer-motion'
import { Radio, BookOpen, Users, Bot, Zap, BarChart3, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NowMockup, MoveMockup } from './ProductMockups'

const products = [
  {
    name: 'Now',
    tagline: 'Personalized intelligence for every individual.',
    description: 'For any room with a speaker and an audience. Now transforms static content into a personalized experience — live or async — so every person gets exactly what they need.',
    features: [
      { icon: Radio, text: 'Live Mode — real-time audio personalized per individual' },
      { icon: BookOpen, text: 'Async Mode — books, courses, and podcasts that adapt to you' },
      { icon: Users, text: 'Built for organizations with audiences of any size' },
    ],
    gradient: 'from-blue-600 to-cyan-500',
    price: '$997 — $4,997/mo',
    mockup: 'now' as const,
    demoLink: '/demo',
    demoText: 'Try the Live Demo',
  },
  {
    name: 'Move',
    tagline: 'Your AI command center.',
    description: 'Every business needs agents. Move gives you a named fleet of AI operators that run your marketing, sales, fulfillment, and support — so you can focus on what only you can do.',
    features: [
      { icon: Bot, text: 'Named agents with specific roles and expertise' },
      { icon: Zap, text: 'Autonomous execution across your entire operation' },
      { icon: BarChart3, text: 'Real-time dashboards and performance intelligence' },
    ],
    gradient: 'from-purple-600 to-pink-500',
    price: '$497 — $2,997/mo',
    mockup: 'move' as const,
    demoLink: null,
    demoText: null,
  },
]

export default function Products() {
  return (
    <section id="products" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">Products</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-tight mb-4">
            Two products.
            <br />
            <span className="text-text-muted">One intelligence layer.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Now personalizes your message. Move runs your operations. Together, they're the AI³ platform.
          </p>
        </motion.div>

        <div className="space-y-16">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative bg-bg-card border border-border rounded-3xl p-8 sm:p-10 hover:border-border-bright transition-all overflow-hidden"
            >
              <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br ${product.gradient} opacity-5 blur-[80px] group-hover:opacity-10 transition-opacity`} />

              <div className="relative">
                {/* Header */}
                <div className="mb-8">
                  <h3 className={`text-3xl font-black bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent mb-1`}>
                    {product.name}
                  </h3>
                  <p className="text-lg font-medium text-white">{product.tagline}</p>
                  <p className="text-text-secondary leading-relaxed mt-3 max-w-2xl">{product.description}</p>
                </div>

                {/* Mockup */}
                <div className="mb-8 rounded-2xl overflow-hidden border border-border">
                  {product.mockup === 'now' ? <NowMockup /> : <MoveMockup />}
                </div>

                {/* Features + CTA */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  <div className="space-y-3">
                    {product.features.map((f) => (
                      <div key={f.text} className="flex items-start gap-3">
                        <div className={`mt-0.5 p-1.5 rounded-lg bg-gradient-to-br ${product.gradient}`}>
                          <f.icon size={14} className="text-white/80" />
                        </div>
                        <span className="text-text-secondary text-[15px]">{f.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-sm text-text-muted">{product.price}</span>
                    {product.demoLink && (
                      <Link
                        to={product.demoLink}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-full transition-all no-underline"
                      >
                        {product.demoText}
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
