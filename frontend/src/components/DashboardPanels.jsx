import { useEffect, useRef } from 'react'

// Simple QR-like pattern
function QRCode() {
  const pattern = [
    [1,1,1,0,1,1,1],
    [1,0,1,0,1,0,1],
    [1,1,1,0,1,1,1],
    [0,0,0,1,0,0,0],
    [1,1,1,0,1,0,1],
    [1,0,0,1,0,1,0],
    [1,1,1,0,1,1,1],
  ]
  return (
    <div className="qr-grid">
      {pattern.flat().map((v, i) => (
        <div key={i} className={`qr-cell ${v ? 'filled' : 'empty'}`} />
      ))}
    </div>
  )
}

function RevealPanel({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add('visible'), delay)
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function DashboardPanels() {
  return (
    <section className="dashboard-section" id="dashboard">
      <div className="dashboard-inner">
        <div className="section-header">
          <span className="section-tag">DASHBOARD</span>
          <h2 className="section-title">Votre Espace Membre</h2>
          <p className="section-desc">Tout votre suivi fitness en un coup d'œil.</p>
        </div>

        <div className="dashboard-grid">
          {/* Badge Digital */}
          <RevealPanel>
            <div className="dash-panel" id="panel-badge">
              <div className="panel-header">
                <div className="panel-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7z"/></svg>
                </div>
                <span className="panel-title">BADGE DIGITAL</span>
                <span className="panel-dot online" />
              </div>
              <div className="badge-content">
                <div className="qr-code"><QRCode /></div>
                <div className="badge-info">
                  <span className="badge-name">MEMBRE #2847</span>
                  <span className="badge-type">Accès Premium</span>
                </div>
              </div>
            </div>
          </RevealPanel>

          {/* Prochain Cours */}
          <RevealPanel delay={100}>
            <div className="dash-panel" id="panel-cours">
              <div className="panel-header">
                <div className="panel-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <span className="panel-title">PROCHAIN COURS</span>
                <span className="panel-live">LIVE</span>
              </div>
              <div className="cours-content" id="cours">
                <div className="cours-image">
                  <img src="/pics/488725246_1226107868994212_332962039522165830_n.jpg" alt="Salle Zumba" loading="lazy" />
                  <div className="cours-time-badge">18h30</div>
                </div>
                <div>
                  <div className="cours-name">ZUMBA</div>
                  <div className="cours-time">Aujourd'hui — 18h30</div>
                  <div className="cours-progress-bar">
                    <div className="cours-progress-fill" style={{ width: '85%' }} />
                  </div>
                  <span className="cours-places">🔥 3 PLACES RESTE</span>
                </div>
              </div>
            </div>
          </RevealPanel>

          {/* Abonnement */}
          <RevealPanel delay={200} className="dash-abo-wrap">
            <div className="dash-panel dash-abo" id="panel-abo">
              <div className="panel-header">
                <div className="panel-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <span className="panel-title">MON ABONNEMENT</span>
              </div>
              <div className="abo-content">
                <div>
                  <div className="abo-active">ACTIF</div>
                  <div className="abo-type">Premium</div>
                </div>
                <div className="abo-details">
                  <div className="abo-ring">
                    <svg viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(245,184,0,0.1)" strokeWidth="4"/>
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#F5B800" strokeWidth="4"
                        strokeDasharray="213.6" strokeDashoffset="21.36" strokeLinecap="round"
                        transform="rotate(-90 40 40)" />
                    </svg>
                    <span className="ring-text">28<small>j</small></span>
                  </div>
                  <span className="abo-expire">Expire dans 28 jours</span>
                </div>
              </div>
            </div>
          </RevealPanel>

          {/* Performance */}
          <RevealPanel delay={300} className="dash-perf-wrap">
            <div className="dash-panel dash-perf" id="panel-perf">
              <div className="panel-header">
                <div className="panel-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <span className="panel-title">PERFORMANCE</span>
              </div>
              <div className="perf-chart">
                <svg viewBox="0 0 200 60" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="cGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#F5B800', stopOpacity: 0.3 }}/>
                      <stop offset="100%" style={{ stopColor: '#F5B800', stopOpacity: 0 }}/>
                    </linearGradient>
                  </defs>
                  <path d="M0,50 Q25,45 50,35 T100,25 T150,15 T200,20 L200,60 L0,60 Z" fill="url(#cGrad)"/>
                  <path d="M0,50 Q25,45 50,35 T100,25 T150,15 T200,20" fill="none" stroke="#F5B800" strokeWidth="2"/>
                  <circle cx="200" cy="20" r="3" fill="#F5B800" />
                </svg>
              </div>
              <div className="perf-stats">
                <div className="perf-stat"><span className="perf-val">12</span><span className="perf-lbl">Séances</span></div>
                <div className="perf-stat"><span className="perf-val">8.5h</span><span className="perf-lbl">Total</span></div>
                <div className="perf-stat"><span className="perf-val">🔥</span><span className="perf-lbl">En forme</span></div>
              </div>
            </div>
          </RevealPanel>
        </div>
      </div>
    </section>
  )
}
