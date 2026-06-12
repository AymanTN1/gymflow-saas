import { LogoSVG } from './Header'

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-figure logo-figure-sm">
                <LogoSVG />
              </div>
              <span className="footer-brand-name">Happy Fitness Club</span>
            </div>
          </div>
          <nav className="footer-links">
            <a href="#hero" className="footer-link">A propos</a>
            <a href="#cours" className="footer-link">Cours</a>
            <a href="#pricing" className="footer-link">Prix</a>
            <a href="#contact" className="footer-link">Contact</a>
          </nav>
          <div className="footer-tagline">
            <span>Let's train with us</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Happy Fitness Club. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  )
}
