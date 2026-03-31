import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

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
    if (!isHome) {
      window.location.href = `/#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-xl font-black tracking-tight gradient-text">AI³</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('thesis')} className="text-sm text-text-secondary hover:text-white transition-colors bg-transparent border-none cursor-pointer">
            The Thesis
          </button>
          <button onClick={() => scrollTo('who')} className="text-sm text-text-secondary hover:text-white transition-colors bg-transparent border-none cursor-pointer">
            Who It's For
          </button>
          <button onClick={() => scrollTo('products')} className="text-sm text-text-secondary hover:text-white transition-colors bg-transparent border-none cursor-pointer">
            Products
          </button>
          <Link to="/about" className="text-sm text-text-secondary hover:text-white transition-colors no-underline">
            Team
          </Link>
          <Link to="/blog" className="text-sm text-text-secondary hover:text-white transition-colors no-underline">
            Blog
          </Link>
          <Link to="/demo" className="text-sm text-text-secondary hover:text-white transition-colors no-underline">
            Demo
          </Link>
          <Link to="/invest" className="text-sm text-text-secondary hover:text-white transition-colors no-underline">
            Invest
          </Link>
          <button
            onClick={() => scrollTo('waitlist')}
            className="px-5 py-2 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-full transition-all cursor-pointer border-none"
          >
            Get Early Access
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white bg-transparent border-none cursor-pointer p-2"
        >
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
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <button onClick={() => scrollTo('products')} className="text-left text-text-secondary hover:text-white transition-colors bg-transparent border-none cursor-pointer text-base">
                Products
              </button>
              <button onClick={() => scrollTo('thesis')} className="text-left text-text-secondary hover:text-white transition-colors bg-transparent border-none cursor-pointer text-base">
                Why AI³
              </button>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="text-text-secondary hover:text-white transition-colors no-underline text-base">
                Team
              </Link>
              <Link to="/blog" onClick={() => setMobileOpen(false)} className="text-text-secondary hover:text-white transition-colors no-underline text-base">
                Blog
              </Link>
              <Link to="/demo" onClick={() => setMobileOpen(false)} className="text-text-secondary hover:text-white transition-colors no-underline text-base">
                Demo
              </Link>
              <Link to="/invest" onClick={() => setMobileOpen(false)} className="text-text-secondary hover:text-white transition-colors no-underline text-base">
                Invest
              </Link>
              <button
                onClick={() => scrollTo('waitlist')}
                className="mt-2 px-5 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-full transition-all cursor-pointer border-none"
              >
                Get Early Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
