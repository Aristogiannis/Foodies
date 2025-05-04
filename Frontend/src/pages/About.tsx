import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className ="tabs-container">
        <header className="header1">
            <h1>About Us</h1>
            <h2>👤</h2>
        </header>
        <div className="about-content">
            <p>Welcome to Foodies!</p>
            <p>Who we are? We help restaurants serve you faster!</p>
        </div>
        <button className="back-button" onClick={() => navigate('/loginsignup')}>
        &lt; Back
        </button>
  </div>
  );
}

