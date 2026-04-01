import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Brain,
  Sparkles,
  HeadphonesIcon,
  CheckCircle,
  PenTool,
  BarChart3,
  Zap,
  Target,
  Users,
  Megaphone,
  Bot,
  Clock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ---------- data ---------- */

const agents = [
  {
    initials: 'KI',
    name: 'Kai',
    role: 'Chief Intelligence Officer',
    description: 'Orchestrates every agent, every workflow, every decision. The brain behind the operation.',
    gradient: 'from-blue-500 to-cyan-400',
    icon: Brain,
  },
  {
    initials: 'NV',
    name: 'Nova',
    role: 'Growth & Acquisition',
    description: 'Finds your next customers, qualifies leads, and fills your pipeline while you sleep.',
    gradient: 'from-violet-500 to-pink-400',
    icon: Sparkles,
  },
  {
    initials: 'SG',
    name: 'Sage',
    role: 'Client Success',
    description: 'Keeps every client happy, retained, and growing. Proactive, not reactive.',
    gradient: 'from-emerald-500 to-teal-400',
    icon: HeadphonesIcon,
  },
  {
    initials: 'RX',
    name: 'Rex',
    role: 'Fulfillment & Delivery',
    description: 'Executes deliverables on time, every time. Zero excuses, zero dropped balls.',
    gradient: 'from-orange-500 to-amber-400',
    icon: CheckCircle,
  },
  {
    initials: 'AR',
    name: 'Aria',
    role: 'Content & Creative',
    description: 'Writes, designs, and publishes content in your voice across every channel.',
    gradient: 'from-pink-500 to-rose-400',
    icon: PenTool,
  },
  {
    initials: 'AT',
    name: 'Atlas',
    role: 'Strategy & Analytics',
    description: 'Turns data into decisions. Tracks what matters and kills what doesn\'t.',
    gradient: 'from-yellow-500 to-orange-400',
    icon: BarChart3,
  },
]

const services = [
  { icon: Target, title: 'AI-Powered Marketing Strategy', description: 'Custom strategies built by agents trained on your business, your market, your goals.' },
  { icon: PenTool, title: 'Autonomous Content Creation', description: 'Blog posts, social media, email sequences, and video scripts -- created and distributed automatically.' },
  { icon: Megaphone, title: 'Lead Generation & Sales Automation', description: 'Prospects found, qualified, and nurtured by AI agents that never clock out.' },
  { icon: Users, title: 'Client Experience & Retention', description: 'Every client touchpoint managed, measured, and optimized for lifetime value.' },
  { icon: Zap, title: 'Full-Stack Business Operations', description: 'CRM, project management, scheduling, invoicing -- all running on AI\u00B3 infrastructure.' },
  { icon: Clock, title: 'Running 24/7/365', description: 'No holidays. No sick days. No missed deadlines. Your agency never sleeps.' },
]

/* ---------- fade helpers ---------- */

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' } as const,
  transition: { duration: 0.7 },
}

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
}

/* ---------- email capture ---------- */

function EmailCapture({ id, label }: { id: string; label: string }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const leads = JSON.parse(localStorage.getItem('kaifect_leads') || '[]')
      leads.push({ email, source: id, timestamp: new Date().toISOString() })
      localStorage.setItem('kaifect_leads', JSON.stringify(leads))
    } catch {
      // silent
    }
    await new Promise(r => setTimeout(r, 600))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
        <Check size={20} />
        <span className="font-medium">You're in. We'll be in touch soon.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="w-full sm:flex-1 px-5 py-3.5 rounded-full bg-bg-card border border-border text-white placeholder-text-muted outline-none focus:border-accent transition-colors text-base"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-black bg-accent hover:bg-accent-hover disabled:opacity-50 rounded-full transition-all cursor-pointer border-none flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {label}
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  )
}

/* ========== PAGE ========== */

