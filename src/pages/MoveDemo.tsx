import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Play,
  RotateCcw,
  Zap,
  ArrowRight,
  Check,
  Loader2,
  Video,
  Search,
  Users,
  UserPlus,
  FileText,
  Mail,
  Calendar,
  Bot,
  ChevronRight,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Types ─── */
type DemoState = 'idle' | 'running' | 'complete'

interface AgentStep {
  agent: string
  initials: string
  role: string
  color: string // tailwind bg
  textColor: string
  status: 'pending' | 'thinking' | 'working' | 'done'
  message: string
  duration: number // ms before completing
}

interface Scenario {
  id: string
  icon: typeof Video
  label: string
  description: string
  command: string
  steps: AgentStep[]
  output: {
    headline: string
    stats: { label: string; value: string }[]
    nextActions: string[]
  }
}

/* ─── Scenario Data ─── */
const scenarios: Scenario[] = [
  {
    id: 'content-engine',
    icon: Video,
    label: 'Content Engine',
    description: 'Turn raw videos into 30 days of social content',
    command: 'Turn my raw videos into 30 days of social content',
    steps: [
      {
        agent: 'Sage',
        initials: 'SG',
        role: 'Researcher',
        color: 'bg-cyan-500/20',
        textColor: 'text-cyan-400',
        status: 'pending',
        message:
          'Analyzing 8 raw videos... extracting topics, key quotes, and engagement hooks. Found 14 unique topics across fitness, mindset, and nutrition.',
        duration: 2000,
      },
      {
        agent: 'Rex',
        initials: 'RX',
        role: 'Video Editor',
        color: 'bg-orange-500/20',
        textColor: 'text-orange-400',
        status: 'pending',
        message:
          'Generating clip timestamps from source footage. Identified 12 high-energy segments. Creating 15s, 30s, and 60s cuts for each platform format.',
        duration: 2000,
      },
      {
        agent: 'Aria',
        initials: 'AR',
        role: 'Social Media Agent',
        color: 'bg-pink-500/20',
        textColor: 'text-pink-400',
        status: 'pending',
        message:
          'Drafting posts for Instagram, TikTok, LinkedIn, and X. Adapting tone for each platform. Adding hashtags, hooks, and CTAs. Scheduling across 30 days.',
        duration: 2000,
      },
    ],
    output: {
      headline: 'Content engine is live.',
      stats: [
        { label: 'Clips Ready', value: '12' },
        { label: 'Posts Scheduled', value: '30' },
        { label: 'Calendar Days', value: '30' },
        { label: 'Platforms', value: '4' },
      ],
      nextActions: [
        'Review content calendar',
        'Approve first week of posts',
        'Add brand assets to templates',
      ],
    },
  },
  {
    id: 'lead-blitz',
    icon: Search,
    label: 'Lead Blitz',
    description: 'Find and contact 50 potential clients in your niche',
    command: 'Find and contact 50 potential clients in my niche',
    steps: [
      {
        agent: 'Nova',
        initials: 'NV',
        role: 'Growth Agent',
        color: 'bg-violet-500/20',
        textColor: 'text-violet-400',
        status: 'pending',
        message:
          'Researching prospects in your niche... cross-referencing LinkedIn, industry directories, and recent funding data. Building profile for 50 high-fit leads.',
        duration: 2000,
      },
      {
        agent: 'Nova',
        initials: 'NV',
        role: 'Growth Agent',
        color: 'bg-violet-500/20',
        textColor: 'text-violet-400',
        status: 'pending',
        message:
          'Drafting personalized outreach for each prospect. Referencing their recent posts, company milestones, and mutual connections. Tone: warm, direct, value-first.',
        duration: 2000,
      },
      {
        agent: 'Nova',
        initials: 'NV',
        role: 'Growth Agent',
        color: 'bg-violet-500/20',
        textColor: 'text-violet-400',
        status: 'pending',
        message:
          'Sending first batch of 20 emails. Scheduling follow-ups for non-responders at day 3 and day 7. Monitoring open rates and replies in real time.',
        duration: 2000,
      },
    ],
    output: {
      headline: 'Outreach campaign deployed.',
      stats: [
        { label: 'Prospects Contacted', value: '50' },
        { label: 'Emails Opened', value: '12' },
        { label: 'Replies', value: '3' },
        { label: 'Follow-ups Queued', value: '38' },
      ],
      nextActions: [
        'Review 3 warm replies',
        'Adjust messaging for batch 2',
        'Schedule discovery calls',
      ],
    },
  },
  {
    id: 'client-onboarding',
    icon: UserPlus,
    label: 'Client Onboarding',
    description: "Onboard a new client end-to-end",
    command: "Onboard my new client Sarah's Bakery",
    steps: [
      {
        agent: 'Sage',
        initials: 'SG',
        role: 'Support',
        color: 'bg-green-500/20',
        textColor: 'text-green-400',
        status: 'pending',
        message:
          "Creating client workspace for Sarah's Bakery. Setting up shared drive, communication channel, and project dashboard. Sending welcome credentials.",
        duration: 1000,
      },
      {
        agent: 'Rex',
        initials: 'RX',
        role: 'Fulfillment',
        color: 'bg-orange-500/20',
        textColor: 'text-orange-400',
        status: 'pending',
        message:
          'Setting up deliverable timeline based on service package. 12 deliverables over 90 days. Milestones at day 7, 30, 60, and 90. Dependencies mapped.',
        duration: 2000,
      },
      {
        agent: 'Kai',
        initials: 'KI',
        role: 'Chief Intelligence',
        color: 'bg-accent/20',
        textColor: 'text-accent',
        status: 'pending',
        message:
          "Analyzing Sarah's Bakery profile and assigning optimal agent team. Aria for content, Nova for growth, Rex for fulfillment, Sage for support. Configuring agent context with client brand voice.",
        duration: 1000,
      },
      {
        agent: 'Aria',
        initials: 'AR',
        role: 'Content',
        color: 'bg-pink-500/20',
        textColor: 'text-pink-400',
        status: 'pending',
        message:
          "Drafting 5-email welcome sequence for Sarah's Bakery. Email 1: Welcome + what to expect. Email 2: Brand questionnaire. Email 3: Content calendar preview. Email 4: First deliverable teaser. Email 5: Check-in.",
        duration: 2000,
      },
    ],
    output: {
      headline: 'Client fully onboarded.',
      stats: [
        { label: 'Agents Assigned', value: '5' },
        { label: 'Workspace Ready', value: 'Yes' },
        { label: 'Deliverables Planned', value: '12' },
        { label: 'First Deliverable', value: '24hrs' },
      ],
      nextActions: [
        'Send welcome email to Sarah',
        'Review deliverable timeline',
        'Schedule kickoff call',
      ],
    },
  },
]

