import { Activity, Bot, CheckCircle2, Circle, Clock, Globe, Mail, MessageSquare, Send, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'

/* ─── shared browser chrome wrapper ─── */
function BrowserFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/60 ${className}`}>
      {/* toolbar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <div className="flex-1 mx-4">
          <div className="mx-auto max-w-[220px] h-5 rounded-md bg-zinc-800 border border-zinc-700/50 flex items-center justify-center">
            <span className="text-[10px] text-zinc-500 select-none tracking-wide">makeyourmove.ai</span>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="bg-zinc-950">{children}</div>
    </div>
  )
}

/* ─── blinking status dot ─── */
function StatusDot({ color = 'green', pulse = false }: { color?: 'green' | 'yellow' | 'blue'; pulse?: boolean }) {
  const colors = {
    green: 'bg-emerald-400',
    yellow: 'bg-amber-400',
    blue: 'bg-blue-400',
  }
  return (
    <span className="relative flex h-2 w-2">
      {pulse && (
        <span className={`absolute inline-flex h-full w-full rounded-full ${colors[color]} opacity-75 animate-ping`} />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${colors[color]}`} />
    </span>
  )
}

/* ─── mini avatar ─── */
function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 ${color}`}>
      {initials}
    </div>
  )
}

/* ====================================================================
   NOW MOCKUP
   ==================================================================== */

const audienceMembers = [
  {
    initials: 'MR',
    name: 'Maria Reyes',
    tag: 'Spanish',
    tagColor: 'bg-amber-500/15 text-amber-400',
    color: 'bg-gradient-to-br from-rose-500 to-orange-500',
    preview: 'La resiliencia no es algo que nace de la nada, se construye con cada desaf\u00edo...',
  },
  {
    initials: 'JT',
    name: 'James Torres',
    tag: 'New Leader',
    tagColor: 'bg-sky-500/15 text-sky-400',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    preview: 'Think of resilience like a muscle — every setback is a rep that makes you stronger...',
  },
  {
    initials: 'SK',
    name: 'Sarah Kim',
    tag: 'Student',
    tagColor: 'bg-violet-500/15 text-violet-400',
    color: 'bg-gradient-to-br from-violet-500 to-purple-500',
    preview: 'Resilience is basically bouncing back stronger every time life knocks you down...',
  },
  {
    initials: 'DW',
    name: 'David Washington',
    tag: 'Executive',
    tagColor: 'bg-emerald-500/15 text-emerald-400',
    color: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    preview: 'The key insight here is that resilience compounds — each challenge you overcome builds capacity...',
  },
]

export function NowMockup() {
  return (
    <BrowserFrame>
      {/* top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Now</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <StatusDot color="green" pulse />
            <span className="text-[10px] font-medium text-emerald-400">Live Session</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500">Keynote Session</span>
          <Clock size={12} className="text-zinc-600" />
          <span className="text-[10px] text-zinc-500 tabular-nums">14:32</span>
        </div>
      </div>

      {/* main content area */}
      <div className="flex min-h-[320px]">
        {/* left: original message */}
        <div className="w-[42%] p-4 border-r border-zinc-800/60">
          <div className="flex items-center gap-2 mb-3">
            <Send size={12} className="text-blue-400" />
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Original Message</span>
          </div>
          <div className="rounded-lg bg-zinc-900/70 border border-zinc-800/60 p-3">
            <p className="text-[11px] leading-relaxed text-zinc-300">
              "Resilience is not something we're born with. It is a skill we build through every challenge we face. When we embrace adversity as fuel, everything changes..."
            </p>
            <div className="mt-3 pt-2 border-t border-zinc-800/50 flex items-center gap-2">
              <Avatar initials="TM" color="bg-gradient-to-br from-blue-600 to-blue-400" />
              <div>
                <p className="text-[10px] font-medium text-zinc-300">Taylor Mitchell</p>
                <p className="text-[9px] text-zinc-600">Speaker</p>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <Sparkles size={10} className="text-blue-400" />
            <span className="text-[9px] text-zinc-500">AI personalizing for each audience member</span>
          </div>

          {/* mini progress indicators */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-zinc-600">Personalization</span>
              <span className="text-[9px] text-blue-400 tabular-nums">98.2%</span>
            </div>
            <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: '98.2%' }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-zinc-600">Delivery</span>
              <span className="text-[9px] text-emerald-400 tabular-nums">100%</span>
            </div>
            <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* right: audience cards */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users size={12} className="text-cyan-400" />
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Personalized Variants</span>
            </div>
            <span className="text-[10px] text-zinc-600">4 of 247 shown</span>
          </div>
          <div className="space-y-2">
            {audienceMembers.map((m) => (
              <div
                key={m.initials}
                className="rounded-lg bg-zinc-900/50 border border-zinc-800/50 p-2.5 hover:border-zinc-700/60 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Avatar initials={m.initials} color={m.color} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-zinc-200">{m.name}</span>
                      <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${m.tagColor}`}>{m.tag}</span>
                    </div>
                  </div>
                  <CheckCircle2 size={12} className="text-emerald-500/70 shrink-0" />
                </div>
                <p className="text-[10px] leading-relaxed text-zinc-500 pl-10 truncate">{m.preview}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-800/80 bg-zinc-900/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Users size={11} className="text-zinc-500" />
            <span className="text-[10px] font-medium text-zinc-400 tabular-nums">247 Recipients</span>
          </div>
          <div className="w-px h-3 bg-zinc-800" />
          <div className="flex items-center gap-1.5">
            <Sparkles size={11} className="text-zinc-500" />
            <span className="text-[10px] font-medium text-zinc-400 tabular-nums">98.2% Personalized</span>
          </div>
          <div className="w-px h-3 bg-zinc-800" />
          <div className="flex items-center gap-1.5">
            <Globe size={11} className="text-zinc-500" />
            <span className="text-[10px] font-medium text-zinc-400 tabular-nums">12 Languages</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10">
          <StatusDot color="blue" pulse />
          <span className="text-[9px] font-medium text-blue-400">Broadcasting</span>
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ====================================================================
   MOVE MOCKUP
   ==================================================================== */

