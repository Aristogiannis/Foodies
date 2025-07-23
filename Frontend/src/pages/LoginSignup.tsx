import { useNavigate } from 'react-router-dom';
import '../services/LoginSignup.css';

export default function LoginSignup() {
  const navigate = useNavigate();

  return (
    <div className="loginsignup-container">
      <header className="header1">
        <h2>👤</h2>
      </header>
      <nav className="loginsignup-nav">
        <button className="login-button" onClick={() => navigate('/loginsignup/login')}>
          Login
        </button>
        <button className="signup-button" onClick={() => navigate('/loginsignup/signup')}>
          Sign Up
        </button>
        <button className="about-button" onClick={() => navigate('/loginsignup/about')}>
          About
        </button>
        <button className ="contact-button" onClick={() => navigate('/loginsignup/contact')}>
          Contact
        </button>
        
      </nav>
      <button className="back-button1" onClick={() => navigate('/')}>
        Back
        </button>
    </div>
  );
}
