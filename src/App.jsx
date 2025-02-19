import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/auth/Login'
import Home from './pages/Home'
import Register from './pages/auth/Register'
import BottomMenu from './components/BottomMenu'
import Artikel from './pages/news/Artikel'
import Relawan from './pages/relawan/Relawan'
import DetailRelawan from './pages/relawan/Detail'
import Profile from './pages/Profile'
import NewsDetail from './pages/news/Details'

function AppContent() {
  const navigate = useLocation();

  // Mengecek apakah kita berada di halaman '/' atau '/register'
  const isHomeOrRegister = navigate.pathname === '/' || navigate.pathname === '/register' || navigate.pathname === '/data-user';

  return (
    <>
      <div className='flex justify-center'>
        {!isHomeOrRegister && <BottomMenu />}
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/news-detail/:id" element={<NewsDetail />} />
        <Route path="/relawan" element={<Relawan />} />
        <Route path="/detail-relawan/:id" element={<DetailRelawan />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
