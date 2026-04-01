import { motion } from 'framer-motion'
import { ArrowRight, Home, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const ventures = [
  {
    icon: Home,
    name: 'The Village™',
    tagline: 'The future of living.',
    description: '30 custom modern barndominiums near Nashville. Smart everything. Robot-ready. The first full-stack connected living community in the country.',
    link: '/village',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Building2,
    name: 'Vyro Ventures',
    tagline: 'AI-powered acquisitions.',
    description: 'We buy established businesses, deploy AI\u00b3 agents across every function, scale 3-10x, and exit at premium multiples.',
    link: '/vyro',
    gradient: 'from-cyan-500 to-blue-500',
  },
]

export default function Ventures() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">AI\u00b3 Ventures</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.03em] leading-tight mb-4">
            The intelligence layer
            <span className="text-text-muted"> powers more than software.</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            When you can fuse human expertise with AI and autonomous agents, entirely new categories become possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {ventures.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link
                to={v.link}
                className="group block bg-bg-card border border-border rounded-2xl p-8 hover:border-border-bright transition-all no-underline h-full"
              >
                <div className={"inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br " + v.gradient + " mb-5"}>
                  <v.icon size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{v.name}</h3>
                <p className={"text-sm font-medium bg-gradient-to-r " + v.gradient + " bg-clip-text text-transparent mb-3"}>
                  {v.tagline}
                </p>
                <p className="text-text-secondary text-[14px] leading-relaxed mb-4">
                  {v.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-accent group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
