import './App.css'
import { Routes, Route } from 'react-router-dom'
import { MenuPage } from './pages/MenuPage'
import HomePage from './pages/HomePage'
import LoginSignup from './pages/LoginSignup'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
//import { OrderSummaryPage } from './pages/OrderSummaryPage'
import CreateQrForBussiness from './pages/CreateQrForBussiness'



function App() {
 return (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/CreateQrForBussiness" element={<CreateQrForBussiness />} />
    <Route path="/menu" element={<MenuPage />} />
    <Route path="/loginsignup" element={<LoginSignup />} />
    <Route path="/loginsignup/about" element={<About />} />
    <Route path="/loginsignup/contact" element={<Contact />} />
    <Route path="/loginsignup/login" element={<Login />} />
    <Route path="/loginsignup/signup" element={<Signup />} />
    
    

  </Routes>
)
}

export default App
