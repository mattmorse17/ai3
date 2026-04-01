import { motion } from 'framer-motion'

const integrations = [
  'Google Drive', 'Gmail', 'Slack', 'Zoom', 'Notion', 'HubSpot',
  'Salesforce', 'Stripe', 'Shopify', 'WordPress', 'Mailchimp', 'Calendly',
  'Zapier', 'Airtable', 'Asana', 'Monday.com', 'ClickUp', 'Discord',
  'YouTube', 'Instagram', 'TikTok', 'LinkedIn', 'X / Twitter', 'Spotify',
  'Podcast Platforms', 'Wix', 'Squarespace', 'QuickBooks', 'Dropbox', 'Canva',
  'Kaifecta', 'Kajabi', 'Facebook Ads', 'Google Ads', 'SubMagic', 'Loom',
  'Vimeo', 'Teachable', 'Thinkific', 'Planning Center', 'ProPresenter',
]

export default function Integrations() {
  return (
    <section className="relative py-20 px-6 border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
            Plugs right into what you already use.
          </h3>
          <p className="text-text-secondary max-w-xl mx-auto">
            AI&sup3; does not replace your tools. It makes them smarter. One platform that connects
            to everything, so you subtract complexity instead of adding it.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div className="animate-scroll-left flex gap-4 w-max">
          {[...integrations, ...integrations].map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-bg-card border border-border text-text-muted text-sm whitespace-nowrap hover:border-accent/30 hover:text-accent transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-accent/40" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
