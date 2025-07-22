import { useNavigate } from 'react-router-dom';
import '../services/homePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="title">
          Welcome to <span className="highlight">FOODIES</span> !
        </div>
        <button className="loginsignup-btn" onClick={() => navigate('/loginsignup')}>
          Login/Sign up
        </button>
      </header>

      <main className="main-section">
        <div className="main-buttons">
          <button onClick={() => navigate('/menu')}>Scan table QR to Order</button>
          <button onClick={() => navigate('/CreateQrForBussiness')}>Create QR for business</button>
          <button onClick={() => navigate('/menu-entry')}>Manage Menu Items</button>
        </div>
        <p className="footer-text">FOOD GRAPHICS PLACEHOLDER...</p>
      </main>
    </div>
  );
}
