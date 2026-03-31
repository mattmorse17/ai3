import { Link } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'

export default function InvestTicker() {
  const message = 'AI³ is now raising under Reg CF — open to all investors starting at $500'

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-accent text-black overflow-hidden">
      <Link
        to="/invest"
        className="block h-8 flex items-center no-underline text-black"
      >
        <div className="animate-ticker flex items-center gap-12 whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-2 text-xs font-semibold tracking-wide">
              <TrendingUp size={12} />
              {message}
            </span>
          ))}
        </div>
      </Link>
    </div>
  )
}
