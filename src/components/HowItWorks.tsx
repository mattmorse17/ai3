import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Brain,
  Cpu,
  Bot,
  ArrowRight,
  MessageSquare,
  Mic,
  Link,
  FileText,
  Users,
  Mail,
  Calendar,
  CheckCircle,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const inputs = [
  { icon: Mic, label: 'Voice memo' },
  { icon: MessageSquare, label: 'Text' },
  { icon: Link, label: 'Link' },
  { icon: FileText, label: 'Content' },
]

const layers = [
  {
    icon: Brain,
    label: 'Actual Intelligence',
    description: 'Your expertise shapes the context',
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-500/5',
    border: 'border-blue-500/20',
    glow: 'shadow-[0_0_40px_rgba(59,130,246,0.15)]',
    dot: 'bg-blue-400',
  },
  {
    icon: Cpu,
    label: 'Artificial Intelligence',
    description: 'Models analyze, personalize, and adapt',
    gradient: 'from-purple-500 to-violet-500',
    bg: 'bg-purple-500/5',
    border: 'border-purple-500/20',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.15)]',
    dot: 'bg-purple-400',
  },
  {
    icon: Bot,
    label: 'Agentic Intelligence',
    description: 'Agents execute and deliver',
    gradient: 'from-violet-500 to-pink-500',
    bg: 'bg-violet-500/5',
    border: 'border-violet-500/20',
    glow: 'shadow-[0_0_40px_rgba(168,85,247,0.15)]',
    dot: 'bg-pink-400',
  },
]

const outputs = [
  { icon: Users, label: 'Personalized for rookie (en espanol)', color: 'text-blue-400' },
  { icon: Users, label: 'Personalized for veteran', color: 'text-purple-400' },
  { icon: Calendar, label: 'Follow-up scheduled', color: 'text-violet-400' },
  { icon: CheckCircle, label: 'Training plan generated', color: 'text-pink-400' },
]

/* ------------------------------------------------------------------ */
/*  Animated particle dot                                              */
/* ------------------------------------------------------------------ */

