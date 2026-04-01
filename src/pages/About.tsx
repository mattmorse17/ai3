import { motion } from 'framer-motion'
import { ArrowRight, Brain, Sparkles, HeadphonesIcon, CheckCircle, PenTool, BarChart3, GraduationCap, Trophy, Calendar, Palette, Server, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const agents = [
  {
    initials: 'KI',
    name: 'Kai',
    role: 'Chief Intelligence Officer',
    description:
      'Orchestrates the entire AI\u00B3 ecosystem. Routes tasks, makes decisions, and ensures every agent operates at peak performance.',
    gradient: 'from-blue-500 to-cyan-400',
    icon: Brain,
  },
  {
    initials: 'NV',
    name: 'Nova',
    role: 'Head of Growth',
    description:
      'Identifies opportunities, qualifies prospects, and builds relationships at scale. Never sleeps, never misses a follow-up.',
    gradient: 'from-violet-500 to-pink-400',
    icon: Sparkles,
  },
  {
    initials: 'SG',
    name: 'Sage',
    role: 'Head of Support',
    description:
      'Resolves issues, answers questions, and ensures every client feels heard. 94% of tickets handled autonomously.',
    gradient: 'from-emerald-500 to-teal-400',
    icon: HeadphonesIcon,
  },
  {
    initials: 'RX',
    name: 'Rex',
    role: 'Head of Fulfillment',
    description:
      'Executes deliverables, manages timelines, and ensures nothing falls through the cracks.',
    gradient: 'from-orange-500 to-amber-400',
    icon: CheckCircle,
  },
  {
    initials: 'AR',
    name: 'Aria',
    role: 'Head of Content',
    description:
      'Transforms ideas into compelling content across every platform. Writes, edits, and publishes with your voice.',
    gradient: 'from-pink-500 to-rose-400',
    icon: PenTool,
  },
  {
    initials: 'AT',
    name: 'Atlas',
    role: 'Head of Strategy',
    description:
      'Analyzes markets, tracks competitors, and surfaces insights that drive decisions.',
    gradient: 'from-indigo-500 to-blue-400',
    icon: BarChart3,
  },
  {
    initials: 'LN',
    name: 'Luna',
    role: 'Education Specialist',
    description:
      'Personalizes curriculum delivery, adapts lessons for every learning style, and automates classroom administration.',
    gradient: 'from-sky-500 to-blue-400',
    icon: GraduationCap,
  },
  {
    initials: 'OR',
    name: 'Orion',
    role: 'Sports Intelligence',
    description:
      'Analyzes film, automates recruiting pipelines, and personalizes player development communication.',
    gradient: 'from-amber-500 to-yellow-400',
    icon: Trophy,
  },
  {
    initials: 'EC',
    name: 'Echo',
    role: 'Event Coordinator',
    description:
      'Plans, promotes, and executes events end-to-end. From invitations to follow-up, nothing falls through.',
    gradient: 'from-teal-500 to-emerald-400',
    icon: Calendar,
  },
  {
    initials: 'PX',
    name: 'Phoenix',
    role: 'Brand Voice Architect',
    description:
      'Captures and preserves your authentic voice across every channel, ensuring consistency at any scale.',
    gradient: 'from-red-500 to-orange-400',
    icon: Palette,
  },
  {
    initials: 'TN',
    name: 'Titan',
    role: 'Infrastructure & DevOps',
    description:
      'Manages servers, deployments, and system health. Keeps the engine running so you never think about it.',
    gradient: 'from-slate-500 to-zinc-400',
    icon: Server,
  },
  {
    initials: 'IR',
    name: 'Iris',
    role: 'Data & Analytics',
    description:
      'Transforms raw data into actionable insights. Dashboards, reports, and trend analysis delivered automatically.',
    gradient: 'from-fuchsia-500 to-purple-400',
    icon: Eye,
  },
]

const founderStats = [
  '10+ years in AI-powered business',
  '50+ organizations served',
  'Built from real revenue, not VC hype',
]

export default function About() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-gradient-start/10 to-gradient-end/10 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95] mb-6"
          >
            Built by Human Intelligence.
            <br />
            Enhanced by Artificial Intelligence.
            <br />
            <span className="gradient-text">Run by Agentic Intelligence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            AI&#179; is what happens when a decade of real-world business building meets the most
            powerful AI orchestration layer ever created.
          </motion.p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-4">The Founder</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border border-border rounded-2xl p-8 sm:p-12"
          >
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center">
                  <span className="text-2xl font-black text-white">MM</span>
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1">
                <h3 className="text-2xl font-black mb-1">Matt Morse</h3>
                <p className="text-accent font-semibold mb-4">Founder & CEO</p>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Matt Morse has spent the past decade building, growing, optimizing, and scaling businesses across dozens of industries. From startups to established brands, the pattern was always the same: the bottleneck was never the strategy — it was the execution. AI&#179; is the system that removes that bottleneck forever. By fusing human expertise with AI models and autonomous agents, AI&#179; makes it possible for any individual or organization to operate at a level that was previously impossible.
                </p>
                <p className="text-white/80 italic border-l-2 border-accent pl-4 mb-8">
                  "AI should amplify human intelligence, not replace it."
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-3">
                  {founderStats.map((stat) => (
                    <span
                      key={stat}
                      className="px-4 py-2 text-sm text-text-secondary bg-bg-elevated border border-border rounded-full"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agent Team */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-4">
              The AI&#179; Agent Team
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Twelve specialized agents working in concert. Always on, always learning.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-bg-card border border-border rounded-2xl p-8 hover:border-border-bright transition-all group"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${agent.gradient} flex items-center justify-center shrink-0`}
                  >
                    <span className="text-sm font-black text-white">{agent.initials}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{agent.name}</h3>
                    <p className="text-sm text-text-muted">{agent.role}</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{agent.description}</p>
                <div className="mt-5 pt-4 border-t border-border">
                  <agent.icon
                    size={18}
                    className="text-text-muted group-hover:text-accent transition-colors"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Thesis */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-8">Our Thesis</h2>
            <p className="text-xl sm:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
              Most AI companies are building smarter models. We're building the layer that makes{' '}
              <span className="text-white font-semibold">all of them useful.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-12 grid sm:grid-cols-3 gap-4"
          >
            {[
              { name: 'Actual Intelligence', desc: 'Your irreplaceable human expertise, intuition, and voice. The signal that everything else amplifies.' },
              { name: 'Artificial Intelligence', desc: 'Context-aware AI that understands your domain deeply enough to personalize at scale.' },
              { name: 'Agentic Intelligence', desc: 'Autonomous operators that execute your playbook 24/7 without losing quality or context.' },
            ].map((pillar, i) => (
              <div
                key={pillar.name}
                className="bg-bg-card border border-border rounded-2xl p-6"
              >
                <span className="text-4xl font-black text-white/[0.04] block mb-2">A{i + 1}</span>
                <span className="text-lg font-bold gradient-text block mb-2">{pillar.name}</span>
                <p className="text-sm text-text-secondary leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-6">
              Want to join us?
            </h2>
            <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
              Whether you want to invest in the intelligence layer or be first in line when it
              launches. There's a seat for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/invest"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-semibold text-black bg-accent hover:bg-accent-hover rounded-full transition-all no-underline"
              >
                Invest in AI&#179;
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/#waitlist"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-semibold text-white border border-border hover:border-border-bright rounded-full transition-all no-underline"
              >
                Request an Invite
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
