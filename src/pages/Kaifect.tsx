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
  Bot,
  Clock,
  ChevronRight,
  ExternalLink,
  Search,
  Eye,
  Palette,
  Truck,
  PackageCheck,
  RefreshCw,
  Megaphone,
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
    gradient: 'from-orange-500 to-amber-400',
    icon: Brain,
  },
  {
    initials: 'SC',
    name: 'Scout',
    role: 'Research & Outreach',
    description: 'Finds opportunities, prospects, and partnerships. Always scanning, always connecting.',
    gradient: 'from-blue-500 to-cyan-400',
    icon: Search,
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
    initials: 'DS',
    name: 'Dash',
    role: 'Analytics & Reporting',
    description: 'Turns data into decisions. Tracks what matters and kills what doesn\'t.',
    gradient: 'from-yellow-500 to-orange-400',
    icon: BarChart3,
  },
  {
    initials: 'CY',
    name: 'Cyrus',
    role: 'Content Strategy',
    description: 'Plans and orchestrates content calendars, messaging, and brand narrative across every channel.',
    gradient: 'from-violet-500 to-pink-400',
    icon: PenTool,
  },
  {
    initials: 'NV',
    name: 'Nova',
    role: 'Growth & Acquisition',
    description: 'Finds your next customers, qualifies leads, and fills your pipeline while you sleep.',
    gradient: 'from-pink-500 to-rose-400',
    icon: Sparkles,
  },
  {
    initials: 'CL',
    name: 'Cleo',
    role: 'Creative Director',
    description: 'Designs, brands, and produces visual assets that stop the scroll and start the conversation.',
    gradient: 'from-fuchsia-500 to-purple-400',
    icon: Palette,
  },
  {
    initials: 'VR',
    name: 'Vera',
    role: 'Quality Assurance',
    description: 'Reviews every output before it ships. Nothing leaves the building without Vera\'s stamp.',
    gradient: 'from-teal-500 to-green-400',
    icon: Eye,
  },
  {
    initials: 'RX',
    name: 'Rex',
    role: 'Fulfillment',
    description: 'Executes deliverables on time, every time. Zero excuses, zero dropped balls.',
    gradient: 'from-red-500 to-orange-400',
    icon: CheckCircle,
  },
]

