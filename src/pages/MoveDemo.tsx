import { useState, useEffect, useCallback, useRef, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitLead } from '../lib/notify'
import {
  Play,
  RotateCcw,
  Zap,
  ArrowRight,
  Check,
  Loader2,
  GraduationCap,
  Palette,
  Briefcase,
  Dumbbell,
  Church,
  Users,
  Bot,
  ChevronRight,
  Rocket,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Types ─── */
type Phase = 'idle' | 'deploying' | 'agents-ready' | 'mission-running' | 'complete'

interface AgentDef {
  name: string
  initials: string
  role: string
  color: string
  textColor: string
}

interface MissionStep {
  agentIndex: number
  action: string
  duration: number
}

interface Mission {
  label: string
  steps: MissionStep[]
  output: {
    headline: string
    stats: { label: string; value: string }[]
  }
}

interface Scenario {
  id: string
  icon: typeof GraduationCap
  label: string
  agents: AgentDef[]
  missions: Mission[]
}

/* ─── Scenario Data ─── */
const scenarios: Scenario[] = [
  {
    id: 'education',
    icon: GraduationCap,
    label: 'Education',
    agents: [
      { name: 'Curriculum Specialist', initials: 'CS', role: 'Lesson Design', color: 'bg-cyan-500/20', textColor: 'text-cyan-400' },
      { name: 'Student Support', initials: 'SS', role: 'Individualized Learning', color: 'bg-purple-500/20', textColor: 'text-purple-400' },
      { name: 'Parent Communications', initials: 'PC', role: 'Family Outreach', color: 'bg-pink-500/20', textColor: 'text-pink-400' },
      { name: 'Admin Assistant', initials: 'AA', role: 'Scheduling & Logistics', color: 'bg-orange-500/20', textColor: 'text-orange-400' },
      { name: 'Assessment Coordinator', initials: 'AC', role: 'Testing & Grading', color: 'bg-green-500/20', textColor: 'text-green-400' },
    ],
    missions: [
      {
        label: 'Personalize this week\'s lesson plan',
        steps: [
          { agentIndex: 0, action: 'Analyzing state standards and mapping objectives for this week\'s unit on fractions...', duration: 1800 },
          { agentIndex: 1, action: 'Pulling IEP accommodations and reading levels for 28 students. Creating 3 differentiated tiers...', duration: 2000 },
          { agentIndex: 0, action: 'Generating visual aids, practice worksheets, and enrichment activities for each tier...', duration: 1800 },
          { agentIndex: 4, action: 'Building formative assessment checkpoints for Monday, Wednesday, and Friday...', duration: 1500 },
          { agentIndex: 3, action: 'Reserving computer lab for Thursday activity. Updating weekly schedule and printing materials list...', duration: 1200 },
        ],
        output: {
          headline: 'Personalized lesson plan ready.',
          stats: [
            { label: 'Tiers Created', value: '3' },
            { label: 'Activities', value: '12' },
            { label: 'Assessments', value: '3' },
            { label: 'Students Covered', value: '28' },
          ],
        },
      },
      {
        label: 'Generate progress reports for all students',
        steps: [
          { agentIndex: 4, action: 'Aggregating grades, attendance, and assessment data for all 28 students...', duration: 1600 },
          { agentIndex: 1, action: 'Cross-referencing behavior notes and participation scores. Flagging 4 students needing intervention...', duration: 1800 },
          { agentIndex: 0, action: 'Writing narrative summaries for each student highlighting strengths and growth areas...', duration: 2200 },
          { agentIndex: 2, action: 'Formatting reports for parent portal. Translating 6 reports to Spanish for ESL families...', duration: 1500 },
        ],
        output: {
          headline: 'All progress reports generated.',
          stats: [
            { label: 'Reports', value: '28' },
            { label: 'Flagged', value: '4' },
            { label: 'Translated', value: '6' },
            { label: 'Time Saved', value: '8hrs' },
          ],
        },
      },
      {
        label: 'Send parent updates',
        steps: [
          { agentIndex: 2, action: 'Drafting weekly newsletter with classroom highlights, upcoming events, and homework reminders...', duration: 1500 },
          { agentIndex: 1, action: 'Appending personalized student notes for parents of children needing extra support...', duration: 1800 },
          { agentIndex: 2, action: 'Sending 28 emails via parent portal. 6 translated to Spanish. 3 flagged for phone follow-up...', duration: 1600 },
        ],
        output: {
          headline: 'Parent updates sent.',
          stats: [
            { label: 'Emails Sent', value: '28' },
            { label: 'Personalized', value: '28' },
            { label: 'Translated', value: '6' },
            { label: 'Follow-ups', value: '3' },
          ],
        },
      },
    ],
  },
  {
    id: 'creators',
    icon: Palette,
    label: 'Creators & Influencers',
    agents: [
      { name: 'Content Strategist', initials: 'CS', role: 'Planning & Ideation', color: 'bg-pink-500/20', textColor: 'text-pink-400' },
      { name: 'Video Editor', initials: 'VE', role: 'Clips & Production', color: 'bg-orange-500/20', textColor: 'text-orange-400' },
      { name: 'Social Manager', initials: 'SM', role: 'Publishing & Growth', color: 'bg-violet-500/20', textColor: 'text-violet-400' },
      { name: 'DM Handler', initials: 'DH', role: 'Inbox & Community', color: 'bg-cyan-500/20', textColor: 'text-cyan-400' },
      { name: 'Brand Deal Coordinator', initials: 'BD', role: 'Partnerships & Revenue', color: 'bg-green-500/20', textColor: 'text-green-400' },
    ],
    missions: [
      {
        label: 'Create this week\'s content calendar',
        steps: [
          { agentIndex: 0, action: 'Analyzing trending topics in your niche. Cross-referencing with top-performing content from last 30 days...', duration: 1800 },
          { agentIndex: 0, action: 'Mapping 7 content themes to platform-specific formats: 3 Reels, 2 TikToks, 4 Stories, 2 YouTube Shorts...', duration: 1600 },
          { agentIndex: 1, action: 'Generating clip templates and shot lists for each piece. Identifying 5 reusable B-roll segments...', duration: 1800 },
          { agentIndex: 2, action: 'Writing captions, hashtags, and CTAs for each platform. Scheduling posts across Mon-Sun...', duration: 1500 },
        ],
        output: {
          headline: 'Content calendar is live.',
          stats: [
            { label: 'Posts Planned', value: '11' },
            { label: 'Platforms', value: '4' },
            { label: 'Days Covered', value: '7' },
            { label: 'Hooks Written', value: '11' },
          ],
        },
      },
      {
        label: 'Draft responses to brand partnership inquiries',
        steps: [
          { agentIndex: 3, action: 'Scanning inbox... found 8 new brand inquiries. Sorting by relevance and deal size...', duration: 1500 },
          { agentIndex: 4, action: 'Researching each brand. Scoring fit against audience demographics and values alignment...', duration: 2000 },
          { agentIndex: 4, action: 'Drafting 5 acceptance responses with rate cards. 2 polite declines. 1 counter-proposal...', duration: 1800 },
          { agentIndex: 0, action: 'Suggesting content angles for each accepted partnership. Mapping to upcoming calendar slots...', duration: 1400 },
        ],
        output: {
          headline: 'Brand responses drafted.',
          stats: [
            { label: 'Inquiries Processed', value: '8' },
            { label: 'Accepted', value: '5' },
            { label: 'Declined', value: '2' },
            { label: 'Revenue Potential', value: '$12K' },
          ],
        },
      },
      {
        label: 'Schedule and publish across all platforms',
        steps: [
          { agentIndex: 1, action: 'Exporting final cuts in platform-optimized formats: 9:16 for Reels/TikTok, 16:9 for YouTube...', duration: 1600 },
          { agentIndex: 2, action: 'Uploading to Instagram, TikTok, YouTube, and X. Applying platform-specific captions and hashtags...', duration: 1800 },
          { agentIndex: 2, action: 'Setting optimal publish times based on audience analytics. Queueing 11 posts across 7 days...', duration: 1400 },
        ],
        output: {
          headline: 'All content scheduled.',
          stats: [
            { label: 'Posts Queued', value: '11' },
            { label: 'Platforms', value: '4' },
            { label: 'Formats', value: '3' },
            { label: 'Days', value: '7' },
          ],
        },
      },
    ],
  },
  {
    id: 'business',
    icon: Briefcase,
    label: 'Business Owners',
    agents: [
      { name: 'Marketing Director', initials: 'MD', role: 'Campaigns & Growth', color: 'bg-violet-500/20', textColor: 'text-violet-400' },
      { name: 'Sales Agent', initials: 'SA', role: 'Pipeline & Outreach', color: 'bg-cyan-500/20', textColor: 'text-cyan-400' },
      { name: 'Operations Manager', initials: 'OM', role: 'Workflow & Systems', color: 'bg-orange-500/20', textColor: 'text-orange-400' },
      { name: 'Support Lead', initials: 'SL', role: 'Client Success', color: 'bg-green-500/20', textColor: 'text-green-400' },
      { name: 'Content Creator', initials: 'CC', role: 'Copy & Media', color: 'bg-pink-500/20', textColor: 'text-pink-400' },
    ],
    missions: [
      {
        label: 'Launch a lead generation campaign',
        steps: [
          { agentIndex: 0, action: 'Defining campaign targeting: demographics, interests, and lookalike audiences from top 50 clients...', duration: 1600 },
          { agentIndex: 4, action: 'Writing 3 ad variations with headlines, body copy, and CTAs. Generating landing page copy...', duration: 1800 },
          { agentIndex: 0, action: 'Setting up ad campaigns on Google and Meta. Budget allocation: 60% search, 40% social...', duration: 1600 },
          { agentIndex: 1, action: 'Creating automated follow-up sequence: email day 1, SMS day 3, call day 5. Loading into CRM...', duration: 1500 },
          { agentIndex: 2, action: 'Building tracking dashboard. Connecting UTM parameters, conversion pixels, and lead scoring rules...', duration: 1400 },
        ],
        output: {
          headline: 'Lead gen campaign launched.',
          stats: [
            { label: 'Ad Variations', value: '3' },
            { label: 'Channels', value: '2' },
            { label: 'Follow-up Steps', value: '3' },
            { label: 'Est. Reach', value: '15K' },
          ],
        },
      },
      {
        label: 'Onboard a new client',
        steps: [
          { agentIndex: 2, action: 'Creating client workspace: shared drive, project board, communication channel, and credentials...', duration: 1400 },
          { agentIndex: 3, action: 'Sending welcome email with onboarding checklist, brand questionnaire, and kickoff scheduling link...', duration: 1500 },
          { agentIndex: 2, action: 'Setting up deliverable timeline: 12 milestones over 90 days. Dependencies mapped and assigned...', duration: 1600 },
          { agentIndex: 4, action: 'Drafting 5-email welcome sequence. Preparing first deliverable preview for day-3 review...', duration: 1800 },
        ],
        output: {
          headline: 'Client fully onboarded.',
          stats: [
            { label: 'Workspace', value: 'Ready' },
            { label: 'Milestones', value: '12' },
            { label: 'Emails Queued', value: '5' },
            { label: 'First Delivery', value: '72hrs' },
          ],
        },
      },
      {
        label: 'Generate monthly performance report',
        steps: [
          { agentIndex: 2, action: 'Pulling metrics from CRM, analytics, and billing. Revenue, churn, leads, and conversion rates...', duration: 1600 },
          { agentIndex: 0, action: 'Analyzing trends: MoM growth +12%, churn down 3%, top channel is organic search...', duration: 1800 },
          { agentIndex: 4, action: 'Building visual report with charts, KPI cards, and executive summary. Exporting PDF and slide deck...', duration: 2000 },
        ],
        output: {
          headline: 'Monthly report generated.',
          stats: [
            { label: 'Revenue MoM', value: '+12%' },
            { label: 'Churn', value: '-3%' },
            { label: 'New Leads', value: '142' },
            { label: 'Pages', value: '8' },
          ],
        },
      },
    ],
  },
  {
    id: 'sports',
    icon: Dumbbell,
    label: 'Sports Coaches',
    agents: [
      { name: 'Recruiting Scout', initials: 'RS', role: 'Talent Pipeline', color: 'bg-cyan-500/20', textColor: 'text-cyan-400' },
      { name: 'Film Analyst', initials: 'FA', role: 'Game Breakdown', color: 'bg-orange-500/20', textColor: 'text-orange-400' },
      { name: 'Player Development', initials: 'PD', role: 'Training & Growth', color: 'bg-green-500/20', textColor: 'text-green-400' },
      { name: 'NIL Coordinator', initials: 'NC', role: 'Brand & Deals', color: 'bg-violet-500/20', textColor: 'text-violet-400' },
      { name: 'Communications Director', initials: 'CD', role: 'Media & Outreach', color: 'bg-pink-500/20', textColor: 'text-pink-400' },
    ],
    missions: [
      {
        label: 'Scout next opponent and generate game plan',
        steps: [
          { agentIndex: 1, action: 'Analyzing last 5 games of opponent film. Identifying offensive tendencies and defensive weaknesses...', duration: 2000 },
          { agentIndex: 1, action: 'Charting play frequency: 62% run on 1st down, heavy zone coverage on 3rd and long...', duration: 1800 },
          { agentIndex: 2, action: 'Matching our personnel packages to exploit their weak-side linebacker and slot coverage gaps...', duration: 1600 },
          { agentIndex: 4, action: 'Preparing scouting report handout and video breakdown clips for position group meetings...', duration: 1500 },
        ],
        output: {
          headline: 'Game plan ready for review.',
          stats: [
            { label: 'Games Analyzed', value: '5' },
            { label: 'Key Tendencies', value: '8' },
            { label: 'Play Calls', value: '24' },
            { label: 'Video Clips', value: '15' },
          ],
        },
      },
      {
        label: 'Create personalized development plans for roster',
        steps: [
          { agentIndex: 2, action: 'Pulling performance metrics for all 85 roster players. Benchmarking against position averages...', duration: 1800 },
          { agentIndex: 1, action: 'Analyzing film grades for each player. Identifying top 3 improvement areas per position group...', duration: 2000 },
          { agentIndex: 2, action: 'Building individualized training plans: drills, film study assignments, and measurable goals...', duration: 2200 },
          { agentIndex: 3, action: 'Flagging 12 players with NIL potential. Preparing personal brand development recommendations...', duration: 1400 },
        ],
        output: {
          headline: 'Development plans created.',
          stats: [
            { label: 'Players', value: '85' },
            { label: 'Plans Built', value: '85' },
            { label: 'NIL Flagged', value: '12' },
            { label: 'Drill Sets', value: '24' },
          ],
        },
      },
      {
        label: 'Run recruiting outreach campaign',
        steps: [
          { agentIndex: 0, action: 'Screening 200 prospects from recruiting database. Filtering by position need, academics, and film grade...', duration: 1800 },
          { agentIndex: 0, action: 'Ranking top 40 targets. Pulling highlight film, transcripts, and contact info...', duration: 1600 },
          { agentIndex: 4, action: 'Drafting personalized outreach emails and social DMs for each prospect. Referencing their film highlights...', duration: 2000 },
          { agentIndex: 4, action: 'Scheduling campus visit invitations and building prospect tracking board in recruiting software...', duration: 1500 },
        ],
        output: {
          headline: 'Recruiting campaign deployed.',
          stats: [
            { label: 'Prospects Screened', value: '200' },
            { label: 'Top Targets', value: '40' },
            { label: 'Outreach Sent', value: '40' },
            { label: 'Visits Invited', value: '15' },
          ],
        },
      },
    ],
  },
  {
    id: 'churches',
    icon: Church,
    label: 'Churches & Ministries',
    agents: [
      { name: 'Community Coordinator', initials: 'CC', role: 'Engagement & Groups', color: 'bg-cyan-500/20', textColor: 'text-cyan-400' },
      { name: 'Volunteer Manager', initials: 'VM', role: 'Teams & Scheduling', color: 'bg-orange-500/20', textColor: 'text-orange-400' },
      { name: 'Content Creator', initials: 'CR', role: 'Media & Messaging', color: 'bg-pink-500/20', textColor: 'text-pink-400' },
      { name: 'Follow-Up Specialist', initials: 'FS', role: 'Care & Connection', color: 'bg-green-500/20', textColor: 'text-green-400' },
      { name: 'Event Planner', initials: 'EP', role: 'Services & Events', color: 'bg-violet-500/20', textColor: 'text-violet-400' },
    ],
    missions: [
      {
        label: 'Prepare materials for Sunday service',
        steps: [
          { agentIndex: 2, action: 'Generating sermon graphics, bulletin layout, and social media announcements for this Sunday\'s theme...', duration: 1800 },
          { agentIndex: 4, action: 'Coordinating with worship team: song selections confirmed, A/V checklist sent, setup timeline built...', duration: 1600 },
          { agentIndex: 1, action: 'Confirming volunteer assignments: 4 greeters, 2 ushers, 3 kids ministry, 2 tech booth. Sending reminders...', duration: 1500 },
          { agentIndex: 2, action: 'Drafting welcome script for new visitors. Preparing connection cards and small group info packets...', duration: 1400 },
        ],
        output: {
          headline: 'Sunday service materials ready.',
          stats: [
            { label: 'Graphics', value: '6' },
            { label: 'Volunteers', value: '11' },
            { label: 'Songs', value: '4' },
            { label: 'Handouts', value: '3' },
          ],
        },
      },
      {
        label: 'Follow up with all new visitors from last week',
        steps: [
          { agentIndex: 3, action: 'Pulling connection cards from last Sunday. Found 14 new visitors. Verifying contact info...', duration: 1500 },
          { agentIndex: 3, action: 'Sending personalized welcome emails with service times, small group options, and pastor\'s message...', duration: 1800 },
          { agentIndex: 0, action: 'Matching 8 visitors to relevant small groups based on demographics and interests noted on cards...', duration: 1600 },
          { agentIndex: 3, action: 'Scheduling follow-up calls for Wednesday. Flagging 3 visitors who indicated prayer requests...', duration: 1300 },
        ],
        output: {
          headline: 'Visitor follow-up complete.',
          stats: [
            { label: 'Visitors', value: '14' },
            { label: 'Emails Sent', value: '14' },
            { label: 'Group Matches', value: '8' },
            { label: 'Prayer Requests', value: '3' },
          ],
        },
      },
      {
        label: 'Coordinate volunteer schedule for next month',
        steps: [
          { agentIndex: 1, action: 'Pulling availability from 45 active volunteers. Cross-referencing with PTO and blackout dates...', duration: 1600 },
          { agentIndex: 1, action: 'Auto-scheduling 4 Sundays plus 2 special events. Balancing workload across all teams...', duration: 2000 },
          { agentIndex: 1, action: 'Sending schedule confirmations and swap request links to all volunteers...', duration: 1400 },
          { agentIndex: 4, action: 'Updating event calendar. Flagging 2 gaps in kids ministry needing recruitment...', duration: 1200 },
        ],
        output: {
          headline: 'Volunteer schedule set.',
          stats: [
            { label: 'Volunteers', value: '45' },
            { label: 'Sundays', value: '4' },
            { label: 'Events', value: '2' },
            { label: 'Gaps Found', value: '2' },
          ],
        },
      },
    ],
  },
  {
    id: 'coaches',
    icon: Users,
    label: 'Life & Business Coaches',
    agents: [
      { name: 'Client Prep Specialist', initials: 'CP', role: 'Session Readiness', color: 'bg-cyan-500/20', textColor: 'text-cyan-400' },
      { name: 'Follow-Up Manager', initials: 'FM', role: 'Accountability', color: 'bg-green-500/20', textColor: 'text-green-400' },
      { name: 'Content Engine', initials: 'CE', role: 'Thought Leadership', color: 'bg-pink-500/20', textColor: 'text-pink-400' },
      { name: 'Lead Generator', initials: 'LG', role: 'Pipeline & Bookings', color: 'bg-violet-500/20', textColor: 'text-violet-400' },
      { name: 'Program Builder', initials: 'PB', role: 'Curriculum & Products', color: 'bg-orange-500/20', textColor: 'text-orange-400' },
    ],
    missions: [
      {
        label: 'Prepare briefs for tomorrow\'s client sessions',
        steps: [
          { agentIndex: 0, action: 'Pulling session history for 6 clients scheduled tomorrow. Summarizing last session notes and goals...', duration: 1600 },
          { agentIndex: 0, action: 'Checking accountability metrics: 4 clients on track, 1 behind on action items, 1 new client...', duration: 1500 },
          { agentIndex: 0, action: 'Building session agendas with talking points, progress check-ins, and recommended exercises...', duration: 1800 },
          { agentIndex: 1, action: 'Sending pre-session reminders to all 6 clients with prep questions and Zoom links...', duration: 1200 },
        ],
        output: {
          headline: 'Session briefs ready.',
          stats: [
            { label: 'Clients', value: '6' },
            { label: 'Briefs Built', value: '6' },
            { label: 'Action Items', value: '18' },
            { label: 'Reminders Sent', value: '6' },
          ],
        },
      },
      {
        label: 'Create follow-up resources from today\'s sessions',
        steps: [
          { agentIndex: 1, action: 'Processing session notes from 5 completed sessions. Extracting key takeaways and commitments...', duration: 1600 },
          { agentIndex: 1, action: 'Generating personalized action plans with deadlines and check-in dates for each client...', duration: 1800 },
          { agentIndex: 2, action: 'Creating shareable resources: 2 worksheet PDFs, 1 guided meditation script, 1 goal tracker template...', duration: 2000 },
          { agentIndex: 1, action: 'Sending follow-up emails with session summaries, resources, and next session scheduling links...', duration: 1400 },
        ],
        output: {
          headline: 'Follow-ups delivered.',
          stats: [
            { label: 'Sessions Processed', value: '5' },
            { label: 'Action Plans', value: '5' },
            { label: 'Resources Created', value: '4' },
            { label: 'Emails Sent', value: '5' },
          ],
        },
      },
      {
        label: 'Draft a new group coaching program',
        steps: [
          { agentIndex: 4, action: 'Analyzing your most successful 1:1 session topics. Identifying 6 core modules for group curriculum...', duration: 1800 },
          { agentIndex: 4, action: 'Building 8-week program structure: weekly themes, exercises, homework, and group discussion prompts...', duration: 2200 },
          { agentIndex: 2, action: 'Writing sales page copy, enrollment email sequence, and social media launch content...', duration: 2000 },
          { agentIndex: 3, action: 'Setting up enrollment page, payment processing, and automated onboarding flow for participants...', duration: 1600 },
        ],
        output: {
          headline: 'Group program drafted.',
          stats: [
            { label: 'Modules', value: '6' },
            { label: 'Weeks', value: '8' },
            { label: 'Exercises', value: '24' },
            { label: 'Launch Assets', value: '8' },
          ],
        },
      },
    ],
  },
]

/* ─── Streaming text hook ─── */
function useStreamText(text: string, isActive: boolean, speed = 20) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isActive) {
      setDisplayed('')
      setDone(false)
      return
    }
    let index = 0
    setDisplayed('')
    setDone(false)

    intervalRef.current = setInterval(() => {
      const nextSpace = text.indexOf(' ', index)
      const end = nextSpace === -1 ? text.length : nextSpace + 1
      setDisplayed(text.slice(0, end))
      index = end
      if (index >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDone(true)
      }
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, isActive, speed])

  return { displayed, done }
}

