import { useNavigate } from 'react-router-dom';
//import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

return (
    <div className="home-page">
        <header>
            <h1 className="title">Welcome to FOODIES!</h1>
      </header>
      <button className="profile-button" onClick={() => navigate('/profile')}>Profile</button>
      <main className="main-buttons">
          <button onClick={() => navigate('/menu')}>Scan QR to Order</button>
      </main>
      <footer>
          <p className="graphics-placeholder">Food Graphics...</p>
      </footer>
  </div>
);
}
