import { motion } from 'framer-motion'
import { Brain, Cpu, Bot, ArrowRight, Zap } from 'lucide-react'

const pillars = [
  {
    icon: Brain,
    label: 'Actual Intelligence',
    tagline: 'The Human Edge',
    description: 'Your expertise. Your intuition. Your relationships. The 10,000 hours that make a coach a great coach, a pastor a great pastor, a creator a great creator, a teacher a great teacher. No model can replicate what you know. AI³ doesn\'t try to. It amplifies your actual Intelligence.',
    examples: [
      'A coach\'s philosophy becomes the DNA of every agent in their system',
      'A teacher\'s curriculum adapts to every student\'s learning style',
      'A creator\'s voice stays authentic across 50x more content',
      'Every email you send to your list becomes personalized for each subscriber',
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/5',
    borderColor: 'border-blue-500/20',
  },
  {
    icon: Cpu,
    label: 'Artificial Intelligence',
    tagline: 'The Capability Layer',
    description: 'Language models. Vision systems. Reasoning engines. The world\'s most powerful AI models are commodities. Everyone has access to the same ones. Think of them as calculators for words and ideas. You wouldn\'t solve a complex math problem by hand when you have a calculator. AI³ orchestrates the right model for the right task at the right time. Automatically.',
    examples: [
      'AI³ doesn\'t build models. We build the orchestration layer',
      'Optimized to automatically choose between Claude, GPT, Gemini, Grok, and more',
      'The right model for the right task at the right time. Automatically.',
    ],
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/5',
    borderColor: 'border-purple-500/20',
  },
  {
    icon: Bot,
    label: 'Agentic Intelligence',
    tagline: 'The Execution Engine',
    description: 'Not chatbots. Operators. Named agents with specific roles that work for you 24 hours a day, 7 days a week. They execute, learn, and improve with every interaction. Whether you need agents managing your marketing, personalizing your classroom, coordinating your events, or running your entire operation.',
    examples: [
      'A fleet of agents that knows you as well as your best team member',
      'Always on, always working, always improving. However you customize them.',
      'Every student gets personalized learning. Every audience member gets a unique experience.',
    ],
    color: 'from-violet-500 to-pink-500',
    bgColor: 'bg-violet-500/5',
    borderColor: 'border-violet-500/20',
  },
]

export default function Thesis() {
  return (
    <section id="intelligence" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">The Intelligence</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-tight mb-6">
            AI models alone don't
            <br />
            <span className="text-text-muted">create real change.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Everyone has access to the same AI. So why aren't more people getting results from it?
            Because there's a massive gap between "AI exists" and "AI is working for me 24/7 to
            improve my life, my business, my relationships, and my impact." That gap is a communication
            and orchestration problem. AI³ closes it by fusing three distinct intelligences into one system.
          </p>
        </motion.div>

        {/* The equation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 sm:gap-5 py-12 mb-16"
        >
          <span className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Actual</span>
          <span className="text-2xl sm:text-4xl font-black text-text-muted">+</span>
          <span className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">Artificial</span>
          <span className="text-2xl sm:text-4xl font-black text-text-muted">+</span>
          <span className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">Agentic</span>
          <span className="text-2xl sm:text-4xl font-black text-text-muted">=</span>
          <span className="text-2xl sm:text-4xl font-black gradient-text">AI³</span>
        </motion.div>

        {/* Deep dive cards */}
        <div className="space-y-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative ${p.bgColor} border ${p.borderColor} rounded-3xl p-8 sm:p-12 overflow-hidden`}
            >
              <div className="relative grid md:grid-cols-[1fr,1.2fr] gap-8 items-start">
                {/* Left: concept */}
                <div>
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} mb-6`}>
                    <p.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-1">{p.label}</h3>
                  <p className={`text-lg font-medium bg-gradient-to-r ${p.color} bg-clip-text text-transparent mb-4`}>
                    {p.tagline}
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Right: examples */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted mb-4">What this looks like</p>
                  {p.examples.map((ex) => (
                    <div key={ex} className="flex items-start gap-3 bg-black/20 rounded-xl p-4">
                      <ArrowRight size={16} className="text-accent mt-0.5 shrink-0" />
                      <span className="text-text-secondary text-[15px] leading-relaxed">{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The fusion statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <Zap size={18} className="text-accent" />
            <span className="text-sm font-medium text-accent">The Fusion Effect</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
            Any one intelligence alone is limited.
            <br />
            <span className="text-text-muted">All three together are unstoppable.</span>
          </h3>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed mb-4">
            Humans alone can't scale. AI alone hallucinates and lacks context. Agents alone are
            directionless. But fuse all three — your expertise, the world's best AI, and tireless
            autonomous execution — and you get something that didn't exist before.
          </p>
          <p className="text-lg font-semibold text-white">
            A system that thinks like you, works like a machine, and never stops.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
