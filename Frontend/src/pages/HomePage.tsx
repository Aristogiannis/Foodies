// HomePage.tsx
import { useNavigate } from 'react-router-dom';
import '../services/HomePage.css';
import { PlateIcon, MobileIcon, ChartIcon, CameraIcon, PlusIcon, BuildingIcon } from '../components/Icons';

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
          <button onClick={() => navigate('/order?table=1')}>
            <PlateIcon size={20} /> Customer Order (Demo)
          </button>

          <button onClick={() => navigate('/menu')}>
            <MobileIcon size={20} /> View Menu
          </button>

          {loggedIn && (
            <>
              <button onClick={() => navigate('/order-tracking')}>
                <ChartIcon size={20} /> Order Tracking
              </button>

              <button onClick={() => navigate('/qr-management')}>
                <CameraIcon size={20} /> QR Code Management
              </button>

              <button onClick={() => navigate('/menu-entry')}>
                <PlusIcon size={20} /> Add Menu Items
              </button>
            </>
          )}

          {!loggedIn && (
            <button onClick={() => navigate('/CreateQrForBussiness')}>
              <BuildingIcon size={20} /> Business Features (Login Required)
            </button>
          )}
        </div>
        <p className="footer-text">
          {loggedIn ? 'Welcome back! Manage your restaurant from the dashboard above.' : 'Login to access business management features.'}
        </p>
      </main>
    </div>
  );
}
