import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Home,
  Sun,
  Shield,
  Zap,
  Bot,
  TreePine,
  TrendingUp,
  Wifi,
  Battery,
  ArrowRight,
  Check,
  Lock,
  Users,
  Brain,
  Cpu,
  Sparkles,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── animation helpers ─── */
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7 },
}

const stagger = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

/* ─── data ─── */
const features = [
  {
    icon: Wifi,
    title: 'Smart Home',
    bullets: [
      'Zoned HVAC with air quality sensors',
      'Smart lighting scenes: Morning / Work / Entertain / Night / Away',
      'Smart door locks & motion detection',
      'Package smart lockers at every home',
    ],
  },
  {
    icon: Sun,
    title: 'Outdoor Living',
    bullets: [
      'Covered patio with retractable screens',
      'Grilling island & outdoor kitchen',
      'Optional hot tub, pool, or firepit',
      'Designed for year-round enjoyment',
    ],
  },
  {
    icon: Bot,
    title: 'Robot-Ready',
    bullets: [
      'Optimus-class charging stations in every home',
      'Designated task zones for household robots',
      'Maintenance automation infrastructure',
      'Future-proofed wiring & connectivity',
    ],
  },
  {
    icon: Battery,
    title: 'Energy',
    bullets: [
      'EV charger at every home',
      'Solar panel + battery storage optional',
      'Smart energy management & load balancing',
      'Net-zero capable architecture',
    ],
  },
  {
    icon: Shield,
    title: 'Security',
    bullets: [
      'Gated community access',
      'Perimeter detection & smart cameras',
      'Smart lock integration with AI\u00B3 platform',
      'Real-time alerts & visitor management',
    ],
  },
  {
    icon: TreePine,
    title: 'Community',
    bullets: [
      'Private trails & green spaces',
      'Consistent luxury aesthetic across all lots',
      'Instagram / TikTok-friendly architecture',
      'Built for connected, intentional living',
    ],
  },
]

const stats = [
  { value: 'Custom', label: 'Designs' },
  { value: 'Smart', label: 'Everything' },
  { value: 'Robot', label: 'Built' },
  { value: 'AI\u00B3', label: 'Powered' },
]

const intelligences = [
  {
    icon: Brain,
    label: 'Actual Intelligence',
    color: 'from-amber-400 to-orange-500',
    description:
      'Master architects and luxury interior designers handcraft every home. Human taste, real craftsmanship, world-class finishes.',
  },
  {
    icon: Cpu,
    label: 'Artificial Intelligence',
    color: 'from-cyan-400 to-blue-500',
    description:
      'Smart home AI that learns your patterns -- lighting, climate, security, energy -- and adapts every room to your life.',
  },
  {
    icon: Sparkles,
    label: 'Agentic Intelligence',
    color: 'from-accent to-green-400',
    description:
      'Autonomous maintenance scheduling, community-wide security orchestration, and robotics integration that runs without you lifting a finger.',
  },
]

