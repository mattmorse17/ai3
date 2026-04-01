import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Building2,
  TrendingUp,
  Bot,
  BarChart3,
  DollarSign,
  Target,
  Zap,
  Users,
  Briefcase,
  ChevronRight,
  Search,
  ShoppingCart,
  Cpu,
  Rocket,
  LineChart,
  Brain,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ---------- animation helpers ---------- */

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

/* ---------- data ---------- */

const stages = [
  {
    step: '01',
    title: 'Assess',
    icon: Search,
    description: 'AI-powered due diligence. We analyze the business for AI optimization potential, market position, and hidden value.',
  },
  {
    step: '02',
    title: 'Acquire',
    icon: ShoppingCart,
    description: 'Purchase businesses with strong fundamentals but operational inefficiency. The sweet spot where AI³ creates the most value.',
  },
  {
    step: '03',
    title: 'Automate',
    icon: Cpu,
    description: 'Deploy AI³ agents across the entire operation. Implement HyperOptimization on marketing, sales, fulfillment, and support.',
  },
  {
    step: '04',
    title: 'Scale',
    icon: Rocket,
    description: 'Grow revenue 3-10x without proportional headcount increase. AI agents do the work of entire departments.',
  },
  {
    step: '05',
    title: 'Exit or Hold',
    icon: LineChart,
    description: 'Sell at premium multiples or hold for long-term cash flow. The math works either way.',
  },
]

const hyperOptItems = [
  {
    icon: Target,
    title: 'Marketing',
    description: 'Autonomous lead generation and content production at 10x current output. Every channel running, every hour.',
  },
  {
    icon: DollarSign,
    title: 'Sales',
    description: 'AI agents qualifying and closing 24/7. No missed leads. No dropped follow-ups. Pipeline that never sleeps.',
  },
  {
    icon: Zap,
    title: 'Operations',
    description: 'Fulfillment, support, and admin running autonomously. Human oversight, machine execution.',
  },
  {
    icon: BarChart3,
    title: 'Intelligence',
    description: 'Real-time dashboards replacing guesswork with data. Every decision backed by live metrics.',
  },
]

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '100+', label: 'Businesses Built & Scaled' },
  { value: '3-10x', label: 'Typical Growth' },
  { value: 'AI³', label: 'Powered' },
]

/* ---------- forms ---------- */

function BusinessSubmitForm() {
  const [form, setForm] = useState({ name: '', email: '', businessName: '', revenue: '', industry: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.businessName || !form.revenue || !form.industry) return
    setLoading(true)
    try {
      const leads = JSON.parse(localStorage.getItem('vyro_leads') || '[]')
      leads.push({ ...form, type: 'business_submit', timestamp: new Date().toISOString() })
      localStorage.setItem('vyro_leads', JSON.stringify(leads))
    } catch { /* silent */ }
    await new Promise(r => setTimeout(r, 600))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
        <Check size={20} />
        <span className="font-medium">Submitted. We'll review and reach out within 48 hours.</span>
      </div>
    )
  }

  const inputClass = "w-full px-5 py-3.5 rounded-xl bg-bg-card border border-border text-white placeholder-text-muted outline-none focus:border-accent transition-colors text-base"
  const selectClass = "w-full px-5 py-3.5 rounded-xl bg-bg-card border border-border text-white outline-none focus:border-accent transition-colors text-base appearance-none"

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
        placeholder="Business Name"
        required
        className={inputClass}
      />
      <select
        value={form.revenue}
        onChange={(e) => setForm(f => ({ ...f, revenue: e.target.value }))}
        required
        className={selectClass}
        style={{ color: form.revenue ? 'white' : '#6b7280' }}
      >
        <option value="" disabled>Annual Revenue</option>
        <option value="under-500k">Under $500K</option>
        <option value="500k-1m">$500K - $1M</option>
        <option value="1m-5m">$1M - $5M</option>
        <option value="5m-10m">$5M - $10M</option>
        <option value="10m+">$10M+</option>
      </select>
      <input
        type="text"
        value={form.industry}
        onChange={(e) => setForm(f => ({ ...f, industry: e.target.value }))}
        placeholder="Industry"
        required
        className={inputClass}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3.5 text-base font-semibold text-black bg-accent hover:bg-accent-hover disabled:opacity-50 rounded-xl transition-all cursor-pointer border-none flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Submit for Review
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  )
}

function InvestorForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const leads = JSON.parse(localStorage.getItem('vyro_leads') || '[]')
      leads.push({ email, type: 'investor_interest', timestamp: new Date().toISOString() })
      localStorage.setItem('vyro_leads', JSON.stringify(leads))
    } catch { /* silent */ }
    await new Promise(r => setTimeout(r, 600))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
        <Check size={20} />
        <span className="font-medium">You're on the list. Deal flow incoming.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="w-full sm:flex-1 px-5 py-3.5 rounded-xl bg-bg-card border border-border text-white placeholder-text-muted outline-none focus:border-accent transition-colors text-base"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-black bg-accent hover:bg-accent-hover disabled:opacity-50 rounded-xl transition-all cursor-pointer border-none flex items-center justify-center gap-2 whitespace-nowrap"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Get Investor Access
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  )
}

/* ========== PAGE ========== */

export default function Vyro() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* ---- HERO ---- */}
      <section className="relative pt-40 pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[180px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-8">
              <Building2 size={16} />
              <span>AI-Powered Acquisitions</span>
            </div>

            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-[-0.04em] leading-none mb-8">
              <span className="gradient-text">Vyro</span>
              <span className="text-white"> Ventures</span>
            </h1>

            <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white mb-6 max-w-4xl mx-auto leading-tight">
              We buy businesses. AI&#179; makes them unstoppable.
            </p>

            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-4 leading-relaxed font-semibold tracking-wide">
              Acquire. Optimize. Scale. Exit.
            </p>
          </motion.div>

          <motion.div
            {...stagger}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <a
              href="#submit"
              className="px-8 py-4 text-base font-semibold text-black bg-accent hover:bg-accent-hover rounded-full transition-all no-underline flex items-center gap-2"
            >
              Submit Your Business
              <ArrowRight size={18} />
            </a>
            <a
              href="#investor"
              className="px-8 py-4 text-base font-semibold text-white bg-bg-card border border-border hover:border-accent/40 rounded-full transition-all no-underline flex items-center gap-2"
            >
              <Briefcase size={18} />
              Investor Access
            </a>
          </motion.div>

          <motion.div
            {...stagger}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-border text-sm text-text-secondary hover:text-white hover:border-border-bright transition-all no-underline"
            >
              <span className="gradient-text font-bold">AI&#179;</span>
              <span>Powered by AI&#179;</span>
              <ChevronRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---- THE MODEL: 5 STAGES ---- */}
      <section className="py-28 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">The Model</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Five stages. One outcome:<br />
              <span className="gradient-text">exponential value.</span>
            </h2>
          </motion.div>

          {/* Stage flow */}
          <div className="grid sm:grid-cols-5 gap-4">
            {stages.map((stage, i) => {
              const Icon = stage.icon
              return (
                <motion.div
                  key={stage.title}
                  {...stagger}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="relative bg-bg-card border border-border rounded-2xl p-6 text-center hover:border-accent/30 transition-all group"
                >
                  <span className="text-5xl font-black text-white/[0.04] absolute top-3 right-4">{stage.step}</span>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="text-accent" size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{stage.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{stage.description}</p>

                  {/* Arrow connector (hidden on last item and mobile) */}
                  {i < stages.length - 1 && (
                    <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-accent/40">
                      <ArrowRight size={18} />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---- HYPEROPTIMIZATION ---- */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">HyperOptimization</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              What happens when AI&#179;<br />enters a business.
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Three layers of intelligence working in concert. Human operators. AI models. Autonomous agents.
              The result: a company that runs like it has 10x the team.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {hyperOptItems.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  {...stagger}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="p-8 rounded-2xl border border-border bg-bg-card hover:border-accent/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="text-accent" size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>

          {/* A+A+A Stack breakdown -- card format matching Thesis section */}
          <motion.div {...fadeUp} className="mt-12 max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Brain, label: 'Actual Intelligence', desc: 'Human operators with domain expertise evaluate and run businesses.' },
                { icon: Cpu, label: 'Artificial Intelligence', desc: 'AI models analyze operations, find inefficiencies, predict growth.' },
                { icon: Sparkles, label: 'Agentic Intelligence', desc: 'Move agent fleets automate marketing, sales, fulfillment, support.' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    {...stagger}
                    transition={{ duration: 0.5, delay: 0.15 * i }}
                    className="p-6 rounded-2xl border border-accent/20 bg-bg-card overflow-hidden relative"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent/0" />
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="text-accent" size={20} />
                    </div>
                    <p className="text-accent font-bold text-sm uppercase tracking-wide mb-2 text-center">{item.label}</p>
                    <p className="text-text-secondary text-sm leading-relaxed text-center">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- FOR BUSINESS OWNERS ---- */}
      <section className="py-28 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">For Business Owners</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Your business, transformed.<br />
              Or your exit, maximized.
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Two paths. One result: AI&#179; does the heavy lifting.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Path 1: Sell */}
            <motion.div
              {...stagger}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative p-8 rounded-2xl border border-accent/20 bg-bg-card overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/0" />
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <DollarSign className="text-accent" size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sell to Vyro</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Ready to move on? We acquire your business at fair value, then deploy AI&#179; to scale it far beyond what was possible under traditional operations. You get a clean exit. We get a platform for growth.
              </p>
              <ul className="space-y-2">
                {['Fair acquisition price', 'Clean, fast closing process', 'Your legacy preserved and amplified'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-text-secondary text-sm">
                    <Check size={14} className="text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Path 2: Optimize */}
            <motion.div
              {...stagger}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="relative p-8 rounded-2xl border border-border bg-bg-card overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/60 to-blue-500/0" />
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <TrendingUp className="text-blue-400" size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hire Vyro to Optimize</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Not ready to sell? We'll implement HyperOptimization across your operation. You keep full ownership. AI&#179; agents run the day-to-day while you focus on strategy.
              </p>
              <ul className="space-y-2">
                {['Full ownership retained', 'AI³ agents deployed to your business', '3-10x growth without proportional headcount'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-text-secondary text-sm">
                    <Check size={14} className="text-blue-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---- FOR INVESTORS ---- */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">For Investors</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Co-invest in AI-optimized<br />acquisitions.
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              The thesis is simple: buy $1M businesses, inject AI&#179;, sell at $5-10M.
              We turn operational inefficiency into exponential upside.
            </p>
          </motion.div>

          <motion.div {...stagger} transition={{ duration: 0.5, delay: 0.15 }} className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: Building2, title: 'Source & Acquire', desc: 'We find undervalued businesses with strong fundamentals.' },
                { icon: Bot, title: 'Deploy AI³', desc: 'Full-stack optimization. Marketing, sales, ops, intelligence.' },
                { icon: TrendingUp, title: 'Exit at Premium', desc: 'Sell at 5-10x or hold for cash flow. The math works.' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    {...stagger}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="p-6 rounded-2xl border border-border bg-bg-card text-center"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="text-accent" size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>

            <Link
              to="/invest"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-black bg-gradient-to-r from-gradient-start to-gradient-end hover:opacity-90 rounded-full transition-all no-underline glow"
            >
              Full Investor Details
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---- THE NUMBERS ---- */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...stagger}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-black gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-text-secondary font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA FORMS ---- */}
      <section id="submit" className="py-28 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Let's talk.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Business Submission */}
            <motion.div
              {...stagger}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl border border-border bg-bg-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Building2 className="text-accent" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Submit Your Business for Review</h3>
                  <p className="text-text-secondary text-sm">For owners exploring a sale or optimization.</p>
                </div>
              </div>
              <BusinessSubmitForm />
            </motion.div>

            {/* Investor Interest */}
            <motion.div
              id="investor"
              {...stagger}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-8 rounded-2xl border border-accent/20 bg-gradient-to-b from-accent/5 to-bg-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Users className="text-accent" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Investor Interest</h3>
                  <p className="text-text-secondary text-sm">Get deal flow and co-investment opportunities.</p>
                </div>
              </div>
              <InvestorForm />
            </motion.div>
          </div>

          {/* Powered by badge */}
          <motion.div {...stagger} transition={{ duration: 0.6, delay: 0.35 }} className="mt-12 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bg-card border border-border text-sm text-text-secondary hover:text-white hover:border-border-bright transition-all no-underline"
            >
              <span className="gradient-text font-bold">AI&#179;</span>
              <span>Powered by AI&#179;</span>
              <ChevronRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
