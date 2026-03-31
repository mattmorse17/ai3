import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Brain, Cpu, Bot, Sparkles, ChevronRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Types ─────────────────────────────────────────────────── */

interface QuizOption {
  label: string
  tags?: Record<string, number> // intelligence weights
  avatar?: string
}

interface QuizQuestion {
  id: number
  question: string
  options: QuizOption[]
}

type Intelligence = 'actual' | 'artificial' | 'agentic'

interface ProfileResult {
  strongest: Intelligence
  weakest: Intelligence
  product: string
  avatarSlug: string
  avatarLabel: string
  scores: Record<Intelligence, number>
}

/* ─── Quiz Data ─────────────────────────────────────────────── */

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What best describes your role?',
    options: [
      { label: 'I lead a faith community (church/ministry)', avatar: 'church' },
      { label: 'I coach athletes or teams', avatar: 'sports' },
      { label: 'I train minds (mental performance, consulting)', avatar: 'performance' },
      { label: 'I create content and build audiences', avatar: 'influencer' },
      { label: 'I run a business or agency', avatar: 'business' },
      { label: 'I have too many ideas and not enough execution', avatar: 'creator' },
    ],
  },
  {
    id: 2,
    question: "What's your biggest bottleneck right now?",
    options: [
      { label: "My message isn't landing personally with everyone", tags: { actual: 3, artificial: 1, agentic: 0 } },
      { label: "I can't scale my methodology without losing quality", tags: { actual: 1, artificial: 3, agentic: 1 } },
      { label: "I'm drowning in operational tasks", tags: { actual: 0, artificial: 1, agentic: 3 } },
      { label: 'I have the strategy but not the execution bandwidth', tags: { actual: 1, artificial: 0, agentic: 3 } },
      { label: 'I need to reach more people with less effort', tags: { actual: 2, artificial: 2, agentic: 1 } },
    ],
  },
  {
    id: 3,
    question: 'How many people are you trying to reach or serve?',
    options: [
      { label: 'Under 100', tags: { actual: 2, artificial: 0, agentic: 0 } },
      { label: '100 - 1,000', tags: { actual: 2, artificial: 1, agentic: 1 } },
      { label: '1,000 - 10,000', tags: { actual: 1, artificial: 2, agentic: 2 } },
      { label: '10,000 - 100,000', tags: { actual: 1, artificial: 3, agentic: 2 } },
      { label: '100,000+', tags: { actual: 0, artificial: 3, agentic: 3 } },
    ],
  },
  {
    id: 4,
    question: 'Which statement resonates most?',
    options: [
      { label: '"If only everyone could hear this the way I mean it"', tags: { actual: 4, artificial: 0, agentic: 0 } },
      { label: '"The AI tools I\'ve tried feel generic and miss context"', tags: { actual: 0, artificial: 4, agentic: 0 } },
      { label: '"I know what needs to happen, I just can\'t do it all"', tags: { actual: 0, artificial: 0, agentic: 4 } },
      { label: '"All of the above"', tags: { actual: 2, artificial: 2, agentic: 2 } },
    ],
  },
  {
    id: 5,
    question: 'What would change everything for you?',
    options: [
      { label: 'Every person receiving a personalized version of my message', tags: { actual: 4, artificial: 1, agentic: 0 } },
      { label: 'An AI that actually understands my specific domain', tags: { actual: 0, artificial: 4, agentic: 1 } },
      { label: 'A team of operators that execute while I sleep', tags: { actual: 0, artificial: 1, agentic: 4 } },
      { label: 'All three working together', tags: { actual: 2, artificial: 2, agentic: 2 } },
    ],
  },
]

/* ─── Intelligence metadata ─────────────────────────────────── */

const intelligenceMeta: Record<Intelligence, { label: string; icon: typeof Brain; color: string; gradient: string; description: string }> = {
  actual: {
    label: 'Actual Intelligence',
    icon: Brain,
    color: 'text-blue-400',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Your irreplaceable human insight, methodology, and voice. The core that AI amplifies but never replaces.',
  },
  artificial: {
    label: 'Artificial Intelligence',
    icon: Cpu,
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-violet-500',
    description: 'Context-aware AI that understands your specific domain deeply enough to personalize at scale.',
  },
  agentic: {
    label: 'Agentic Intelligence',
    icon: Bot,
    color: 'text-pink-400',
    gradient: 'from-violet-500 to-pink-500',
    description: 'Autonomous operators that execute your playbook 24/7 without losing quality or context.',
  },
}

const avatarLabels: Record<string, string> = {
  church: 'Church Leader',
  sports: 'Sports Coach',
  performance: 'Performance Coach',
  influencer: 'Creator / Influencer',
  business: 'Business Owner',
  creator: 'Visionary Builder',
}

/* ─── Scoring Logic ─────────────────────────────────────────── */

