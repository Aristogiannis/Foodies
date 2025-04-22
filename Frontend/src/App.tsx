import './App.css'
import { Routes, Route } from 'react-router-dom'
import { MenuPage } from './pages/MenuPage'
import HomePage from './pages/HomePage'
//import { OrderSummaryPage } from './pages/OrderSummaryPage'

const About = () => {
  return (
    <>
      <h1>About</h1>
      <h2>ℹ️ This is the About Page</h2>
    </>
  )
}
const contact = () => <h2>📞 This is the Contact Page</h2>

const ProfilePage = () => (
  <>
  <h1>👤</h1>
  <ul>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
    </ul>
    </>
)
function App() {
 return (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/menu" element={<MenuPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={contact()} />
  </Routes>
)
}

export default App
