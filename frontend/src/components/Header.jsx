import { useState, useEffect } from 'react'

const LogoSVG = ({ className }) => (
  <svg viewBox="0 0 80 100" className={className || "logo-svg"}>
    <circle cx="45" cy="12" r="8" fill="#F5B800"/>
    <path d="M25 85 Q30 50 45 35 Q60 50 65 85" stroke="#F5B800" strokeWidth="3" fill="none"/>
    <path d="M45 35 Q20 25 15 15" stroke="#F5B800" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M45 35 Q55 20 70 18" stroke="#F5B800" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <ellipse cx="35" cy="55" rx="12" ry="20" fill="rgba(128,128,128,0.3)" stroke="#888" strokeWidth="1.5"/>
    <ellipse cx="55" cy="55" rx="12" ry="20" fill="rgba(128,128,128,0.3)" stroke="#888" strokeWidth="1.5"/>
  </svg>
)

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
      <div className="header-inner">
        <a href="#" className="logo" id="logo-link">
          <div className="logo-figure">
            <LogoSVG />
          </div>
          <div className="logo-text">
            <span className="logo-happy">HAPPY</span>
            <span className="logo-fitness">FITNESS</span>
            <span className="logo-tagline">Let's train with us</span>
          </div>
        </a>
        <nav className="nav" id="main-nav">
          <button
            className="nav-toggle"
            id="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="nav-links">
            {[
              ['#hero', 'DÉCOUVRIR'],
              ['#cours', 'COURS'],
              ['#dashboard', 'DASHBOARD'],
              ['#pricing', 'PRIX'],
              ['#contact', 'CONTACT']
            ].map(([href, label]) => (
              <li key={label}>
                <a href={href} className="nav-link" onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export { LogoSVG }