function computeProfile(answers: (number | null)[]): ProfileResult {
  const scores: Record<Intelligence, number> = { actual: 0, artificial: 0, agentic: 0 }
  let avatarSlug = 'business'

  answers.forEach((answerIndex, qIndex) => {
    if (answerIndex === null) return
    const option = questions[qIndex].options[answerIndex]
    if (option.avatar) avatarSlug = option.avatar
    if (option.tags) {
      scores.actual += option.tags.actual ?? 0
      scores.artificial += option.tags.artificial ?? 0
      scores.agentic += option.tags.agentic ?? 0
    }
  })

  const entries = Object.entries(scores) as [Intelligence, number][]
  entries.sort((a, b) => b[1] - a[1])
  const strongest = entries[0][0]
  const weakest = entries[entries.length - 1][0]

  let product: string
  if (weakest === 'actual') product = 'Now'
  else if (weakest === 'artificial') product = 'Now'
  else if (weakest === 'agentic') product = 'Move'
  else product = 'Now + Move'

  // If all scores are roughly equal, recommend both
  const max = entries[0][1]
  const min = entries[entries.length - 1][1]
  if (max - min <= 2) product = 'Now + Move'

  return {
    strongest,
    weakest,
    product,
    avatarSlug,
    avatarLabel: avatarLabels[avatarSlug] || 'Visionary',
    scores,
  }
}

/* ─── Animated Progress Bar ─────────────────────────────────── */

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current) / total) * 100
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-text-muted font-medium tracking-wide">
          {current === total + 1 ? 'Complete' : `Question ${current} of ${total}`}
        </span>
        <span className="text-xs text-text-muted font-medium">{Math.round(pct)}%</span>
      </div>
      <div className="h-1 rounded-full bg-bg-card overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gradient-start to-gradient-end"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

/* ─── Score Bar (Result Screen) ─────────────────────────────── */

