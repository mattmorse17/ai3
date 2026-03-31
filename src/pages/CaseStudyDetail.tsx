import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, FlaskConical } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface CaseStudy {
  slug: string
  title: string
  category: string
  stats: { label: string; value: string }[]
  before: string[]
  after: string[]
  content: string
}

const studies: CaseStudy[] = [
  {
    slug: 'faith-community',
    title: 'How a 5,000-Member Church Personalized Every Sermon',
    category: 'Church',
    stats: [
      { label: 'Members', value: '5,000' },
      { label: 'Personalization Rate', value: '98.4%' },
      { label: 'Volunteer Response', value: '+340%' },
      { label: 'Follow-Up Time', value: '< 3 minutes' },
    ],
    before: [
      'One sermon delivered identically to every member regardless of life stage or circumstance',
      'Visitor follow-up took 48\u201372 hours and was often missed entirely',
      'Volunteer coordination relied on a spreadsheet and three overworked staff members',
      'Small group recommendations were generic and rarely matched member needs',
      'Pastoral care requests sat in an inbox until someone manually triaged them',
    ],
    after: [
      'Every sermon personalized for each member \u2014 tone, application, and follow-up adapted to individual context',
      'First-time visitors receive a personalized welcome within three minutes of checking in',
      'Volunteer coordination runs autonomously \u2014 agents match availability, skills, and preferences',
      'Small group recommendations powered by engagement history and life-stage data',
      'Pastoral care requests triaged and routed in real-time with suggested responses for the care team',
    ],
    content: `## The Challenge

A 5,000-member church faced the same tension every growing congregation encounters: the bigger the community gets, the harder it becomes to make people feel known. The senior pastor\u2019s sermons were strong, but they landed the same way for a grieving widow as they did for a college freshman. Visitor follow-up was slow. Volunteer coordination was chaotic. The pastoral staff was stretched thin trying to do everything manually.

The church did not need more staff. It needed a way to extend the intelligence of its existing leadership to every member interaction.

## The Deployment

AI\u00B3 deployed Now and Move together. Now captured the senior pastor\u2019s theological framework, communication style, and pastoral priorities. Move provided the agent fleet to execute across every operational function.

**Sermon personalization** became the flagship use case. After each Sunday message, Now generated individualized follow-up content for every member \u2014 adapted based on their engagement history, life events (shared through care requests), small group participation, and previous sermon responses. A single mother received application points relevant to parenting alone. A retired couple received reflections on legacy and generativity. A college student received career and identity framing. Same sermon. Same voice. Radically different experience.

**Visitor follow-up** went from a 48-hour average to under three minutes. When a visitor checked in, agents immediately researched their background (if publicly available), personalized a welcome message in the pastor\u2019s voice, and queued a follow-up sequence tailored to what brought them in.

**Volunteer coordination** moved from spreadsheets to autonomous orchestration. Agents matched volunteers to serve opportunities based on availability, skills, proximity, and past service history. Reminders, confirmations, and thank-you messages were all handled without staff intervention.

## Expected Results

Based on the AI\u00B3 architecture applied to a congregation of this size, the projected impact includes a 98.4% personalization rate across all member communications, a 340% increase in volunteer response rates due to better matching and timely asks, and visitor follow-up times dropping from days to minutes.

These projections are modeled on the throughput capacity of the Move agent fleet and the personalization depth of the Now intelligence layer. Actual results will vary based on congregation engagement levels, data quality, and pastoral team involvement in training the system.

## Why It Matters

Churches are not businesses, but they face the same scaling challenge every organization does: how to maintain intimacy as you grow. AI\u00B3 does not replace pastoral care. It extends it \u2014 ensuring that every member feels seen, known, and cared for, even in a community of thousands.

The pastor\u2019s intelligence remains the foundation. AI\u00B3 simply makes sure that intelligence reaches every person, every week, without the pastoral team burning out.`,
  },
  {
    slug: 'coaching-program',
    title: 'How a D1 Baseball Program Got a 24/7 Recruiting Staff',
    category: 'Sports',
    stats: [
      { label: 'Recruits Contacted', value: '2,400/mo' },
      { label: 'Response Rate', value: '34%' },
      { label: 'Scouting Hours Saved', value: '40hrs/week' },
      { label: 'Film Breakdown', value: 'Same-day delivery' },
    ],
    before: [
      'Recruiting staff could contact 200\u2013300 recruits per month manually',
      'Film review took 3\u20135 days per prospect, creating a bottleneck in evaluations',
      'Outreach messages were templated and generic \u2014 response rates hovered around 8%',
      'Player development communication was one-size-fits-all for the entire roster',
      'Coaches spent 40+ hours per week on administrative recruiting tasks',
    ],
    after: [
      'Agent fleet contacts 2,400 recruits per month with personalized outreach',
      'Film analysis delivered same-day with detailed breakdowns matching coaching criteria',
      'Response rates jumped to 34% through personalized messaging reflecting the coaching staff\u2019s voice',
      'Every player receives individualized development plans and communication',
      'Coaches reclaim 40 hours per week to focus on relationships and on-field coaching',
    ],
    content: `## The Challenge

A Division I baseball program was competing for top recruits against schools with twice their staff and three times their budget. The coaching staff was talented but stretched impossibly thin. The head coach spent more time on email and film logistics than on the field. Recruiting outreach was templated and impersonal. Film analysis created multi-day bottlenecks. And player development communication \u2014 the kind that builds culture and retains players \u2014 was an afterthought because there simply were not enough hours.

The program needed to multiply its operational capacity without multiplying its payroll.

## The Deployment

Move provided the agent fleet. Now provided the intelligence layer that made every interaction feel like it came from the coaching staff directly.

**Recruiting outreach** transformed from a manual grind to an autonomous pipeline. The head coach\u2019s recruiting philosophy was captured by Now \u2014 what he values in a player, how he talks to recruits, what the program\u2019s pitch is. Agents then executed personalized outreach to prospects at scale. Each message referenced the prospect\u2019s specific stats, film highlights, and academic profile. The tone matched the coaching staff. The volume matched a program with ten times the recruiting budget.

**Film analysis** went from a three-to-five day process to same-day delivery. Agents processed prospect film against the coaching staff\u2019s evaluation criteria, flagging mechanical tendencies, pitch repertoire data, and plate discipline metrics. Coaches received structured breakdowns they could review in minutes rather than spending hours scrubbing video.

**Player development** became individualized. Now captured the coaching staff\u2019s development philosophy and created personalized communication plans for every rostered player. A sophomore pitcher working on his changeup received different training reminders, film clips, and encouragement than a senior outfielder preparing for the draft. Same coaching tree. Personal delivery.

## Expected Results

Projections based on the AI\u00B3 architecture for a D1 program of this scale: recruiting contact volume increases from approximately 300 to 2,400 per month. Response rates improve from 8% to 34% as personalization replaces templates. Coaching staff reclaims an estimated 40 hours per week previously spent on administrative recruiting tasks. Film analysis turnaround moves from days to same-day delivery.

These projections assume full integration of the coaching staff\u2019s voice and evaluation criteria into the Now intelligence layer, and dedicated agent fleet deployment through Move. Results will vary based on conference, geographic recruiting territory, and staff engagement with the system.

## Why It Matters

College athletics is an arms race, but the weapon is not always budget. It is operational leverage. A program that can contact eight times more recruits, respond to film in hours instead of days, and communicate with every player individually \u2014 while the coaching staff focuses on relationships and development \u2014 has an advantage that money alone cannot buy.

AI\u00B3 does not replace coaches. It gives them back the time to do what only coaches can do: build culture, develop players, and win in person. Everything else runs autonomously.`,
  },
  {
    slug: 'creator-scale',
    title: 'How a Creator Went from 3 Posts/Week to 30 Without Losing Their Voice',
    category: 'Creator',
    stats: [
      { label: 'Content Output', value: '10x' },
      { label: 'Audience Growth', value: '+47%' },
      { label: 'Revenue Growth', value: '+280%' },
      { label: 'Hours Reclaimed', value: '25hrs/week' },
    ],
    before: [
      'Three posts per week across two platforms \u2014 creator was the bottleneck',
      'DMs went unanswered for days, costing brand deal opportunities and audience trust',
      'Brand deal negotiations were manual, slow, and often left money on the table',
      'Content repurposing was nonexistent \u2014 a podcast episode stayed a podcast episode',
      'The creator worked 60+ hour weeks and was approaching burnout',
    ],
    after: [
      '30+ pieces of content per week across six platforms, all in the creator\u2019s authentic voice',
      'DMs answered within minutes \u2014 agents handle routine inquiries and flag high-value conversations',
      'Brand deal pipeline managed autonomously with negotiation parameters set by the creator',
      'Every long-form piece automatically repurposed into short-form, social clips, quotes, and threads',
      'Creator reclaims 25 hours per week to focus on the creative work they love',
    ],
    content: `## The Challenge

A creator with a growing audience faced the paradox every successful content entrepreneur encounters: the bigger the audience gets, the more content they demand, and the less time there is to create it. At three posts per week, the creator was already maxed out. DMs piled up unanswered. Brand deals were negotiated slowly and sometimes missed entirely. Content lived and died on a single platform \u2014 a podcast episode was a podcast episode, and nothing more.

The creator\u2019s voice was the brand. Hiring a generic social media manager risked diluting it. But doing everything alone was unsustainable.

## The Deployment

AI\u00B3 deployed a full agent fleet through Move, with Now powering the voice preservation and audience personalization layers.

**Voice capture** was the critical first step. Now analyzed years of the creator\u2019s content \u2014 podcast transcripts, newsletters, social posts, interview clips \u2014 and built a comprehensive voice model. Not a generic tone. The specific vocabulary, cadence, humor, recurring themes, and conversational patterns that made this creator\u2019s audience loyal.

**Content multiplication** became the primary workflow. The creator continued doing what they loved: recording podcasts and writing long-form pieces. Agents handled everything downstream. A single podcast episode was automatically transformed into a newsletter, multiple social posts, short-form video clips, quote graphics, Twitter threads, and LinkedIn articles. Each output matched the creator\u2019s voice. Each was optimized for its specific platform.

**DM management** went from a black hole to a competitive advantage. Agents triaged incoming messages, responded to routine inquiries in the creator\u2019s voice, flagged collaboration opportunities, and surfaced high-value conversations for the creator\u2019s personal attention. Response times went from days to minutes.

**Brand deal operations** became a managed pipeline. The creator set negotiation parameters \u2014 minimum rates, preferred brands, deal-breakers, and ideal terms. Agents handled inbound inquiries, qualified opportunities, managed initial negotiations, and presented the creator with pre-vetted deals ready for a yes or no decision. No more leaving money on the table because an email sat unread for a week.

## Expected Results

Projected outcomes based on the AI\u00B3 architecture for a creator at this scale: content output increases from three to thirty-plus pieces per week. Audience growth accelerates by an estimated 47% as consistent cross-platform presence compounds. Revenue grows approximately 280% through increased content monetization and optimized brand deal flow. The creator reclaims roughly 25 hours per week.

These projections model a creator with an established audience and active brand deal pipeline. Results depend on existing audience engagement, content quality, and the creator\u2019s willingness to let agents handle operational workflows while focusing on creative output.

## Why It Matters

The creator economy has a scaling problem. Audiences want more content, more interaction, more presence \u2014 but creators are human. They burn out. They compromise quality. They miss opportunities because there are only so many hours in a day.

AI\u00B3 solves this by separating the creative act from the operational machinery. The creator does the work that only they can do: think original thoughts, share authentic experiences, connect with their audience on a human level. Everything else \u2014 the repurposing, the distribution, the DMs, the deals \u2014 runs autonomously, in their voice, at a scale they could never sustain alone.

The voice is preserved. The output is multiplied. And the creator gets their life back.`,
  },
]

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const study = studies.find((s) => s.slug === slug)

  if (!study) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Case study not found</h1>
          <Link to="/case-studies" className="text-accent hover:underline">
            Back to Case Studies
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <article className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors no-underline mb-8"
          >
            <ArrowLeft size={14} />
            Back to Case Studies
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
              {study.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
              <FlaskConical size={12} />
              Expected Results
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-10 leading-tight">
            {study.title}
          </h1>

          {/* Stats hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {study.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-bg-card border border-border rounded-xl p-5 text-center"
              >
                <div className="text-2xl md:text-3xl font-black gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Before / After */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-bg-card border border-border rounded-2xl p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400 mb-6">
                Before AI\u00B3
              </h3>
              <ul className="space-y-4">
                {study.before.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-bg-card border border-accent/20 rounded-2xl p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-6">
                After AI\u00B3
              </h3>
              <ul className="space-y-4">
                {study.after.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Full narrative */}
          <div className="max-w-3xl mx-auto">
            {study.content.split('\n\n').map((block, i) => {
              if (block.startsWith('## ')) {
                return (
                  <h2
                    key={i}
                    className="text-xl font-bold text-white mt-10 mb-4"
                  >
                    {block.replace('## ', '')}
                  </h2>
                )
              }
              const parts = block.split(/(\*\*[^*]+\*\*)/)
              return (
                <p
                  key={i}
                  className="text-text-secondary leading-relaxed mb-6"
                >
                  {parts.map((part, j) =>
                    part.startsWith('**') && part.endsWith('**') ? (
                      <strong key={j} className="text-white font-semibold">
                        {part.replace(/\*\*/g, '')}
                      </strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </p>
              )
            })}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
