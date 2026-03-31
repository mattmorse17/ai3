import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function AnimatedNumber({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease out cubic
      const value = eased * target

      if (target >= 1000) {
        setDisplay(Math.round(value).toLocaleString())
      } else if (decimals > 0) {
        setDisplay(value.toFixed(decimals))
      } else {
        setDisplay(Math.round(value).toString())
      }

      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, target, decimals])

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-black gradient-text">
      {display}{suffix}
    </div>
  )
}

const stats = [
  { target: 2847, suffix: '', decimals: 0, label: 'Messages personalized on the platform' },
  { target: 156, suffix: '', decimals: 0, label: 'AI agents deployed and operating' },
  { target: 50, suffix: '+', decimals: 0, label: 'Organizations powered by AI³' },
  { target: 99.2, suffix: '%', decimals: 1, label: 'Average personalization accuracy' },
]

export default function Numbers() {
  return (
    <section className="relative py-24 px-6 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedNumber target={stat.target} suffix={stat.suffix} decimals={stat.decimals} />
              <p className="text-sm text-text-muted leading-snug mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
