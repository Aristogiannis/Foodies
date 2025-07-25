// HomePage.tsx
import { useNavigate } from 'react-router-dom';
import '../services/homePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="title">
          Welcome to <span className="highlight">FOODIES</span> !
        </div>

  
    {/* Για μη-συνδεδεμένους: Login/Sign up · για συνδεδεμένους: Profile */}
       {loggedIn ? (
         <button
           className="profile-btn"
           onClick={() => navigate('/profile')}
         >
           Profile
         </button>
       ) : (
         <button
           className="loginsignup-btn"
           onClick={() => navigate('/loginsignup')}
         >
          Login/Sign up
        </button>
     )}
      </header>

      <main className="main-section">
        <div className="main-buttons">
          <button onClick={() => navigate('/menu')}>
            Scan table QR to Order
          </button>

          <button
            onClick={() =>
              loggedIn
                ? navigate('/CreateQrForBussiness')
                : navigate('/loginsignup/login')
            }
          >
            Create QR (for business)
          </button>

          <button
            onClick={() =>
              loggedIn
                ? navigate('/menu-entry')
                : navigate('/loginsignup/login')
            }
          >
            Add to Menu (for business)
          </button>
        </div>
        <p className="footer-text">FOOD GRAPHICS PLACEHOLDER...</p>
      </main>
    </div>
  );
}
