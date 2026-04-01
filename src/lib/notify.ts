const KAIFECTA_API_KEY = 'w3e991ee451fb4cfda364772af5783d1f'
const KAIFECTA_URL = 'https://matt-morse.kaifecta.com/me/crm'

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

  // Submit to Kaifecta CRM
  try {
    const tags = ['ai3-lead', data.source]
    if (data.interest === 'now') tags.push('now-interest')
    if (data.interest === 'move') tags.push('move-interest')
    if (data.interest === 'both') tags.push('now-interest', 'move-interest')
    if (data.investInterest) tags.push('investor-interest')

    await fetch(KAIFECTA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + KAIFECTA_API_KEY,
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name || '',
        tags: tags,
        source: 'makeyourmove.ai/' + data.source,
        custom_fields: {
          interest: data.interest || '',
          invest_interest: data.investInterest ? 'yes' : 'no',
        },
      }),
    })
  } catch { /* silent - localStorage backup exists */ }
}
