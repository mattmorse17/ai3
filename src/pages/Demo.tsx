import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  MessageSquare,
  Church,
  Megaphone,
  Briefcase,
  Play,
  RotateCcw,
  Sparkles,
  Globe,
  Calendar,
  BookOpen,
  Send,
  UserCheck,
  Bell,
  ChevronRight,
  ArrowRight,
  Loader2,
  Check,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Types ─── */
type DemoState = 'idle' | 'processing' | 'streaming' | 'complete'

interface AudienceMember {
  name: string
  description: string
  color: string // tailwind bg class
  textColor: string
  language?: string
  personalizedMessage: string
  actions: { icon: typeof Send; label: string }[]
}

interface DemoScenario {
  id: string
  icon: typeof MessageSquare
  label: string
  category: string
  originalMessage: string
  audience: AudienceMember[]
}

/* ─── Scenario Data ─── */
const scenarios: DemoScenario[] = [
  {
    id: 'coaching',
    icon: MessageSquare,
    label: 'Coaching Message',
    category: 'Sports',
    originalMessage:
      "Team — we're focusing on front-hip mechanics this week. I need everyone locking in that front side before the arm ever fires. This is the #1 thing separating you from the next level. Film review tomorrow at 9am. Be ready.",
    audience: [
      {
        name: 'Carlos Mendes',
        description: '18-year-old Dominican draft pick, A-ball',
        color: 'bg-cyan-500/20',
        textColor: 'text-cyan-400',
        language: 'Spanish',
        personalizedMessage:
          'Carlos — esta semana nos estamos enfocando en la mecanica de la cadera frontal. Para ti, esto es enorme. Tu brazo ya tiene la velocidad — si fijamos tu lado frontal, vas a ver 2-3 mph mas de velocidad sin esfuerzo extra. Te envie un video de Pedro Martinez haciendo exactamente esto. Revision de video manana a las 9am. Trae tus preguntas, hermano.',
        actions: [
          { icon: BookOpen, label: 'Send Spanish drill video' },
          { icon: Calendar, label: 'Schedule 1-on-1 bullpen' },
          { icon: UserCheck, label: 'Notify interpreter' },
        ],
      },
      {
        name: 'Jake Morrison',
        description: '34-year-old veteran reliever, 8 MLB seasons',
        color: 'bg-orange-500/20',
        textColor: 'text-orange-400',
        personalizedMessage:
          "Jake — front-hip mechanics week. I know you've been working this for years, so I want to use you as the example. Your film from Tuesday's outing was textbook through the 4th inning, then I saw the front side leak open in the 5th. Let's look at that specific sequence together. Film review tomorrow 9am — I'll have your side-by-side clips ready.",
        actions: [
          { icon: Send, label: 'Send film comparison clips' },
          { icon: Calendar, label: 'Block recovery day Thursday' },
          { icon: Bell, label: 'Flag for pitching coordinator' },
        ],
      },
    ],
  },
  {
    id: 'sermon',
    icon: Church,
    label: 'Sunday Sermon',
    category: 'Ministry',
    originalMessage:
      "This Sunday's message is about hope when life doesn't make sense. Romans 8:28. God is working even when we can't see it. I want everyone to walk out knowing that their pain has a purpose and they are not alone.",
    audience: [
      {
        name: 'David Kim',
        description: 'New believer, baptized 3 weeks ago',
        color: 'bg-green-500/20',
        textColor: 'text-green-400',
        personalizedMessage:
          "David — this Sunday's message is going to be really important for you. We're talking about Romans 8:28 and how God works even when life doesn't make sense. As someone new to faith, I want you to know: it's okay to have questions. That's actually what this passage is about. I've attached a short devotional that breaks down Romans 8 in everyday language. Welcome to the family.",
        actions: [
          { icon: BookOpen, label: 'Send new believer devotional' },
          { icon: UserCheck, label: 'Connect with small group leader' },
          { icon: Calendar, label: 'Invite to newcomer lunch' },
        ],
      },
      {
        name: 'Maria Gonzalez',
        description: 'Grieving parent, lost son 4 months ago',
        color: 'bg-purple-500/20',
        textColor: 'text-purple-400',
        language: 'Bilingual',
        personalizedMessage:
          "Maria — I want you to know I'm thinking of you as I prepare Sunday's message. We're in Romans 8:28, and I know that verse can feel impossible when you're carrying what you carry. I'm not going to pretend it's simple. But I want you to hear something specific Sunday morning. A seat is saved for you. And if you need to step out, that's okay too. Grace upon grace.",
        actions: [
          { icon: Send, label: 'Send grief support resources' },
          { icon: Calendar, label: 'Schedule pastoral visit' },
          { icon: Bell, label: 'Alert care team' },
        ],
      },
      {
        name: 'Tyler Jackson',
        description: '16-year-old, skeptical about church, comes with grandma',
        color: 'bg-amber-500/20',
        textColor: 'text-amber-400',
        personalizedMessage:
          "Tyler — real talk: Sunday's message is about whether any of this actually matters when life doesn't go the way you planned. Romans 8:28 basically says God's working behind the scenes. I know that sounds like a cliche. But here's the thing — this passage was written by a guy who went to prison for what he believed. It wasn't theory for him. Think about that. See you Sunday.",
        actions: [
          { icon: BookOpen, label: 'Send youth-focused content' },
          { icon: UserCheck, label: 'Connect with youth pastor' },
          { icon: Calendar, label: 'Invite to Wednesday night youth' },
        ],
      },
    ],
  },
  {
    id: 'creator',
    icon: Megaphone,
    label: 'Creator Newsletter',
    category: 'Creator Economy',
    originalMessage:
      "Big announcement: I'm launching a live cohort on building a personal brand in 2026. 6 weeks. Small group. Hands-on. This is everything I've learned growing to 400K followers in 2 years. Applications open Monday.",
    audience: [
      {
        name: 'Ashley Chen',
        description: 'New follower, discovered you last week, 200 followers',
        color: 'bg-pink-500/20',
        textColor: 'text-pink-400',
        personalizedMessage:
          "Hey Ashley — welcome! You're new here, so let me give you some context: I grew from 0 to 400K followers in 2 years, and I'm about to teach the entire playbook in a 6-week live cohort. This is perfect for someone at your stage. No fluff, no theory — just the exact steps. Before you apply, I put together a free starter guide so you can see if my style clicks with you. Link below. Applications open Monday.",
        actions: [
          { icon: Send, label: 'Send free starter guide' },
          { icon: Bell, label: 'Add to launch reminder list' },
          { icon: UserCheck, label: 'Tag as warm lead' },
        ],
      },
      {
        name: 'Marcus Williams',
        description: 'Superfan, engaged with every post for 18 months, 12K followers',
        color: 'bg-blue-500/20',
        textColor: 'text-blue-400',
        personalizedMessage:
          "Marcus — you already know this has been coming. You've been one of the most engaged people in this community for over a year, and I've watched you grow to 12K. This cohort is the next level. I'm giving you early access before it goes public Monday. I also want your feedback on the curriculum — you know this stuff better than most. Check your DMs.",
        actions: [
          { icon: Send, label: 'Send early access link' },
          { icon: Calendar, label: 'Schedule feedback call' },
          { icon: UserCheck, label: 'Add to VIP list' },
        ],
      },
      {
        name: 'Rachel Torres',
        description: 'Brand partnership manager at Nike, has been watching for 6 months',
        color: 'bg-emerald-500/20',
        textColor: 'text-emerald-400',
        personalizedMessage:
          "Rachel — I wanted to share something exciting: I'm launching a 6-week personal branding cohort. This means 50+ emerging creators are about to level up their content and audience — many of them in the fitness and lifestyle space. I'd love to explore how Nike could be part of this, whether that's a sponsored module, product placement, or alumni partnership. Let's talk this week.",
        actions: [
          { icon: Send, label: 'Send partnership deck' },
          { icon: Calendar, label: 'Schedule brand meeting' },
          { icon: Briefcase, label: 'Create deal pipeline entry' },
        ],
      },
    ],
  },
  {
    id: 'ceo',
    icon: Briefcase,
    label: 'CEO Update',
    category: 'Business',
    originalMessage:
      "Q1 recap: Revenue hit $2.1M (up 40% YoY). We shipped the v3 platform, onboarded 12 enterprise clients, and grew the team to 28. Cash runway is 18 months. We're raising a Series A this quarter. More details in the all-hands Friday.",
    audience: [
      {
        name: 'Engineering Team',
        description: '14 engineers across platform and infra',
        color: 'bg-violet-500/20',
        textColor: 'text-violet-400',
        personalizedMessage:
          "Team — Q1 was massive, and it's because of what you shipped. The v3 platform is live, stable, and already powering 12 enterprise accounts. That's your work. A few things for you specifically: (1) We're raising Series A this quarter, which means we can finally hire those 4 senior roles you've been asking for. (2) Infra budget is unlocked — talk to your leads about what you need. (3) Friday all-hands will have a deep-dive on the v4 roadmap. Bring your wishlists.",
        actions: [
          { icon: Send, label: 'Share v4 roadmap draft' },
          { icon: Calendar, label: 'Schedule eng all-hands' },
          { icon: Bell, label: 'Open senior role applications' },
        ],
      },
      {
        name: 'Investor Group',
        description: 'Seed investors + advisors, 8 individuals',
        color: 'bg-yellow-500/20',
        textColor: 'text-yellow-400',
        personalizedMessage:
          "Investors — Q1 closed strong. $2.1M revenue, 40% YoY growth. 12 new enterprise clients on v3. Team at 28. 18 months runway. Here's what matters for you: we're opening Series A conversations this quarter. Current metrics put us in a strong position. I'll be sending the full data room by EOW. If you'd like to participate in or refer for the round, let me know this week. Board deck attached.",
        actions: [
          { icon: Send, label: 'Send data room access' },
          { icon: Calendar, label: 'Schedule investor update call' },
          { icon: Briefcase, label: 'Generate board deck' },
        ],
      },
      {
        name: 'Customer Advisory Board',
        description: '6 key enterprise customers',
        color: 'bg-teal-500/20',
        textColor: 'text-teal-400',
        personalizedMessage:
          "Advisory Board — wanted to share a milestone: we crossed $2.1M in Q1 revenue, and a big reason is the feedback you've given us. The v3 platform you helped shape is now live across 12 enterprise accounts. Coming in Q2: the features you prioritized in our last session are on the roadmap. I'd love 30 minutes with each of you to preview what's next before Friday's all-hands. Scheduling link below.",
        actions: [
          { icon: Calendar, label: 'Send scheduling link' },
          { icon: BookOpen, label: 'Share product roadmap preview' },
          { icon: UserCheck, label: 'Request case study participation' },
        ],
      },
    ],
  },
]

