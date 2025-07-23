import { useNavigate } from 'react-router-dom';
import '../services/tabs.css';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="tabs-container">
      <header className="header1">
        <h2>🍽️</h2>
      </header>
      
      <div className="about-content">
        <h2>Welcome to Foodies!</h2>
        <p>We are passionate about revolutionizing the dining experience by connecting restaurants and customers through innovative technology.</p>
        <p>Our mission is to help restaurants serve you faster and more efficiently, while providing you with a seamless ordering experience.</p>
        <p>With our QR code system, you can browse menus, place orders, and enjoy your meal without the wait!</p>
      </div>
      
      <button className="back-button" onClick={() => navigate('/loginsignup')}>
        Back
      </button>
    </div>
  );
}