function Particle({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className={`absolute w-1.5 h-1.5 rounded-full ${color}`}
      initial={{ opacity: 0, x: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, 20, 40, 60],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
        ease: 'easeInOut',
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Connecting line with animated dots (horizontal)                    */
/* ------------------------------------------------------------------ */

function ConnectorH({ delay = 0, color = 'bg-text-muted' }: { delay?: number; color?: string }) {
  return (
    <div className="hidden lg:flex items-center justify-center relative w-16 shrink-0">
      {/* Static line */}
      <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-border-bright" />
      {/* Animated dot traveling along the line */}
      <motion.div
        className={`absolute w-2 h-2 rounded-full ${color}`}
        style={{ top: '50%', translateY: '-50%' }}
        initial={{ left: '0%', opacity: 0 }}
        animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.5,
          delay,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Connecting line with animated dots (vertical, mobile)              */
/* ------------------------------------------------------------------ */

function ConnectorV({ delay = 0, color = 'bg-text-muted' }: { delay?: number; color?: string }) {
  return (
    <div className="flex lg:hidden items-center justify-center relative h-10 w-px mx-auto">
      <div className="absolute inset-x-1/2 top-0 bottom-0 w-px bg-border-bright" />
      <motion.div
        className={`absolute w-2 h-2 rounded-full ${color}`}
        style={{ left: '50%', translateX: '-50%' }}
        initial={{ top: '0%', opacity: 0 }}
        animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.2,
          delay,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="relative py-32 px-6 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            How It Works
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-tight mb-6">
            One input.
            <br />
            <span className="text-text-muted">Infinite personalized outputs.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Drop in a voice memo, text, or any content. AI&sup3; runs it through three
            layers of intelligence and delivers personalized results to every
            audience&nbsp;&mdash;&nbsp;automatically.
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/*  FLOW DIAGRAM                                                 */}
        {/* ============================================================ */}

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-0 lg:gap-0">
          {/* ---------------------------------------------------------- */}
          {/*  INPUT COLUMN                                               */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 w-full lg:w-52"
          >
            <div className="rounded-2xl border border-border bg-bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted mb-4">
                Input
              </p>
              <div className="space-y-2.5">
                {inputs.map((inp, i) => (
                  <motion.div
                    key={inp.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-bg-elevated border border-border-bright"
                  >
                    <inp.icon size={14} className="text-accent shrink-0" />
                    <span className="text-sm text-text-secondary">{inp.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Example label */}
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-text-muted italic leading-relaxed">
                  "Weekly team update from coach"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Connector: input -> processing */}
          <ConnectorH delay={0.5} color="bg-blue-400" />
          <ConnectorV delay={0.5} color="bg-blue-400" />

          {/* ---------------------------------------------------------- */}
          {/*  PROCESSING COLUMN (three layers)                           */}
          {/* ---------------------------------------------------------- */}
          <div className="flex-1 w-full lg:max-w-none">
            <div className="space-y-3 lg:space-y-3">
              {layers.map((layer, i) => (
                <div key={layer.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                    className="relative"
                  >
                    {/* Glow pulse when "active" */}
                    <motion.div
                      className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${layer.gradient} opacity-0 blur-xl`}
                      animate={
                        isInView
                          ? {
                              opacity: [0, 0.12, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2.5,
                        delay: 1.2 + i * 0.8,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: 'easeInOut',
                      }}
                    />

                    <div
                      className={`relative rounded-2xl border ${layer.border} ${layer.bg} p-5 flex items-center gap-4`}
                    >
                      {/* Icon */}
                      <div
                        className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${layer.gradient} flex items-center justify-center`}
                      >
                        <layer.icon size={20} className="text-white" />
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold leading-tight">{layer.label}</h4>
                        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                          {layer.description}
                        </p>
                      </div>

                      {/* Traveling particles (desktop) */}
                      <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2">
                        <Particle delay={1.5 + i * 0.8} color={layer.dot} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Vertical connector between layers */}
                  {i < layers.length - 1 && (
                    <div className="flex justify-center">
                      <div className="relative h-3 w-px">
                        <div className="absolute inset-0 bg-border-bright" />
                        <motion.div
                          className={`absolute w-1 h-1 rounded-full ${layers[i + 1].dot}`}
                          style={{ left: '50%', translateX: '-50%' }}
                          initial={{ top: '0%', opacity: 0 }}
                          animate={
                            isInView
                              ? { top: ['0%', '100%'], opacity: [0, 1, 1, 0] }
                              : {}
                          }
                          transition={{
                            duration: 0.8,
                            delay: 1.5 + i * 0.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: 'easeInOut',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connector: processing -> output */}
          <ConnectorH delay={2} color="bg-pink-400" />
          <ConnectorV delay={2} color="bg-pink-400" />

          {/* ---------------------------------------------------------- */}
          {/*  OUTPUT COLUMN                                              */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex-shrink-0 w-full lg:w-64"
          >
            <div className="rounded-2xl border border-border bg-bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted mb-4">
                Outputs
              </p>
              <div className="space-y-2.5">
                {outputs.map((out, i) => (
                  <motion.div
                    key={out.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 1.6 + i * 0.15 }}
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-bg-elevated border border-border-bright"
                  >
                    <out.icon size={14} className={`${out.color} shrink-0 mt-0.5`} />
                    <span className="text-sm text-text-secondary leading-snug">{out.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
                <Mail size={12} className="text-accent" />
                <p className="text-xs text-text-muted">
                  All delivered automatically
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/*  BOTTOM TAGLINE                                               */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-bg-card border border-border">
            <ArrowRight size={14} className="text-accent" />
            <span className="text-sm text-text-secondary">
              One voice memo in&nbsp;&mdash;&nbsp;four personalized deliverables out.{' '}
              <span className="text-white font-medium">In minutes, not days.</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
