import { motion } from 'framer-motion'

const integrations = [
  { name: 'Google Drive', abbr: 'GD', color: '#4285F4' },
  { name: 'Gmail', abbr: 'GM', color: '#EA4335' },
  { name: 'Slack', abbr: 'S', color: '#4A154B' },
  { name: 'Zoom', abbr: 'Z', color: '#2D8CFF' },
  { name: 'Notion', abbr: 'N', color: '#000000' },
  { name: 'HubSpot', abbr: 'HS', color: '#FF7A59' },
  { name: 'Salesforce', abbr: 'SF', color: '#00A1E0' },
  { name: 'Stripe', abbr: 'St', color: '#635BFF' },
  { name: 'Shopify', abbr: 'Sh', color: '#96BF48' },
  { name: 'WordPress', abbr: 'WP', color: '#21759B' },
  { name: 'Mailchimp', abbr: 'MC', color: '#FFE01B' },
  { name: 'Calendly', abbr: 'Ca', color: '#006BFF' },
  { name: 'Zapier', abbr: 'Za', color: '#FF4A00' },
  { name: 'Airtable', abbr: 'AT', color: '#18BFFF' },
  { name: 'Asana', abbr: 'As', color: '#F06A6A' },
  { name: 'Monday.com', abbr: 'Mo', color: '#FF3D57' },
  { name: 'ClickUp', abbr: 'CU', color: '#7B68EE' },
  { name: 'Discord', abbr: 'Di', color: '#5865F2' },
  { name: 'YouTube', abbr: 'YT', color: '#FF0000' },
  { name: 'Instagram', abbr: 'IG', color: '#E4405F' },
  { name: 'TikTok', abbr: 'TT', color: '#000000' },
  { name: 'LinkedIn', abbr: 'Li', color: '#0A66C2' },
  { name: 'X / Twitter', abbr: 'X', color: '#000000' },
  { name: 'Spotify', abbr: 'Sp', color: '#1DB954' },
  { name: 'Kaifecta', abbr: 'K', color: '#c8ff2e' },
  { name: 'Kajabi', abbr: 'Kj', color: '#2A2A2A' },
  { name: 'Facebook Ads', abbr: 'FB', color: '#1877F2' },
  { name: 'Google Ads', abbr: 'GA', color: '#4285F4' },
  { name: 'SubMagic', abbr: 'SM', color: '#FF6B6B' },
  { name: 'Loom', abbr: 'Lo', color: '#625DF5' },
  { name: 'Vimeo', abbr: 'Vi', color: '#1AB7EA' },
  { name: 'Teachable', abbr: 'Te', color: '#FF5722' },
  { name: 'Thinkific', abbr: 'Th', color: '#4CAF50' },
  { name: 'Planning Center', abbr: 'PC', color: '#3F51B5' },
  { name: 'ProPresenter', abbr: 'PP', color: '#FF9800' },
  { name: 'Canva', abbr: 'Cv', color: '#00C4CC' },
  { name: 'Dropbox', abbr: 'DB', color: '#0061FF' },
  { name: 'QuickBooks', abbr: 'QB', color: '#2CA01C' },
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
          {[...integrations, ...integrations].map((integration, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-bg-card border border-border text-text-muted text-sm whitespace-nowrap hover:border-accent/30 hover:text-accent transition-all"
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ backgroundColor: integration.color }}
              >
                {integration.abbr}
              </div>
              {integration.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