/* ─── Agent Deploy Card ─── */
function AgentDeployCard({
  agent,
  deployState,
  index,
}: {
  agent: AgentDef
  deployState: 'waiting' | 'deploying' | 'ready'
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="flex items-center gap-3 bg-bg-card border border-border rounded-xl px-4 py-3 hover:border-border-bright transition-all"
    >
      <div className={`w-9 h-9 rounded-lg ${agent.color} flex items-center justify-center shrink-0`}>
        <span className={`text-xs font-bold ${agent.textColor}`}>{agent.initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{agent.name}</p>
        <p className="text-[11px] text-text-muted truncate">{agent.role}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {deployState === 'waiting' && <div className="w-2 h-2 rounded-full bg-border" />}
        {deployState === 'deploying' && (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <Loader2 size={14} className="text-accent" />
          </motion.div>
        )}
        {deployState === 'ready' && <Check size={14} className="text-green-400" />}
        <span className={`text-[11px] font-medium ${
          deployState === 'ready' ? 'text-green-400' : deployState === 'deploying' ? 'text-accent' : 'text-text-muted'
        }`}>
          {deployState === 'ready' ? 'Ready' : deployState === 'deploying' ? 'Deploying...' : 'Queued'}
        </span>
      </div>
    </motion.div>
  )
}

/* ─── Mission Step Card ─── */
function MissionStepCard({
  agent,
  action,
  stepStatus,
  isStreaming,
  index,
}: {
  agent: AgentDef
  action: string
  stepStatus: 'pending' | 'working' | 'done'
  isStreaming: boolean
  index: number
}) {
  const { displayed, done } = useStreamText(action, isStreaming, 14)

  const statusIcon = () => {
    if (stepStatus === 'done' || done) return <Check size={12} className="text-green-400" />
    if (isStreaming) return (
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
        <Loader2 size={12} className="text-accent" />
      </motion.div>
    )
    return <div className="w-3 h-3 rounded-full bg-border" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-bg-card border border-border rounded-xl p-4 hover:border-border-bright transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg ${agent.color} flex items-center justify-center`}>
            <span className={`text-xs font-bold ${agent.textColor}`}>{agent.initials}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{agent.name}</p>
            <p className="text-[11px] text-text-muted">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {statusIcon()}
          <span className={`text-[11px] font-medium ${
            stepStatus === 'done' || done ? 'text-green-400' : isStreaming ? 'text-accent' : 'text-text-muted'
          }`}>
            {stepStatus === 'done' || done ? 'Complete' : isStreaming ? 'Working...' : 'Queued'}
          </span>
        </div>
      </div>
      <div className="min-h-[40px]">
        <p className="text-xs text-text-secondary leading-relaxed">
          {isStreaming || stepStatus === 'done' || done ? displayed || action : ''}
          {isStreaming && !done && (
            <span className="inline-block w-[2px] h-3 bg-accent ml-0.5 animate-pulse align-text-bottom" />
          )}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Progress Bar ─── */
function ProgressBar({ total, completed, isRunning }: { total: number; completed: number; isRunning: boolean }) {
  const pct = total === 0 ? 0 : (completed / total) * 100
  return (
    <div className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-gradient-start to-gradient-end rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {isRunning && completed < total && (
        <motion.div
          className="h-full bg-accent/30 rounded-full -mt-1.5"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: `${pct + 100 / total}%` }}
        />
      )}
    </div>
  )
}

/* ─── Main Move Demo ─── */
export default function MoveDemo() {
  const [selectedId, setSelectedId] = useState(scenarios[0].id)
  const [phase, setPhase] = useState<Phase>('idle')
  const [deployedCount, setDeployedCount] = useState(0)
  const [deployingIndex, setDeployingIndex] = useState(-1)
  const [selectedMission, setSelectedMission] = useState(-1)
  const [activeStepIndex, setActiveStepIndex] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [streamingIndex, setStreamingIndex] = useState(-1)

  // CTA form state
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('')
  const [investInterest, setInvestInterest] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([])
  const activityRef = useRef<HTMLDivElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)

  const scenario = scenarios.find((s) => s.id === selectedId)!

  const clearTimers = () => {
    timerRefs.current.forEach(clearTimeout)
    timerRefs.current = []
  }

  const reset = useCallback(() => {
    clearTimers()
    setPhase('idle')
    setDeployedCount(0)
    setDeployingIndex(-1)
    setSelectedMission(-1)
    setActiveStepIndex(-1)
    setCompletedSteps([])
    setStreamingIndex(-1)
  }, [])

  // Reset on scenario switch
  useEffect(() => {
    reset()
  }, [selectedId, reset])

  // Phase 1: Deploy agents one by one
  const deployAgents = useCallback(() => {
    if (phase !== 'idle') return
    clearTimers()
    setPhase('deploying')
    setDeployedCount(0)
    setDeployingIndex(0)

    const agents = scenario.agents
    let delay = 0

    agents.forEach((_, i) => {
      // Start deploying agent i
      const startT = setTimeout(() => {
        setDeployingIndex(i)
      }, delay)
      timerRefs.current.push(startT)

      delay += 600

      // Mark agent i as ready
      const readyT = setTimeout(() => {
        setDeployedCount((prev) => prev + 1)
        setDeployingIndex(-1)
      }, delay)
      timerRefs.current.push(readyT)

      delay += 200
    })

    // All agents ready
    const doneT = setTimeout(() => {
      setPhase('agents-ready')
      setDeployingIndex(-1)
    }, delay + 300)
    timerRefs.current.push(doneT)
  }, [phase, scenario])

  // Phase 2: Run selected mission
  const runMission = useCallback((missionIdx: number) => {
    if (phase !== 'agents-ready') return
    clearTimers()
    setSelectedMission(missionIdx)
    setPhase('mission-running')
    setActiveStepIndex(0)
    setCompletedSteps([])
    setStreamingIndex(0)

    setTimeout(() => {
      activityRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)

    const mission = scenario.missions[missionIdx]
    let cumulativeDelay = 0

    mission.steps.forEach((step, i) => {
      const startT = setTimeout(() => {
        setActiveStepIndex(i)
        setStreamingIndex(i)
      }, cumulativeDelay)
      timerRefs.current.push(startT)

      cumulativeDelay += step.duration

      const doneT = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, i])
        setStreamingIndex(-1)
      }, cumulativeDelay)
      timerRefs.current.push(doneT)

      cumulativeDelay += 400
    })

    const finalT = setTimeout(() => {
      setPhase('complete')
      setStreamingIndex(-1)
    }, cumulativeDelay + 200)
    timerRefs.current.push(finalT)
  }, [phase, scenario])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setFormLoading(true)
    await submitLead({ source: 'move-demo', email, interest, investInterest })
    setSubmitted(true)
    setFormLoading(false)
  }

  const currentMission = selectedMission >= 0 ? scenario.missions[selectedMission] : null
  const totalProgressSteps = scenario.agents.length + (currentMission ? currentMission.steps.length : 0)
  const progressCompleted = deployedCount + completedSteps.length

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-grid">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-gradient-start/8 to-gradient-end/8 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-bright bg-bg-card/50 text-text-muted text-sm mb-6">
              <Zap size={14} className="text-accent" />
              Move Demo
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.05] mb-5"
          >
            Deploy your agents.
            <br />
            <span className="gradient-text">Pick a mission. Watch them execute.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Move builds a custom AI team for your use case, then lets you
            assign real missions. Watch specialized agents coordinate
            and deliver -- all in real time.
          </motion.p>
        </div>
      </section>

      {/* Demo Workspace */}
      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Scenario Pills - horizontal scrollable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-text-muted mb-4">
              Choose your scenario
            </p>
            <div
              ref={pillsRef}
              className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none' }}
            >
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all cursor-pointer text-sm font-medium whitespace-nowrap ${
                    selectedId === s.id
                      ? 'bg-accent/10 border-accent/40 text-white ring-1 ring-accent/20'
                      : 'bg-bg-card border-border hover:border-border-bright text-text-secondary hover:text-white'
                  }`}
                >
                  <s.icon
                    size={16}
                    className={selectedId === s.id ? 'text-accent' : 'text-text-muted'}
                  />
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <ProgressBar
              total={totalProgressSteps}
              completed={progressCompleted}
              isRunning={phase === 'deploying' || phase === 'mission-running'}
            />
          </motion.div>

          {/* Main Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Left Panel: Agents + Controls */}
              <div className="lg:col-span-2">
                <div className="bg-bg-card border border-border rounded-2xl overflow-hidden sticky top-28">
                  <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                    <Bot size={14} className="text-accent" />
                    <p className="text-sm font-semibold text-text-secondary">
                      {phase === 'idle' ? 'Your Agent Team' : phase === 'deploying' ? 'Deploying Agents...' : 'Agent Team'}
                    </p>
                    {phase !== 'idle' && (
                      <span className="ml-auto text-xs text-text-muted">
                        {deployedCount}/{scenario.agents.length} ready
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    {scenario.agents.map((agent, i) => {
                      let deployState: 'waiting' | 'deploying' | 'ready' = 'waiting'
                      if (i < deployedCount) deployState = 'ready'
                      else if (i === deployingIndex) deployState = 'deploying'
                      else if (phase !== 'idle') deployState = 'waiting'

                      return (
                        <AgentDeployCard
                          key={agent.name}
                          agent={agent}
                          deployState={phase === 'idle' ? 'waiting' : deployState}
                          index={i}
                        />
                      )
                    })}
                  </div>

                  {/* Deploy / Mission Select / Reset */}
                  <div className="px-4 pb-4 pt-2">
                    {phase === 'idle' && (
                      <button
                        onClick={deployAgents}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-accent hover:bg-accent-hover rounded-full transition-all cursor-pointer border-none shadow-lg shadow-accent/20"
                      >
                        <Rocket size={16} />
                        Deploy Agents
                      </button>
                    )}

                    {phase === 'deploying' && (
                      <button
                        disabled
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white/40 bg-accent/30 rounded-full cursor-not-allowed border-none"
                      >
                        <Loader2 size={16} className="animate-spin" />
                        Deploying team...
                      </button>
                    )}

                    {phase === 'agents-ready' && (
                      <div className="space-y-3">
                        <p className="text-[11px] uppercase tracking-widest text-text-muted font-semibold">
                          Choose a mission
                        </p>
                        {scenario.missions.map((mission, i) => (
                          <button
                            key={i}
                            onClick={() => runMission(i)}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left font-medium text-text-secondary hover:text-white bg-bg-elevated hover:bg-bg-card border border-border hover:border-accent/40 rounded-xl transition-all cursor-pointer"
                          >
                            <Play size={14} className="text-accent shrink-0" />
                            <span className="flex-1">{mission.label}</span>
                            <ChevronRight size={14} className="text-text-muted shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}

                    {(phase === 'mission-running' || phase === 'complete') && (
                      <div className="space-y-2">
                        <div className="px-3 py-2 bg-accent/10 rounded-lg border border-accent/20">
                          <p className="text-xs text-accent font-medium">Active Mission</p>
                          <p className="text-sm text-white font-semibold mt-0.5">{currentMission?.label}</p>
                        </div>
                        <button
                          onClick={reset}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-text-secondary hover:text-white bg-transparent border border-border hover:border-border-bright rounded-full transition-all cursor-pointer"
                        >
                          <RotateCcw size={14} />
                          Reset
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Panel: Activity Feed */}
              <div className="lg:col-span-3" ref={activityRef}>
                <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        phase === 'mission-running' ? 'bg-accent animate-pulse'
                          : phase === 'complete' ? 'bg-green-400'
                          : phase === 'deploying' ? 'bg-accent animate-pulse'
                          : phase === 'agents-ready' ? 'bg-green-400'
                          : 'bg-text-muted'
                      }`} />
                      <p className="text-sm font-semibold text-text-secondary">
                        {phase === 'idle' ? 'Activity Feed'
                          : phase === 'deploying' ? 'Deploying Agents...'
                          : phase === 'agents-ready' ? 'All Agents Ready'
                          : phase === 'mission-running' ? 'Mission In Progress'
                          : 'Mission Complete'}
                      </p>
                    </div>
                    {currentMission && (
                      <span className="text-xs text-text-muted">
                        {completedSteps.length}/{currentMission.steps.length} steps
                      </span>
                    )}
                  </div>

                  <div className="p-4 min-h-[500px]">
                    <AnimatePresence mode="wait">
                      {/* Idle state */}
                      {phase === 'idle' && (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center justify-center h-[500px] gap-4"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center">
                            <Zap size={24} className="text-text-muted" />
                          </div>
                          <p className="text-sm text-text-muted text-center max-w-xs">
                            Click "Deploy Agents" to build your {scenario.agents.length}-agent
                            team for {scenario.label.toLowerCase()}. Then pick a mission to execute.
                          </p>
                        </motion.div>
                      )}

                      {/* Deploying phase - show agents appearing */}
                      {phase === 'deploying' && (
                        <motion.div
                          key="deploying"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center justify-center h-[500px] gap-6"
                        >
                          <div className="grid grid-cols-3 gap-3">
                            {scenario.agents.map((agent, i) => {
                              const isDeployed = i < deployedCount
                              const isActive = i === deployingIndex
                              return (
                                <motion.div
                                  key={agent.name}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{
                                    opacity: isDeployed || isActive ? 1 : 0.3,
                                    scale: isDeployed || isActive ? 1 : 0.9,
                                  }}
                                  transition={{ duration: 0.4 }}
                                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                                    isDeployed ? 'bg-accent/5 border-accent/20' : isActive ? 'bg-bg-elevated border-accent/30' : 'bg-bg-elevated border-border'
                                  }`}
                                >
                                  <div className={`w-12 h-12 rounded-xl ${agent.color} flex items-center justify-center`}>
                                    <span className={`text-sm font-bold ${agent.textColor}`}>{agent.initials}</span>
                                  </div>
                                  <p className="text-xs font-semibold text-white text-center leading-tight">{agent.name}</p>
                                  <p className="text-[10px] text-text-muted text-center">{agent.role}</p>
                                  {isDeployed && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1">
                                      <Check size={10} className="text-green-400" />
                                      <span className="text-[10px] text-green-400 font-medium">Ready</span>
                                    </motion.div>
                                  )}
                                  {isActive && (
                                    <div className="flex items-center gap-1">
                                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                        <Loader2 size={10} className="text-accent" />
                                      </motion.div>
                                      <span className="text-[10px] text-accent font-medium">Deploying</span>
                                    </div>
                                  )}
                                  {!isDeployed && !isActive && (
                                    <span className="text-[10px] text-text-muted">Queued</span>
                                  )}
                                </motion.div>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}

                      {/* Agents Ready - waiting for mission selection */}
                      {phase === 'agents-ready' && (
                        <motion.div
                          key="ready"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center justify-center h-[500px] gap-6"
                        >
                          <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center"
                          >
                            <Check size={28} className="text-green-400" />
                          </motion.div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-white mb-1">
                              {scenario.agents.length} agents deployed and ready.
                            </p>
                            <p className="text-sm text-text-secondary max-w-md">
                              Your {scenario.label.toLowerCase()} team is standing by.
                              Pick a mission from the panel to watch them execute.
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {scenario.agents.map((agent) => (
                              <div
                                key={agent.name}
                                className={`w-10 h-10 rounded-lg ${agent.color} flex items-center justify-center`}
                                title={agent.name}
                              >
                                <span className={`text-xs font-bold ${agent.textColor}`}>{agent.initials}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Mission running / complete */}
                      {(phase === 'mission-running' || phase === 'complete') && currentMission && (
                        <motion.div
                          key="mission"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-3"
                        >
                          {currentMission.steps.map((step, i) => {
                            if (i > activeStepIndex && phase === 'mission-running') return null
                            const isComplete = completedSteps.includes(i)
                            const isCurrentlyStreaming = streamingIndex === i
                            const agent = scenario.agents[step.agentIndex]

                            return (
                              <MissionStepCard
                                key={`step-${i}`}
                                agent={agent}
                                action={step.action}
                                stepStatus={
                                  isComplete ? 'done'
                                    : isCurrentlyStreaming ? 'working'
                                    : phase === 'complete' ? 'done'
                                    : 'pending'
                                }
                                isStreaming={isCurrentlyStreaming || (phase === 'complete' && !isComplete)}
                                index={i}
                              />
                            )
                          })}

                          {/* Output card */}
                          <AnimatePresence>
                            {phase === 'complete' && (
                              <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mt-4 bg-accent/5 border border-accent/20 rounded-xl p-5"
                              >
                                <div className="flex items-center gap-2 mb-4">
                                  <Check size={16} className="text-accent" />
                                  <p className="text-sm font-bold text-white">{currentMission.output.headline}</p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                  {currentMission.output.stats.map((stat) => (
                                    <div key={stat.label} className="bg-bg-card/50 rounded-lg p-3 text-center">
                                      <p className="text-lg font-black text-accent">{stat.value}</p>
                                      <p className="text-[11px] text-text-muted">{stat.label}</p>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA: Same form as homepage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="mt-24"
          >
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">Request an Invite</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.03em] leading-tight mb-4">
                That took seconds.
                <br />
                Manually, it takes hours.
              </h2>
              <p className="text-lg text-text-secondary mb-10">
                Move coordinates specialized AI agents to execute complex tasks --
                all from a single command. Request an invite to be first in line.
              </p>

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
                    <option value="now">Now -- Personalized Intelligence</option>
                    <option value="move">Move -- AI Command Center</option>
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
                    disabled={formLoading}
                    className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-black bg-accent hover:bg-accent-hover disabled:opacity-50 rounded-full transition-all cursor-pointer border-none flex items-center justify-center gap-2"
                  >
                    {formLoading ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        Request Invite
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
