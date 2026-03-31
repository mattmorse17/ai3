import { motion } from 'framer-motion'
import { Brain, Cpu, Bot } from 'lucide-react'

const pillars = [
  {
    icon: Brain,
    label: 'Actual Intelligence',
    abbr: 'A',
    description: 'Human expertise, intuition, and domain knowledge. The irreplaceable foundation that no model can replicate.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Cpu,
    label: 'Artificial Intelligence',
    abbr: 'I',
    description: 'State-of-the-art language models, vision systems, and reasoning engines. We orchestrate them — we don\'t build them.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Bot,
    label: 'Agentic Intelligence',
    abbr: '3',
    description: 'Autonomous agents that execute, learn, and improve. Not chatbots — operators that run real workflows 24/7.',
    color: 'from-violet-500 to-indigo-600',
  },
]

export default function Thesis() {
  return (
    <section id="thesis" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">The Thesis</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-tight mb-6">
            AI models alone don't
            <br />
            <span className="text-text-muted">solve business problems.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            The gap between "AI exists" and "AI works for my business" is an orchestration problem.
            AI3 is the layer that closes it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-bg-card border border-border rounded-2xl p-8 hover:border-border-bright transition-all"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} mb-6`}>
                <p.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{p.label}</h3>
              <p className="text-text-secondary leading-relaxed text-[15px]">{p.description}</p>
              <div className="absolute top-6 right-6 text-5xl font-black text-white/[0.03]">
                {p.abbr}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            Like Perplexity builds the best search without building a single AI model,
            AI3 builds the best intelligence layer by orchestrating the best of everything.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
