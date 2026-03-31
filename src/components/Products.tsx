import { motion } from 'framer-motion'
import { ArrowUpRight, Zap, Users, Radio, BookOpen, Bot, BarChart3 } from 'lucide-react'

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
    domain: 'makeyourmove.ai',
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-tight">
            Two products.
            <br />
            <span className="text-text-muted">One intelligence layer.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="group relative bg-bg-card border border-border rounded-3xl p-10 hover:border-border-bright transition-all overflow-hidden"
            >
              {/* Background gradient glow */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br ${product.gradient} opacity-5 blur-[80px] group-hover:opacity-10 transition-opacity`} />

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className={`text-3xl font-black bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}>
                      {product.name}
                    </h3>
                    <p className="text-lg font-medium text-white mt-1">{product.tagline}</p>
                  </div>
                  <ArrowUpRight size={20} className="text-text-muted group-hover:text-white transition-colors mt-1" />
                </div>

                <p className="text-text-secondary leading-relaxed mb-8">{product.description}</p>

                <div className="space-y-4 mb-8">
                  {product.features.map((f) => (
                    <div key={f.text} className="flex items-start gap-3">
                      <div className={`mt-0.5 p-1.5 rounded-lg bg-gradient-to-br ${product.gradient} bg-opacity-10`}>
                        <f.icon size={16} className="text-white/80" />
                      </div>
                      <span className="text-text-secondary text-[15px]">{f.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <span className="text-sm text-text-muted">{product.price}</span>
                  {product.domain && (
                    <span className="text-sm text-text-muted">{product.domain}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