/* ─── Streaming text hook ─── */
function useStreamText(text: string, isActive: boolean, speed = 20) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isActive) {
      setDisplayed('')
      setDone(false)
      return
    }

    let index = 0
    setDisplayed('')
    setDone(false)

    intervalRef.current = setInterval(() => {
      const nextSpace = text.indexOf(' ', index)
      const end = nextSpace === -1 ? text.length : nextSpace + 1
      setDisplayed(text.slice(0, end))
      index = end

      if (index >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDone(true)
      }
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, isActive, speed])

  return { displayed, done }
}

/* ─── Agent Step Card ─── */
function AgentStepCard({
  step,
  index,
  isStreaming,
}: {
  step: AgentStep
  index: number
  isStreaming: boolean
}) {
  const { displayed, done } = useStreamText(step.message, isStreaming, 16)

  const statusIcon = () => {
    if (step.status === 'done' || done)
      return <Check size={12} className="text-green-400" />
    if (step.status === 'thinking')
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 size={12} className="text-accent" />
        </motion.div>
      )
    if (step.status === 'working' || isStreaming)
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 size={12} className="text-accent" />
        </motion.div>
      )
    return <div className="w-3 h-3 rounded-full bg-border" />
  }

  const statusLabel = () => {
    if (step.status === 'done' || done) return 'Complete'
    if (isStreaming) return 'Working...'
    if (step.status === 'thinking') return 'Thinking...'
    if (step.status === 'working') return 'Working...'
    return 'Queued'
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-bg-card border border-border rounded-xl p-4 hover:border-border-bright transition-all"
    >
      {/* Agent header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-lg ${step.color} flex items-center justify-center`}
          >
            <span className={`text-xs font-bold ${step.textColor}`}>
              {step.initials}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{step.agent}</p>
            <p className="text-[11px] text-text-muted">{step.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {statusIcon()}
          <span
            className={`text-[11px] font-medium ${
              step.status === 'done' || done
                ? 'text-green-400'
                : isStreaming
                  ? 'text-accent'
                  : 'text-text-muted'
            }`}
          >
            {statusLabel()}
          </span>
        </div>
      </div>

      {/* Message */}
      <div className="min-h-[48px]">
        <p className="text-xs text-text-secondary leading-relaxed">
          {isStreaming || step.status === 'done' || done
            ? displayed || step.message
            : ''}
          {isStreaming && !done && (
            <span className="inline-block w-[2px] h-3 bg-accent ml-0.5 animate-pulse align-text-bottom" />
          )}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Progress Bar ─── */
function ProgressBar({
  totalSteps,
  completedSteps,
  isRunning,
}: {
  totalSteps: number
  completedSteps: number
  isRunning: boolean
}) {
  const pct = totalSteps === 0 ? 0 : (completedSteps / totalSteps) * 100

  return (
    <div className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-gradient-start to-gradient-end rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {isRunning && completedSteps < totalSteps && (
        <motion.div
          className="h-full bg-accent/30 rounded-full -mt-1.5"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: `${pct + 100 / totalSteps}%` }}
        />
      )}
    </div>
  )
}

