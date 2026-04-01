import { motion } from 'framer-motion'
import { ArrowRight, Church, Trophy, Brain, Briefcase, Mic, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

const avatars = [
  {
    icon: GraduationCap,
    title: 'Education & Classrooms',
    slug: 'education',
    hook: 'Every student gets a personalized experience.',
    description: 'Curriculum that adapts to every learner. Teachers amplified, not replaced. AI³ transforms any classroom into a personalized learning environment.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Mic,
    title: 'Creators & Influencers',
    slug: 'creator',
    hook: 'Your voice. Every platform. 50x the output.',
    description: 'Content ideation, scheduling, DM management, brand deals — all handled by agents that sound like you. Whether you post 3x a week or have 100 ideas a day, AI³ keeps up.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Briefcase,
    title: 'Business Owners',
    slug: 'business',
    hook: 'Run your company with a fleet of AI operators.',
    description: 'Marketing, sales, fulfillment, support — named agents with specific roles that execute your playbook while you focus on what only you can do.',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    icon: Trophy,
    title: 'Sports Coaches',
    slug: 'sports',
    hook: 'Recruit smarter. Develop faster. Win more.',
    description: 'Film breakdown, opponent scouting, recruiting outreach, and player development — running 24/7 with your coaching philosophy embedded.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Church,
    title: 'Churches & Ministries',
    slug: 'church',
    hook: 'One message. Every heart. Personally.',
    description: 'Your sermon adapts to every person in the room — live. Follow-up happens automatically. Volunteer coordination runs itself.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Brain,
    title: 'Life & Business Coaches',
    slug: 'performance',
    hook: 'Done with Zoom fatigue. Maximize every minute.',
    description: 'Personalized prep, real-time session Intelligence, automated follow-up. Your clients get 10x the value from every session because AI³ handles everything in between.',
    gradient: 'from-blue-500 to-cyan-500',
  },
]

export default function Avatars() {
  return (
    <section id="who" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">Who It's For</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-tight mb-6">
            Built for people who
            <br />
            <span className="text-text-muted">refuse to stay small.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            AI³ powers a specific kind of person — the ones with more vision than hours in the day.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {avatars.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                to={`/for/${a.slug}`}
                className="group block bg-bg-card border border-border rounded-2xl p-8 hover:border-border-bright transition-all no-underline h-full"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${a.gradient} mb-5`}>
                  <a.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{a.title}</h3>
                <p className={`text-sm font-medium bg-gradient-to-r ${a.gradient} bg-clip-text text-transparent mb-3`}>
                  {a.hook}
                </p>
                <p className="text-text-secondary text-[14px] leading-relaxed mb-4">
                  {a.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-accent group-hover:gap-2 transition-all">
                  See how it works <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
