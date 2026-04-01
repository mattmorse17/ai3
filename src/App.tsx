import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import InvestTicker from './components/InvestTicker'
import Home from './pages/Home'
import About from './pages/About'
import Invest from './pages/Invest'
import AvatarPage from './pages/AvatarPage'
import Demo from './pages/Demo'
import Assessment from './pages/Assessment'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import CaseStudies from './pages/CaseStudies'
import CaseStudyDetail from './pages/CaseStudyDetail'
import Kaifect from './pages/Kaifect'
import Village from './pages/Village'
import Vyro from './pages/Vyro'
import MoveDemo from './pages/MoveDemo'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <InvestTicker />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/now" element={<Demo />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/for/:slug" element={<AvatarPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/kaifect" element={<Kaifect />} />
        <Route path="/village" element={<Village />} />
        <Route path="/vyro" element={<Vyro />} />
        <Route path="/move" element={<MoveDemo />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
