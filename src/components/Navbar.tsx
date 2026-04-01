import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

function Dropdown({ label, items, onClose }: { label: string; items: { to: string; label: string }[]; onClose: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors bg-transparent border-none cursor-pointer"
      >
        {label} <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full left-0 mt-2 w-48 bg-bg-card border border-border rounded-xl py-2 shadow-xl z-50"
          >
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => { setOpen(false); onClose() }}
                className="block px-4 py-2 text-sm text-text-secondary hover:text-white hover:bg-bg-card-hover transition-colors no-underline"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    if (!isHome) { window.location.href = `/#${id}`; return }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const close = () => setMobileOpen(false)

  return (
    <nav className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-xl font-black tracking-tight gradient-text">AI³</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          <button onClick={() => scrollTo('thesis')} className="text-sm text-text-secondary hover:text-white transition-colors bg-transparent border-none cursor-pointer">
            The Thesis
          </button>

          <Dropdown label="Products" onClose={close} items={[
            { to: '/demo', label: 'Now — Live Demo' },
            { to: '/move-demo', label: 'Move — Live Demo' },
            { to: '/for/church', label: 'For Churches' },
            { to: '/for/sports', label: 'For Sports Coaches' },
            { to: '/for/performance', label: 'For Coaches & Consultants' },
            { to: '/for/influencer', label: 'For Influencers' },
            { to: '/for/business', label: 'For Business Owners' },
            { to: '/for/creator', label: 'For Creators' },
          ]} />

          <Dropdown label="Ventures" onClose={close} items={[
            { to: '/kaifect', label: 'Kaifect — AI Agency' },
            { to: '/village', label: 'The Village™ — Smart Living' },
            { to: '/vyro', label: 'Vyro — Acquisitions' },
          ]} />

          <Dropdown label="Learn" onClose={close} items={[
            { to: '/blog', label: 'Blog' },
            { to: '/case-studies', label: 'Case Studies' },
            { to: '/about', label: 'Team' },
          ]} />

          <Link to="/assessment" className="text-sm text-accent hover:text-accent-hover transition-colors no-underline font-medium">
            Assessment
          </Link>

          <a href="https://wefunder.com/ai.8" target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-white transition-colors no-underline">
            Invest
          </a>

          <button
            onClick={() => scrollTo('waitlist')}
            className="px-5 py-2 text-sm font-bold text-black bg-accent hover:bg-accent-hover rounded-full transition-all cursor-pointer border-none"
          >
            Request Invite
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white bg-transparent border-none cursor-pointer p-2">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mt-2">Products</p>
              <Link to="/demo" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Now — Live Demo</Link>
              <Link to="/move-demo" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Move — Live Demo</Link>

              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mt-4">Who It's For</p>
              <Link to="/for/church" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Churches</Link>
              <Link to="/for/sports" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Sports Coaches</Link>
              <Link to="/for/performance" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Coaches & Consultants</Link>
              <Link to="/for/influencer" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Influencers</Link>
              <Link to="/for/business" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Business Owners</Link>
              <Link to="/for/creator" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Creators</Link>

              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mt-4">Ventures</p>
              <Link to="/kaifect" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Kaifect — AI Agency</Link>
              <Link to="/village" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">The Village™</Link>
              <Link to="/vyro" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Vyro Ventures</Link>

              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mt-4">Learn</p>
              <Link to="/blog" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Blog</Link>
              <Link to="/case-studies" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Case Studies</Link>
              <Link to="/about" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Team</Link>

              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                <Link to="/assessment" onClick={close} className="text-accent font-medium no-underline">Take the Assessment</Link>
                <a href="https://wefunder.com/ai.8" target="_blank" rel="noopener noreferrer" onClick={close} className="text-text-secondary hover:text-white transition-colors no-underline">Invest on Wefunder</a>
                <button onClick={() => scrollTo('waitlist')} className="mt-2 px-5 py-3 text-sm font-bold text-black bg-accent hover:bg-accent-hover rounded-full transition-all cursor-pointer border-none">
                  Request Invite
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