/* ─── Main Move Demo ─── */
export default function MoveDemo() {
  const [selectedId, setSelectedId] = useState<string>(scenarios[0].id)
  const [demoState, setDemoState] = useState<DemoState>('idle')
  const [activeStepIndex, setActiveStepIndex] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [streamingIndex, setStreamingIndex] = useState(-1)
  const outputRef = useRef<HTMLDivElement>(null)
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([])

  const scenario = scenarios.find((s) => s.id === selectedId)!

  const clearTimers = () => {
    timerRefs.current.forEach(clearTimeout)
    timerRefs.current = []
  }

  const runDemo = useCallback(() => {
    if (demoState === 'running') return
    clearTimers()
    setDemoState('running')
    setActiveStepIndex(0)
    setCompletedSteps([])
    setStreamingIndex(0)

    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)

    // Walk through steps sequentially
    let cumulativeDelay = 0
    scenario.steps.forEach((step, i) => {
      // Start streaming this step
      const startTimer = setTimeout(() => {
        setActiveStepIndex(i)
        setStreamingIndex(i)
      }, cumulativeDelay)
      timerRefs.current.push(startTimer)

      cumulativeDelay += step.duration

      // Complete this step
      const doneTimer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, i])
        setStreamingIndex(-1)
      }, cumulativeDelay)
      timerRefs.current.push(doneTimer)

      // Small gap before next step
      cumulativeDelay += 400
    })

    // Mark complete
    const finalTimer = setTimeout(() => {
      setDemoState('complete')
      setStreamingIndex(-1)
    }, cumulativeDelay + 200)
    timerRefs.current.push(finalTimer)
  }, [demoState, scenario])

  const reset = useCallback(() => {
    clearTimers()
    setDemoState('idle')
    setActiveStepIndex(-1)
    setCompletedSteps([])
    setStreamingIndex(-1)
  }, [])

  // Reset when switching scenarios
  useEffect(() => {
    reset()
  }, [selectedId, reset])

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-grid">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-gradient-start/8 to-gradient-end/8 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-bright bg-bg-card/50 text-text-muted text-sm mb-6">
              <Zap size={14} className="text-accent" />
              Move Demo
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.05] mb-5"
          >
            One command.
            <br />
            <span className="gradient-text">An army of agents executes.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Move is your agent command center. Give it a task and watch
            specialized AI agents coordinate, delegate, and deliver --
            all in real time.
          </motion.p>
        </div>
      </section>

      {/* Demo Workspace */}
      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Scenario Picker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-text-muted mb-4">
              Choose a mission
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`group relative flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    selectedId === s.id
                      ? 'bg-accent/10 border-accent/40 ring-1 ring-accent/20'
                      : 'bg-bg-card border-border hover:border-border-bright hover:bg-bg-card-hover'
                  }`}
                >
                  <s.icon
                    size={20}
                    className={
                      selectedId === s.id
                        ? 'text-accent mt-0.5 shrink-0'
                        : 'text-text-muted mt-0.5 shrink-0'
                    }
                  />
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        selectedId === s.id
                          ? 'text-white'
                          : 'text-text-secondary'
                      }`}
                    >
                      {s.label}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {s.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Command Center Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Progress bar */}
            <div className="mb-6">
              <ProgressBar
                totalSteps={scenario.steps.length}
                completedSteps={completedSteps.length}
                isRunning={demoState === 'running'}
              />
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Left panel: Command input */}
              <div className="lg:col-span-2">
                <div className="bg-bg-card border border-border rounded-2xl overflow-hidden sticky top-28">
                  <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                    <Bot size={14} className="text-accent" />
                    <p className="text-sm font-semibold text-text-secondary">
                      Command
                    </p>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-5">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-accent">
                          You
                        </span>
                      </div>
                      <p className="text-sm text-white leading-relaxed">
                        "{scenario.command}"
                      </p>
                    </div>

                    {demoState === 'idle' && (
                      <p className="text-xs text-text-muted mb-5">
                        {scenario.steps.length} agents will execute this task
                        in sequence.
                      </p>
                    )}

                    {/* Agent roster */}
                    <div className="mb-5">
                      <p className="text-[11px] uppercase tracking-widest text-text-muted font-semibold mb-2.5">
                        Agent Team
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {/* Deduplicate agents */}
                        {[
                          ...new Map(
                            scenario.steps.map((s) => [s.agent, s])
                          ).values(),
                        ].map((step) => (
                          <div
                            key={step.agent}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-elevated border border-border text-xs"
                          >
                            <div
                              className={`w-4 h-4 rounded ${step.color} flex items-center justify-center`}
                            >
                              <span
                                className={`text-[8px] font-bold ${step.textColor}`}
                              >
                                {step.initials}
                              </span>
                            </div>
                            <span className="text-text-secondary">
                              {step.agent}
                            </span>
                            <span className="text-text-muted">
                              {step.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Run / Reset */}
                    <div className="flex gap-2">
                      {demoState !== 'idle' && (
                        <button
                          onClick={reset}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-text-secondary hover:text-white bg-transparent border border-border hover:border-border-bright rounded-full transition-all cursor-pointer"
                        >
                          <RotateCcw size={14} />
                          Reset
                        </button>
                      )}
                      <button
                        onClick={runDemo}
                        disabled={demoState === 'running'}
                        className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full transition-all cursor-pointer border-none flex-1 justify-center ${
                          demoState === 'running'
                            ? 'bg-accent/30 text-white/40 cursor-not-allowed'
                            : 'bg-accent hover:bg-accent-hover text-black shadow-lg shadow-accent/20'
                        }`}
                      >
                        {demoState === 'running' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Agents working...
                          </>
                        ) : demoState === 'complete' ? (
                          <>
                            <Play size={16} />
                            Run Again
                          </>
                        ) : (
                          <>
                            <Play size={16} />
                            Deploy Agents
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right panel: Activity feed */}
              <div className="lg:col-span-3" ref={outputRef}>
                <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          demoState === 'running'
                            ? 'bg-accent animate-pulse'
                            : demoState === 'complete'
                              ? 'bg-green-400'
                              : 'bg-text-muted'
                        }`}
                      />
                      <p className="text-sm font-semibold text-text-secondary">
                        {demoState === 'running'
                          ? 'Agent Activity'
                          : demoState === 'complete'
                            ? 'Mission Complete'
                            : 'Agent Activity'}
                      </p>
                    </div>
                    {demoState !== 'idle' && (
                      <span className="text-xs text-text-muted">
                        {completedSteps.length}/{scenario.steps.length} steps
                      </span>
                    )}
                  </div>

                  <div className="p-4 min-h-[400px]">
                    <AnimatePresence mode="wait">
                      {demoState === 'idle' && (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center justify-center h-[400px] gap-4"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center">
                            <Zap
                              size={24}
                              className="text-text-muted"
                            />
                          </div>
                          <p className="text-sm text-text-muted text-center max-w-xs">
                            Click "Deploy Agents" to watch {scenario.steps.length}{' '}
                            agents execute this task in real time.
                          </p>
                        </motion.div>
                      )}

                      {(demoState === 'running' ||
                        demoState === 'complete') && (
                        <motion.div
                          key="active"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-3"
                        >
                          {scenario.steps.map((step, i) => {
                            if (i > activeStepIndex && demoState === 'running')
                              return null

                            const isComplete = completedSteps.includes(i)
                            const isCurrentlyStreaming = streamingIndex === i

                            const modifiedStep: AgentStep = {
                              ...step,
                              status: isComplete
                                ? 'done'
                                : isCurrentlyStreaming
                                  ? 'working'
                                  : demoState === 'complete'
                                    ? 'done'
                                    : 'pending',
                            }

                            return (
                              <AgentStepCard
                                key={`${step.agent}-${i}`}
                                step={modifiedStep}
                                index={i}
                                isStreaming={
                                  isCurrentlyStreaming ||
                                  (demoState === 'complete' && !isComplete)
                                }
                              />
                            )
                          })}

                          {/* Output card */}
                          <AnimatePresence>
                            {demoState === 'complete' && (
                              <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mt-4 bg-accent/5 border border-accent/20 rounded-xl p-5"
                              >
                                <div className="flex items-center gap-2 mb-4">
                                  <Check
                                    size={16}
                                    className="text-accent"
                                  />
                                  <p className="text-sm font-bold text-white">
                                    {scenario.output.headline}
                                  </p>
                                </div>

                                {/* Stats grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                                  {scenario.output.stats.map((stat) => (
                                    <div
                                      key={stat.label}
                                      className="bg-bg-card/50 rounded-lg p-3 text-center"
                                    >
                                      <p className="text-lg font-black text-accent">
                                        {stat.value}
                                      </p>
                                      <p className="text-[11px] text-text-muted">
                                        {stat.label}
                                      </p>
                                    </div>
                                  ))}
                                </div>

                                {/* Next actions */}
                                <p className="text-[11px] uppercase tracking-widest text-text-muted font-semibold mb-2">
                                  Suggested Next Steps
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {scenario.output.nextActions.map(
                                    (action) => (
                                      <button
                                        key={action}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-accent bg-accent/10 hover:bg-accent/20 rounded-full border border-accent/20 transition-colors cursor-pointer"
                                      >
                                        <ChevronRight size={10} />
                                        {action}
                                      </button>
                                    )
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <AnimatePresence>
            {demoState === 'complete' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-16 text-center"
              >
                <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-bg-card border border-border">
                  <p className="text-lg font-bold text-white">
                    That just took 6 seconds. Manually, it takes 6 hours.
                  </p>
                  <p className="text-sm text-text-secondary max-w-md">
                    Move coordinates specialized AI agents to execute complex
                    tasks -- content creation, lead generation, client
                    onboarding, and more -- all from a single command.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <Link
                      to="/#waitlist"
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-black bg-accent hover:bg-accent-hover rounded-full transition-all no-underline"
                    >
                      Get Early Access
                      <ArrowRight size={16} />
                    </Link>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-text-secondary hover:text-white border border-border hover:border-border-bright bg-transparent rounded-full transition-all cursor-pointer"
                    >
                      <ChevronRight size={16} />
                      Try Another Mission
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  )
}
