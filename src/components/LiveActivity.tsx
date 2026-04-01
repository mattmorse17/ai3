import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

/* ─── City pool ─── */
const cities = [
  'Nashville',
  'Austin',
  'Los Angeles',
  'Chicago',
  'Dallas',
  'Atlanta',
  'Miami',
  'Denver',
  'Phoenix',
  'Seattle',
  'New York',
  'San Francisco',
  'Houston',
  'Portland',
  'Charlotte',
  'Minneapolis',
  'San Diego',
  'Tampa',
  'Raleigh',
  'Salt Lake City',
]

/* ─── Message templates ─── */
const templates: ((city: string) => string)[] = [
  (city) => `Someone from ${city} just requested early access`,
  () => `${Math.floor(Math.random() * 18) + 8} people viewing this page right now`,
  (city) => `An investor from ${city} just expressed interest`,
  (city) => `Someone from ${city} took the assessment`,
  () => `${Math.floor(Math.random() * 5) + 2} new organizations joined the waitlist today`,
  (city) => `Someone from ${city} just explored The Village`,
  (city) => `A coach in ${city} just tried the Now demo`,
  () => `${Math.floor(Math.random() * 12) + 10} investors have expressed interest this week`,
  (city) => `A church leader from ${city} just signed up`,
  (city) => `Someone from ${city} just watched the Move demo`,
  () => `${Math.floor(Math.random() * 6) + 3} assessments completed in the last hour`,
  (city) => `A business owner in ${city} just joined the waitlist`,
]

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function LiveActivity() {
  const [dismissed, setDismissed] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [queue, setQueue] = useState<((city: string) => string)[]>([])

  const getNextMessage = useCallback(() => {
    let q = queue
    if (q.length === 0) {
      q = shuffle(templates)
      setQueue(q.slice(1))
    } else {
      setQueue(q.slice(1))
    }
    const template = q[0]
    const city = pickRandom(cities)
    return template(city)
  }, [queue])

  useEffect(() => {
    if (dismissed) return

    // Initial delay before first message
    const initialDelay = setTimeout(() => {
      const msg = getNextMessage()
      setCurrentMessage(msg)
      setVisible(true)
    }, 3000)

    return () => clearTimeout(initialDelay)
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissed])

  useEffect(() => {
    if (dismissed || !currentMessage) return

    // Show for 4 seconds, then fade out
    const hideTimer = setTimeout(() => {
      setVisible(false)
    }, 4000)

    // After fade-out (300ms animation) + 2s gap, show next
    const nextTimer = setTimeout(() => {
      const msg = getNextMessage()
      setCurrentMessage(msg)
      setVisible(true)
    }, 4000 + 300 + 2000)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(nextTimer)
    }
  }, [currentMessage, dismissed, getNextMessage])

  if (dismissed) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-xs">
      <AnimatePresence>
        {visible && currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-bg-card/95 backdrop-blur-md border border-border rounded-xl px-4 py-3 shadow-2xl shadow-black/40"
          >
            <div className="flex items-start gap-3">
              {/* Live dot */}
              <div className="mt-1 shrink-0 relative">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping opacity-75" />
              </div>

              {/* Text */}
              <p className="text-xs text-text-secondary leading-relaxed flex-1 pr-1">
                {currentMessage}
              </p>

              {/* Dismiss */}
              <button
                onClick={() => setDismissed(true)}
                className="shrink-0 text-text-muted hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 mt-0.5"
                aria-label="Dismiss"
              >
                <X size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
