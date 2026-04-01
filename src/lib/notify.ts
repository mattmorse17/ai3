const WEB3FORMS_KEY = '0a2b8a20-5c5a-4e37-9e2b-8b7f8a0d1c3e'

export async function notifySubmission(data: {
  source: string
  email: string
  [key: string]: string | boolean | undefined
}) {
  try {
    const key = 'ai3_leads'
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    existing.push({ ...data, timestamp: new Date().toISOString() })
    localStorage.setItem(key, JSON.stringify(existing))
  } catch { /* silent */ }

  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: 'New AI3 Lead: ' + data.source,
        to: 'matt@matt-morse.com',
        from_name: 'AI3 Platform',
        ...data,
      }),
    })
  } catch { /* silent */ }
}
