import { motion } from 'framer-motion'
import { ArrowLeft, Brain, Cpu, Bot, ArrowRight } from 'lucide-react'
import { Link, useParams, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface AvatarData {
  title: string
  headline: string
  subheadline: string
  heroDescription: string
  actual: { title: string; points: string[] }
  artificial: { title: string; points: string[] }
  agentic: { title: string; points: string[] }
  result: string
  caseStudyName?: string
  caseStudyQuote?: string
}

const avatarData: Record<string, AvatarData> = {
  church: {
    title: 'Churches & Ministries',
    headline: 'One message.\nEvery heart.\nPersonally.',
    subheadline: 'AI³ for Churches',
    heroDescription: 'Your pastor\'s message is powerful. But it hits different for a new believer, a grieving parent, and a skeptical teenager. What if every person in your congregation received the message they specifically needed — without changing a word of the sermon?',
    actual: {
      title: 'Your Pastor\'s Heart',
      points: [
        'The sermon, the theology, the pastoral care — this is irreplaceable',
        'AI³ doesn\'t write your sermons. It makes sure every word lands exactly where it needs to',
        'Your congregation feels personally known — because the system knows them',
      ],
    },
    artificial: {
      title: 'Personalized at Scale',
      points: [
        'Now transforms a single message into a personalized experience for every listener',
        'The new believer gets deeper context. The veteran gets challenged. The hurting get comfort.',
        'Sermon notes, devotionals, and follow-up materials — generated, personalized, delivered',
      ],
    },
    agentic: {
      title: 'A Church That Never Sleeps',
      points: [
        'Visitor follow-up happens within minutes, not weeks',
        'Volunteer coordination and scheduling runs automatically',
        'Small group matching based on actual needs and compatibility',
        'Giving campaigns that speak to each person\'s specific connection to the mission',
      ],
    },
    result: 'Imagine a church where every single person feels like the pastor is speaking directly to them. Where no visitor falls through the cracks. Where your message reaches 10x more people — each one personally. That\'s AI³.',
  },
  sports: {
    title: 'Sports Coaches',
    headline: 'Recruit smarter.\nDevelop faster.\nWin more.',
    subheadline: 'AI³ for Sports',
    heroDescription: 'The best coaches already have the eye. The philosophy. The ability to develop players. But there aren\'t enough hours to recruit, scout, develop, and game-plan at the level your program demands. AI³ gives you a staff that never sleeps.',
    actual: {
      title: 'Your Coaching Philosophy',
      points: [
        'Your system, your culture, your eye for talent — embedded into every agent',
        'The AI doesn\'t coach. You coach. It executes your framework at scale.',
        'Player development plans that reflect YOUR methodology, not generic templates',
      ],
    },
    artificial: {
      title: 'Intelligence Advantage',
      points: [
        'Film breakdown that identifies patterns human eyes miss',
        'Opponent scouting that processes every play from every game automatically',
        'Recruiting analytics that rank prospects by fit to YOUR system, not just stars',
      ],
    },
    agentic: {
      title: 'The Staff That Never Sleeps',
      points: [
        'Recruiting outreach that\'s personal, timely, and relentless — 24/7',
        'Player check-ins and development tracking between sessions',
        'Social media and brand building that positions your program as elite',
        'NIL support and compliance documentation handled automatically',
      ],
    },
    result: 'The programs that win in the next decade won\'t just have the best coaches. They\'ll have the best intelligence systems. AI³ gives your program a competitive advantage that compounds every single day.',
  },
  performance: {
    title: 'Mental Performance Coaches',
    headline: 'Scale your methodology.\nNot your hours.',
    subheadline: 'AI³ for Mental Performance',
    heroDescription: 'You\'ve spent decades developing a methodology that transforms athletes and executives. But you can only be in one room at a time. AI³ lets your framework reach thousands — each one getting a personalized experience as powerful as 1-on-1 coaching.',
    actual: {
      title: 'Your Framework',
      points: [
        'Your mental performance system is the foundation — the irreplaceable core',
        'AI³ encodes your methodology so deeply that clients feel YOUR coaching, not generic advice',
        'Every visualization, every routine, every framework — delivered your way',
      ],
    },
    artificial: {
      title: 'Personalized Training',
      points: [
        'Each athlete\'s mental training adapts to their specific sport, position, and pressure points',
        'Real-time performance correlation — connecting mental training to on-field results',
        'Content that adapts: the same core principle, tailored for a pitcher vs. a CEO vs. a surgeon',
      ],
    },
    agentic: {
      title: 'Coaching at Scale',
      points: [
        'Daily check-ins with every client — not just the top-tier ones',
        'Session prep and post-session follow-up generated automatically',
        'A content engine that turns your ideas into books, courses, and programs',
        'Lead gen and client acquisition that runs while you sleep',
      ],
    },
    result: 'The world\'s best mental performance coaches are limited by time. AI³ removes that constraint. Your methodology reaches 100x more people — each one getting an experience that feels like you\'re right there with them.',
  },
  influencer: {
    title: 'Influencers & Creators',
    headline: 'Your voice.\nEvery platform.\nAuthentically.',
    subheadline: 'AI³ for Creators',
    heroDescription: 'Your audience follows YOU — your voice, your personality, your perspective. But the demands of content creation, brand deals, DMs, and community management are crushing. AI³ amplifies your authentic voice across every platform without diluting it.',
    actual: {
      title: 'Your Authentic Voice',
      points: [
        'Your personality, your takes, your creative instincts — this is what people follow',
        'AI³ learns how you think, speak, and create — then amplifies it',
        'Nothing goes out that doesn\'t sound like you, because the system IS trained on you',
      ],
    },
    artificial: {
      title: 'Creative Intelligence',
      points: [
        'Content ideation based on what\'s trending in YOUR niche, not generic recommendations',
        'Audience analysis that reveals what your people actually want more of',
        'Cross-platform adaptation — one idea becomes a reel, a tweet, a newsletter, and a podcast clip',
      ],
    },
    agentic: {
      title: 'Your Media Team',
      points: [
        'Content calendar managed and executed automatically across all platforms',
        'DM responses that sound like you and convert followers to customers',
        'Brand deal vetting, negotiation, and deliverable management',
        'Community building that turns casual followers into paying superfans',
      ],
    },
    result: 'The creators who win aren\'t the ones who post the most. They\'re the ones whose authentic voice reaches the most people. AI³ gives you a media team that runs on your creative DNA.',
  },
  business: {
    title: 'Business Owners',
    headline: 'Run your company\nwith a fleet of\nAI operators.',
    subheadline: 'AI³ for Business',
    heroDescription: 'You started your business to build something — not to be trapped managing every detail. AI³ gives you a named fleet of AI operators that run your marketing, sales, fulfillment, and support so you can focus on what only you can do.',
    actual: {
      title: 'Your Vision & Expertise',
      points: [
        'You know your market, your customers, and your competitive advantage',
        'AI³ encodes that knowledge into agents that make decisions the way you would',
        'The strategic thinking stays with you. The execution runs itself.',
      ],
    },
    artificial: {
      title: 'Market Intelligence',
      points: [
        'Real-time competitive analysis and market positioning',
        'Customer behavior patterns that reveal opportunities before competitors see them',
        'Financial modeling and forecasting that adapts as conditions change',
      ],
    },
    agentic: {
      title: 'Your AI Operations Team',
      points: [
        'Named agents for every function: marketing, sales, fulfillment, support',
        'Lead-to-close pipelines that operate autonomously with your sales methodology',
        'Client onboarding and fulfillment that delivers your service at massive scale',
        'Support agents that resolve 80% of issues without human intervention',
      ],
    },
    result: 'The next generation of businesses won\'t have bigger teams. They\'ll have smarter systems. AI³ is the operating layer that lets a 5-person company operate like a 50-person one.',
    caseStudyName: 'Kaifect',
    caseStudyQuote: 'A marketing agency running 50+ clients with AI³ as its operating system — proving the model works before we ever sold it as a product.',
  },
  creator: {
    title: 'Chaotic Creators',
    headline: '100 ideas a day?\nNow they all\nget executed.',
    subheadline: 'AI³ for Creators Who Can\'t Sit Still',
    heroDescription: 'Your brain moves at 1,000 mph. You have more ideas before breakfast than most people have all year. The problem was never creativity — it was execution. AI³ is the bridge between your vision and reality.',
    actual: {
      title: 'Your Raw Creative Energy',
      points: [
        'The rapid-fire thinking, the connections no one else sees, the relentless drive',
        'AI³ doesn\'t slow you down with process — it keeps up with you',
        'Voice memo in, executed project out. That\'s the workflow.',
      ],
    },
    artificial: {
      title: 'Structure From Chaos',
      points: [
        'Your scattered ideas get organized, prioritized, and turned into actionable plans',
        'AI models that understand context across ALL your projects simultaneously',
        'Pattern recognition that connects your idea from Tuesday with your insight from last month',
      ],
    },
    agentic: {
      title: 'Execution at Your Speed',
      points: [
        'Every idea gets assigned to an agent that builds it, tests it, and ships it',
        'Content across every platform — created, scheduled, and posted while you think of the next thing',
        'Projects that used to die in your notes app now get built in days',
        'A system that matches your pace — finally',
      ],
    },
    result: 'You were never the problem. The world just couldn\'t keep up with you. AI³ can. Every idea gets executed. Every project gets shipped. Every vision becomes reality.',
  },
}

export default function AvatarPage() {
  const { slug } = useParams<{ slug: string }>()
  const data = slug ? avatarData[slug] : null

  if (!data) return <Navigate to="/" replace />

  const intelligences = [
    { key: 'actual', icon: Brain, data: data.actual, color: 'from-blue-500 to-cyan-500', borderColor: 'border-blue-500/20', bgColor: 'bg-blue-500/5' },
    { key: 'artificial', icon: Cpu, data: data.artificial, color: 'from-purple-500 to-violet-500', borderColor: 'border-purple-500/20', bgColor: 'bg-purple-500/5' },
    { key: 'agentic', icon: Bot, data: data.agentic, color: 'from-violet-500 to-pink-500', borderColor: 'border-violet-500/20', bgColor: 'bg-violet-500/5' },
  ]

  const scrollToWaitlist = () => {
    document.getElementById('avatar-waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-gradient-start/8 to-gradient-end/8 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-white transition-colors mb-8 no-underline">
            <ArrowLeft size={16} />
            Back to AI³
          </Link>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-6"
          >
            {data.subheadline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95] mb-8 whitespace-pre-line"
          >
            {data.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {data.heroDescription}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={scrollToWaitlist}
            className="group px-8 py-3.5 text-base font-semibold text-white bg-accent hover:bg-accent-hover rounded-full transition-all cursor-pointer border-none flex items-center gap-2 mx-auto glow"
          >
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* The Three Intelligences for this avatar */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {intelligences.map((intel, i) => (
            <motion.div
              key={intel.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`${intel.bgColor} border ${intel.borderColor} rounded-3xl p-8 sm:p-10`}
            >
              <div className="flex items-start gap-5 mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${intel.color} shrink-0`}>
                  <intel.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">{intel.data.title}</h3>
                  <p className={`text-sm font-medium bg-gradient-to-r ${intel.color} bg-clip-text text-transparent`}>
                    {intel.key === 'actual' ? 'Actual Intelligence' : intel.key === 'artificial' ? 'Artificial Intelligence' : 'Agentic Intelligence'}
                  </p>
                </div>
              </div>
              <div className="space-y-3 ml-0 sm:ml-17">
                {intel.data.points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <ArrowRight size={14} className="text-accent mt-1 shrink-0" />
                    <p className="text-text-secondary leading-relaxed text-[15px]">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Result */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-8">The Result</h2>
            <p className="text-xl text-text-secondary leading-relaxed mb-8">
              {data.result}
            </p>
            {data.caseStudyName && (
              <div className="bg-bg-card border border-border rounded-2xl p-8 text-left mt-12">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted mb-3">Case Study</p>
                <p className="text-lg font-bold mb-2">{data.caseStudyName}</p>
                <p className="text-text-secondary leading-relaxed">{data.caseStudyQuote}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section id="avatar-waitlist" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-6">
              Ready to see it in action?
            </h2>
            <p className="text-text-secondary text-lg mb-10">
              Join the waitlist for early access to Now and Move — the products that power AI³.
            </p>
            <a
              href="mailto:hello@kaifect.com?subject=AI³ Interest — {data.title}"
              className="inline-flex items-center gap-2 px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-gradient-start to-gradient-end hover:opacity-90 rounded-full transition-all no-underline glow"
            >
              Get Early Access
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
