Minimal Node.js backend for portfolio contact form

Quick start (Windows PowerShell):

```powershell
cd c:\Portfolio\backend
npm install
# copy .env.example to .env and fill SMTP settings if you want real emails
# On Windows PowerShell:
copy .env.example .env
# then edit .env with your SMTP credentials
npm run dev   # uses nodemon if installed
# or
npm start
```

Behavior:
- POST /api/contact accepts JSON { name, email, message }
- If SMTP env vars are configured, it will send an email via nodemailer
- If no SMTP config, it will log the message to the server console and return success

Notes:
- For testing use Mailtrap or another SMTP testing service and set the SMTP_* env vars.
- When deploying, set environment vars on your host (e.g., Vercel, Render, Heroku).
 
Security and testing tips:

- This server includes a basic rate limiter (6 requests per IP per hour) on `/api/contact` to reduce spam.
- For testing email delivery use Mailtrap (https://mailtrap.io): copy the SMTP credentials into `.env` (see `.env.example` comments).
- In production, configure environment variables on your host and consider adding captcha (reCAPTCHA) to the frontend to further reduce abuse.

If you want, I can add:
- reCAPTCHA wiring on the frontend and server-side verification
- A SendGrid API-based sender instead of SMTP
- Deployment instructions for Render or Vercel (serverless)
