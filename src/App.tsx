import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Invest from './pages/Invest'
import AvatarPage from './pages/AvatarPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/for/:slug" element={<AvatarPage />} />
      </Routes>
    </BrowserRouter>
  )
}
