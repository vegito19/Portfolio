import React, { useState } from 'react'

export default function Contact(){
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  async function handleSubmit(e){
    e.preventDefault()
    setStatus('sending')
    try{
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if(res.ok){
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch(err){
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Contact</h2>
        <p>If you'd like to get in touch, send me a message using the form below or email me at <a href="mailto:you@example.com">you@example.com</a>.</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>Name
            <input type="text" name="name" required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          </label>
          <label>Email
            <input type="email" name="email" required value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
          </label>
          <label>Message
            <textarea name="message" rows="6" required value={form.message} onChange={e=>setForm({...form, message: e.target.value})} />
          </label>
          <button type="submit" className="btn" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send'}</button>
        </form>

        {status === 'success' && <p className="note success">Thanks — your message was sent.</p>}
        {status === 'error' && <p className="note error">Sorry, there was a problem sending your message. Try again later.</p>}
      </div>
    </section>
  )
}
