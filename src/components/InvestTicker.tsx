export default function InvestTicker() {
  const items = [
    '\ud83d\udfe2 Now Raising \u2014 Community Round + Private Round Open',
    'Invest starting at $100 \u2014 Private round available for accredited investors',
    'Request an Invite for Now + Move',
    '\ud83d\udfe2 Now Raising \u2014 Community Round + Private Round Open',
    'Invest starting at $100 \u2014 Private round available for accredited investors',
    'Request an Invite for Now + Move',
  ]

  return (
    <a href="/invest" className="fixed top-0 left-0 right-0 z-50 block bg-accent text-black text-xs font-bold overflow-hidden whitespace-nowrap h-8 flex items-center no-underline hover:bg-accent-hover transition-colors cursor-pointer">
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
