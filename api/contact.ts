import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

// Simple in-memory rate limiting (resets on cold start, acceptable for portfolio)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5 // max 5 submissions per hour per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return false
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true
  }

  record.count++
  return false
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return res
      .status(500)
      .json({ error: 'Email service is niet geconfigureerd' })
  }

  const { name, email, message, company_fax } = req.body

  // Honeypot check - if filled, it's a bot
  if (company_fax) {
    // Return success to not alert bots, but don't send email
    return res.status(200).json({ success: true })
  }

  // Rate limiting
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown'
  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ error: 'Te veel verzoeken. Probeer het later opnieuw.' })
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Alle velden zijn verplicht' })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'zeilstramiles@gmail.com',
      replyTo: email,
      subject: `Nieuw bericht van ${name}`,
      html: `
        <h2>Nieuw contactformulier bericht</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({ error: 'Email kon niet worden verzonden' })
  }
}
