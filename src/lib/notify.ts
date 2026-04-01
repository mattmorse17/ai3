const KAIFECTA_API_KEY = 'w3e991ee451fb4cfda364772af5783d1f'
const SIMVOLY_API_BASE = 'https://matt-morse.kaifecta.com/api/site'

export async function submitLead(data: {
  source: string
  email: string
  name?: string
  interest?: string
  investInterest?: boolean
  [key: string]: string | boolean | undefined
}) {
  // Always store locally as backup
  try {
    const existing = JSON.parse(localStorage.getItem('ai3_leads') || '[]')
    existing.push({ ...data, timestamp: new Date().toISOString() })
    localStorage.setItem('ai3_leads', JSON.stringify(existing))
  } catch { /* silent */ }

  // Build tags
  const tags = ['ai3-lead', data.source]
  if (data.interest === 'now') tags.push('now-interest')
  if (data.interest === 'move') tags.push('move-interest')
  if (data.interest === 'both') tags.push('now-interest', 'move-interest')
  if (data.investInterest) tags.push('investor-interest')

  // 1. Submit to Simvoly/Kaifecta CRM as a contact
  try {
    await fetch(`${SIMVOLY_API_BASE}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KAIFECTA_API_KEY}`,
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name || data.email.split('@')[0],
        tags: tags.join(','),
        source: `makeyourmove.ai/${data.source}`,
      }),
    })
  } catch { /* silent */ }

  // 2. Send email notification to Matt via Web3Forms (free, no signup)
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '1564f845-3e6c-4744-8c4a-1e98966aae18',
        subject: `🟢 New AI³ Lead: ${data.source}`,
        from_name: 'AI³ MakeYourMove.ai',
        email: data.email,
        name: data.name || 'Not provided',
        source: data.source,
        interest: data.interest || 'Not specified',
        invest_interest: data.investInterest ? 'Yes' : 'No',
        message: `New lead from makeyourmove.ai/${data.source}\n\nEmail: ${data.email}\nName: ${data.name || 'N/A'}\nInterest: ${data.interest || 'N/A'}\nInvestor: ${data.investInterest ? 'Yes' : 'No'}\nTags: ${tags.join(', ')}`,
      }),
    })
  } catch { /* silent */ }

  // 3. Fallback: also try Simvoly form submission endpoint
  try {
    await fetch(`${SIMVOLY_API_BASE}/form-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KAIFECTA_API_KEY}`,
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name || '',
        fields: {
          source: `makeyourmove.ai/${data.source}`,
          interest: data.interest || '',
          invest_interest: data.investInterest ? 'yes' : 'no',
          tags: tags.join(','),
        },
      }),
    })
  } catch { /* silent */ }
}
