export default function InvestTicker() {
  const items = [
    '\ud83d\udfe2 Now Raising \u2014 Reg CF Open to All Investors',
    'Own a piece of the intelligence layer',
    'Starting at $500',
    '\ud83d\udfe2 Now Raising \u2014 Reg CF Open to All Investors',
    'Own a piece of the intelligence layer',
    'Starting at $500',
  ]

  return (
    <a href="https://wefunder.com/ai.8" target="_blank" rel="noopener noreferrer" className="block bg-accent text-black text-xs font-bold overflow-hidden whitespace-nowrap h-8 flex items-center no-underline hover:bg-accent-hover transition-colors cursor-pointer">
      <div className="animate-ticker flex gap-12">
        {items.map((item, i) => (
          <span key={i} className="inline-block px-4">
            {item}
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="inline-block px-4">
            {item}
          </span>
        ))}
      </div>
    </a>
  )
}
