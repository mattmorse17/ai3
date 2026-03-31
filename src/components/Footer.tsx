import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="text-lg font-black gradient-text">AI³</span>
            <span className="text-text-muted text-sm">The Intelligence Company</span>
          </div>

          <div className="flex items-center gap-8 flex-wrap justify-center md:justify-end">
            <Link to="/blog" className="text-sm text-text-muted hover:text-white transition-colors no-underline">
              Blog
            </Link>
            <Link to="/case-studies" className="text-sm text-text-muted hover:text-white transition-colors no-underline">
              Case Studies
            </Link>
            <Link to="/about" className="text-sm text-text-muted hover:text-white transition-colors no-underline">
              About
            </Link>
            <Link to="/assessment" className="text-sm text-text-muted hover:text-white transition-colors no-underline">
              Assessment
            </Link>
            <Link to="/invest" className="text-sm text-text-muted hover:text-white transition-colors no-underline">
              Invest
            </Link>
            <a href="mailto:hello@kaifect.com" className="text-sm text-text-muted hover:text-white transition-colors no-underline">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-text-muted leading-relaxed max-w-2xl mx-auto">
            AI³ Inc. All rights reserved. Investing in startups involves risk, including the risk of loss
            of your entire investment. This page is not an offer or solicitation to sell securities. Any
            investment offerings will be made only pursuant to applicable securities laws and regulations.
          </p>
        </div>
      </div>
    </footer>
  )
}
