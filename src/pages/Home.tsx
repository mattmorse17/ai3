import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Thesis from '../components/Thesis'
import Numbers from '../components/Numbers'
import Avatars from '../components/Avatars'
import Products from '../components/Products'
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
      <Avatars />
      <Products />
      <InvestorCTA />
      <Waitlist />
      <Footer />
    </div>
  )
}
