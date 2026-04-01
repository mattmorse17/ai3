import LiveActivity from '../components/LiveActivity'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Numbers from '../components/Numbers'
import Thesis from '../components/Thesis'
import HowItWorks from '../components/HowItWorks'
import Integrations from '../components/Integrations'
import Avatars from '../components/Avatars'
import Products from '../components/Products'
import Ventures from '../components/Ventures'
import InvestorCTA from '../components/InvestorCTA'
import Waitlist from '../components/Waitlist'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <Hero />
      <Numbers />
      <Thesis />
      <Integrations />
      <Avatars />
      <Products />
      <HowItWorks />
      <Ventures />
      <InvestorCTA />
      <Waitlist />
      <Footer />
      <LiveActivity />
    </div>
  )
}