function ScoreBar({ intelligence, score, maxScore, delay }: { intelligence: Intelligence; score: number; maxScore: number; delay: number }) {
  const meta = intelligenceMeta[intelligence]
  const Icon = meta.icon
  const pct = maxScore > 0 ? Math.max((score / maxScore) * 100, 8) : 8

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex items-center gap-4"
    >
      <div className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
        <Icon size={18} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-semibold text-white truncate">{meta.label}</span>
          <span className="text-xs text-text-muted font-medium">{score} pts</span>
        </div>
        <div className="h-2.5 rounded-full bg-bg-card overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${meta.gradient}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Component ────────────────────────────────────────── */

export default function Assessment() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [showResult, setShowResult] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = back

  const question = questions[currentQ]
  const selectedAnswer = answers[currentQ]

  const selectAnswer = (index: number) => {
    const next = [...answers]
    next[currentQ] = index
    setAnswers(next)

    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setDirection(1)
        setCurrentQ(currentQ + 1)
      } else {
        setShowResult(true)
      }
    }, 350)
  }

  const goBack = () => {
    if (showResult) {
      setShowResult(false)
      return
    }
    if (currentQ > 0) {
      setDirection(-1)
      setCurrentQ(currentQ - 1)
    }
  }

  const profile = computeProfile(answers)
  const maxScore = Math.max(profile.scores.actual, profile.scores.artificial, profile.scores.agentic, 1)
  const weakMeta = intelligenceMeta[profile.weakest]
  const strongMeta = intelligenceMeta[profile.strongest]

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setEmailLoading(true)

    try {
      const leads = JSON.parse(localStorage.getItem('ai3_leads') || '[]')
      leads.push({
        email,
        timestamp: new Date().toISOString(),
        source: 'assessment',
        avatar: profile.avatarSlug,
        product: profile.product,
        strongest: profile.strongest,
        weakest: profile.weakest,
        scores: profile.scores,
      })
      localStorage.setItem('ai3_leads', JSON.stringify(leads))
    } catch {
      // silent
    }

    await new Promise(r => setTimeout(r, 600))
    setEmailSubmitted(true)
    setEmailLoading(false)
  }

  /* ─── Animation variants ─── */
  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0 }),
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col pt-24 pb-16 px-6">
        {/* Progress */}
        <div className="mb-12">
          <ProgressBar current={showResult ? questions.length + 1 : currentQ + 1} total={questions.length} />
        </div>

        <div className="flex-1 flex items-start justify-center">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              {!showResult ? (
                /* ─────────────── QUESTION SCREEN ─────────────── */
                <motion.div
                  key={`q-${currentQ}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="w-full"
                >
                  {/* Back button */}
                  {currentQ > 0 && (
                    <button
                      onClick={goBack}
                      className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-white transition-colors bg-transparent border-none cursor-pointer mb-8"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  )}

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4"
                  >
                    Question {currentQ + 1}
                  </motion.p>

                  <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] leading-tight mb-10">
                    {question.question}
                  </h2>

                  <div className="space-y-3">
                    {question.options.map((option, i) => {
                      const isSelected = selectedAnswer === i
                      return (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                          onClick={() => selectAnswer(i)}
                          className={`w-full text-left px-6 py-5 rounded-2xl border transition-all cursor-pointer group ${
                            isSelected
                              ? 'bg-accent/10 border-accent text-white'
                              : 'bg-bg-card border-border hover:border-border-bright hover:bg-bg-card-hover text-text-secondary hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[15px] font-medium leading-snug pr-4">{option.label}</span>
                            <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected ? 'border-accent bg-accent' : 'border-border-bright group-hover:border-text-muted'
                            }`}>
                              {isSelected && <Check size={12} className="text-white" />}
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              ) : (
                /* ─────────────── RESULT SCREEN ─────────────── */
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full"
                >
                  {/* Back to last question */}
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-white transition-colors bg-transparent border-none cursor-pointer mb-8"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-center mb-10"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-5">
                      <Sparkles size={14} />
                      Your AI³ Profile
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] leading-tight mb-3">
                      You're a{' '}
                      <span className="gradient-text">{profile.avatarLabel}</span>
                    </h2>
                    <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
                      Your organization has strong {strongMeta.label} but is missing{' '}
                      <span className={weakMeta.color + ' font-semibold'}>{weakMeta.label}</span>.
                    </p>
                  </motion.div>

                  {/* Result Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-bg-card border border-border rounded-3xl p-8 mb-8"
                  >
                    {/* Score Bars */}
                    <div className="space-y-5 mb-8">
                      <ScoreBar intelligence="actual" score={profile.scores.actual} maxScore={maxScore} delay={0.4} />
                      <ScoreBar intelligence="artificial" score={profile.scores.artificial} maxScore={maxScore} delay={0.55} />
                      <ScoreBar intelligence="agentic" score={profile.scores.agentic} maxScore={maxScore} delay={0.7} />
                    </div>

                    {/* Diagnosis */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      className="border-t border-border pt-6 space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${weakMeta.gradient} flex items-center justify-center mt-0.5`}>
                          <weakMeta.icon size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white mb-1">Your biggest gap: {weakMeta.label}</p>
                          <p className="text-sm text-text-secondary leading-relaxed">{weakMeta.description}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center mt-0.5">
                          <ArrowRight size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white mb-1">
                            Recommended: <span className="gradient-text">{profile.product}</span>
                          </p>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {profile.product === 'Now'
                              ? 'Now is the intelligence layer that encodes your expertise and personalizes delivery at scale.'
                              : profile.product === 'Move'
                              ? 'Move gives you a fleet of named AI operators that execute your playbook autonomously.'
                              : 'The full AI³ stack: Now for intelligence + Move for execution. Your entire operation, upgraded.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Email Capture */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className="bg-bg-card border border-border rounded-3xl p-8 mb-8"
                  >
                    {emailSubmitted ? (
                      <div className="text-center py-4">
                        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mb-4">
                          <Check size={18} />
                          <span className="font-medium text-sm">Roadmap incoming. Check your inbox.</span>
                        </div>
                        <p className="text-text-muted text-sm">
                          We'll send a personalized AI³ roadmap based on your profile.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-4">
                          <Mail size={20} className="text-accent" />
                          <h3 className="text-lg font-bold text-white">Get your personalized AI³ roadmap</h3>
                        </div>
                        <p className="text-sm text-text-secondary mb-5">
                          We'll build a custom intelligence roadmap for your {profile.avatarLabel.toLowerCase()} profile
                          with specific recommendations for closing your {weakMeta.label} gap.
                        </p>
                        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="flex-1 px-5 py-3.5 rounded-full bg-bg border border-border text-white placeholder-text-muted outline-none focus:border-accent transition-colors text-sm"
                          />
                          <button
                            type="submit"
                            disabled={emailLoading}
                            className="px-6 py-3.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover disabled:opacity-50 rounded-full transition-all cursor-pointer border-none flex items-center justify-center gap-2 shrink-0"
                          >
                            {emailLoading ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                Get My Roadmap
                                <ArrowRight size={16} />
                              </>
                            )}
                          </button>
                        </form>
                      </>
                    )}
                  </motion.div>

                  {/* CTA to avatar page */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <Link
                      to={`/for/${profile.avatarSlug}`}
                      className="group flex items-center justify-between w-full px-8 py-5 rounded-2xl border border-border hover:border-accent/40 bg-bg-card hover:bg-bg-card-hover transition-all no-underline"
                    >
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">Built for you</p>
                        <p className="text-base font-bold text-white">See AI3 for {profile.avatarLabel}s</p>
                      </div>
                      <ChevronRight size={20} className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>

                  {/* Retake */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                    className="text-center mt-8"
                  >
                    <button
                      onClick={() => {
                        setAnswers(new Array(questions.length).fill(null))
                        setCurrentQ(0)
                        setShowResult(false)
                        setEmail('')
                        setEmailSubmitted(false)
                        setDirection(-1)
                      }}
                      className="text-sm text-text-muted hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                    >
                      Retake assessment
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