const agents = [
  { name: 'Kai', role: 'Marketing', status: 'green' as const, active: true },
  { name: 'Nova', role: 'Sales', status: 'green' as const, active: true },
  { name: 'Sage', role: 'Support', status: 'green' as const, active: true },
  { name: 'Rex', role: 'Fulfillment', status: 'yellow' as const, active: true },
  { name: 'Aria', role: 'Content', status: 'green' as const, active: true },
]

const agentColors: Record<string, string> = {
  Kai: 'bg-gradient-to-br from-pink-500 to-rose-500',
  Nova: 'bg-gradient-to-br from-purple-500 to-violet-500',
  Sage: 'bg-gradient-to-br from-emerald-500 to-green-500',
  Rex: 'bg-gradient-to-br from-amber-500 to-orange-500',
  Aria: 'bg-gradient-to-br from-blue-500 to-indigo-500',
}

const activityFeed = [
  {
    agent: 'Kai',
    icon: Mail,
    action: 'Sent 47 personalized emails',
    time: '2m ago',
    color: 'text-pink-400',
  },
  {
    agent: 'Nova',
    icon: TrendingUp,
    action: 'Qualified 3 new leads',
    time: '8m ago',
    color: 'text-purple-400',
  },
  {
    agent: 'Sage',
    icon: MessageSquare,
    action: 'Resolved support ticket #1247',
    time: '12m ago',
    color: 'text-emerald-400',
  },
  {
    agent: 'Rex',
    icon: Zap,
    action: 'Processing 6 fulfillment orders',
    time: '15m ago',
    color: 'text-amber-400',
  },
  {
    agent: 'Aria',
    icon: Sparkles,
    action: 'Published 2 blog posts',
    time: '23m ago',
    color: 'text-blue-400',
  },
]