export default function Kaifect() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* ---- HERO ---- */}
      <section className="relative pt-40 pb-28 px-6 overflow-hidden">
        {/* Background grid + glow */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[180px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp}>
            {/* Kaifect wordmark */}
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-[-0.04em] leading-none mb-8">
              <span className="gradient-text">Kaifect</span>
            </h1>

            {/* Tagline */}
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white mb-6 max-w-3xl mx-auto leading-tight">
              An army of AI agents.<br />On a mission to build your business.
            </p>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
              Powered by{' '}
              <Link to="/" className="text-accent hover:underline font-semibold no-underline">
                AI&#179;
              </Link>
              {' '}&mdash; the intelligence layer that fuses actual, artificial, and agentic intelligence.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...stagger}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <EmailCapture id="hero" label="Request Early Access" />
          </motion.div>

          <motion.div
            {...stagger}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6"
          >
            <a
              href="https://makeyourmove.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors no-underline"
            >
              See the Intelligence Behind It
              <ExternalLink size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ---- WHAT KAIFECT IS ---- */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">What is Kaifect?</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Not your parents' marketing agency.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Old Way */}
            <motion.div
              {...stagger}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative p-8 rounded-2xl border border-border bg-bg-card overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/60 to-red-500/0" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400/80 mb-4">The Old Way</p>
              <p className="text-xl font-bold text-white mb-3">Hire a team. Wait weeks. Pay retainers. Hope for results.</p>
              <p className="text-text-secondary leading-relaxed">
                Bloated headcount. Slow turnarounds. Monthly reports that tell you what already happened.
                The traditional agency model is broken.
              </p>
            </motion.div>

            {/* Kaifect Way */}
            <motion.div
              {...stagger}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="relative p-8 rounded-2xl border border-accent/20 bg-bg-card overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/0" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">The Kaifect Way</p>
              <p className="text-xl font-bold text-white mb-3">Deploy an army of AI agents backed by human intelligence.</p>
              <p className="text-text-secondary leading-relaxed">
                Real results. Real speed. Real accountability. Named AI agents and human strategists
                working together -- trained on YOUR business, YOUR voice, YOUR goals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---- AGENT FLEET ---- */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">The Agent Fleet</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Meet the team that never sleeps.
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Every agent is trained on YOUR business, YOUR voice, YOUR goals.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, i) => {
              const Icon = agent.icon
              return (
                <motion.div
                  key={agent.name}
                  {...stagger}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="group relative p-6 rounded-2xl border border-border bg-bg-card hover:border-border-bright transition-all"
                >
                  {/* Avatar */}
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
                  <p className="text-sm text-accent font-medium mb-3">{agent.role}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{agent.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---- SERVICES ---- */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">What We Do</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Everything an agency does.<br />Nothing an agency can't scale.
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              All powered by AI&#179;. All running 24/7.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon
              return (
                <motion.div
                  key={svc.title}
                  {...stagger}
                  transition={{ duration: 0.5, delay: 0.08 * i }}
                  className="p-6 rounded-2xl border border-border bg-bg-card hover:border-border-bright transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="text-accent" size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{svc.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{svc.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---- SOMETHING BIG IS COMING ---- */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Big glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[160px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-8">
              <Bot size={16} />
              <span>Something Big Is Coming</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] leading-tight mb-8">
              10 years of results.<br />
              <span className="gradient-text">Rebuilt from the ground up.</span>
            </h2>
          </motion.div>

          <motion.div {...stagger} transition={{ duration: 0.7, delay: 0.15 }} className="space-y-6 mb-12">
            <p className="text-xl sm:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
              Kaifect has served <span className="text-white font-semibold">50+ clients</span> over a decade.
              Now we're rebuilding everything with AI&#179; at the core.
            </p>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Same mission. Same results. Completely new infrastructure.
            </p>
            <p className="text-lg text-white font-semibold max-w-2xl mx-auto">
              The agencies that survive the next 5 years will look nothing like today's agencies.
              We're already there.
            </p>
          </motion.div>

          {/* Animated pulse indicator */}
          <motion.div
            {...stagger}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
            </span>
            <span className="text-accent font-semibold text-sm uppercase tracking-[0.15em]">Launching Soon</span>
          </motion.div>
        </div>
      </section>

      {/* ---- FINAL CTA ---- */}
      <section className="py-28 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">Get In Early</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Be the first to experience<br />the new Kaifect.
            </h2>
            <p className="text-lg text-text-secondary mb-10">
              Early access members get priority onboarding and founding-member pricing.
            </p>
          </motion.div>

          <motion.div {...stagger} transition={{ duration: 0.6, delay: 0.2 }}>
            <EmailCapture id="footer-cta" label="Request Early Access" />
          </motion.div>

          <motion.div {...stagger} transition={{ duration: 0.6, delay: 0.35 }} className="mt-10 flex flex-col items-center gap-4">
            <a
              href="https://makeyourmove.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bg-card border border-border text-sm text-text-secondary hover:text-white hover:border-border-bright transition-all no-underline"
            >
              <span className="gradient-text font-bold">AI&#179;</span>
              <span>Powered by AI&#179;</span>
              <ChevronRight size={14} />
            </a>

            <a
              href="mailto:hello@makeyourmove.ai"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors no-underline"
            >
              hello@makeyourmove.ai
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
