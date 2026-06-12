import Header from './components/Header'
import Hero from './components/Hero'
import DashboardPanels from './components/DashboardPanels'
import PricingSection from './components/PricingSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DashboardPanels />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
