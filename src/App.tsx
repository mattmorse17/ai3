import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/for/:slug" element={<AvatarPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/kaifect" element={<Kaifect />} />
        <Route path="/village" element={<Village />} />
        <Route path="/vyro" element={<Vyro />} />
        <Route path="/move-demo" element={<MoveDemo />} />
      </Routes>
    </BrowserRouter>
  )
}
