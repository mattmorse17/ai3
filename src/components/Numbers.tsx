import { motion } from 'framer-motion'

const stats = [
  { value: '10+', label: 'Years building AI-powered businesses' },
  { value: '50+', label: 'Organizations already powered by AI3' },
  { value: '3', label: 'Intelligences fused into one system' },
  { value: '$100M', label: 'Target company valuation' },
]

export default function Numbers() {
  return (
    <section className="relative py-24 px-6 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-black gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-text-muted leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
