import { useState } from 'react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        setStatus({ type: 'success', msg: data.message })
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setStatus({ type: 'error', msg: 'Erreur lors de l\'envoi. Veuillez réessayer.' })
      }
    } catch {
      setStatus({ type: 'error', msg: 'Serveur indisponible. Contactez-nous par téléphone.' })
    }
    setLoading(false)
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <div className="section-header">
          <span className="section-tag">NOUS REJOINDRE</span>
          <h2 className="section-title">Contactez-Nous</h2>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info-card">
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <span className="contact-label">ADRESSE</span>
                <span className="contact-value">Hay Chmaou, Yousra Zarkae 60 (prêt de la société Coca Cola), Salé, Morocco</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <div>
                <span className="contact-label">TÉLÉPHONE</span>
                <span className="contact-value">05378-77734</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <span className="contact-label">EMAIL</span>
                <span className="contact-value">happyfitness.infos@gmail.com</span>
              </div>
            </div>
            <div className="contact-socials">
              <a href="https://Facebook.com/Happyfitness.ma" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/happyfitnessclub_/" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">NOM COMPLET</label>
                <input className="form-input" type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">EMAIL</label>
                <input className="form-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">TÉLÉPHONE</label>
                <input className="form-input" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">SUJET</label>
                <input className="form-input" type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">MESSAGE</label>
                <textarea className="form-textarea" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'ENVOI...' : 'ENVOYER LE MESSAGE'}
              </button>
              {status && (
                <div className={`form-status ${status.type}`}>{status.msg}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