/* ─── component ─── */
export default function Village() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const leads = JSON.parse(localStorage.getItem('village_leads') || '[]')
      leads.push({ email, timestamp: new Date().toISOString() })
      localStorage.setItem('village_leads', JSON.stringify(leads))
    } catch {
      // silent
    }
    await new Promise((r) => setTimeout(r, 600))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* ━━━ HERO ━━━ */}
      <section className="relative pt-36 pb-28 px-6 overflow-hidden">
        {/* bg glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-accent/8 via-gradient-end/6 to-transparent blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-6xl sm:text-7xl lg:text-[6.5rem] font-black tracking-[-0.05em] leading-[0.9] mb-6"
          >
            The Village
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto mb-4 leading-relaxed font-medium"
          >
            Communities of smart barndominiums designed for the future of living.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto mb-6"
          >
            Built using innovative robotics-driven construction methods that do more with less.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto mb-12"
          >
            Smart everything. Robot-ready.{' '}
            <Link to="/" className="text-accent hover:underline no-underline font-semibold">
              Powered by AI&#179;
            </Link>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#reserve"
              className="px-8 py-4 text-base font-bold text-black bg-accent hover:bg-accent-hover rounded-full transition-all no-underline flex items-center gap-2"
            >
              Reserve Your Lot
              <ArrowRight size={18} />
            </a>
            <Link
              to="/invest"
              className="px-8 py-4 text-base font-semibold text-white border border-border hover:border-accent/40 rounded-full transition-all no-underline"
            >
              Investor Information
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ━━━ VISION ━━━ */}
      <section className="relative py-28 px-6 bg-grid">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            {...fadeUp}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-6"
          >
            The Vision
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[0.95] mb-8"
          >
            You're not buying a home.
            <br />
            <span className="gradient-text">You're buying into the future of living.</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            The Village is a connected living environment where your home thinks, adapts, and
            maintains itself. Every unit is orchestrated by the{' '}
            <Link to="/" className="text-accent hover:underline no-underline font-semibold">
              AI&#179; intelligence layer
            </Link>{' '}
            -- smart home automation, predictive maintenance, community coordination, and
            infrastructure ready for the humanoid robots arriving by 2027.
          </motion.p>
        </div>
      </section>

      {/* ━━━ FEATURES GRID ━━━ */}
      <section className="relative py-28 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              What You Get
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight">
              Every home. <span className="gradient-text">Every detail.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-8 rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-300"
              >
                {/* subtle glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                    <f.icon size={22} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                  <ul className="space-y-2.5">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
                        <Check size={14} className="text-accent mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ THE NUMBERS ━━━ */}
      <section className="relative py-24 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-transparent pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              The Standard
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em]">
              Built for value. <span className="gradient-text">Designed for growth.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-bg-card border border-border"
              >
                <div className="text-4xl sm:text-5xl font-black gradient-text mb-2">{s.value}</div>
                <div className="text-sm text-text-muted font-medium uppercase tracking-wider">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ AI3 INTEGRATION ━━━ */}
      <section className="relative py-28 px-6 bg-grid">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-6 no-underline"
            >
              <Zap size={14} className="text-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Powered by AI&#179;
              </span>
            </Link>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Three intelligences.{' '}
              <span className="gradient-text">One living environment.</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              The Village runs on the same AI&#179; platform powering businesses across the country
              -- but applied to where you live.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {intelligences.map((item, i) => (
              <motion.div
                key={item.label}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative p-8 rounded-2xl bg-bg-card border border-border overflow-hidden"
              >
                {/* top gradient accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}
                />
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-3">{item.label}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ROBOTICS-DRIVEN CONSTRUCTION ━━━ */}
      <section className="relative py-28 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-6">
              <Bot size={14} className="text-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Built Different
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-6">
              Robotics-driven construction.{' '}
              <span className="gradient-text">Do more with less.</span>
            </h2>

            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-6 leading-relaxed">
              The Village leverages innovative robotics-driven construction methods to build smarter, faster,
              and more efficiently. Precision engineering meets AI-optimized design -- delivering luxury-quality
              barndominiums at a fraction of traditional construction timelines and waste.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ━━━ FOR INVESTORS ━━━ */}
      <section className="relative py-28 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-6">
              <TrendingUp size={14} className="text-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                For Investors
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-6">
              Own a piece of the{' '}
              <span className="gradient-text">future of housing.</span>
            </h2>

            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-6 leading-relaxed">
              Real estate meets AI meets robotics. The Village is the physical proof of what happens
              when the AI&#179; intelligence layer is applied to modern living -- appreciating
              assets built with next-generation technology.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              {[
                { icon: Home, text: 'Premium real estate with built-in tech moat' },
                { icon: Cpu, text: 'AI infrastructure that increases property value' },
                { icon: Bot, text: 'First-mover advantage in robot-ready housing' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...stagger}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="p-5 rounded-xl bg-bg-card border border-border text-left"
                >
                  <item.icon size={18} className="text-accent mb-2" />
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <Link
              to="/invest"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-black bg-accent hover:bg-accent-hover rounded-full transition-all no-underline"
            >
              Learn About Investing
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ━━━ CTA / RESERVE ━━━ */}
      <section id="reserve" className="relative py-32 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/[0.03] to-transparent pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Join the Waitlist
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
              Reserve your spot.
              <br />
              <span className="gradient-text">The future of living starts here.</span>
            </h2>
            <p className="text-lg text-text-secondary mb-10">
              Request an invite to be the first to choose your lot, customize your home, and move
              into the future.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                <Check size={20} />
                <span className="font-medium">
                  You're on the list. We'll reach out with details soon.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
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
                      Reserve
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
