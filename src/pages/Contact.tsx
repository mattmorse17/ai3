import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface ContactEntry {
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('General Inquiry')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const entry: ContactEntry = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    }

    const existing: ContactEntry[] = JSON.parse(localStorage.getItem('ai3_contacts') || '[]')
    existing.push(entry)
    localStorage.setItem('ai3_contacts', JSON.stringify(existing))

    setSubmitted(true)
    setName('')
    setEmail('')
    setSubject('General Inquiry')
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-4">
              Get in Touch
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-xl mx-auto">
              Have questions about AI³, Now, Move, or investment opportunities? We'd love to hear from you.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-bg-card border border-border rounded-2xl p-10 text-center"
            >
              <div className="text-accent text-4xl mb-4">&#10003;</div>
              <h2 className="text-2xl font-bold mb-2">Message Sent</h2>
              <p className="text-text-secondary mb-6">
                Thanks for reaching out. We'll get back to you soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 text-sm font-semibold text-black bg-accent hover:bg-accent-hover rounded-full transition-all cursor-pointer border-none"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="bg-bg-card border border-border rounded-2xl p-8 sm:p-10 space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Now — Product Interest">Now — Product Interest</option>
                  <option value="Move — Product Interest">Move — Product Interest</option>
                  <option value="Investment">Investment</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Press">Press</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3.5 text-base font-semibold text-black bg-accent hover:bg-accent-hover rounded-full transition-all cursor-pointer border-none glow"
              >
                Send Message
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
