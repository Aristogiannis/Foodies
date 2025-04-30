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
        <button className="profile-btn" onClick={() => navigate('/profile')}>
          Profile
        </button>
      </header>

      <main className="main-section">
        <div className="main-buttons">
          <button onClick={() => navigate('/menu')}>Scan table QR to Order</button>
          <button onClick={() => alert('Business QR functionality coming soon')}>
            Create QR for business
          </button>
        </div>
        <p className="footer-text">FOOD GRAPHICS PLACEHOLDER...</p>
      </main>
    </div>
  );
}
