import './App.css'
import { Routes, Route } from 'react-router-dom'
import { MenuPage } from './pages/MenuPage'
import HomePage from './pages/HomePage'
//import { OrderSummaryPage } from './pages/OrderSummaryPage'

import ProfilePage from './pages/ProfilePage'


function App() {
 return (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/menu" element={<MenuPage />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
)
}

export default App
