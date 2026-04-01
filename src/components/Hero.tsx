import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid pt-24">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-accent/5 to-gradient-end/8 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm mb-8 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Now raising — Community + Private rounds open
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.95] mb-6"
        >
          Intelligence
          <br />
          <span className="gradient-text">in Action.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          AI³ fuses actual Intelligence, artificial Intelligence, and agentic Intelligence into one system that helps you reach more people, create more impact, and get more done — whether you run a business, lead a classroom, coach a team, or create content.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-sm text-text-muted mb-10"
        >
          Powered by the fusion of Actual + Artificial + Agentic Intelligence
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('waitlist')}
            className="group px-8 py-3.5 text-base font-bold text-black bg-accent hover:bg-accent-hover rounded-full transition-all cursor-pointer border-none flex items-center gap-2 glow"
          >
            Request Early Access
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <Link
            to="/assessment"
            target="_blank"
            className="group px-8 py-3.5 text-base font-semibold text-accent hover:text-accent-hover bg-transparent border border-accent/30 hover:border-accent/50 rounded-full transition-all no-underline flex items-center gap-2"
          >
            <Sparkles size={16} />
            Define Your Intelligence Gap
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
