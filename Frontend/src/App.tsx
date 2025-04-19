import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { MenuPage } from './pages/MenuPage'
//import { OrderSummaryPage } from './pages/OrderSummaryPage'

const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

const About = () => {
  return (
    <>
      <h1>About</h1>
      <h2>ℹ️ This is the About Page</h2>
    </>
  )
}
const contact = () => <h2>📞 This is the Contact Page</h2>
function App() {
 return (
<div>
  <h1>React Router</h1>
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li><Link to="/menu">Menu</Link></li>
    </ul>
  </nav>

  <Routes>
    <Route path="/menu" element={<MenuPage />} />
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={contact()} />
  </Routes>
</div> 
)
}

export default App
