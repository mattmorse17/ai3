import { motion } from 'framer-motion'
import { TrendingUp, Shield, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'

const reasons = [
  {
    icon: Rocket,
    title: 'Early mover advantage',
    text: 'The AI orchestration layer is a $200B+ market forming right now. AI3 is building it.',
  },
  {
    icon: TrendingUp,
    title: 'Real revenue, real clients',
    text: '10+ years of agency revenue. 50+ clients. Now productizing into scalable SaaS.',
  },
  {
    icon: Shield,
    title: 'Reg CF — open to everyone',
    text: 'Invest as little as $500. Same opportunity previously reserved for VCs and angels.',
  },
]

export default function InvestorCTA() {
  return (
    <section id="invest-section" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">For Investors</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-tight mb-6">
            Own a piece of the
            <br />
            <span className="gradient-text">intelligence layer.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            AI3 is raising under Regulation Crowdfunding. For the first time, anyone
            can invest in the company building the operating system for the AI era.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-bg-card border border-border rounded-2xl p-8 hover:border-border-bright transition-all"
            >
              <r.icon size={28} className="text-accent mb-4" />
              <h3 className="text-lg font-bold mb-2">{r.title}</h3>
              <p className="text-text-secondary text-[15px] leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/invest"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-gradient-start to-gradient-end hover:opacity-90 rounded-full transition-all no-underline glow"
          >
            Learn More & Invest
            <TrendingUp size={18} />
          </Link>
          <p className="text-text-muted text-xs mt-4 max-w-md mx-auto">
            Investing involves risk. This is not a solicitation or offer to sell securities.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
