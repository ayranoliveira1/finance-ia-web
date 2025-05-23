import { CtaSection } from './components/cta-section'
import { DashboardPreview } from './components/dashboard-preview'
import { FeaturesSection } from './components/features-section'
import { Footer } from './components/footer'
import { HeroSection } from './components/hero-section'
import { Navbar } from './components/navbar'
import { PricingSection } from './components/pricing-section'

const Home = async () => {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DashboardPreview />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  )
}

export default Home