/* ─── Streaming Hook ─── */
function useStreamText(text: string, isActive: boolean, speed = 18) {
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
      // Reveal word-by-word for more natural feel
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

/* ─── PersonalizedCard Component ─── */
function PersonalizedCard({
  member,
  isStreaming,
  index,
  allDone,
}: {
  member: AudienceMember
  isStreaming: boolean
  index: number
  allDone: boolean
}) {
  const { displayed, done } = useStreamText(
    member.personalizedMessage,
    isStreaming,
    14 + index * 4 // stagger speed slightly per card
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-bright transition-all"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${member.color} flex items-center justify-center`}>
            <span className={`text-sm font-bold ${member.textColor}`}>
              {member.name
                .split(' ')
                .map((w) => w[0])
                .join('')}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{member.name}</p>
            <p className="text-xs text-text-muted">{member.description}</p>
          </div>
        </div>
        {member.language && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-elevated border border-border text-xs text-text-muted">
            <Globe size={11} />
            {member.language}
          </div>
        )}
      </div>

      {/* Message Body */}
      <div className="px-5 py-4 min-h-[120px]">
        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
          {isStreaming || allDone ? displayed || member.personalizedMessage : ''}
          {isStreaming && !done && (
            <span className="inline-block w-[2px] h-4 bg-accent ml-0.5 animate-pulse align-text-bottom" />
          )}
        </p>
      </div>

      {/* Actions */}
      <AnimatePresence>
        {(done || allDone) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
            className="px-5 pb-4"
          >
            <div className="pt-3 border-t border-border">
              <p className="text-[11px] uppercase tracking-widest text-text-muted font-semibold mb-2.5">
                Suggested Actions
              </p>
              <div className="flex flex-wrap gap-2">
                {member.actions.map((action) => (
                  <button
                    key={action.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-accent bg-accent/10 hover:bg-accent/20 rounded-full border border-accent/20 transition-colors cursor-pointer"
                  >
                    <action.icon size={12} />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Processing Animation ─── */
function ProcessingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center py-16 gap-5"
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center glow">
          <Sparkles size={28} className="text-white" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gradient-start to-gradient-end opacity-40"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="text-center">
        <p className="text-white font-semibold text-lg">Processing with Now</p>
        <p className="text-text-muted text-sm mt-1">
          Analyzing audience profiles and personalizing content...
        </p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-accent"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Main Demo Component ─── */
export default function Demo() {
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario | null>(null)
  const [customMessage, setCustomMessage] = useState('')
  const [demoState, setDemoState] = useState<DemoState>('idle')
  const [activeScenario, setActiveScenario] = useState<DemoScenario | null>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const runDemo = useCallback(
    (scenario: DemoScenario) => {
      if (demoState === 'processing' || demoState === 'streaming') return

      setActiveScenario(scenario)
      setDemoState('processing')

      // Simulate processing time
      setTimeout(() => {
        setDemoState('streaming')

        // Scroll to output area
        setTimeout(() => {
          outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 200)

        // Calculate when longest message finishes streaming
        const longestMsg = Math.max(...scenario.audience.map((a) => a.personalizedMessage.length))
        const estimatedTime = (longestMsg / 5) * 18 + scenario.audience.length * 150 + 1500
        setTimeout(() => setDemoState('complete'), estimatedTime)
      }, 2400)
    },
    [demoState]
  )

  const reset = useCallback(() => {
    setDemoState('idle')
    setActiveScenario(null)
    setSelectedScenario(null)
    setCustomMessage('')
  }, [])

  const handleScenarioClick = (scenario: DemoScenario) => {
    setSelectedScenario(scenario)
    setCustomMessage(scenario.originalMessage)
  }

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
              <Sparkles size={14} className="text-accent" />
              Interactive Demo
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.05] mb-5"
          >
            One message.
            <br />
            <span className="gradient-text">Every person hears it differently.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Now transforms a single message into personalized communication for every
            member of your audience — with context, language, and tone tailored to each individual.
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
              Choose a scenario
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioClick(scenario)}
                  className={`group relative flex flex-col items-start gap-2 p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    selectedScenario?.id === scenario.id
                      ? 'bg-accent/10 border-accent/40 ring-1 ring-accent/20'
                      : 'bg-bg-card border-border hover:border-border-bright hover:bg-bg-card-hover'
                  }`}
                >
                  <scenario.icon
                    size={20}
                    className={
                      selectedScenario?.id === scenario.id ? 'text-accent' : 'text-text-muted'
                    }
                  />
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        selectedScenario?.id === scenario.id ? 'text-white' : 'text-text-secondary'
                      }`}
                    >
                      {scenario.label}
                    </p>
                    <p className="text-xs text-text-muted">{scenario.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10"
          >
            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                <p className="text-sm font-semibold text-text-secondary">Original Message</p>
                {selectedScenario && (
                  <span className="text-xs text-text-muted px-2.5 py-1 rounded-full bg-bg-elevated border border-border">
                    {selectedScenario.label}
                  </span>
                )}
              </div>
              <textarea
                value={customMessage}
                onChange={(e) => {
                  setCustomMessage(e.target.value)
                  if (!selectedScenario && e.target.value) {
                    // If typing custom, select closest scenario for demo purposes
                    setSelectedScenario(scenarios[0])
                  }
                }}
                placeholder="Paste your message here, or select an example above..."
                className="w-full bg-transparent text-white text-sm leading-relaxed p-5 min-h-[120px] resize-none focus:outline-none placeholder:text-text-muted/50"
              />
              <div className="px-5 py-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {activeScenario && demoState !== 'idle' && (
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-text-secondary hover:text-white bg-transparent border border-border hover:border-border-bright rounded-full transition-all cursor-pointer"
                    >
                      <RotateCcw size={14} />
                      Reset
                    </button>
                  )}
                </div>
                <button
                  onClick={() => selectedScenario && runDemo(selectedScenario)}
                  disabled={!customMessage || demoState === 'processing' || demoState === 'streaming'}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full transition-all cursor-pointer border-none ${
                    !customMessage || demoState === 'processing' || demoState === 'streaming'
                      ? 'bg-accent/30 text-white/40 cursor-not-allowed'
                      : 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20'
                  }`}
                >
                  {demoState === 'processing' || demoState === 'streaming' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Personalizing...
                    </>
                  ) : demoState === 'complete' ? (
                    <>
                      <Play size={16} />
                      Run Again
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      Personalize for Audience
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Output Area */}
          <div ref={outputRef}>
            <AnimatePresence mode="wait">
              {demoState === 'idle' && selectedScenario && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <p className="text-text-muted text-sm mb-3">
                    This message will be personalized for {selectedScenario.audience.length} audience
                    members:
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {selectedScenario.audience.map((member) => (
                      <div
                        key={member.name}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-card border border-border text-sm"
                      >
                        <div
                          className={`w-5 h-5 rounded-full ${member.color} flex items-center justify-center`}
                        >
                          <span className={`text-[9px] font-bold ${member.textColor}`}>
                            {member.name
                              .split(' ')
                              .map((w) => w[0])
                              .join('')}
                          </span>
                        </div>
                        <span className="text-text-secondary text-xs">{member.name}</span>
                        {member.language && (
                          <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                            <Globe size={9} />
                            {member.language}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {demoState === 'processing' && (
                <motion.div key="processing">
                  <ProcessingAnimation />
                </motion.div>
              )}

              {(demoState === 'streaming' || demoState === 'complete') && activeScenario && (
                <motion.div
                  key="output"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Status Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      {demoState === 'streaming' ? (
                        <Loader2 size={14} className="text-accent animate-spin" />
                      ) : (
                        <Check size={14} className="text-green-400" />
                      )}
                      <p className="text-sm font-medium text-text-secondary">
                        {demoState === 'streaming'
                          ? `Personalizing for ${activeScenario.audience.length} audience members...`
                          : `Personalized for ${activeScenario.audience.length} audience members`}
                      </p>
                    </div>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      Try another
                    </button>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {activeScenario.audience.map((member, i) =>
                      activeScenario.audience.length === 2 ? (
                        <div key={member.name} className={i === 0 ? 'md:col-span-1' : 'md:col-span-1'}>
                          <PersonalizedCard
                            member={member}
                            isStreaming={demoState === 'streaming'}
                            index={i}
                            allDone={demoState === 'complete'}
                          />
                        </div>
                      ) : (
                        <PersonalizedCard
                          key={member.name}
                          member={member}
                          isStreaming={demoState === 'streaming'}
                          index={i}
                          allDone={demoState === 'complete'}
                        />
                      )
                    )}
                  </div>

                  {/* Bottom CTA after complete */}
                  <AnimatePresence>
                    {demoState === 'complete' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-12 text-center"
                      >
                        <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-bg-card border border-border">
                          <p className="text-lg font-bold text-white">
                            Imagine this for your entire audience.
                          </p>
                          <p className="text-sm text-text-secondary max-w-md">
                            Now handles hundreds of thousands of personalized messages — live or async —
                            with context that gets smarter over time.
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
                              Try Another Scenario
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
