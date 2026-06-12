const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
)
const Cross = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
)
const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
)

export default function PricingSection() {
  return (
    <section className="pricing" id="pricing">
      <div className="pricing-inner">
        <div className="section-header">
          <span className="section-tag">ABONNEMENTS</span>
          <h2 className="section-title">Packs D'Abonnement</h2>
          <p className="section-desc">Choisissez le programme qui vous convient et commencez votre transformation.</p>
        </div>

        <div className="pricing-grid">
          {/* HAPPIER PACK */}
          <div className="price-card price-card-premium" id="pack-happier">
            <div className="price-card-glow" />
            <div className="price-badge-wrap">
              <span className="price-popular">★ POPULAIRE</span>
            </div>
            <div className="price-card-inner">
              <h3 className="price-name">HAPPIER PACK</h3>
              <p className="price-subtitle">L'expérience ultime</p>
              <div className="price-amount">
                <span className="price-currency">DHS</span>
                <span className="price-value">780</span>
                <span className="price-period">/trimestre</span>
              </div>
              <ul className="price-features">
                {['Accès illimité Gym & Cardio','Planning personnalisé','1x Séance Coach Privé /mois','Accès vestiaires premium','Badge digital & suivi'].map(f => (
                  <li key={f} className="feature-item"><Check /><span>{f}</span></li>
                ))}
              </ul>
              <a href="#contact" className="btn btn-primary btn-full" id="cta-happier">
                <span>S'INSCRIRE MAINTENANT</span><Arrow />
              </a>
            </div>
          </div>

          {/* HAPPY PACK */}
          <div className="price-card" id="pack-happy">
            <div className="price-card-inner">
              <h3 className="price-name">HAPPY PACK</h3>
              <p className="price-subtitle">L'essentiel pour commencer</p>
              <div className="price-amount">
                <span className="price-currency">DHS</span>
                <span className="price-value">330</span>
                <span className="price-period">/mois</span>
              </div>
              <ul className="price-features">
                {['Accès Gym & Cardio','Planning standard','Suivi digital','Accès vestiaires'].map(f => (
                  <li key={f} className="feature-item"><Check /><span>{f}</span></li>
                ))}
                <li className="feature-item feature-disabled"><Cross /><span>Coach Privé</span></li>
              </ul>
              <a href="#contact" className="btn btn-outline btn-full" id="cta-happy">
                <span>S'INSCRIRE MAINTENANT</span><Arrow />
              </a>
            </div>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="pricing-table-wrap" id="pricing-table">
          <h3 className="table-title">Grille Tarifaire Complète</h3>
          <div className="pricing-table">
            <div className="table-row table-header-row">
              <div className="table-cell">FORMULE</div>
              <div className="table-cell">MENSUEL</div>
              <div className="table-cell">TRIMESTRIEL</div>
              <div className="table-cell">ANNUEL</div>
            </div>
            {[
              ['Accès Libre', '330 DHS', '780 DHS', '2200 DHS', true],
              ['Musculation', '230 DHS', '500 DHS', '—', false],
              ['Cardio', '200 DHS', '500 DHS', '—', false],
            ].map(([formula, m, q, a, hl]) => (
              <div className="table-row" key={formula}>
                <div className="table-cell cell-label">{formula}</div>
                <div className="table-cell"><span className="price-tag">{m}</span></div>
                <div className="table-cell"><span className="price-tag">{q}</span></div>
                <div className="table-cell"><span className={`price-tag ${hl ? 'highlight' : ''}`}>{a}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
