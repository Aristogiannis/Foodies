import { useNavigate } from 'react-router-dom';
import '../services/LoginSignup.css';
import { UserIcon } from '../components/Icons';

export default function LoginSignup() {
  const navigate = useNavigate();

  return (
    <div className="loginsignup-container">
      <header className="header1">
        <h2><UserIcon size={32} /></h2>
      </header>
      <nav className="loginsignup-nav">
        <button className="login-button" onClick={() => navigate('/loginsignup/login')}>
          Login
        </button>
        <button className="signup-button" onClick={() => navigate('/loginsignup/signup')}>
          Sign Up
        </button>
      </nav>
      <button className="back-button1" onClick={() => navigate('/')}>
        Back
        </button>
    </div>
  );
}
