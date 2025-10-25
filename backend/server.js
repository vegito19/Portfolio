require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const validator = require('validator')

const app = express()
const PORT = process.env.PORT || 5000

// basic security headers
app.use(helmet())
app.use(cors())
app.use(express.json())

// trust proxy when deployed behind proxies (Heroku, Vercel, etc.)
app.set('trust proxy', true)

// simple health
app.get('/api/health', (req, res) => res.json({ ok: true }))

// rate limiter for contact endpoint to reduce spam
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 6, // limit each IP to 6 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
})

app.post('/api/contact', contactLimiter, async(req, res) => {
    let { name, email, message } = req.body || {}
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' })

    // basic validation
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
        return res.status(400).json({ error: 'Invalid field types' })
    }

    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Invalid email address' })
    if (message.length > 5000) return res.status(400).json({ error: 'Message too long' })

    // sanitize for logging/email
    name = validator.escape(name.trim())
    email = email.trim()
    const cleanMessage = validator.escape(message.trim())

    // If SMTP config is provided, try to send an email. Otherwise just log to console.
    const smtpHost = process.env.SMTP_HOST
    if (smtpHost) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT) || 587,
                secure: process.env.SMTP_SECURE === 'true',
                auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
            })

            const info = await transporter.sendMail({
                from: process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@example.com',
                to: process.env.EMAIL_TO || process.env.EMAIL_FROM || process.env.SMTP_USER,
                subject: `Portfolio contact from ${name}`,
                text: `${cleanMessage}\n\nFrom: ${name} <${email}>`
            })

            console.log('Message sent:', info.messageId)
            return res.json({ ok: true })
        } catch (err) {
            console.error('Error sending email', err)
            return res.status(500).json({ error: 'Failed to send email' })
        }
    }

    // No SMTP configured — just log message for now
    console.log('Contact message:', { name, email, message: cleanMessage })
    return res.json({ ok: true, note: 'Message logged (no SMTP configured)' })
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))