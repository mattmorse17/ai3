import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, Shield, Rocket, Users, Zap, Target, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const tiers = [
  {
    amount: '$500',
    title: 'Believer',
    perks: ['Investor updates', 'Community access', 'Early product access'],
  },
  {
    amount: '$2,500',
    title: 'Builder',
    perks: ['Everything in Believer', 'Quarterly founder calls', 'Name on the wall'],
    featured: true,
  },
  {
    amount: '$10,000',
    title: 'Architect',
    perks: ['Everything in Builder', 'Advisory dinners', 'Strategic input sessions'],
  },
  {
    amount: '$25,000+',
    title: 'Founder Circle',
    perks: ['Everything in Architect', 'Direct founder access', 'Custom AI³ implementation'],
  },
]

const whyNow = [
  {
    icon: Target,
    title: 'Timing',
    text: 'Enterprises are spending billions on AI with no ROI. The orchestration gap is massive and growing.',
  },
  {
    icon: Users,
    title: 'Traction',
    text: '50+ organizations already powered by AI³. 10 years of real-world deployment. This isn\'t a pitch deck — it\'s a proven system.',
  },
  {
    icon: Zap,
    title: 'Model',
    text: 'Two products (Now + Move) = recurring SaaS revenue from churches, coaches, creators, and business owners.',
  },
  {
    icon: Rocket,
    title: 'Moat',
    text: 'Every client deployment trains the intelligence layer. More clients = smarter platform = stronger lock-in.',
  },
]

export default function Invest() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-gradient-start/10 to-gradient-end/10 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-white transition-colors mb-8 no-underline">
            <ArrowLeft size={16} />
            Back to AI³
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95] mb-6"
          >
            You're not just
            <br />
            watching the AI era.
            <br />
            <span className="gradient-text">You're building it.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto mb-10"
          >
            AI³ is raising under Regulation Crowdfunding. For the first time, anyone — not just VCs — can
            own a stake in the intelligence layer powering the next generation of business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-8 text-center"
          >
            <div>
              <div className="text-3xl font-black gradient-text">$500</div>
              <div className="text-sm text-text-muted">Minimum</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-3xl font-black gradient-text">Reg CF</div>
              <div className="text-sm text-text-muted">Open to all</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-3xl font-black gradient-text">$5M</div>
              <div className="text-sm text-text-muted">Target raise</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Now */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-4">Why invest now?</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              The window for early-stage AI infrastructure investment is closing fast.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyNow.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-bg-card border border-border rounded-2xl p-8 hover:border-border-bright transition-all"
              >
                <item.icon size={28} className="text-accent mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The AI³ Flywheel */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-8">The AI³ Flywheel</h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'Deploy AI³ for Real Businesses', desc: 'Churches, coaches, creators, and operators — proving the system works in the real world' },
              { step: '02', title: 'Now + Move Products', desc: 'Scalable SaaS platforms anyone can use — built from thousands of hours of real deployment' },
              { step: '03', title: 'Intelligence Layer Compounds', desc: 'Every new user trains the system — more deployments = smarter platform = stronger moat' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-bg-card border border-border rounded-2xl p-6 text-left"
              >
                <span className="text-5xl font-black text-white/[0.04] absolute top-4 right-4">{item.step}</span>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Tiers */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-4">Choose your tier</h2>
            <p className="text-text-secondary text-lg">Every investor gets a seat at the table.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-8 border transition-all ${
                  tier.featured
                    ? 'bg-gradient-to-b from-accent/10 to-bg-card border-accent/30 glow'
                    : 'bg-bg-card border-border hover:border-border-bright'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-accent text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-3xl font-black gradient-text mb-1">{tier.amount}</div>
                <div className="text-lg font-bold mb-6">{tier.title}</div>
                <ul className="space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-text-secondary text-sm">
                      <ChevronRight size={14} className="text-accent mt-0.5 shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-6">
              Ready to own the future?
            </h2>
            <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
              Investment will be facilitated through our Wefunder campaign.
              Get notified when it goes live.
            </p>
            <a
              href="mailto:invest@kaifect.com?subject=AI³ Investment Interest"
              className="inline-flex items-center gap-2 px-10 py-4 text-lg font-semibold text-black font-bold bg-gradient-to-r from-gradient-start to-gradient-end hover:opacity-90 rounded-full transition-all no-underline glow"
            >
              Express Interest
              <TrendingUp size={20} />
            </a>

            <p className="mt-12 text-xs text-text-muted max-w-2xl mx-auto leading-relaxed">
              This page is for informational purposes only and does not constitute an offer to sell or a solicitation
              of an offer to buy any securities. Any offering of securities will be made only pursuant to applicable
              securities laws and will be accompanied by a formal offering statement or prospectus. All investments
              involve risk, including the possible loss of principal. Past performance is not indicative of future
              results. AI³ Inc. makes no representations or warranties regarding the accuracy or completeness of
              the information provided herein.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