const services = [
  { icon: Target, title: 'Kaifecta Platform', description: 'Website, funnel, and landing page building -- custom-built digital presence powered by AI³.' },
  { icon: Users, title: 'Agency DFY Services', description: 'Done-for-you marketing, branding, and business operations. Strategy to execution, handled.' },
  { icon: Megaphone, title: 'C4 Cycles', description: 'Content and campaign cycles that keep your brand visible, relevant, and converting -- month after month.' },
  { icon: PackageCheck, title: 'KaiPublish', description: 'Print-on-demand product creation and publishing. From concept to shelf, automated.' },
  { icon: Truck, title: 'KaiShip', description: 'Fulfillment center operations -- pick, pack, ship. Orders out the door, headaches off your plate.' },
  { icon: HeadphonesIcon, title: 'KaiSupport', description: 'Customer support handled by AI agents backed by humans. Fast, personal, always-on.' },
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

/* ---------- application form ---------- */

function ApplicationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    businessName: '',
    creatorType: '',
    revenueRange: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.businessName || !form.creatorType || !form.revenueRange) return
    setLoading(true)
    try {
      const leads = JSON.parse(localStorage.getItem('kaifect_leads') || '[]')
      leads.push({ ...form, source: 'application', timestamp: new Date().toISOString() })
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
        <span className="font-medium">Application received. We'll be in touch soon.</span>
      </div>
    )
  }

  const inputClass = "w-full px-5 py-3.5 rounded-xl bg-bg-card border border-border text-white placeholder-text-muted outline-none focus:border-[#F58220] transition-colors text-base"
  const selectClass = "w-full px-5 py-3.5 rounded-xl bg-bg-card border border-border text-white outline-none focus:border-[#F58220] transition-colors text-base appearance-none"

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto text-left">
      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
        placeholder="Your Name"
        required
        className={inputClass}
      />
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
        placeholder="Email Address"
        required
        className={inputClass}
      />
      <input
        type="text"
        value={form.businessName}
        onChange={(e) => setForm(f => ({ ...f, businessName: e.target.value }))}
        placeholder="Business / Brand Name"
        required
        className={inputClass}
      />
      <select
        value={form.creatorType}
        onChange={(e) => setForm(f => ({ ...f, creatorType: e.target.value }))}
        required
        className={selectClass}
        style={{ color: form.creatorType ? 'white' : '#6b7280' }}
      >
        <option value="" disabled>What do you create?</option>
        <option value="coaching">Coaching / Courses</option>
        <option value="physical">Physical Products</option>
        <option value="content">Content / Media</option>
        <option value="services">Services</option>
        <option value="other">Other</option>
      </select>
      <select
        value={form.revenueRange}
        onChange={(e) => setForm(f => ({ ...f, revenueRange: e.target.value }))}
        required
        className={selectClass}
        style={{ color: form.revenueRange ? 'white' : '#6b7280' }}
      >
        <option value="" disabled>Monthly Revenue Range</option>
        <option value="pre-revenue">Pre-Revenue</option>
        <option value="0-5k">$0 - $5K / mo</option>
        <option value="5k-25k">$5K - $25K / mo</option>
        <option value="25k-100k">$25K - $100K / mo</option>
        <option value="100k+">$100K+ / mo</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 rounded-xl transition-all cursor-pointer border-none flex items-center justify-center gap-2"
        style={{ backgroundColor: '#F58220' }}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Apply Now
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] pointer-events-none" style={{ backgroundColor: 'rgba(245, 130, 32, 0.06)' }} />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-8" style={{ backgroundColor: 'rgba(245, 130, 32, 0.1)', borderColor: 'rgba(245, 130, 32, 0.2)', color: '#F58220' }}>
              <Bot size={16} />
              <span>The Growth Engine for Competitive Creators</span>
            </div>

            {/* Kaifect wordmark */}
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-[-0.04em] leading-none mb-8">
              <span style={{ background: 'linear-gradient(135deg, #F58220, #FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Kaifect</span>
            </h1>

            {/* Tagline */}
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white mb-6 max-w-3xl mx-auto leading-tight">
              The Growth Engine<br />for Competitive Creators.
            </p>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
              An army of AI agents on a mission to grow your brand. Powered by{' '}
              <Link to="/" className="hover:underline font-semibold no-underline" style={{ color: '#F58220' }}>
                AI&#179;
              </Link>
              {' '}&mdash; the intelligence layer that fuses Actual, Artificial, and Agentic Intelligence.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...stagger}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#apply"
              className="px-8 py-4 text-base font-bold text-white rounded-full transition-all no-underline flex items-center gap-2"
              style={{ backgroundColor: '#F58220' }}
            >
              Apply to Become a Partner
              <ArrowRight size={18} />
            </a>
            <a
              href="https://makeyourmove.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors no-underline px-6 py-4 rounded-full border border-border hover:border-[#F58220]/40"
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#F58220' }}>What is Kaifect?</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Not your parents' growth partner.
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
              className="relative p-8 rounded-2xl bg-bg-card overflow-hidden"
              style={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(245, 130, 32, 0.2)' }}
            >
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, #F58220, transparent)' }} />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#F58220' }}>The Kaifect Way</p>
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#F58220' }}>The Agent Fleet</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Meet the team that never sleeps.
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              9 named agents, each trained on YOUR business, YOUR voice, YOUR goals.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, i) => {
              const Icon = agent.icon
              return (
                <motion.div
                  key={agent.name}
                  {...stagger}
                  transition={{ duration: 0.5, delay: 0.08 * i }}
                  className="group relative p-6 rounded-2xl border border-border bg-bg-card hover:border-border-bright transition-all"
                >
                  {/* Avatar */}
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: '#F58220' }}>{agent.role}</p>
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#F58220' }}>What We Offer</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Everything a growth engine delivers.<br />Nothing it can't scale.
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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:opacity-80 transition-colors" style={{ backgroundColor: 'rgba(245, 130, 32, 0.1)' }}>
                    <Icon size={22} style={{ color: '#F58220' }} />
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none" style={{ backgroundColor: 'rgba(245, 130, 32, 0.06)' }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8" style={{ backgroundColor: 'rgba(245, 130, 32, 0.1)', borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(245, 130, 32, 0.2)', color: '#F58220' }}>
              <Bot size={16} />
              <span>A Decade of Results</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] leading-tight mb-8">
              10 years of results.<br />
              <span style={{ background: 'linear-gradient(135deg, #F58220, #FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Rebuilt from the ground up.</span>
            </h2>
          </motion.div>

          <motion.div {...stagger} transition={{ duration: 0.7, delay: 0.15 }} className="space-y-6 mb-12">
            <p className="text-xl sm:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
              Kaifect has served <span className="text-white font-semibold">150+ clients over the past decade</span>.
              Now we're rebuilding everything with AI&#179; at the core.
            </p>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Same mission. Same results. Completely new infrastructure.
            </p>
            <p className="text-lg text-white font-semibold max-w-2xl mx-auto">
              The growth partners that survive the next 5 years will look nothing like today's agencies.
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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#F58220' }} />
              <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: '#F58220' }} />
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: '#F58220' }}>Now Accepting Partners</span>
          </motion.div>
        </div>
      </section>

      {/* ---- FINAL CTA / APPLICATION ---- */}
      <section id="apply" className="py-28 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#F58220' }}>Get Started Now</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Apply to Become<br />a Kaifect Partner.
            </h2>
            <p className="text-lg text-text-secondary mb-10">
              Tell us about your brand and what you create. We'll reach out with next steps.
            </p>
          </motion.div>

          <motion.div {...stagger} transition={{ duration: 0.6, delay: 0.2 }}>
            <ApplicationForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
