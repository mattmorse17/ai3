import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitLead } from '../lib/notify'
import { ArrowLeft, Brain, Cpu, Bot, ArrowRight, Check, Zap, Users, Play, CheckCircle2 } from 'lucide-react'
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
    heroDescription: 'Your pastor\'s message is powerful. But it hits different for a new believer, a grieving parent, and a skeptical teenager. What if every person in your congregation received the message they specifically needed \u2014 without changing a word of the sermon?',
    actual: {
      title: 'Your Pastor\'s Heart',
      points: [
        'The sermon, the theology, the pastoral care \u2014 this is irreplaceable',
        'AI³ doesn\'t write your sermons. It makes sure every word lands exactly where it needs to',
        'Your congregation feels personally known \u2014 because the system knows them',
      ],
    },
    artificial: {
      title: 'Personalized at Scale',
      points: [
        'Now transforms a single message into a personalized experience for every listener',
        'The new believer gets deeper context. The veteran gets challenged. The hurting get comfort.',
        'Sermon notes, devotionals, and follow-up materials \u2014 generated, personalized, delivered',
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
    result: 'Imagine a church where every single person feels like the pastor is speaking directly to them. Where no visitor falls through the cracks. Where your message reaches 10x more people \u2014 each one personally. That\'s AI³.',
  },
  sports: {
    title: 'Sports Coaches',
    headline: 'Recruit smarter.\nDevelop faster.\nWin more.',
    subheadline: 'AI³ for Sports',
    heroDescription: 'The best coaches already have the eye. The philosophy. The ability to develop players. But there aren\'t enough hours to recruit, scout, develop, and game-plan at the level your program demands. AI³ gives you a staff that never sleeps.',
    actual: {
      title: 'Your Coaching Philosophy',
      points: [
        'Your system, your culture, your eye for talent \u2014 embedded into every agent',
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
        'Recruiting outreach that\'s personal, timely, and relentless \u2014 24/7',
        'Player check-ins and development tracking between sessions',
        'Social media and brand building that positions your program as elite',
        'NIL support and compliance documentation handled automatically',
      ],
    },
    result: 'The programs that win in the next decade won\'t just have the best coaches. They\'ll have the best intelligence systems. AI³ gives your program a competitive advantage that compounds every single day.',
  },
  performance: {
    title: 'Coaches & Consultants',
    headline: 'Done with Zoom fatigue?\nMaximize every minute.',
    subheadline: 'AI³ for Coaches & Consultants',
    heroDescription: 'You\'re spending hours on Zoom and your clients are exhausted too. The problem isn\'t your methodology \u2014 it\'s that every session requires you to be live, present, and on. AI³ maximizes the impact of every 1:1 so your clients get more from less, and you get your life back.',
    actual: {
      title: 'Your Methodology',
      points: [
        'Your coaching framework, your expertise, your ability to transform people \u2014 this is irreplaceable',
        'AI³ encodes your methodology so deeply that clients feel YOUR coaching between sessions',
        'Every framework, every exercise, every insight \u2014 delivered your way, on your terms',
      ],
    },
    artificial: {
      title: 'Personalized Between Sessions',
      points: [
        'Each client\'s experience adapts to their specific situation, goals, and progress',
        'Pre-session briefs generated from their activity, homework, and real-world results',
        'Content that adapts: same core principle, tailored for an athlete vs. a CEO vs. a founder',
      ],
    },
    agentic: {
      title: 'Your Practice on Autopilot',
      points: [
        'Daily check-ins with every client \u2014 not just your top-tier ones',
        'Session prep and post-session follow-up generated automatically',
        'A content engine that turns your ideas into books, courses, and programs',
        'Lead gen and client acquisition that runs while you sleep',
        'Clients get 10x the value from every Zoom because AI³ handles everything in between',
      ],
    },
    result: 'The best coaches and consultants are limited by time. AI³ removes that constraint. Your methodology reaches 100x more people \u2014 and every Zoom session becomes 10x more valuable because the intelligence layer handles everything in between.',
  },
  influencer: {
    title: 'Influencers & Creators',
    headline: 'Your voice.\nEvery platform.\nAuthentically.',
    subheadline: 'AI³ for Creators',
    heroDescription: 'Your audience follows YOU \u2014 your voice, your personality, your perspective. But the demands of content creation, brand deals, DMs, and community management are crushing. AI³ amplifies your authentic voice across every platform without diluting it.',
    actual: {
      title: 'Your Authentic Voice',
      points: [
        'Your personality, your takes, your creative instincts \u2014 this is what people follow',
        'AI³ learns how you think, speak, and create \u2014 then amplifies it',
        'Nothing goes out that doesn\'t sound like you, because the system IS trained on you',
      ],
    },
    artificial: {
      title: 'Creative Intelligence',
      points: [
        'Content ideation based on what\'s trending in YOUR niche, not generic recommendations',
        'Audience analysis that reveals what your people actually want more of',
        'Cross-platform adaptation \u2014 one idea becomes a reel, a tweet, a newsletter, and a podcast clip',
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
    heroDescription: 'You started your business to build something \u2014 not to be trapped managing every detail. AI³ gives you a named fleet of AI operators that run your marketing, sales, fulfillment, and support so you can focus on what only you can do.',
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
    caseStudyQuote: 'An AI³ Powered Growth Partner running 50+ clients with AI³ as its operating system. Proving the model works before we ever sold it as a product.',
  },
  events: {
    title: 'Speakers & Event Planners',
    headline: 'Every audience member\nleaves transformed.',
    subheadline: 'AI\u00B3 for Events',
    heroDescription: 'Whether it\'s a conference keynote, a workshop, or a concert. What if every attendee received a personalized experience. Not just the same presentation everyone else got, but insights, resources, and follow-up tailored specifically to them and what they need.',
    actual: {
      title: 'Your Message & Vision',
      points: [
        'Your keynote, your workshop design, your event vision. This is the foundation.',
        'AI\u00B3 captures your message and intent so every personalization stays true to your purpose.',
        'The audience feels like you\'re speaking directly to each of them. Because the system makes it possible.',
      ],
    },
    artificial: {
      title: 'Personalized Attendee Experience',
      points: [
        'Every attendee gets personalized notes, resources, and action items from YOUR presentation.',
        'Real-time translation so international audiences experience the same impact.',
        'Post-event content adapted to each attendee\'s role, industry, and goals.',
      ],
    },
    agentic: {
      title: 'Event Operations on Autopilot',
      points: [
        'Pre-event: personalized agendas, logistics, and prep materials for every attendee.',
        'During: real-time engagement, Q&A management, and session coordination.',
        'Post-event: automated follow-up, feedback collection, and relationship nurturing.',
        'Vendor coordination, volunteer management, and logistics running autonomously.',
      ],
    },
    result: 'The best events don\'t just deliver information. They transform people. AI\u00B3 makes that transformation personal for every single attendee, while handling the operational complexity that used to require a team of 50.',
  },
  creator: {
    title: 'Chaotic Creators',
    headline: '100 ideas a day?\nNow they all\nget executed.',
    subheadline: 'AI³ for Creators Who Can\'t Sit Still',
    heroDescription: 'Your brain moves at 1,000 mph. You have more ideas before breakfast than most people have all year. The problem was never creativity \u2014 it was execution. AI³ is the bridge between your vision and reality.',
    actual: {
      title: 'Your Raw Creative Energy',
      points: [
        'The rapid-fire thinking, the connections no one else sees, the relentless drive',
        'AI³ doesn\'t slow you down with process \u2014 it keeps up with you',
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
        'Content across every platform \u2014 created, scheduled, and posted while you think of the next thing',
        'Projects that used to die in your notes app now get built in days',
        'A system that matches your pace \u2014 finally',
      ],
    },
    result: 'You were never the problem. The world just couldn\'t keep up with you. AI³ can. Every idea gets executed. Every project gets shipped. Every vision becomes reality.',
  },
  education: {
    title: 'Education & Classrooms',
    headline: 'Every student gets\na personalized\nexperience.',
    subheadline: 'AI³ for Education',
    heroDescription: 'Every classroom has students at different levels, with different learning styles, speaking different languages. What if your curriculum automatically adapted to each one \u2014 without changing what you teach?',
    actual: {
      title: 'Your Teaching Expertise',
      points: [
        'Your curriculum, your pedagogy, your ability to connect with students. This is irreplaceable.',
        'AI³ doesn\'t replace teachers. It amplifies every lesson so it lands for every student.',
        'Your teaching philosophy becomes the foundation for personalized learning at scale.',
      ],
    },
    artificial: {
      title: 'Adaptive Learning Intelligence',
      points: [
        'Each student\'s experience adapts to their level, pace, and learning style automatically.',
        'Real-time translation so language is never a barrier to understanding.',
        'Assessment and progress tracking that reveals what each student actually needs.',
      ],
    },
    agentic: {
      title: 'A Teaching Assistant That Never Sleeps',
      points: [
        'Personalized study materials generated for every student after every class.',
        'Parent communication and progress updates handled automatically.',
        'Homework help and tutoring available 24/7, aligned to your curriculum.',
        'Administrative tasks \u2014 grading, scheduling, reporting \u2014 running in the background.',
      ],
    },
    result: 'Imagine a classroom where every student feels like the lesson was designed just for them. Where no one falls behind because they learn differently. Where teachers are freed from admin to do what they do best \u2014 teach. That\'s AI³ for Education.',
  },
}

// --- Now Demo Data (per avatar) ---
interface NowRecipient {
  name: string
  desc: string
  personalized: string
}
interface NowDemoData {
  message: string
  recipients: NowRecipient[]
}

const nowDemoData: Record<string, NowDemoData> = {
  education: {
    message:
      "Today we're learning about photosynthesis -- how plants convert sunlight into energy. This process is the foundation of nearly all life on Earth.",
    recipients: [
      {
        name: 'Maria (ESL Student)',
        desc: 'Spanish-speaking, 6th grade reading level',
        personalized:
          "Hoy aprendemos sobre la fotos\u00EDntesis. Plants use sunlight like a kitchen uses a stove -- turning light into food energy that feeds almost every living thing.",
      },
      {
        name: 'Jason (Advanced)',
        desc: 'Gifted track, loves chemistry',
        personalized:
          "Photosynthesis is a redox reaction: 6CO\u2082 + 6H\u2082O \u2192 C\u2086H\u2081\u2082O\u2086 + 6O\u2082. Today we'll explore why this electron transfer is the most important chemical reaction on Earth.",
      },
      {
        name: 'Aiden (Visual Learner)',
        desc: 'IEP, processes best with diagrams',
        personalized:
          'Imagine a plant as a tiny solar panel factory. Sunlight goes in the leaf, water comes up from the roots, and the plant builds sugar molecules like little energy bricks.',
      },
      {
        name: 'Priya (Quiet Achiever)',
        desc: 'On-level, interested in ecology',
        personalized:
          "Every bite of food you eat traces back to photosynthesis. Today we'll map the chain from sunlight to your lunch tray -- and discover why losing forests means losing energy.",
      },
    ],
  },
  church: {
    message:
      "This Sunday's sermon is on finding peace in uncertainty. When life shakes your foundation, God's promises remain unshaken.",
    recipients: [
      {
        name: 'David (New Believer)',
        desc: 'Attending 3 months, still exploring faith',
        personalized:
          "You're still figuring out what you believe -- and that's okay. This week's message is about one thing: even when nothing feels certain, there's a foundation you can trust.",
      },
      {
        name: 'Margaret (30-Year Member)',
        desc: 'Recently lost her husband',
        personalized:
          "Margaret, grief can make even familiar promises feel distant. This Sunday we're revisiting the promises that have carried you before -- and still carry you now.",
      },
      {
        name: 'Tyler (College Student)',
        desc: 'Home for break, questioning everything',
        personalized:
          "Doubt isn't the enemy of faith. This week's message meets you where you are: if everything you believed got shaken, what would still be standing?",
      },
    ],
  },
  sports: {
    message:
      'Scouting report on QB prospect #12 Jaylen Torres -- strong arm, 68% completion rate, excellent pocket presence under pressure.',
    recipients: [
      {
        name: 'Coach Davis (HC)',
        desc: 'Focused on culture fit and leadership',
        personalized:
          'Torres led a 14-point comeback against ranked opponents twice. Film shows him rallying the huddle after INTs -- classic resilience signals that match your leadership-first culture.',
      },
      {
        name: 'Coach Kim (OC)',
        desc: 'Runs spread offense, values quick reads',
        personalized:
          "Torres' average time to first read is 1.8s -- elite for his level. In spread concepts he completes 74% on quick-game routes. His processing speed fits your tempo perfectly.",
      },
      {
        name: 'Coach Reed (Recruiting)',
        desc: 'Managing 40+ QB prospects',
        personalized:
          'Torres is a silent commit risk -- two SEC schools visited last week. His GPA (3.4) clears academic thresholds. Recommend a home visit within 10 days to stay competitive.',
      },
    ],
  },
  business: {
    message:
      "Q2 results are in: revenue up 23% YoY, but customer acquisition cost increased 15%. We need to double down on what's working.",
    recipients: [
      {
        name: 'Board of Directors',
        desc: 'Want strategic vision and risk analysis',
        personalized:
          "Revenue growth of 23% outpaces the market by 3x. The CAC increase is a calculated investment in channels showing 4:1 LTV ratios. We're confident in the unit economics trajectory.",
      },
      {
        name: 'Sales Team',
        desc: 'Motivated by wins and clear targets',
        personalized:
          "You crushed it -- 23% growth is the best Q2 in company history. Next quarter we're shifting budget to the channels that close fastest. Expect warmer leads and bigger deals.",
      },
      {
        name: 'Marketing Team',
        desc: 'Need to optimize spend allocation',
        personalized:
          'CAC went up 15% but not equally across channels. Paid social is underperforming while organic content drives 3x better conversion. Q3 priority: shift budget from paid to content.',
      },
      {
        name: 'Engineering Team',
        desc: 'Care about product impact on growth',
        personalized:
          "The onboarding flow you rebuilt in Q1 is directly tied to our 23% revenue jump -- activation rates are up 40%. Q3 focus: reduce time-to-value from 7 days to 3.",
      },
    ],
  },
  creator: {
    message:
      '"5 systems every creator needs to scale past $10K/month without burning out." Built from my personal experience scaling to 7 figures.',
    recipients: [
      {
        name: 'Newsletter Subscribers',
        desc: 'Deep-dive readers, value frameworks',
        personalized:
          "Here's the full breakdown: 5 systems I built that took me from $10K to $100K months. Each one includes the exact tool, the workflow, and the mistake that taught me the lesson.",
      },
      {
        name: 'Instagram Audience',
        desc: 'Visual-first, short attention span',
        personalized:
          'I was stuck at $10K/month for 2 years. Then I built 5 systems. Swipe to see each one \u2192 (Carousel: System 1: Capture... System 2: Content Engine...)',
      },
      {
        name: 'YouTube Viewers',
        desc: 'Want story + actionable detail',
        personalized:
          'Story time: I almost quit when I was making $10K/month working 80-hour weeks. Then I systemized everything. Here are the 5 systems that changed my life -- and my bank account.',
      },
      {
        name: 'Podcast Listeners',
        desc: 'Long-form, conversational tone',
        personalized:
          "So I want to get real with you today about what it actually takes to scale. Not the highlight reel -- the ugly middle. Five systems I wish someone had handed me three years ago.",
      },
    ],
  },
  influencer: {
    message:
      '"Why I stopped chasing trends and started building systems." This is my most personal piece yet about authenticity over algorithms.',
    recipients: [
      {
        name: 'TikTok Followers',
        desc: 'Short-form, trend-aware, young demo',
        personalized:
          "POV: you stop chasing every trend and start building something that lasts. Here's what happened to my income when I stopped performing and started being real. (60s hook + reveal)",
      },
      {
        name: 'Email List (Superfans)',
        desc: 'Engaged, willing to pay, want depth',
        personalized:
          "I'm sharing something I've never talked about publicly. The moment I stopped optimizing for the algorithm and started optimizing for YOU -- everything changed. Here's the full story.",
      },
      {
        name: 'Brand Partners',
        desc: 'Want to see authentic engagement data',
        personalized:
          'Our pivot to authenticity-first content increased engagement 340% and drove 2x higher conversion on sponsored posts. Attached: updated media kit with the new metrics.',
      },
    ],
  },
  performance: {
    message:
      "Key insight from this quarter: most clients plateau not because of strategy but because of unaddressed identity conflicts between who they are and who they're becoming.",
    recipients: [
      {
        name: 'Sarah (Executive)',
        desc: 'CEO, driven, struggles with vulnerability',
        personalized:
          "Sarah, your Q3 plateau connects to something we touched on last session: the gap between the leader your board sees and the person your family needs. Let's bridge that Thursday.",
      },
      {
        name: 'Marcus (Athlete)',
        desc: 'Pro athlete, identity tied to performance',
        personalized:
          "Marcus, this maps directly to your pre-game anxiety. You're not afraid of losing -- you're afraid of what losing means about who you are. That's the real opponent. Let's unpack it.",
      },
      {
        name: 'Jordan (Founder)',
        desc: 'Second-time founder, burnt out',
        personalized:
          "Jordan, you said \"I can't afford to slow down.\" But the data shows your best decisions came in weeks you took Fridays off. The conflict isn't pace -- it's permission. Let's dig in.",
      },
    ],
  },
}

// --- Move Demo Data (per avatar) ---
interface MoveAgent {
  name: string
  role: string
}
interface MoveStep {
  agent: string
  action: string
}
interface MoveDemoData {
  agents: MoveAgent[]
  steps: MoveStep[]
  mission: string
}

const moveDemoData: Record<string, MoveDemoData> = {
  education: {
    agents: [
      { name: 'Curriculum Specialist', role: 'Adapts lessons per student' },
      { name: 'Student Support', role: 'Monitors progress & flags risks' },
      { name: 'Admin Assistant', role: 'Handles grading & scheduling' },
    ],
    steps: [
      { agent: 'Curriculum Specialist', action: "Generated 28 personalized lesson variants for tomorrow's class" },
      { agent: 'Student Support', action: 'Flagged 3 students falling behind on reading comprehension' },
      { agent: 'Admin Assistant', action: "Auto-graded Friday's quiz and updated parent portal" },
      { agent: 'Curriculum Specialist', action: 'Created ESL-adapted materials for 4 transfer students' },
    ],
    mission: 'Lesson prep complete for all 28 students',
  },
  church: {
    agents: [
      { name: 'Follow-Up Specialist', role: 'Connects with visitors & members' },
      { name: 'Volunteer Manager', role: 'Coordinates teams & scheduling' },
      { name: 'Content Creator', role: 'Produces devotionals & social posts' },
    ],
    steps: [
      { agent: 'Follow-Up Specialist', action: 'Sent personalized welcome messages to 12 first-time visitors' },
      { agent: 'Volunteer Manager', action: "Filled 3 open volunteer slots for next Sunday's children's ministry" },
      { agent: 'Content Creator', action: 'Published sermon recap devotional to app and email list' },
      { agent: 'Follow-Up Specialist', action: 'Scheduled check-in calls for 5 members who missed 3+ weeks' },
    ],
    mission: 'Post-service follow-up complete for 247 attendees',
  },
  sports: {
    agents: [
      { name: 'Recruiting Scout', role: 'Identifies and evaluates prospects' },
      { name: 'Film Analyst', role: 'Breaks down game and practice film' },
      { name: 'Player Development', role: 'Tracks and advances athlete growth' },
    ],
    steps: [
      { agent: 'Recruiting Scout', action: 'Identified 8 new QB prospects matching program criteria' },
      { agent: 'Film Analyst', action: 'Completed breakdown of 4 game films with tagged highlights' },
      { agent: 'Player Development', action: 'Updated workout plans for 22 athletes based on testing data' },
      { agent: 'Recruiting Scout', action: 'Drafted personalized outreach to top 3 uncommitted targets' },
    ],
    mission: 'Recruiting cycle updated across 45 active prospects',
  },
  business: {
    agents: [
      { name: 'Marketing Agent', role: 'Runs campaigns & content' },
      { name: 'Sales Agent', role: 'Manages pipeline & outreach' },
      { name: 'Support Agent', role: 'Handles tickets & onboarding' },
    ],
    steps: [
      { agent: 'Marketing Agent', action: 'Launched email campaign to 2,400 leads with A/B subject lines' },
      { agent: 'Sales Agent', action: 'Qualified 18 inbound leads and booked 7 discovery calls' },
      { agent: 'Support Agent', action: 'Resolved 34 support tickets with 94% satisfaction score' },
      { agent: 'Marketing Agent', action: 'Published 3 blog posts and scheduled 2 weeks of social content' },
    ],
    mission: 'Q3 campaign launched across all channels',
  },
  creator: {
    agents: [
      { name: 'Content Strategist', role: 'Plans and prioritizes ideas' },
      { name: 'Video Editor', role: 'Produces and polishes content' },
      { name: 'Social Manager', role: 'Distributes and engages' },
    ],
    steps: [
      { agent: 'Content Strategist', action: 'Mapped 7 content pieces from 1 core idea across all platforms' },
      { agent: 'Video Editor', action: 'Produced 3 short-form clips and 1 long-form video' },
      { agent: 'Social Manager', action: 'Scheduled 14 posts across 4 platforms for the week' },
      { agent: 'Content Strategist', action: "Analyzed last week's performance and adjusted content mix" },
    ],
    mission: 'Full week of content created and scheduled',
  },
  influencer: {
    agents: [
      { name: 'Content Strategist', role: 'Plans and prioritizes content' },
      { name: 'Engagement Manager', role: 'Handles DMs and community' },
      { name: 'Brand Deal Agent', role: 'Vets and manages partnerships' },
    ],
    steps: [
      { agent: 'Content Strategist', action: 'Planned next 2 weeks of content aligned to brand pillars' },
      { agent: 'Engagement Manager', action: 'Responded to 89 DMs and flagged 4 high-value connections' },
      { agent: 'Brand Deal Agent', action: 'Reviewed 3 incoming brand deals and counter-offered on 1' },
      { agent: 'Content Strategist', action: 'Repurposed top-performing reel into newsletter and tweet thread' },
    ],
    mission: 'Creator operations running across all platforms',
  },
  performance: {
    agents: [
      { name: 'Client Prep', role: 'Builds session briefs & context' },
      { name: 'Follow-Up Engine', role: 'Delivers post-session actions' },
      { name: 'Content Engine', role: 'Turns insights into content' },
    ],
    steps: [
      { agent: 'Client Prep', action: 'Generated session briefs for 8 clients with progress summaries' },
      { agent: 'Follow-Up Engine', action: 'Sent personalized action items to all clients from last week' },
      { agent: 'Content Engine', action: 'Drafted LinkedIn post and newsletter from session patterns' },
      { agent: 'Client Prep', action: 'Flagged 2 clients showing signs of disengagement for priority outreach' },
    ],
    mission: 'Between-session work handled for all 24 active clients',
  },
}

// --- Mini Demo Components ---

function NowMiniDemo({ slug }: { slug: string }) {
  const [state, setState] = useState<'idle' | 'running' | 'complete'>('idle')
  const demo = nowDemoData[slug]
  if (!demo) return null

  const handlePersonalize = () => {
    setState('running')
    setTimeout(() => setState('complete'), 600)
  }

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400 mb-4">Now in Action</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">See Personalization at Work</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            One message in. Multiple personalized versions out. Each one tailored to the recipient.
          </p>
        </motion.div>

        {/* Original message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg-card border border-border rounded-2xl p-6 mb-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted mb-3">Original Message</p>
          <p className="text-text-secondary leading-relaxed">{demo.message}</p>
        </motion.div>

        {/* Personalize button */}
        {state === 'idle' && (
          <div className="flex justify-center mb-8">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={handlePersonalize}
              className="group px-6 py-3 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-full transition-all cursor-pointer border-none flex items-center gap-2"
            >
              <Zap size={16} />
              Personalize with Now
            </motion.button>
          </div>
        )}

        {/* Personalized cards */}
        <AnimatePresence>
          {state !== 'idle' && (
            <div className="grid gap-4 sm:grid-cols-2">
              {demo.recipients.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="bg-bg-card border border-purple-500/20 rounded-xl p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={14} className="text-purple-400" />
                    <p className="text-sm font-bold text-white">{r.name}</p>
                  </div>
                  <p className="text-xs text-text-muted mb-3">{r.desc}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{r.personalized}</p>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function MoveMiniDemo({ slug }: { slug: string }) {
  const [state, setState] = useState<'idle' | 'running' | 'complete'>('idle')
  const [visibleSteps, setVisibleSteps] = useState(0)
  const demo = moveDemoData[slug]
  if (!demo) return null

  const handleDeploy = () => {
    setState('running')
    let step = 0
    const interval = setInterval(() => {
      step++
      setVisibleSteps(step)
      if (step >= demo.steps.length) {
        clearInterval(interval)
        setTimeout(() => setState('complete'), 500)
      }
    }, 700)
  }

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400 mb-4">Move in Action</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">See Your AI Team Deploy</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Named agents with specific roles, executing real tasks autonomously.
          </p>
        </motion.div>

        {/* Agent cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {demo.agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg-card border border-border rounded-xl p-5 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-3">
                <Bot size={18} className="text-violet-400" />
              </div>
              <p className="text-sm font-bold text-white mb-1">{agent.name}</p>
              <p className="text-xs text-text-muted">{agent.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Deploy button */}
        {state === 'idle' && (
          <div className="flex justify-center mb-8">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={handleDeploy}
              className="group px-6 py-3 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-full transition-all cursor-pointer border-none flex items-center gap-2"
            >
              <Play size={16} />
              Deploy Agents
            </motion.button>
          </div>
        )}

        {/* Activity feed */}
        <AnimatePresence>
          {state !== 'idle' && (
            <div className="space-y-3 mb-6">
              {demo.steps.slice(0, visibleSteps).map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 bg-bg-card border border-border rounded-lg p-4"
                >
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={12} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-violet-400 mb-0.5">{step.agent}</p>
                    <p className="text-sm text-text-secondary">{step.action}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Mission Complete badge */}
        <AnimatePresence>
          {state === 'complete' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-green-500/10 border border-green-500/20 mx-auto w-fit"
            >
              <CheckCircle2 size={20} className="text-green-400" />
              <span className="font-semibold text-green-400">{demo.mission}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default function AvatarPage() {
  const { slug } = useParams<{ slug: string }>()
  const data = slug ? avatarData[slug] : null

  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('')
  const [investInterest, setInvestInterest] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!data) return <Navigate to="/" replace />

  const intelligences = [
    { key: 'actual', icon: Brain, data: data.actual, color: 'from-blue-500 to-cyan-500', borderColor: 'border-blue-500/20', bgColor: 'bg-blue-500/5' },
    { key: 'artificial', icon: Cpu, data: data.artificial, color: 'from-purple-500 to-violet-500', borderColor: 'border-purple-500/20', bgColor: 'bg-purple-500/5' },
    { key: 'agentic', icon: Bot, data: data.agentic, color: 'from-violet-500 to-pink-500', borderColor: 'border-violet-500/20', bgColor: 'bg-violet-500/5' },
  ]

  const scrollToWaitlist = () => {
    document.getElementById('avatar-waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)

    await submitLead({ source: `avatar-${slug}`, email, interest, investInterest })
    setSubmitted(true)
    setLoading(false)
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
            className="group px-8 py-3.5 text-base font-semibold text-black bg-accent hover:bg-accent-hover rounded-full transition-all cursor-pointer border-none flex items-center gap-2 mx-auto glow"
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

      {/* Now Mini Demo */}
      {slug && <NowMiniDemo slug={slug} />}

      {/* Move Mini Demo */}
      {slug && <MoveMiniDemo slug={slug} />}

      {/* CTA with Waitlist Form */}
      <section id="avatar-waitlist" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">Request an Invite</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-6">
              Ready to see it in action?
            </h2>
            <p className="text-text-secondary text-lg mb-10">
              Request an invite for early access to Now and Move — the products that power AI³.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                <Check size={20} />
                <span className="font-medium">You're on the list. We'll be in touch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-5 py-3.5 rounded-full bg-bg-card border border-border text-white placeholder-text-muted outline-none focus:border-accent transition-colors text-base"
                />
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-full bg-bg-card border border-border text-white outline-none focus:border-accent transition-colors text-base appearance-none cursor-pointer"
                >
                  <option value="" disabled>What are you most interested in?</option>
                  <option value="now">Now — Personalized Intelligence</option>
                  <option value="move">Move — AI Command Center</option>
                  <option value="both">Both Now + Move</option>
                </select>
                <label className="flex items-center gap-3 cursor-pointer self-start pl-2">
                  <input
                    type="checkbox"
                    checked={investInterest}
                    onChange={(e) => setInvestInterest(e.target.checked)}
                    className="w-4 h-4 rounded border-border accent-accent cursor-pointer"
                  />
                  <span className="text-sm text-text-secondary">I'm also interested in investing in AI³</span>
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-black bg-accent hover:bg-accent-hover disabled:opacity-50 rounded-full transition-all cursor-pointer border-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Request Invite
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
