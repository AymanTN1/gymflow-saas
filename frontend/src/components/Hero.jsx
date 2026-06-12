import { useEffect, useRef } from 'react'
import ThreeScene from './ThreeScene'

function AnimatedCounter({ target, duration = 2000 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start = 0
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      el.textContent = Math.floor(progress * target)
      if (progress < 1) requestAnimationFrame(step)
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(step)
        observer.disconnect()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])
  return <span className="hero-stat-number" ref={ref}>0</span>
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="grid-bg" aria-hidden="true">
        <div className="grid-overlay" />
      </div>
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            NOUVELLE GÉNÉRATION
          </div>
          <h1 className="hero-title" id="hero-title">
            <span className="title-line">HAPPY FITNESS</span>
            <span className="title-line">CLUB<span className="title-colon">:</span></span>
            <span className="title-line title-accent">DÉPASSEZ</span>
            <span className="title-line title-accent">VOS LIMITES</span>
          </h1>
          <p className="hero-subtitle">
            Votre complexe sportif nouvelle génération.
          </p>
          <div className="hero-cta-group">
            <a href="#pricing" className="btn btn-primary" id="hero-cta">
              <span>COMMENCER MAINTENANT</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#cours" className="btn btn-ghost" id="hero-cta-secondary">
              VOIR LES COURS
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <AnimatedCounter target={500} />
              <span className="hero-stat-plus">+</span>
              <span className="hero-stat-label">Membres Actifs</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <AnimatedCounter target={15} duration={1500} />
              <span className="hero-stat-plus">+</span>
              <span className="hero-stat-label">Cours / Semaine</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <AnimatedCounter target={5} duration={1000} />
              <span className="hero-stat-label">Coachs Experts</span>
            </div>
          </div>
        </div>
        <ThreeScene />
      </div>
    </section>
  )
}
