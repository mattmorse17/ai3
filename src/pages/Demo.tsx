import { useState, useEffect, useCallback, useRef, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare,
  Church,
  Megaphone,
  Briefcase,
  BookOpen,
  Play,
  RotateCcw,
  Sparkles,
  Globe,
  Loader2,
  Check,
  ArrowRight,
  GraduationCap,
  Dumbbell,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Types ─── */
type DemoState = 'idle' | 'processing' | 'streaming' | 'complete'

interface AudienceMember {
  name: string
  description: string
  color: string
  textColor: string
  language?: string
  personalizedMessage: string
}

interface DemoScenario {
  id: string
  icon: typeof MessageSquare
  label: string
  category: string
  originalMessage: string
  audience: AudienceMember[]
}

/* ─── Scenario Data ─── */
const scenarios: DemoScenario[] = [
  {
    id: 'education',
    icon: GraduationCap,
    label: 'Classroom Curriculum',
    category: 'Education',
    originalMessage:
      "Today we're learning about the water cycle. Water evaporates from oceans and lakes, rises into the atmosphere where it condenses into clouds, and falls back to earth as precipitation. This process is essential to all life on earth and drives our weather patterns. Understanding the water cycle helps us understand climate, agriculture, and our environment.",
    audience: [
      {
        name: 'ESL Student',
        description: 'Spanish speaker, beginner English',
        color: 'bg-cyan-500/20',
        textColor: 'text-cyan-400',
        language: 'Spanish',
        personalizedMessage:
          "Hoy aprendemos sobre el ciclo del agua (the water cycle).\n\n" +
          "El agua se evapora (evaporates) de los oceanos y lagos. Sube al cielo y forma nubes (clouds). Luego cae como lluvia (rain) o nieve (snow). Esto se llama precipitacion.\n\n" +
          "Palabras importantes / Key Words:\n" +
          "\u2022 Evaporar = Evaporate\n" +
          "\u2022 Nubes = Clouds\n" +
          "\u2022 Lluvia = Rain\n" +
          "\u2022 Ciclo = Cycle\n\n" +
          "El ciclo del agua es muy importante para toda la vida en la Tierra. Sin agua, no hay comida, no hay plantas, no hay vida.\n\n" +
          "Actividad: Dibuja el ciclo del agua y escribe las palabras en ingles y espanol.",
      },
      {
        name: 'Advanced Student',
        description: 'Honors track, ready for deeper material',
        color: 'bg-purple-500/20',
        textColor: 'text-purple-400',
        personalizedMessage:
          "The water cycle is the engine behind Earth's climate system, but the textbook version is just the beginning.\n\n" +
          "Go deeper on these concepts:\n" +
          "\u2022 Transpiration \u2014 how plants release water vapor and contribute to local humidity\n" +
          "\u2022 Orographic precipitation \u2014 why mountain ranges create rain shadows\n" +
          "\u2022 Thermohaline circulation \u2014 how ocean salinity and temperature drive global water movement\n\n" +
          "Research Prompt: Investigate how deforestation in the Amazon basin is disrupting regional water cycles. What happens to precipitation patterns when transpiration drops by 30%?\n\n" +
          "Extension: Compare the water cycle on Earth to the methane cycle on Titan. What parallels exist, and what can they teach us about planetary science?\n\n" +
          "Be prepared to present your findings in a 5-minute talk next Tuesday.",
      },
      {
        name: 'Visual Learner',
        description: 'Learns best through diagrams and hands-on',
        color: 'bg-green-500/20',
        textColor: 'text-green-400',
        personalizedMessage:
          "Let's SEE the water cycle in action today.\n\n" +
          "Diagram Activity:\n" +
          "\u2022 Draw a large mountain with an ocean on the left side\n" +
          "\u2022 Use blue arrows going UP from the ocean (this is evaporation)\n" +
          "\u2022 Draw clouds forming at the top (this is condensation)\n" +
          "\u2022 Add arrows coming DOWN as rain (this is precipitation)\n" +
          "\u2022 Show water flowing back to the ocean through rivers (this is collection)\n\n" +
          "Color Code:\n" +
          "\u2022 Red arrows = heat/evaporation\n" +
          "\u2022 Blue arrows = cooling/precipitation\n" +
          "\u2022 Green arrows = plant transpiration\n\n" +
          "Hands-On Experiment: Place a bowl of water in sunlight with plastic wrap over the top. Watch droplets form on the wrap \u2014 that's YOUR water cycle in miniature.\n\n" +
          "Bonus: Take a time-lapse photo every 30 minutes and create a flipbook of your water cycle.",
      },
      {
        name: 'Student with ADHD',
        description: 'Needs chunked lessons with movement breaks',
        color: 'bg-amber-500/20',
        textColor: 'text-amber-400',
        personalizedMessage:
          "MINI-LESSON 1 (5 minutes):\nWater evaporates. That means it turns from liquid into invisible gas. Think of steam rising from a hot shower. The sun does this to oceans ALL DAY.\n\n" +
          "MOVEMENT BREAK: Stand up. Wiggle your fingers like water evaporating upward. Reach for the sky. Sit back down.\n\n" +
          "MINI-LESSON 2 (5 minutes):\nThat water gas rises up and gets cold. When it gets cold, it turns back into tiny water drops \u2014 that's what clouds are. Billions of tiny drops hanging in the air.\n\n" +
          "MOVEMENT BREAK: Blow on your hand. Feel how your breath is warm? Now fan your hand. That cooling is what happens to water vapor up high.\n\n" +
          "MINI-LESSON 3 (5 minutes):\nWhen clouds get too heavy with water, it falls. Rain, snow, sleet \u2014 all precipitation. It flows into rivers and back to the ocean. Then the whole thing starts again.\n\n" +
          "CHECKPOINT: Draw the cycle using only 4 words: Evaporate, Rise, Condense, Fall.",
      },
      {
        name: 'Struggling Reader',
        description: 'Below grade level, needs simplified text',
        color: 'bg-rose-500/20',
        textColor: 'text-rose-400',
        personalizedMessage:
          "The Water Cycle \u2014 How Water Moves\n\n" +
          "Water goes around and around. It never stops. Here is how:\n\n" +
          "Step 1: The sun heats water in lakes and oceans.\n" +
          "Step 2: The water turns into a gas and goes up into the sky.\n" +
          "Step 3: The gas gets cold and makes clouds.\n" +
          "Step 4: The clouds drop rain or snow.\n" +
          "Step 5: The rain flows into rivers and back to the ocean.\n" +
          "Step 6: It starts all over again.\n\n" +
          "Key Words to Know:\n" +
          "\u2022 Evaporate = water turns into gas\n" +
          "\u2022 Condense = gas turns back into water drops\n" +
          "\u2022 Precipitate = water falls from clouds\n\n" +
          "Audio companion available \u2014 press play to hear this lesson read aloud while you follow along.",
      },
      {
        name: 'Gifted Student',
        description: 'Needs challenge and independent research',
        color: 'bg-indigo-500/20',
        textColor: 'text-indigo-400',
        personalizedMessage:
          "You already understand the basic water cycle. Let's connect it to the bigger picture.\n\n" +
          "Climate Science Connection:\nThe water cycle is accelerating due to climate change. For every 1\u00b0C of warming, the atmosphere holds ~7% more moisture. This means more intense rainfall events AND longer droughts. It's not more water \u2014 it's more extreme distribution.\n\n" +
          "Independent Research Project (due in 2 weeks):\nChoose ONE of the following:\n" +
          "\u2022 Model how a 2\u00b0C increase in global temperature would affect precipitation in your state\n" +
          "\u2022 Research the water crisis in Cape Town (2018) \u2014 what role did water cycle disruption play?\n" +
          "\u2022 Investigate atmospheric rivers \u2014 how do they form, and why are they becoming more destructive?\n\n" +
          "Deliverable: A 1,500-word paper with at least 5 peer-reviewed sources, plus one original data visualization.\n\n" +
          "Stretch goal: Present your findings at the school science symposium next month.",
      },
    ],
  },
  {
    id: 'creator',
    icon: Megaphone,
    label: 'Content Piece',
    category: 'Creators & Influencers',
    originalMessage:
      "I just tested every AI tool on the market for content creation and here's what I found: most of them produce generic garbage that sounds like everyone else. The ones that actually work require you to spend hours training them on your voice. There's a massive gap between AI-generated content and content that actually sounds like you.",
    audience: [
      {
        name: 'New Follower',
        description: 'Just discovered you, needs context',
        color: 'bg-pink-500/20',
        textColor: 'text-pink-400',
        personalizedMessage:
          "Welcome \u2014 glad you're here. Quick intro: I've spent the last 3 years testing every content tool that claims to \"save creators time.\" I have 400K+ followers and post daily, so I'm not theorizing \u2014 I'm using these tools in the trenches.\n\n" +
          "Here's what I found after testing every major AI content tool:\n\n" +
          "\u2022 Most produce generic output that could have been written by anyone\n" +
          "\u2022 The few that work require HOURS of training on your specific voice\n" +
          "\u2022 There's a huge gap between \"AI content\" and content that actually sounds like you\n\n" +
          "Why this matters for you: If you're just starting your content journey, don't fall for the \"AI will do it all\" hype. The tool matters less than the voice you build.\n\n" +
          "Stick around \u2014 I share breakdowns like this every week. Check my pinned post for the full creator toolkit I actually use daily.",
      },
      {
        name: 'Superfan',
        description: 'Engaged for 18 months, comments on everything',
        color: 'bg-blue-500/20',
        textColor: 'text-blue-400',
        personalizedMessage:
          "You already know I don't sugarcoat this stuff, so here's the behind-the-scenes version.\n\n" +
          "I tested 23 tools over 6 weeks. My process:\n" +
          "\u2022 Gave each tool the same 5 prompts\n" +
          "\u2022 Compared output to my actual published content\n" +
          "\u2022 Had my editor blind-review which was AI and which was me\n\n" +
          "The results were honestly depressing. My editor correctly identified AI content 91% of the time. The tells? Overuse of \"delve,\" listicle formatting nobody asked for, and zero personality.\n\n" +
          "The 2 tools that came closest still needed 3-4 hours of voice training to get anywhere near usable. And even then, they nail the structure but miss the energy.\n\n" +
          "I'm working on a full breakdown with screenshots, scores, and side-by-side comparisons. Dropping it next week. You'll get it first.",
      },
      {
        name: 'Brand Partner Prospect',
        description: 'VP of Marketing at a SaaS company',
        color: 'bg-emerald-500/20',
        textColor: 'text-emerald-400',
        personalizedMessage:
          "Here's why this matters for your brand: I just published a deep analysis of every major AI content tool on the market. It's already generating significant engagement from the creator and marketing community.\n\n" +
          "Key findings your team should know:\n" +
          "\u2022 92% of AI-generated content is indistinguishable from competitors\n" +
          "\u2022 Voice training requires 3-4 hours of setup per creator\n" +
          "\u2022 The gap between AI content and authentic content is the #1 opportunity in the market right now\n\n" +
          "This post is tracking toward 500K+ impressions this week. My audience is 70% content creators and marketing professionals \u2014 exactly the people evaluating tools like yours.\n\n" +
          "If your product solves any part of this problem, let's talk about a sponsored follow-up piece or product review. My audience trusts my recommendations because I only feature tools I actually use.",
      },
      {
        name: 'Email Subscriber',
        description: 'Newsletter reader, prefers long-form',
        color: 'bg-orange-500/20',
        textColor: 'text-orange-400',
        personalizedMessage:
          "Subject: I tested every AI content tool. Here's the honest truth.\n\n" +
          "Hey \u2014\n\n" +
          "If you saw my post this week, you got the headline version. Here's the full story for newsletter subscribers only.\n\n" +
          "I spent 6 weeks and $2,400 on subscriptions testing every AI content creation tool I could find. The question was simple: can any of these actually replicate my voice?\n\n" +
          "Short answer: not yet. But some are closer than you'd think.\n\n" +
          "The Full Breakdown:\n" +
          "\u2022 Tier 1 (Actually Useful): 3 tools that get 70%+ of the way there with proper training\n" +
          "\u2022 Tier 2 (Good for Drafts): 5 tools that save time on first drafts but need heavy editing\n" +
          "\u2022 Tier 3 (Skip These): 15 tools that produce content your audience will scroll past\n\n" +
          "I'm attaching my full scoring rubric and comparison spreadsheet at the bottom of this email. It's subscriber-exclusive and won't be posted publicly.\n\n" +
          "Reply and tell me which tools YOU'RE using. I'll feature the best responses in next week's issue.",
      },
      {
        name: 'YouTube Viewer',
        description: 'Watches video content, visual learner',
        color: 'bg-red-500/20',
        textColor: 'text-red-400',
        personalizedMessage:
          "[VIDEO SCRIPT]\n\n" +
          "HOOK (0:00-0:15):\n\"I just spent six weeks testing every single AI content tool on the market. Twenty-three tools. Two thousand four hundred dollars. And I'm about to save you from wasting your money on twenty of them.\"\n\n" +
          "INTRO (0:15-0:45):\n\"What's up everyone \u2014 if you're new here, I break down the tools and strategies that actually work for content creators. No fluff, no sponsorship bias. Let's get into it.\"\n\n" +
          "SECTION 1 \u2014 The Problem (0:45-2:00):\n[SCREEN SHARE: side-by-side of AI output vs. real post]\n\"Look at this. Left side is what the AI wrote. Right side is what I actually posted. Can you tell the difference? If you can \u2014 so can your audience.\"\n\n" +
          "SECTION 2 \u2014 The Testing (2:00-5:00):\n[B-ROLL: montage of testing different tools]\n\"Here's exactly how I tested each one...\"\n\n" +
          "CTA (end):\n\"Full tier list and comparison chart in the description. Subscribe if you want the follow-up video where I show you how to train the top 3 tools on YOUR voice.\"",
      },
      {
        name: 'Podcast Listener',
        description: 'Commuter, listens during drives',
        color: 'bg-violet-500/20',
        textColor: 'text-violet-400',
        personalizedMessage:
          "[PODCAST RECAP \u2014 Conversational Format]\n\n" +
          "\"So here's the thing \u2014 I've been testing AI content tools for the past six weeks and I need to talk about what I found because honestly, it's both frustrating and fascinating.\n\n" +
          "The frustrating part? Most of these tools are basically the same thing with different logos. You paste in a prompt, you get back something that sounds like it was written by a corporate intern who's never read your content.\n\n" +
          "The fascinating part? There are about two or three tools that are genuinely getting close. Like, close enough that my editor had to look twice. But \u2014 and this is the big but \u2014 they require serious investment upfront. We're talking three to four hours of feeding it your content, your style, your preferences.\n\n" +
          "The takeaway for you, especially if you're listening during your commute and thinking 'should I try one of these?' \u2014 the answer is yes, but only the top three. Don't waste time on the rest.\n\n" +
          "Full list is in the show notes. Hit me up on socials if you want to debate my rankings.\"",
      },
    ],
  },
  {
    id: 'business',
    icon: Briefcase,
    label: 'Email to List',
    category: 'Business Owners',
    originalMessage:
      "We're launching something new next week that's going to change how you think about running your business. For the past 6 months, we've been building a system that handles the parts of your business you hate \u2014 the repetitive tasks, the follow-ups that fall through the cracks, the content you never have time to create. It's finally ready.",
    audience: [
      {
        name: 'New Lead',
        description: 'Downloaded a free guide last week',
        color: 'bg-green-500/20',
        textColor: 'text-green-400',
        personalizedMessage:
          "Hey \u2014 you grabbed our free guide last week, so I know you're looking for better ways to run your business. I want to let you in on something.\n\n" +
          "For the past 6 months, we've been building a system that solves the three biggest headaches business owners tell us about:\n\n" +
          "\u2022 Repetitive tasks that eat 10+ hours per week\n" +
          "\u2022 Follow-ups that slip through the cracks and cost you deals\n" +
          "\u2022 Content creation that never makes it off the to-do list\n\n" +
          "This isn't another app or dashboard. It's a system that actually DOES the work \u2014 automatically, in the background, while you focus on what matters.\n\n" +
          "We're launching next week. Want to see it first?\n\n" +
          "Here's a 3-minute walkthrough video that shows exactly what it does. No pitch, just the product. If it's a fit, I'll send you early access details.",
      },
      {
        name: 'Existing Customer',
        description: 'Active subscriber for 8 months',
        color: 'bg-blue-500/20',
        textColor: 'text-blue-400',
        personalizedMessage:
          "You've been with us for 8 months, so you already know we deliver. Here's what's coming next \u2014 and you're getting first access.\n\n" +
          "We've spent the last 6 months building something that takes everything you love about our current tools and adds an automation layer on top. Specifically:\n\n" +
          "\u2022 Those repetitive tasks you've mentioned in support tickets? Automated.\n" +
          "\u2022 The follow-up sequences you're managing manually? Handled.\n" +
          "\u2022 The content backlog you keep pushing to next month? Taken care of.\n\n" +
          "As an existing customer, you get:\n" +
          "\u2022 72-hour early access before public launch\n" +
          "\u2022 Locked-in pricing at your current rate (new pricing goes up 40%)\n" +
          "\u2022 Free migration of your current workflows\n\n" +
          "Check your inbox Thursday morning. Your early access link will be there.\n\n" +
          "Thank you for being part of this since the early days. This one's for you.",
      },
      {
        name: 'Lapsed Customer',
        description: 'Cancelled 4 months ago',
        color: 'bg-amber-500/20',
        textColor: 'text-amber-400',
        personalizedMessage:
          "I know we lost you 4 months ago, and I'm not going to pretend I don't know why. The product wasn't where it needed to be.\n\n" +
          "But here's what's changed:\n\n" +
          "\u2022 We rebuilt the automation engine from scratch \u2014 it's 3x faster\n" +
          "\u2022 The follow-up system now actually works (no more missed sequences)\n" +
          "\u2022 We added the content creation feature you and 200 other customers requested\n\n" +
          "We're launching the new system next week. I'd love for you to see it.\n\n" +
          "No commitment, no pressure. Just a 10-minute demo so you can see what's different. If it's still not a fit, I'll respect that completely.\n\n" +
          "And if you DO come back: your old data is still here, your workflows are intact, and I'll personally make sure the transition is seamless.\n\n" +
          "Worth 10 minutes?",
      },
      {
        name: 'VIP Client',
        description: 'Top 5% by revenue, enterprise plan',
        color: 'bg-yellow-500/20',
        textColor: 'text-yellow-400',
        personalizedMessage:
          "I wanted you to hear this from me directly before the public announcement.\n\n" +
          "Next week we're launching the biggest product update in our company's history. For you specifically, this means:\n\n" +
          "\u2022 Your team's 15+ automated workflows will run 3x faster on the new engine\n" +
          "\u2022 The content creation system you've been beta testing is going live\n" +
          "\u2022 Your dedicated account manager has your custom migration plan ready\n\n" +
          "I'm setting aside 30 minutes on Tuesday for an exclusive walkthrough with our VIP clients. You'll see the product before anyone else, and your feedback will directly shape the final tweaks.\n\n" +
          "I'm also attaching the roadmap for Q3-Q4 \u2014 your feature requests from last quarter are on it.\n\n" +
          "Calendar link is below. Grab a spot \u2014 limited to 20 seats.",
      },
      {
        name: 'Cold Prospect',
        description: 'Never interacted, found via LinkedIn',
        color: 'bg-slate-500/20',
        textColor: 'text-slate-400',
        personalizedMessage:
          "Running a business means 80% of your time goes to things that aren't actually growing the business. Sound familiar?\n\n" +
          "The repetitive tasks. The follow-ups you forget. The content you know you should be creating but never have bandwidth for.\n\n" +
          "We just built a system that handles all of it. Here's what it does:\n\n" +
          "\u2022 Automates the repetitive workflows eating your calendar\n" +
          "\u2022 Sends the right follow-up at the right time, every time\n" +
          "\u2022 Creates on-brand content without you writing a single word\n\n" +
          "No setup headache. No learning curve. It plugs into the tools you already use.\n\n" +
          "We're launching next week. If you want to see a 3-minute demo before it goes live, reply with \"show me\" and I'll send the link.\n\n" +
          "No pitch meeting. No sales call. Just the product speaking for itself.",
      },
      {
        name: 'Partner / Affiliate',
        description: 'Runs a complementary business',
        color: 'bg-teal-500/20',
        textColor: 'text-teal-400',
        personalizedMessage:
          "I'm reaching out because I think there's a significant revenue opportunity here for both of us.\n\n" +
          "Next week we're launching a new automation platform for business owners. Here's why this matters for your audience:\n\n" +
          "\u2022 It solves the exact problems your clients face (task automation, follow-ups, content)\n" +
          "\u2022 It complements your existing services rather than competing with them\n" +
          "\u2022 Our affiliate partners earn 30% recurring commission\n\n" +
          "The numbers for our current affiliates:\n" +
          "\u2022 Average conversion rate: 12%\n" +
          "\u2022 Average commission per referral: $47/month recurring\n" +
          "\u2022 Top affiliates are earning $3K-8K/month\n\n" +
          "I'd love to get you set up with an affiliate account before launch so you can be first to share it with your audience. I'll also provide custom landing pages and swipe copy tailored to your brand.\n\n" +
          "Want me to send over the partner details?",
      },
    ],
  },
  {
    id: 'sports',
    icon: Dumbbell,
    label: 'Scouting Report',
    category: 'Sports Coaches',
    originalMessage:
      "Scouting report for Friday's opponent: They run a 4-3 defense with an aggressive blitz package from the weak side. Their secondary is vulnerable to play-action and their run defense has struggled against inside zone. Their best player is #55, a linebacker who reads the QB's eyes. Film shows they adjust coverage in the red zone to a Cover 2 shell.",
    audience: [
      {
        name: 'Offensive Coordinator',
        description: 'Designs the game plan and play calls',
        color: 'bg-orange-500/20',
        textColor: 'text-orange-400',
        personalizedMessage:
          "GAME PLAN ADJUSTMENTS \u2014 FRIDAY\n\n" +
          "Their 4-3 defense gives us opportunities we need to exploit early.\n\n" +
          "Play-Calling Priorities:\n" +
          "\u2022 Open with play-action on 1st down \u2014 their secondary bites HARD on run fakes\n" +
          "\u2022 Run inside zone to the strong side where their DT is the weakest run defender\n" +
          "\u2022 Use max protect on 3rd downs \u2014 their weak-side blitz is their bread and butter\n\n" +
          "Red Zone Adjustments:\n" +
          "\u2022 They switch to Cover 2 inside the 20 \u2014 attack the middle of the field\n" +
          "\u2022 Seam routes and crossing patterns will eat Cover 2 alive\n" +
          "\u2022 Consider a TE-heavy package to create mismatches in the flat\n\n" +
          "Key Watch: #55 reads the QB's eyes. We need pre-snap eye manipulation and designated look-off plays. I've tagged 4 plays in the playbook that use misdirection specifically for this.\n\n" +
          "Film session Wednesday at 3pm. Bring your top 15 play calls for Friday.",
      },
      {
        name: 'Defensive Coordinator',
        description: 'Focuses on matchups and opponent offense',
        color: 'bg-red-500/20',
        textColor: 'text-red-400',
        personalizedMessage:
          "MATCHUP ANALYSIS \u2014 THEIR OFFENSE\n\n" +
          "While we're studying their defense, don't forget \u2014 they'll be making adjustments too. Here's what their offense will likely do against OUR defense:\n\n" +
          "Key Intel:\n" +
          "\u2022 If they know we've identified the weak-side blitz vulnerability, they may flip their formation\n" +
          "\u2022 Their offense runs a similar concept to ours \u2014 expect counters and misdirection\n" +
          "\u2022 #55 is also a factor on special teams \u2014 account for him on punt return\n\n" +
          "Defensive Game Plan:\n" +
          "\u2022 Disguise our coverages pre-snap to take away their adjustment reads\n" +
          "\u2022 They'll try to exploit our nickel package \u2014 keep our base defense in longer\n" +
          "\u2022 Film shows their offense audibled 8 times last game \u2014 they adjust at the line\n\n" +
          "We need to win the chess match at the line of scrimmage. Preparation and disguise are everything this week.",
      },
      {
        name: 'Quarterback',
        description: 'Needs pre-snap reads and hot routes',
        color: 'bg-blue-500/20',
        textColor: 'text-blue-400',
        personalizedMessage:
          "QB BRIEFING \u2014 WHAT TO LOOK FOR FRIDAY\n\n" +
          "Pre-Snap Reads:\n" +
          "\u2022 Check the weak-side linebacker alignment. If he's shaded toward the line, blitz is coming. Audible to the hot route.\n" +
          "\u2022 Watch #55's eyes. He reads YOUR eyes \u2014 so look him off. Stare at the flat, then throw the seam.\n" +
          "\u2022 If the safety drops into the box, you have a 1-on-1 outside. Take the shot.\n\n" +
          "Keys by Down:\n" +
          "\u2022 1st Down: Play-action is your best friend. Their secondary jumps on run fakes every time.\n" +
          "\u2022 2nd Down: Inside zone to set up 3rd and short. You want manageable 3rd downs.\n" +
          "\u2022 3rd Down: Max protect. Pick up the blitz. Find the middle of the field.\n\n" +
          "Red Zone:\n" +
          "\u2022 They go Cover 2 inside the 20. The hole is between the safeties. Seam route to the TE.\n" +
          "\u2022 If they cheat the safety over, the corner route is WIDE open.\n\n" +
          "Study the film clips I sent. Focus on plays 7, 12, and 23. See you at film review.",
      },
      {
        name: 'Offensive Line',
        description: 'Blocking scheme and protection calls',
        color: 'bg-emerald-500/20',
        textColor: 'text-emerald-400',
        personalizedMessage:
          "O-LINE ASSIGNMENTS \u2014 FRIDAY'S GAME\n\n" +
          "Their front 7 is aggressive but predictable. Here's what you need to know:\n\n" +
          "Run Blocking (Inside Zone):\n" +
          "\u2022 Their DTs line up in a 3-tech and 1-tech. Combo block the 3-tech to the mike.\n" +
          "\u2022 Their run defense has been SOFT against inside zone \u2014 we need to establish this early\n" +
          "\u2022 Movement at the point of attack is everything. Win the first 2 yards.\n\n" +
          "Pass Protection:\n" +
          "\u2022 CRITICAL: Weak-side blitz is their primary pressure package. LT and LG \u2014 you MUST communicate the pickup.\n" +
          "\u2022 When you see the LB creep up, call it out pre-snap. Give the QB time to audible.\n" +
          "\u2022 In max protect, slide protection to the blitz side. RB picks up the edge.\n\n" +
          "Player to Watch:\n" +
          "\u2022 #55 is their best player but he's a READER, not a pass rusher. Don't lunge \u2014 stay patient and let him come to you.\n\n" +
          "We dominate the line, we win this game. Period.",
      },
      {
        name: 'Wide Receivers',
        description: 'Route adjustments and coverage reads',
        color: 'bg-purple-500/20',
        textColor: 'text-purple-400',
        personalizedMessage:
          "WR GAME PLAN \u2014 ROUTE ADJUSTMENTS\n\n" +
          "Their secondary is their weakness. Here's how we attack:\n\n" +
          "Play-Action Routes:\n" +
          "\u2022 When we fake inside zone, their corners bite hard. Run your route at 85% then EXPLODE when they crash down.\n" +
          "\u2022 Post routes and corner routes are your money plays on play-action\n" +
          "\u2022 The safety on the strong side is slow to recover \u2014 attack his hip\n\n" +
          "Standard Passing Game:\n" +
          "\u2022 Quick game to beat the blitz \u2014 slants and out routes with a fast release\n" +
          "\u2022 Get off the line clean. Their press coverage is average at best.\n" +
          "\u2022 On 3rd down, find the soft spot in the zone. Sit down in the window.\n\n" +
          "Red Zone (Cover 2):\n" +
          "\u2022 They play Cover 2 inside the 20. That means the corner sinks and the safety plays the hash.\n" +
          "\u2022 The hole: between the corner and safety. Smash concept \u2014 corner route over the curl.\n" +
          "\u2022 If they bracket you, the TE is open in the seam. Be a decoy and win that way.\n\n" +
          "Film session Wednesday. Know your adjustments cold by Thursday practice.",
      },
      {
        name: 'Running Backs',
        description: 'Key gaps and timing on run plays',
        color: 'bg-cyan-500/20',
        textColor: 'text-cyan-400',
        personalizedMessage:
          "RB GAME PLAN \u2014 GAPS AND TIMING\n\n" +
          "We're running inside zone early and often. Their front is beatable if you hit it right.\n\n" +
          "Inside Zone Reads:\n" +
          "\u2022 Your read key is the backside DE. If he crashes, bounce to the B gap.\n" +
          "\u2022 If he stays wide, hit the A gap hard. There WILL be a crease.\n" +
          "\u2022 Their DTs are heavy but slow off the snap. First step wins \u2014 get downhill fast.\n\n" +
          "Timing:\n" +
          "\u2022 Ball is at your chest by the QB's second step. No hesitation.\n" +
          "\u2022 Press the hole for one count, then cut. Don't dance. One cut and go.\n" +
          "\u2022 The second level is where the yards are. Their LBs are slow to fill.\n\n" +
          "Pass Protection Responsibility:\n" +
          "\u2022 On max protect, you have the edge rusher to the blitz side. Stay in and be physical.\n" +
          "\u2022 If no one comes, release to the flat. You'll be wide open.\n\n" +
          "Play-Action:\n" +
          "\u2022 SELL THE FAKE. Everything in our passing game depends on how convincing you are.\n" +
          "\u2022 Full speed, full commitment. If the LBs don't bite, the play breaks down.\n\n" +
          "We control the tempo of this game. It starts with you.",
      },
    ],
  },
  {
    id: 'church',
    icon: Church,
    label: 'Sunday Sermon',
    category: 'Churches',
    originalMessage:
      "This morning I want to talk about what it means to truly forgive. Not the surface-level 'I forgive you' that we say to keep the peace, but the deep, gut-level release that sets YOU free. Forgiveness isn't about the other person. It's about refusing to carry a weight that was never yours to bear. And I believe that today, some of you are ready to put that weight down.",
    audience: [
      {
        name: 'New Believer',
        description: 'Baptized recently, building faith foundation',
        color: 'bg-green-500/20',
        textColor: 'text-green-400',
        personalizedMessage:
          "This Sunday we're talking about forgiveness, and as someone new to faith, I want to give you some context for why this matters so deeply.\n\n" +
          "What the Bible says about forgiveness:\n" +
          "\u2022 Colossians 3:13 \u2014 \"Forgive as the Lord forgave you\"\n" +
          "\u2022 Matthew 6:14-15 \u2014 Jesus connects our ability to receive forgiveness with our willingness to give it\n" +
          "\u2022 Ephesians 4:31-32 \u2014 \"Be kind to one another, tenderhearted, forgiving\"\n\n" +
          "Here's the thing you need to know: forgiveness isn't a feeling. It's a decision. You might not FEEL like forgiving someone, and that's okay. The feeling often comes after the choice, not before.\n\n" +
          "Forgiveness also isn't saying what happened was okay. It's saying \"I'm not going to let this control my life anymore.\"\n\n" +
          "If this is new territory for you, that's completely normal. I've attached a short devotional guide that walks through forgiveness step by step. No pressure \u2014 just something to sit with this week.\n\n" +
          "We're glad you're here. This is going to be a meaningful morning.",
      },
      {
        name: 'Grieving Parent',
        description: 'Lost a child 6 months ago',
        color: 'bg-purple-500/20',
        textColor: 'text-purple-400',
        personalizedMessage:
          "I want you to know that I've been thinking about you specifically as I prepare this message.\n\n" +
          "We're talking about forgiveness this Sunday, and I know \u2014 I KNOW \u2014 that word can feel impossible right now. When you're carrying the kind of grief you're carrying, someone talking about \"putting down the weight\" can feel like they don't understand the weight.\n\n" +
          "I want to be honest with you: forgiveness in the context of loss looks completely different. This isn't about forgiving a person who hurt you. This might be about:\n\n" +
          "\u2022 Forgiving yourself for the things you think you should have done differently\n" +
          "\u2022 Releasing the anger at God, at the world, at the unfairness of it all\n" +
          "\u2022 Giving yourself permission to feel joy again without guilt\n\n" +
          "None of that has a timeline. None of it is required by Sunday.\n\n" +
          "A seat is saved for you. If you need to step out, that's okay. If you need to cry, that's okay. If you need to just sit in the back and breathe, that's okay too.\n\n" +
          "Grace upon grace upon grace.",
      },
      {
        name: 'Skeptical Teenager',
        description: 'Comes with grandma, questioning faith',
        color: 'bg-amber-500/20',
        textColor: 'text-amber-400',
        personalizedMessage:
          "Real talk: this Sunday's message is about forgiveness, and I know that probably sounds like another church cliche. \"Just forgive and move on.\" Right?\n\n" +
          "But here's what I actually mean:\n\n" +
          "Think about that person who wronged you \u2014 the friend who talked behind your back, the parent who wasn't there, the situation that wasn't fair. You're carrying that around like a backpack full of rocks. Every day it gets heavier.\n\n" +
          "Forgiveness isn't about letting them off the hook. It's about taking off the backpack.\n\n" +
          "\u2022 It doesn't mean what they did was okay\n" +
          "\u2022 It doesn't mean you have to be their friend again\n" +
          "\u2022 It doesn't mean you forget\n\n" +
          "It means YOU get to stop being weighed down by something that someone else did to you.\n\n" +
          "The dude who wrote most of the New Testament? He was literally in prison when he wrote about forgiveness. This wasn't theory for him. He was chained to a wall and still chose to let go.\n\n" +
          "Worth thinking about. See you Sunday.",
      },
      {
        name: 'Long-time Member',
        description: '25 years in the congregation',
        color: 'bg-blue-500/20',
        textColor: 'text-blue-400',
        personalizedMessage:
          "As someone who has walked this faith for 25 years, this Sunday's message on forgiveness goes deeper than the surface.\n\n" +
          "Theological Context:\nThe Greek word used in Matthew 6:12 is \"aphiemi\" \u2014 it literally means \"to send away.\" Not to suppress, not to ignore, but to actively release. It's the same word used when Jesus said \"It is finished\" on the cross. Complete release.\n\n" +
          "Where I want to challenge you:\n" +
          "\u2022 After decades of faith, unforgiveness can become so familiar we don't recognize it\n" +
          "\u2022 It often disguises itself as \"boundaries\" or \"wisdom\" or \"discernment\"\n" +
          "\u2022 The Holy Spirit may be surfacing something this Sunday that you thought you dealt with years ago\n\n" +
          "This message isn't just for new believers. In my experience, the deepest roots of unforgiveness are in the people who have been in the church the longest.\n\n" +
          "Come ready to be challenged. Come ready to be honest with yourself. And come ready to model for the younger members what genuine, gut-level surrender looks like.\n\n" +
          "Your faith journey matters to this congregation more than you know.",
      },
      {
        name: 'Marriage in Crisis',
        description: 'Couple considering separation',
        color: 'bg-rose-500/20',
        textColor: 'text-rose-400',
        personalizedMessage:
          "I know this season is incredibly hard for both of you. This Sunday we're talking about forgiveness, and I want to be clear about something upfront:\n\n" +
          "This message is NOT about staying in a situation that's hurting you. It's about YOUR freedom.\n\n" +
          "Forgiveness in a marriage crisis can mean:\n" +
          "\u2022 Releasing the scorecard of wrongs you've been keeping\n" +
          "\u2022 Choosing to see your partner as a broken human being, not your enemy\n" +
          "\u2022 Forgiving yourself for the ways you've contributed to where you are\n\n" +
          "What forgiveness does NOT mean:\n" +
          "\u2022 It does not mean ignoring harmful behavior\n" +
          "\u2022 It does not mean reconciliation is required\n" +
          "\u2022 It does not mean trust is instantly restored\n\n" +
          "Trust is rebuilt slowly, with consistent action. Forgiveness is a one-time decision that you may need to make every single day.\n\n" +
          "If you'd like to talk after the service, I'm here. No judgment, no agenda. Our marriage ministry team is also available this week.\n\n" +
          "Whatever happens with your marriage, YOUR healing matters.",
      },
      {
        name: 'Small Group Leader',
        description: 'Leads a weekly home group',
        color: 'bg-teal-500/20',
        textColor: 'text-teal-400',
        personalizedMessage:
          "Here's your discussion guide for this week's small group, based on Sunday's sermon on forgiveness.\n\n" +
          "Opening Question (5 min):\n\"Without naming names, is there someone in your life you've struggled to forgive? What makes it hard?\"\n\n" +
          "Scripture Reading (10 min):\nRead Matthew 18:21-35 (The Parable of the Unforgiving Servant) aloud as a group. Go around and have each person share one thing that stood out.\n\n" +
          "Discussion Questions (25 min):\n" +
          "\u2022 Pastor said forgiveness is about YOUR freedom. Do you agree? Why or why not?\n" +
          "\u2022 What's the difference between forgiveness and reconciliation?\n" +
          "\u2022 Have you ever experienced a physical or emotional change after truly forgiving someone?\n" +
          "\u2022 Where might unforgiveness be hiding in your life disguised as something else?\n\n" +
          "Application (5 min):\nChallenge each member to write down the name of someone they need to forgive (privately). Commit to praying about it daily this week.\n\n" +
          "Closing Prayer:\nPray specifically for anyone in the group who shared a struggle. Keep it confidential.\n\n" +
          "Note: This topic may bring up deep emotions. Have tissues ready and be prepared to listen more than talk.",
      },
    ],
  },
  {
    id: 'coaching',
    icon: MessageSquare,
    label: 'Client Insight',
    category: 'Life & Business Coaches',
    originalMessage:
      "After our session today, I realized something important about your leadership style. You're making decisions from a place of fear, not vision. Every time you hesitate to delegate, every time you second-guess your team, it's because you're protecting yourself from a failure that happened 10 years ago. The breakthrough isn't working harder. It's trusting the team you built.",
    audience: [
      {
        name: 'The Executive Client',
        description: 'C-suite leader, data-driven, results-focused',
        color: 'bg-yellow-500/20',
        textColor: 'text-yellow-400',
        personalizedMessage:
          "Post-Session Summary \u2014 Leadership Pattern Analysis\n\n" +
          "Today's session uncovered a pattern that's directly impacting your organizational performance.\n\n" +
          "The Data:\n" +
          "\u2022 You've personally overridden 4 of 6 major team decisions in the last quarter\n" +
          "\u2022 Your direct reports' initiative rate has dropped 35% since Q1\n" +
          "\u2022 Time spent in approval bottlenecks: estimated 12 hours/week across the team\n\n" +
          "The Root Cause:\nYour decision-making is anchored to a failure from 10 years ago. That experience created a \"verify everything\" pattern that made sense THEN. But applied to your current team of senior leaders, it's functioning as a ceiling \u2014 both for them and for you.\n\n" +
          "The Cost:\nEvery time you delay a delegation or second-guess a team call, you're trading strategic time for operational comfort. At your level, that trade costs the organization approximately $50K/month in slower execution.\n\n" +
          "Action Items:\n" +
          "\u2022 Identify 3 decisions this week you would normally approve \u2014 let them go without review\n" +
          "\u2022 Track the outcomes (my bet: 3 for 3 will be fine)\n" +
          "\u2022 We'll review the data in our next session\n\n" +
          "The metric that matters: can you go from 12 approval hours to 4 by end of quarter?",
      },
      {
        name: 'The Athlete Client',
        description: 'Former pro athlete transitioning to business',
        color: 'bg-orange-500/20',
        textColor: 'text-orange-400',
        personalizedMessage:
          "Think about it like this \u2014 you wouldn't play the championship game with last year's game film running in your head, right?\n\n" +
          "But that's exactly what you're doing in your business. Every decision you make is being filtered through a play that went wrong 10 years ago. You're reading the defense from a game that's already over.\n\n" +
          "In sports terms:\n" +
          "\u2022 You're playing not to lose instead of playing to win\n" +
          "\u2022 You're calling safe plays when the game requires aggressive ones\n" +
          "\u2022 You're not trusting your teammates to execute their assignments\n\n" +
          "The breakthrough:\nYou built a team. Just like your best teams in sports, they need you to trust them to make plays. The best captains I've worked with didn't control every play \u2014 they set the tone and let the team execute.\n\n" +
          "This week's practice plan:\n" +
          "\u2022 Pick one project and hand it completely to your team lead. No check-ins for 5 days.\n" +
          "\u2022 When you feel the urge to jump in, write it down instead. Bring the list to our next session.\n" +
          "\u2022 Notice how it feels. That discomfort? That's growth.\n\n" +
          "You've trusted teammates with championships. Trust them with this.",
      },
      {
        name: 'The New Entrepreneur',
        description: 'Just left corporate, building first business',
        color: 'bg-green-500/20',
        textColor: 'text-green-400',
        personalizedMessage:
          "First \u2014 I want to acknowledge how far you've come. Leaving corporate to build your own thing takes more courage than most people will ever understand.\n\n" +
          "Now here's what I noticed today:\n\n" +
          "You're bringing your corporate trauma into your new business. The failure you experienced 10 years ago \u2014 the one that made you feel like you couldn't trust your judgment \u2014 is showing up every time you:\n\n" +
          "\u2022 Over-research a decision instead of testing and learning\n" +
          "\u2022 Do everything yourself instead of hiring help\n" +
          "\u2022 Wait for \"perfect\" before you launch anything\n\n" +
          "Here's the truth: you're not that person anymore. The person who made that mistake 10 years ago didn't have the skills, the experience, or the wisdom you have now.\n\n" +
          "Your action steps this week:\n" +
          "\u2022 Hire that contractor you've been putting off (yes, the one we talked about)\n" +
          "\u2022 Launch the beta version of your service \u2014 it doesn't need to be perfect\n" +
          "\u2022 Make ONE decision in under 60 seconds. Any decision. Build the muscle.\n\n" +
          "You didn't leave corporate to build another cage. You left to fly. Start flying.",
      },
      {
        name: 'The Burned-Out Leader',
        description: 'Working 70-hour weeks, running on fumes',
        color: 'bg-rose-500/20',
        textColor: 'text-rose-400',
        personalizedMessage:
          "I need to say this directly: the 70-hour weeks aren't dedication. They're fear.\n\n" +
          "You're working this hard because you believe that if you stop \u2014 even for a day \u2014 everything will fall apart. And that belief comes from one moment, 10 years ago, when something DID fall apart.\n\n" +
          "But here's what's actually happening:\n" +
          "\u2022 Your team has stopped taking ownership because you'll redo their work anyway\n" +
          "\u2022 Your health is declining (you mentioned headaches, poor sleep, irritability)\n" +
          "\u2022 The quality of your decisions is dropping because you're exhausted\n\n" +
          "You're not preventing failure. You're accelerating toward it.\n\n" +
          "I'm giving you permission to rest. Not as a reward. As a strategy.\n\n" +
          "This week:\n" +
          "\u2022 Leave the office by 5pm on Wednesday. Non-negotiable.\n" +
          "\u2022 Do not check email after 7pm on Friday. Give your phone to your partner.\n" +
          "\u2022 Sleep 8 hours Saturday night. Set an alarm to GO TO BED, not to wake up.\n\n" +
          "The business will survive. I promise. And when you come back rested, you'll see opportunities you're too tired to see right now.\n\n" +
          "The breakthrough isn't doing more. It's doing less, better.",
      },
      {
        name: 'The High Achiever',
        description: 'Always hits goals, ready for next level',
        color: 'bg-indigo-500/20',
        textColor: 'text-indigo-400',
        personalizedMessage:
          "You hit every goal you set. That's not the problem. The problem is you've hit a ceiling and you can't figure out why.\n\n" +
          "Here's why: the skills that got you here won't get you there.\n\n" +
          "You've mastered execution. You're the person who outworks everyone in the room. But the next level isn't about working harder \u2014 it's about working through others. And that requires something that doesn't come naturally to you: letting go.\n\n" +
          "What I see:\n" +
          "\u2022 You can 10x your output, but only if you stop being the bottleneck\n" +
          "\u2022 Your team is capable of 80% of what you do. The 20% gap is where YOU add value.\n" +
          "\u2022 Every hour you spend on $50/hour tasks is an hour you're NOT spending on $5,000/hour strategy\n\n" +
          "The challenge:\nThis week, I want you to identify the 5 tasks you do every day that someone else could do at 80% of your quality. Then delegate all 5.\n\n" +
          "\u2022 80% done by someone else is better than 100% done by you at the cost of your strategic time\n" +
          "\u2022 Track what you do with the freed-up hours. That's your future.\n" +
          "\u2022 The discomfort you feel? That's the sound of the ceiling cracking.\n\n" +
          "You're ready for this. The question is whether you'll let yourself be.",
      },
      {
        name: 'The Team Manager',
        description: 'Manages 12 people, struggles with delegation',
        color: 'bg-teal-500/20',
        textColor: 'text-teal-400',
        personalizedMessage:
          "Let's build you a practical delegation framework based on what we uncovered today.\n\n" +
          "The Problem:\nYou manage 12 people but operate like you manage zero. Every decision flows through you. Every task gets your \"review.\" Your team has learned that the fastest way to get something done is to wait for you to do it.\n\n" +
          "The Delegation Framework:\n\n" +
          "Level 1 \u2014 Full Autonomy (do it, don't tell me):\n" +
          "\u2022 Routine operational tasks\n" +
          "\u2022 Client communications under $5K impact\n" +
          "\u2022 Internal scheduling and logistics\n\n" +
          "Level 2 \u2014 Inform After (do it, then tell me):\n" +
          "\u2022 Process improvements\n" +
          "\u2022 Vendor negotiations under $10K\n" +
          "\u2022 Hiring recommendations\n\n" +
          "Level 3 \u2014 Consult First (discuss with me, then you decide):\n" +
          "\u2022 Strategic partnerships\n" +
          "\u2022 Budget allocation over $10K\n" +
          "\u2022 Team restructuring\n\n" +
          "Level 4 \u2014 My Decision (bring me options, I decide):\n" +
          "\u2022 Company direction\n" +
          "\u2022 Major financial commitments\n" +
          "\u2022 Crisis response\n\n" +
          "Action Plan:\n" +
          "\u2022 Share this framework with your team this week\n" +
          "\u2022 Have each person identify which of their current tasks fall into Level 1-2\n" +
          "\u2022 Start enforcing the levels. When someone brings you a Level 1 decision, send them back.\n\n" +
          "This will feel uncomfortable for the first 2 weeks. By week 4, you'll wonder why you didn't do it sooner.",
      },
    ],
  },
]

/* ─── Streaming Hook ─── */
function useStreamText(text: string, isActive: boolean, speed = 18) {
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

/* ─── PersonalizedCard Component ─── */
function PersonalizedCard({
  member,
  isStreaming,
  index,
  allDone,
}: {
  member: AudienceMember
  isStreaming: boolean
  index: number
  allDone: boolean
}) {
  const { displayed, done } = useStreamText(
    member.personalizedMessage,
    isStreaming,
    10 + index * 2
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-bright transition-all"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${member.color} flex items-center justify-center`}>
            <span className={`text-sm font-bold ${member.textColor}`}>
              {member.name
                .split(' ')
                .map((w) => w[0])
                .join('')}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{member.name}</p>
            <p className="text-xs text-text-muted">{member.description}</p>
          </div>
        </div>
        {member.language && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-elevated border border-border text-xs text-text-muted">
            <Globe size={11} />
            {member.language}
          </div>
        )}
      </div>

      {/* Message Body */}
      <div className="px-5 py-4 min-h-[160px] max-h-[400px] overflow-y-auto">
        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
          {isStreaming || allDone ? displayed || member.personalizedMessage : ''}
          {isStreaming && !done && (
            <span className="inline-block w-[2px] h-4 bg-accent ml-0.5 animate-pulse align-text-bottom" />
          )}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Processing Animation ─── */
function ProcessingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center py-16 gap-5"
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center glow">
          <Sparkles size={28} className="text-white" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gradient-start to-gradient-end opacity-40"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="text-center">
        <p className="text-white font-semibold text-lg">Processing with Now</p>
        <p className="text-text-muted text-sm mt-1">
          Analyzing audience profiles and personalizing content...
        </p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-accent"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Bottom CTA Form ─── */
function BottomCTA() {
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('')
  const [investInterest, setInvestInterest] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const leads = JSON.parse(localStorage.getItem('ai3_leads') || '[]')
      leads.push({ email, interest, investInterest, source: 'demo', timestamp: new Date().toISOString() })
      localStorage.setItem('ai3_leads', JSON.stringify(leads))
    } catch {
      // silent
    }
    await new Promise((r) => setTimeout(r, 600))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-16 text-center"
    >
      <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-bg-card border border-border max-w-lg w-full">
        <p className="text-lg font-bold text-white">Imagine this for your entire audience.</p>
        <p className="text-sm text-text-secondary max-w-md">
          Now handles hundreds of thousands of personalized messages — live or async — with context
          that gets smarter over time.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mt-2">
            <Check size={20} />
            <span className="font-medium">You're on the list. We'll be in touch.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-5 py-3 rounded-full bg-bg-elevated border border-border text-white placeholder-text-muted outline-none focus:border-accent transition-colors text-sm"
            />
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-bg-elevated border border-border text-white outline-none focus:border-accent transition-colors text-sm appearance-none cursor-pointer"
            >
              <option value="" disabled>
                What are you most interested in?
              </option>
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
              <span className="text-sm text-text-secondary">
                I'm also interested in investing in AI\u00b3
              </span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-black bg-accent hover:bg-accent-hover disabled:opacity-50 rounded-full transition-all cursor-pointer border-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Request Invite
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Main Demo Component ─── */
export default function Demo() {
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario>(scenarios[0])
  const [demoState, setDemoState] = useState<DemoState>('idle')
  const [activeScenario, setActiveScenario] = useState<DemoScenario | null>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)

  const runDemo = useCallback(
    (scenario: DemoScenario) => {
      if (demoState === 'processing' || demoState === 'streaming') return

      setActiveScenario(scenario)
      setDemoState('processing')

      setTimeout(() => {
        setDemoState('streaming')

        setTimeout(() => {
          outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 200)

        const longestMsg = Math.max(...scenario.audience.map((a) => a.personalizedMessage.length))
        const estimatedTime = (longestMsg / 5) * 10 + scenario.audience.length * 100 + 2000
        setTimeout(() => setDemoState('complete'), estimatedTime)
      }, 2400)
    },
    [demoState]
  )

  const reset = useCallback(() => {
    setDemoState('idle')
    setActiveScenario(null)
  }, [])

  const handleScenarioClick = (scenario: DemoScenario) => {
    if (demoState === 'processing' || demoState === 'streaming') return
    setSelectedScenario(scenario)
    setDemoState('idle')
    setActiveScenario(null)
  }

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
              <Sparkles size={14} className="text-accent" />
              Interactive Demo
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.05] mb-5"
          >
            One message.
            <br />
            <span className="gradient-text">Every person hears it differently.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Now transforms a single message into personalized communication for every member of your
            audience — with context, language, and tone tailored to each individual.
          </motion.p>
        </div>
      </section>

      {/* Demo Workspace */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Scenario Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-text-muted mb-4">
              Choose a scenario
            </p>
            <div
              ref={pillsRef}
              className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none' }}
            >
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioClick(scenario)}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all cursor-pointer text-sm font-medium whitespace-nowrap ${
                    selectedScenario.id === scenario.id
                      ? 'bg-accent/10 border-accent/40 text-white ring-1 ring-accent/20'
                      : 'bg-bg-card border-border hover:border-border-bright text-text-secondary hover:text-white'
                  }`}
                >
                  <scenario.icon
                    size={16}
                    className={selectedScenario.id === scenario.id ? 'text-accent' : 'text-text-muted'}
                  />
                  {scenario.label}
                  <span className="text-xs text-text-muted">{scenario.category}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Two-column layout: Original Message + Output */}
          <div className="grid lg:grid-cols-[380px_1fr] gap-6">
            {/* Left Panel: Original Message (read-only) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:sticky lg:top-8 lg:self-start"
            >
              <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                  <p className="text-sm font-semibold text-text-secondary">Original Message</p>
                  <span className="text-xs text-text-muted px-2.5 py-1 rounded-full bg-bg-elevated border border-border">
                    {selectedScenario.label}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                    {selectedScenario.originalMessage}
                  </p>
                </div>
                <div className="px-5 py-3 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {activeScenario && demoState !== 'idle' && (
                      <button
                        onClick={reset}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-text-secondary hover:text-white bg-transparent border border-border hover:border-border-bright rounded-full transition-all cursor-pointer"
                      >
                        <RotateCcw size={14} />
                        Reset
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => runDemo(selectedScenario)}
                    disabled={demoState === 'processing' || demoState === 'streaming'}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full transition-all cursor-pointer border-none ${
                      demoState === 'processing' || demoState === 'streaming'
                        ? 'bg-accent/30 text-white/40 cursor-not-allowed'
                        : 'bg-accent hover:bg-accent-hover text-black shadow-lg shadow-accent/20'
                    }`}
                  >
                    {demoState === 'processing' || demoState === 'streaming' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Personalizing...
                      </>
                    ) : demoState === 'complete' ? (
                      <>
                        <Play size={16} />
                        Run Again
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        Personalize for Audience
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Panel: Output */}
            <div ref={outputRef}>
              <AnimatePresence mode="wait">
                {demoState === 'idle' && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <BookOpen size={32} className="text-text-muted mb-4" />
                    <p className="text-text-muted text-sm mb-3">
                      This message will be personalized for{' '}
                      <span className="text-white font-semibold">
                        {selectedScenario.audience.length} audience members
                      </span>
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                      {selectedScenario.audience.map((member) => (
                        <div
                          key={member.name}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-card border border-border text-sm"
                        >
                          <div
                            className={`w-5 h-5 rounded-full ${member.color} flex items-center justify-center`}
                          >
                            <span className={`text-[9px] font-bold ${member.textColor}`}>
                              {member.name
                                .split(' ')
                                .map((w) => w[0])
                                .join('')}
                            </span>
                          </div>
                          <span className="text-text-secondary text-xs">{member.name}</span>
                          {member.language && (
                            <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                              <Globe size={9} />
                              {member.language}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-text-muted text-xs mt-6">
                      Click "Personalize for Audience" to see Now in action
                    </p>
                  </motion.div>
                )}

                {demoState === 'processing' && (
                  <motion.div key="processing">
                    <ProcessingAnimation />
                  </motion.div>
                )}

                {(demoState === 'streaming' || demoState === 'complete') && activeScenario && (
                  <motion.div
                    key="output"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Status Bar */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        {demoState === 'streaming' ? (
                          <Loader2 size={14} className="text-accent animate-spin" />
                        ) : (
                          <Check size={14} className="text-green-400" />
                        )}
                        <p className="text-sm font-medium text-text-secondary">
                          {demoState === 'streaming'
                            ? `Personalizing for ${activeScenario.audience.length} audience members...`
                            : `Personalized for ${activeScenario.audience.length} audience members`}
                        </p>
                      </div>
                      <button
                        onClick={reset}
                        className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                      >
                        <RotateCcw size={12} />
                        Try another
                      </button>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid gap-4 md:grid-cols-2">
                      {activeScenario.audience.map((member, i) => (
                        <PersonalizedCard
                          key={member.name}
                          member={member}
                          isStreaming={demoState === 'streaming'}
                          index={i}
                          allDone={demoState === 'complete'}
                        />
                      ))}
                    </div>

                    {/* Bottom CTA after complete */}
                    <AnimatePresence>
                      {demoState === 'complete' && <BottomCTA />}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
