import { motion } from 'framer-motion'

const integrations = [
  { name: 'Gmail', icon: '📧' },
  { name: 'Google Drive', icon: '📁' },
  { name: 'Slack', icon: '💬' },
  { name: 'Zoom', icon: '📹' },
  { name: 'Notion', icon: '📝' },
  { name: 'ClickUp', icon: '✅' },
  { name: 'HubSpot', icon: '🔶' },
  { name: 'Stripe', icon: '💳' },
  { name: 'Shopify', icon: '🛒' },
  { name: 'WordPress', icon: '🌐' },
  { name: 'Instagram', icon: '📸' },
  { name: 'YouTube', icon: '▶️' },
  { name: 'Calendly', icon: '📅' },
  { name: 'Twilio', icon: '📞' },
  { name: 'Mailchimp', icon: '✉️' },
  { name: 'Airtable', icon: '📊' },
  { name: 'Zapier', icon: '⚡' },
  { name: 'Make', icon: '🔗' },
  { name: 'Telegram', icon: '💭' },
  { name: 'Vimeo', icon: '🎬' },
]

export default function Integrations() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
            Fits right into what you already use.
          </h3>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            AI³ doesn't add another tool to your stack — it connects to everything you're already running.
            Less software. More done.
          </p>
        </motion.div>
      </div>

      {/* Scrolling logos - two rows, opposite directions */}
      <div className="space-y-4">
        <div className="overflow-hidden">
          <div className="animate-scroll-left flex gap-4">
            {[...integrations, ...integrations].map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="flex items-center gap-2.5 px-5 py-3 bg-bg-card border border-border rounded-full whitespace-nowrap shrink-0 hover:border-accent/30 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-text-secondary font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="animate-scroll-left flex gap-4" style={{ animationDirection: 'reverse', animationDuration: '20s' }}>
            {[...integrations.slice(10), ...integrations.slice(0, 10), ...integrations.slice(10), ...integrations.slice(0, 10)].map((item, i) => (
              <div
                key={`${item.name}-r-${i}`}
                className="flex items-center gap-2.5 px-5 py-3 bg-bg-card border border-border rounded-full whitespace-nowrap shrink-0 hover:border-accent/30 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-text-secondary font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
