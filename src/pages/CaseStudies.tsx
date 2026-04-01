import { Link } from 'react-router-dom'
import { ArrowRight, FlaskConical } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const studies = [
  {
    slug: 'faith-community',
    title: 'How a 5,000-Member Church Personalized Every Sermon',
    category: 'Church',
    featuredStat: '98.4%',
    featuredLabel: 'Personalization Rate',
    excerpt:
      'A megachurch deploys Now + Move to personalize sermons, automate visitor follow-up, and coordinate volunteers autonomously.',
  },
  {
    slug: 'coaching-program',
    title: 'How a D1 Baseball Program Got a 24/7 Recruiting Staff',
    category: 'Sports',
    featuredStat: '2,400/mo',
    featuredLabel: 'Recruits Contacted',
    excerpt:
      'A college baseball program uses Move for recruiting outreach and Now for personalized player development communication.',
  },
  {
    slug: 'creator-scale',
    title: 'How a Creator Went from 3 Posts/Week to 30 Without Losing Their Voice',
    category: 'Creator',
    featuredStat: '10x',
    featuredLabel: 'Content Output',
    excerpt:
      'A creator deploys AI³ agents for content creation, DM management, and brand deals — voice preserved, output multiplied.',
  },
  {
    slug: 'education-district',
    title: 'How a School District Personalized Learning for 12,000 Students',
    category: 'Education',
    featuredStat: '12,000',
    featuredLabel: 'Students',
    excerpt:
      'A school district deploys Now for curriculum personalization and Move for administrative automation. Every student gets personalized materials.',
  },
  {
    slug: 'influencer-growth',
    title: 'How an Influencer Scaled from 50K to 500K Followers Without Burning Out',
    category: 'Creator',
    featuredStat: '15x',
    featuredLabel: 'Content Output',
    excerpt:
      'A creator uses Move agents for content scheduling, DM management, and brand deal negotiation while Now personalizes their newsletter for different audience segments.',
  },
]

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">Case Studies</span>
          </h1>
          <div className="flex items-center gap-3 mb-16">
            <p className="text-text-secondary text-lg max-w-2xl">
              Projected results based on AI³ architecture applied to real industry scenarios.
            </p>
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full whitespace-nowrap">
              <FlaskConical size={12} />
              Expected Results
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {studies.map((study) => (
              <Link
                key={study.slug}
                to={`/case-studies/${study.slug}`}
                className="group block bg-bg-card border border-border rounded-2xl p-8 no-underline hover:border-accent/40 transition-all duration-300"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {study.category}
                </span>

                <div className="mt-6 mb-2">
                  <span className="text-4xl font-black gradient-text">
                    {study.featuredStat}
                  </span>
                  <p className="text-xs text-text-muted mt-1">
                    {study.featuredLabel}
                  </p>
                </div>

                <h2 className="text-lg font-bold text-white mb-3 group-hover:text-accent transition-colors leading-tight">
                  {study.title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {study.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                  View study <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
