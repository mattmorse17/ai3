import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface Post {
  slug: string
  title: string
  category: string
  readTime: string
  content: string
}

const posts: Post[] = [
  {
    slug: 'actual-artificial-agentic',
    title: 'Actual + Artificial + Agentic: Why Three Intelligences Beat One',
    category: 'Methodology',
    readTime: '6 min',
    content: `Everyone has access to GPT. Everyone has access to Claude. Everyone has access to the same foundation models that power the AI revolution. So if the models are a commodity, where does the advantage come from?

Orchestration.

Not any single intelligence, but the fusion of three: Actual Intelligence, Artificial Intelligence, and Agentic Intelligence. Each one is powerful on its own. Together, they create something none can achieve alone.

## Actual Intelligence: The Human Foundation

Actual Intelligence is human expertise — the years of context, intuition, and relationship capital that no model can replicate. A pastor who has shepherded a congregation for twenty years knows things about their community that no dataset contains. A baseball coach who has watched ten thousand at-bats reads swings in ways that defy quantification. A creator who has built an audience over a decade carries a voice that algorithms can detect but never originate.

This is the intelligence that grounds everything. Without it, AI is a parlor trick — impressive but hollow.

## Artificial Intelligence: Scale Beyond Human Limits

AI models bring something humans physically cannot: scale. A pastor can write one sermon. AI can adapt that sermon for five thousand congregants, each version reflecting what that individual is going through. A coach can break down film for hours. AI can analyze every pitch from every recruit in the country overnight. A creator can write three posts a week. AI can extend that voice across thirty pieces of content without diluting it.

The mistake most organizations make is treating AI as a replacement for human intelligence. It is not. It is an amplifier. The signal has to come from somewhere real.

## Agentic Intelligence: Execution That Never Stops

Here is where most AI strategies fall apart. They build the insight layer but forget the execution layer. Agentic Intelligence is autonomous agents that act — not just analyze, not just recommend, but execute workflows end-to-end.

Imagine a pastor's sermon going out on Sunday. By Monday morning, agents have personalized follow-up messages for every attendee, scheduled small group invitations based on the sermon's themes, flagged first-time visitors for personal outreach, and coordinated volunteer teams for the week ahead. No human touched it. The pastor's intelligence was the foundation. AI scaled it. Agents executed it.

Now imagine a college baseball coach. His recruiting philosophy is captured once. Agents scour film databases, contact prospects with personalized messages that reflect the coach's actual voice, schedule campus visits, and keep the entire pipeline moving — twenty-four hours a day, seven days a week. The coach does what only the coach can do: build relationships face-to-face. Agents handle everything else.

Or a creator with a hundred thousand followers. Their voice is the brand. Agents draft content across every platform, manage DMs, negotiate brand deals, and optimize posting schedules — all while preserving the voice that built the audience in the first place.

## The Fusion Is the Product

Any organization can buy AI. Very few can orchestrate all three intelligences into a unified system. That orchestration — the architecture that captures human expertise, amplifies it through AI, and executes it through autonomous agents — is what AI\u00B3 builds.

The name is the thesis: Actual Intelligence times Artificial Intelligence times Agentic Intelligence. Not additive. Multiplicative. Remove any one factor and the equation collapses. But when all three work together, the result is an organization that operates at a scale and quality level that was previously impossible.

The future does not belong to whoever has the best model. It belongs to whoever orchestrates intelligence the best.`,
  },
  {
    slug: 'why-ai-fails-without-humans',
    title: 'Why AI Fails Without Humans in the Loop',
    category: 'Intelligence',
    readTime: '5 min',
    content: `There is a graveyard of AI projects that launched with breathless press releases and died quietly six months later. The pattern is always the same: an organization plugs in a model, removes humans from the process, and wonders why the output feels generic, inaccurate, or worse — harmful.

AI without human intelligence is not just less effective. It actively fails.

## The Hallucination Problem

Large language models generate plausible text. Plausible is not the same as true. A model asked to write follow-up emails for a church will confidently reference events that never happened, misattribute quotes, and invent personal details about congregants. Without a human who knows the community reviewing and guiding the output, every message becomes a credibility risk.

This is not a bug that better training data will fix. It is a structural feature of how these models work. They predict what sounds right, not what is right.

## The Context Gap

AI models operate on data they were trained on and whatever context you feed them in a prompt. But the most important context in any organization is the kind that lives in people's heads — the relationships, the history, the unwritten rules, the political dynamics, the things that never make it into a document.

A coach knows which recruit responds to directness and which one needs encouragement. A pastor knows which families are going through hardship. A CEO knows which board member needs to be handled carefully. No model has access to this intelligence unless a human puts it there.

## The Generic Trap

When AI operates without human direction, it defaults to the average. The output is competent but unremarkable — indistinguishable from what any other organization using the same model would produce. This is the opposite of what leadership communication requires.

Consider the difference: an AI writing a generic outreach email versus AI\u00B3 personalizing a leader's actual message for each individual recipient. The first approach produces something that looks like every other automated email in your inbox. The second approach takes the leader's real words, real tone, and real intent — then adapts the delivery for each person based on what is known about them.

The human intelligence is what makes the output distinctive. The AI is what makes it scale. Remove the human, and you have scale without substance.

## The Solution: Orchestration, Not Automation

The answer is not to avoid AI. The answer is to build systems where human intelligence remains the foundation — where AI amplifies rather than replaces the human signal.

This means capturing expertise deliberately: recording how leaders actually communicate, documenting the nuances of their decision-making, preserving the context that makes their judgment valuable. Then using AI to extend that expertise to every interaction, every message, every touchpoint.

The organizations that win will not be the ones with the most advanced models. They will be the ones that figured out how to keep humans at the center while letting AI do what AI does best: scale the human signal without degrading it.

That is the entire thesis behind AI\u00B3. Not Artificial Intelligence alone. Actual Intelligence, amplified artificially, executed agentically. The human never leaves the loop. The loop just gets a lot bigger.`,
  },
  {
    slug: 'agents-not-chatbots',
    title: 'Agents, Not Chatbots: What Real AI Operations Look Like',
    category: 'Product',
    readTime: '7 min',
    content: `The AI industry has a branding problem. When most people hear "AI," they picture a chatbot — a text box where you type a question and get an answer. That is useful. It is also the least interesting thing AI can do.

The real revolution is not in conversation. It is in execution.

## Chatbots Answer. Agents Act.

A chatbot waits for you to ask it something. An agent wakes up in the morning with a task list and starts working. A chatbot gives you information. An agent takes that information and does something with it — sends the email, updates the CRM, schedules the meeting, files the report, follows up with the prospect.

This distinction matters because most organizations do not have a knowledge problem. They have an execution problem. Leaders know what needs to happen. They just do not have enough people to make it happen at the speed and scale required.

## What a Named Agent Fleet Looks Like

Inside Move — AI\u00B3's agentic operating system — every organization gets a fleet of named agents, each with a defined role and personality. These are not generic bots. They are specialized operators.

**Kai** handles marketing and brand operations. Kai knows your voice, your content strategy, your audience segments. Kai drafts social posts, writes email campaigns, repurposes long-form content into platform-specific pieces, and manages your content calendar. Kai does not wait to be asked. Kai looks at the calendar, sees what is due, and produces it.

**Nova** handles lead qualification and relationship management. When a new prospect fills out a form, Nova does not just send an auto-response. Nova researches the prospect, scores them against your ideal customer profile, personalizes the initial outreach based on what was found, and routes qualified leads to the right human at the right time. If a lead goes cold, Nova follows up. Persistently. Thoughtfully.

**Rex** handles fulfillment and delivery operations. When a deal closes, Rex kicks off the onboarding sequence — scheduling calls, provisioning accounts, sending welcome materials, and tracking milestones. Rex does not forget. Rex does not let things slip through cracks.

Each agent has access to the tools it needs, the context of who it is working for, and the guardrails to stay on-brand. They coordinate with each other. Kai generates content, Nova distributes it to the right prospects, and Rex follows through when those prospects convert.

## The 24/7 Operating Team

Here is what changes when you move from chatbots to agents: your organization never sleeps.

A prospect visits your site at 2 AM. Nova engages. A content deadline hits on Saturday. Kai delivers. A new customer signs up on a holiday. Rex onboards them. This is not a chatbot answering FAQ questions. This is an operational team executing the actual work of running a business.

And because these agents are built on the AI\u00B3 framework, they are not operating from generic templates. They are operating from the captured intelligence of your actual team — your sales methodology, your brand voice, your onboarding process, your coaching philosophy.

## The Compound Effect

Chatbots provide linear value. You ask, they answer. Agents provide compound value. Every interaction makes the system smarter. Every lead Nova qualifies teaches it more about your ideal customer. Every piece of content Kai produces refines its understanding of your voice. Every onboarding Rex completes improves the playbook.

Over weeks and months, the agent fleet becomes an organizational asset that appreciates. It is not a tool you use. It is a team that grows.

## Why This Matters Now

The cost of AI inference is dropping fast. The models are becoming commodities. But agents — specifically, well-orchestrated agents that operate from real human intelligence — require architecture that most organizations cannot build on their own.

That is what Move provides: the infrastructure to deploy, manage, and scale a named agent fleet across every function of your organization. Not a chatbot you talk to. An operating team that works for you.

The question for every leader is no longer "should we use AI?" It is "how many agents do we need, and what should they be doing right now?"`,
  },
  {
    slug: 'ai-in-education',
    title: 'AI\u00B3 in the Classroom: Personalized Learning Without Losing the Teacher',
    category: 'Education',
    readTime: '5 min',
    content: `Every student learns differently. This is not a controversial statement. It is one of the most well-documented facts in education research. Visual learners, auditory learners, kinesthetic learners. Students who need repetition. Students who need to be challenged beyond grade level. Students learning English as a second language. Students with dyslexia, ADHD, or processing differences. A single classroom can contain thirty entirely different learning profiles.

And yet the system gives every one of them the same lesson, the same pace, and the same assessment.

Teachers know this is a problem. They have always known. The issue was never awareness. It was physics. One human being cannot simultaneously deliver thirty personalized curricula. The math does not work. So teachers do the best they can with differentiated groups, modified assignments, and sheer willpower. It is heroic work. It is also unsustainable and incomplete.

## What AI\u00B3 Changes

AI\u00B3 does not replace the teacher. It removes the impossible constraint. Now, the intelligence layer, sits between the teacher's lesson plan and each student's experience. The teacher creates the lesson once. Now personalizes the delivery for every student in real-time.

Consider a seventh-grade science class studying the water cycle. The teacher records the core lesson with the concepts, vocabulary, and learning objectives. Now takes that foundation and adapts it thirty different ways. An ESL student from Guatemala receives the lesson with simplified vocabulary, visual aids, and key terms presented in both English and Spanish. A gifted student who already understands evaporation gets an accelerated version that introduces atmospheric pressure dynamics and asks them to model weather patterns. A student with dyslexia receives the content in a format optimized for their reading tools, with shorter paragraphs, highlighted key terms, and audio reinforcement.

Same lesson. Same teacher. Same classroom. Thirty different experiences, each calibrated to what that student actually needs.

## The Execution Layer

Personalization without execution is just a nice idea. This is where Move comes in. Move deploys agents that handle the operational load that buries teachers. Grading is automated against the teacher's rubric, with flagged edge cases routed back for human review. Parent communication runs autonomously, sending personalized progress updates in the parent's preferred language. Administrative tasks like attendance tracking, IEP documentation, and reporting flow through agents instead of consuming planning periods.

The result is not a teacher replaced by technology. It is a teacher who finally has the bandwidth to do what they became a teacher to do: connect with students, mentor, inspire, and intervene where it matters most.

## What the Data Shows

Districts that embrace personalized learning see measurable gains across every demographic. Engagement increases because students are working at the right level of challenge. Behavioral issues decrease because fewer students are bored or overwhelmed. Achievement gaps narrow because students with different needs are no longer receiving identical instruction and being measured against a single standard.

The ESL student who was falling behind because the vocabulary was too advanced is now keeping pace with grade-level content delivered in an accessible way. The gifted student who was disengaged because the material was too easy is now challenged and motivated. The student with ADHD who struggled with long lectures is now receiving content in the format and length that works for their attention patterns.

## The Teacher Is the Foundation

AI\u00B3 is built on a simple principle: the human intelligence comes first. In education, that means the teacher's expertise, pedagogy, and relationship with their students is the foundation that everything else amplifies. No model can replace the teacher who notices a student is having a hard day. No agent can substitute for the mentor who helps a teenager believe in themselves.

But that teacher can be amplified. Their lesson can reach every student personally. Their time can be protected from administrative burden. Their expertise can scale to meet every learner where they are. That is what AI\u00B3 builds: not a replacement for teaching, but the infrastructure that makes great teaching possible at a scale that was previously unimaginable.

The classroom of the future does not have fewer teachers. It has teachers who are finally free to teach.`,
  },
  {
    slug: 'creators-need-agents',
    title: 'Why Every Creator Needs an Agent Fleet (Not Another AI Tool)',
    category: 'Creators',
    readTime: '6 min',
    content: `The average creator uses between eight and fifteen tools. A scheduling tool. A design tool. An analytics platform. An email service. A link-in-bio tool. A CRM for brand deals. A community platform. A video editor. A transcription service. A social listening dashboard. And the list keeps growing.

Every year, another wave of AI-powered tools promises to make the creator's life easier. Another AI writing assistant. Another AI image generator. Another AI analytics dashboard. Each one solves one narrow problem. None of them solve the actual problem.

The actual problem is not that creators lack tools. It is that they lack execution capacity. They know what needs to happen. They just cannot do it all themselves.

## Tools vs. Operators

There is a fundamental difference between an AI tool and an AI operator. A tool waits for you to use it. You open it, give it a prompt, review the output, tweak it, and paste it somewhere else. The tool adds value, but it also adds a step. Multiply that across fifteen tools and you have not saved time. You have just shifted the bottleneck from creating content to managing an AI tool stack.

An operator does not wait. An operator wakes up with a task list and executes. Kai, your content agent, checks the content calendar at six in the morning. Sees that three posts are due across Instagram, LinkedIn, and Twitter. Drafts all three in your voice, using your style guide, referencing your recent themes. Queues them for posting at optimal times. You wake up, review them on your phone, approve with a tap. Done.

That is not a tool. That is a team member.

## The Named Agent Fleet

Inside AI\u00B3 Move, creators get a fleet of named agents, each responsible for a function that currently eats hours of the creator's week.

**Kai** handles content operations. Not just drafting but the entire pipeline: ideation based on trending topics and audience data, drafting in the creator's authentic voice, reformatting for each platform, scheduling, and performance tracking. One podcast episode becomes a newsletter, six social posts, three short-form video clips, a Twitter thread, and a LinkedIn article. Automatically.

**Nova** handles relationship management. DMs answered within minutes. Collaboration inquiries qualified and routed. Brand deal opportunities surfaced with context on the brand, their budget range, and whether they align with the creator's values. Fan messages that deserve a personal response flagged for the creator's attention.

**Rex** handles the business side. Brand deal contracts tracked. Invoice follow-ups automated. Revenue dashboards maintained. Tax-relevant transactions categorized. The creator does not need a business manager because Rex is the business manager.

## The Voice Problem, Solved

The number one fear every creator has about AI is losing their voice. And that fear is justified when the tool is generic. ChatGPT writes like ChatGPT. Every creator using it sounds the same.

AI\u00B3 solves this by starting with Now, the intelligence layer that captures the creator's actual voice. Not a generic tone setting. The specific vocabulary, humor, cadence, recurring phrases, and conversational patterns that make that creator's audience loyal. The agents operate from this voice model. Every piece of content, every DM response, every brand pitch carries the creator's authentic voice because it was built from their real communication patterns.

## From Creator to Media Company

The creators who win in the next decade will not be the ones who work the hardest. They will be the ones who build the best systems. An agent fleet turns a solo creator into a media company. Content across every platform, every day. Audience engagement at scale. Revenue operations running in the background. Community building that never stops.

The creator focuses on what only they can do: think original thoughts, have real experiences, and connect with their audience as a human being. Everything else runs autonomously, in their voice, at a pace no individual human could sustain.

That is not another AI tool. That is a career transformation.`,
  },
  {
    slug: 'sports-intelligence',
    title: 'The Intelligence Advantage: How AI\u00B3 Changes the Game for Coaches',
    category: 'Sports',
    readTime: '6 min',
    content: `The arms race in college athletics has always been about resources. More staff. Bigger budgets. Better facilities. The programs with the most money hired the most recruiters, built the biggest analytics departments, and outspent their competition into submission.

That era is ending. Not because money stopped mattering, but because a new variable entered the equation: intelligence infrastructure.

The programs that dominate the next decade will not necessarily have the biggest budgets. They will have the best intelligence systems. And the gap between programs with AI\u00B3 and programs without it will be wider than the gap between programs with five recruiters and programs with fifty.

## Recruiting at Machine Speed

Recruiting is a volume and personalization game. The more prospects you contact, the more responses you get. The more personalized those contacts are, the higher the response rate. These two variables are normally in tension. You can contact a lot of people with templates, or you can personalize a few messages. You cannot do both.

AI\u00B3 eliminates that tradeoff. Move deploys recruiting agents that operate from the coaching staff's captured philosophy, voice, and evaluation criteria. Each outreach message references the prospect's specific film, stats, academic profile, and interests. The tone matches the head coach. The volume matches a program with unlimited recruiting staff.

A mid-major program running AI\u00B3 can contact more prospects, with more personalization, than a Power Five program doing it manually. That is not an incremental advantage. That is a structural one.

## Film Analysis Without the Bottleneck

Every coaching staff has the same problem with film. There is too much of it, and not enough time to watch it all. Prospect film sits in queues for days. Game prep relies on the same few tendencies because nobody had time to dig deeper. Player development film sessions are generic because individualized breakdowns are too time-consuming.

AI\u00B3 agents process film against the coaching staff's evaluation criteria and deliver structured breakdowns same-day. A pitching coach who values fastball command, changeup deception, and first-pitch strike percentage gets prospects evaluated against exactly those metrics. A hitting coach who prioritizes bat path and plate discipline sees those specific data points highlighted. The analysis matches the coaching philosophy because the system was trained on it.

## Player Development, Personalized

The best coaches know that development is individual. A sophomore working on his slider needs different communication, different drills, and different encouragement than a senior preparing for the draft. But in practice, most player development communication is broadcast. One message to the whole pitching staff. One workout plan for the entire roster.

Now captures the coaching staff's development philosophy and personalizes communication for every rostered player. Each player receives training plans, film clips, and motivational messaging calibrated to their position, development stage, learning style, and recent performance. The coaching staff's philosophy reaches every player individually, without requiring the coaching staff to individually communicate with every player every day.

## NIL Management

Name, Image, and Likeness has transformed college athletics into a business that most coaching staffs were never trained to manage. Players need guidance on deals, compliance requires tracking, and the distraction factor is real.

AI\u00B3 agents can manage NIL pipelines, vet incoming opportunities against compliance requirements, and ensure that players are making informed decisions without the coaching staff becoming de facto agents. The system handles the administrative overhead so coaches can focus on development and relationships.

## The Intelligence Compound Effect

Every recruiting message sent through AI\u00B3 teaches the system more about what resonates with different types of prospects. Every film analysis refines the evaluation model. Every player development interaction improves the personalization. The system compounds over time.

A program that deploys AI\u00B3 today has a six-month head start on a program that deploys it next year. And in a sport where margins are razor-thin, a six-month intelligence advantage translates directly into recruiting wins, development gains, and competitive edges that multiply season over season.

The programs that figure this out first will not just compete better. They will recruit better, develop better, and retain better. The intelligence advantage is the new arms race, and it has already started.`,
  },
  {
    slug: 'personalization-at-scale',
    title: 'The End of One-Size-Fits-All: Personalization at Scale',
    category: 'Now',
    readTime: '6 min',
    content: `There is a fundamental tension at the heart of every organization that communicates with more than a handful of people: the message has to be good enough for everyone, which means it is perfect for no one.

A pastor preaches one sermon to thousands. A coach delivers one speech to the entire roster. A creator writes one newsletter to their whole list. The content is strong, but it is generic by necessity. Personalization has always been a luxury reserved for one-on-one interactions — and those do not scale.

Until now.

## The One-to-Many Problem

Consider an email creator with 400,000 subscribers. Every week, they craft one email. It goes to everyone — the new subscriber who joined yesterday and the day-one supporter who has read every word for five years. The reader in crisis who needs encouragement and the reader who is thriving and wants to be challenged. The person in Texas and the person in Tokyo.

The content is good. The creator's voice is authentic. But the delivery is a broadcast, not a conversation. And every subscriber knows it.

This is the one-to-many problem. It affects every leader, every creator, every organization that communicates at scale. The message is real, but the experience of receiving it feels impersonal.

## What Now Changes

Now is AI\u00B3's intelligence layer that sits between a leader's content and their audience. It takes a single piece of communication — a sermon, an email, a coaching session, a newsletter — and personalizes it for every individual recipient in real-time.

That email creator's weekly send does not go out as one email to 400,000 people. It goes out as 400,000 unique emails. Each one carries the same core message, the same voice, the same intent. But the framing shifts based on what Now knows about each subscriber: their engagement history, their life context, their past interactions, what has resonated with them before.

A subscriber who has been quiet gets a warmer, more invitational tone. A power-reader gets deeper content and a direct ask. Someone who clicked on a career-related topic last month gets a bridge between today's message and that interest. The voice never changes. The experience does.

## How It Works in Practice

Now operates on a simple principle: capture the leader's intelligence once, then deploy it infinitely.

For a church, this means the pastor records or writes the sermon once. Now understands the theological framework, the pastoral intent, the key applications. Then it creates personalized versions for every member — a version that speaks to the single parent differently than the college student, that connects differently with the grieving family than the newlywed couple. The pastor's heart and message remain intact. The delivery becomes intimate at scale.

For a coaching program, the head coach's philosophy and game plan get captured once. Now personalizes the communication for every player based on their position, their development stage, their learning style, and their recent performance. A sophomore pitcher working on command gets different emphasis than a senior catcher preparing for the draft. Same system. Same coaching tree. Radically different experience.

For creators, the principle is identical. Your voice is your brand. Now preserves it while making every reader feel like you wrote directly to them.

## Why This Is Different from Mail Merge

Skeptics will say this sounds like fancy mail merge — swapping in a first name and a custom field. It is not. Mail merge is mechanical substitution. Now is contextual adaptation.

The difference: mail merge changes "Dear Subscriber" to "Dear Sarah." Now changes the entire framing, tone, emphasis, and call-to-action based on a deep understanding of who Sarah is, what she cares about, and what she needs to hear right now.

This requires the fusion of all three AI\u00B3 intelligences. The leader's Actual Intelligence provides the authentic message. Artificial Intelligence powers the personalization engine. Agentic Intelligence handles the execution — generating, quality-checking, and delivering hundreds of thousands of unique messages without a human bottleneck.

## The Future of Communication

One-size-fits-all is dying. Not because people demand personalization as a preference — but because the technology now exists to make every communication feel personal without sacrificing authenticity or scale.

The leaders who adopt this first will have an unfair advantage. Their congregants will feel known. Their players will feel coached individually. Their subscribers will feel like the message was written just for them. And it was — by a system that started with one human's real intelligence and extended it to everyone they serve.

That is the end of one-size-fits-all. That is Now.`,
  },
]

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Post not found</h1>
          <Link to="/blog" className="text-accent hover:underline">
            Back to Blog
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
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors no-underline mb-8"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-10 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-invert max-w-none">
            {post.content.split('\n\n').map((block, i) => {
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
              if (block.startsWith('**') && block.endsWith('**')) {
                return (
                  <p key={i} className="text-white font-semibold my-4">
                    {block.replace(/\*\*/g, '')}
                  </p>
                )
              }
              // Handle paragraphs that contain bold segments
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
