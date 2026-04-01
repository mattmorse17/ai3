import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('')
  const [investInterest, setInvestInterest] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)

    // Store lead locally + will hook up to backend
    try {
      const leads = JSON.parse(localStorage.getItem('ai3_leads') || '[]')
      leads.push({ email, interest, investInterest, timestamp: new Date().toISOString() })
      localStorage.setItem('ai3_leads', JSON.stringify(leads))
    } catch {
      // silent
    }

    // Simulate a brief delay for UX
    await new Promise(r => setTimeout(r, 600))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section id="waitlist" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">Request an Invite</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-tight mb-4">
            The future runs on
            <br />
            autonomous Intelligence.
          </h2>
          <p className="text-lg text-text-secondary mb-10">
            Request an invite to be first in line when Now and Move launch publicly.
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
              <span className="font-medium">You're on the list. We'll be in touch.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-5 py-3.5 rounded-full bg-bg-card border border-border text-white placeholder-text-muted outline-none focus:border-accent transition-colors text-base"
              />
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full px-5 py-3.5 rounded-full bg-bg-card border border-border text-white outline-none focus:border-accent transition-colors text-base appearance-none cursor-pointer"
              >
                <option value="" disabled>What are you most interested in?</option>
                <option value="now">Now — Personalized Intelligence</option>
                <option value="move">Move — AI Command Center</option>
                <option value="both">Both Now + Move</option>
              </select>
              <label className="flex items-center gap-3 cursor-pointer self-start pl-2">
                <input
                  type="checkbox"
                  checked={investInterest}
                  onChange={(e) => setInvestInterest(e.target.checked)}
                  className="w-4 h-4 rounded border-border accent-accent cursor-pointer"
                />
                <span className="text-sm text-text-secondary">I'm also interested in investing in AI³</span>
              </label>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-black bg-accent hover:bg-accent-hover disabled:opacity-50 rounded-full transition-all cursor-pointer border-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Request Invite
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