export function MoveMockup() {
  return (
    <BrowserFrame>
      {/* top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Move</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Bot size={10} className="text-purple-400" />
            <span className="text-[10px] font-medium text-purple-300">5 Agents Active</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500">Command Center</span>
          <Activity size={12} className="text-zinc-600" />
        </div>
      </div>

      {/* main content area */}
      <div className="flex min-h-[320px]">
        {/* left: agent list sidebar */}
        <div className="w-[180px] border-r border-zinc-800/60 p-3">
          <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Agents</span>
          <div className="space-y-1">
            {agents.map((a, i) => (
              <div
                key={a.name}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors cursor-default ${
                  i === 0 ? 'bg-zinc-800/60 border border-zinc-700/40' : 'hover:bg-zinc-800/30'
                }`}
              >
                <Avatar initials={a.name[0]} color={agentColors[a.name]} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-zinc-200">{a.name}</span>
                    <StatusDot color={a.status} pulse={a.status === 'green'} />
                  </div>
                  <span className="text-[9px] text-zinc-500">{a.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* agent utilization mini chart */}
          <div className="mt-4 pt-3 border-t border-zinc-800/50">
            <span className="text-[9px] text-zinc-600 block mb-2">Utilization</span>
            <div className="space-y-1.5">
              {agents.map((a) => (
                <div key={a.name} className="flex items-center gap-2">
                  <span className="text-[8px] text-zinc-500 w-6">{a.name[0] + a.name[1]}</span>
                  <div className="flex-1 h-1 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        a.status === 'yellow' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: a.status === 'yellow' ? '67%' : `${78 + Math.floor(a.name.charCodeAt(0) % 20)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right: activity feed */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-purple-400" />
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Activity Feed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Circle size={6} className="text-emerald-400 fill-emerald-400 animate-pulse" />
              <span className="text-[9px] text-zinc-500">Live</span>
            </div>
          </div>

          <div className="space-y-1.5">
            {activityFeed.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/40 hover:border-zinc-700/50 transition-colors"
              >
                <div className={`mt-0.5 p-1.5 rounded-lg bg-zinc-800/80 shrink-0`}>
                  <item.icon size={12} className={item.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-semibold ${item.color}`}>{item.agent}</span>
                    <span className="text-[11px] text-zinc-300">{item.action}</span>
                  </div>
                </div>
                <span className="text-[9px] text-zinc-600 whitespace-nowrap shrink-0">{item.time}</span>
              </div>
            ))}
          </div>

          {/* mini performance cards */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="rounded-lg bg-zinc-900/50 border border-zinc-800/40 p-2.5 text-center">
              <p className="text-[14px] font-bold text-zinc-200 tabular-nums">94%</p>
              <p className="text-[8px] text-zinc-500 mt-0.5">Autonomous</p>
            </div>
            <div className="rounded-lg bg-zinc-900/50 border border-zinc-800/40 p-2.5 text-center">
              <p className="text-[14px] font-bold text-zinc-200 tabular-nums">142</p>
              <p className="text-[8px] text-zinc-500 mt-0.5">Tasks Today</p>
            </div>
            <div className="rounded-lg bg-zinc-900/50 border border-zinc-800/40 p-2.5 text-center">
              <p className="text-[14px] font-bold text-emerald-400 tabular-nums">$12.4k</p>
              <p className="text-[8px] text-zinc-500 mt-0.5">Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-800/80 bg-zinc-900/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Zap size={11} className="text-zinc-500" />
            <span className="text-[10px] font-medium text-zinc-400 tabular-nums">142 Tasks Today</span>
          </div>
          <div className="w-px h-3 bg-zinc-800" />
          <div className="flex items-center gap-1.5">
            <Bot size={11} className="text-zinc-500" />
            <span className="text-[10px] font-medium text-zinc-400 tabular-nums">94% Autonomous</span>
          </div>
          <div className="w-px h-3 bg-zinc-800" />
          <div className="flex items-center gap-1.5">
            <TrendingUp size={11} className="text-zinc-500" />
            <span className="text-[10px] font-medium text-zinc-400 tabular-nums">$12,400 Revenue Influenced</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10">
          <StatusDot color="green" pulse />
          <span className="text-[9px] font-medium text-emerald-400">All Systems Go</span>
        </div>
      </div>
    </BrowserFrame>
  )
}
