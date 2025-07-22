import { useNavigate } from 'react-router-dom';
import '../services/tabs.css';

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="tabs-container">
      <header className="header1">
        <h1>Contact Us</h1>
        <h2>📞</h2>
      </header>
      
      <div className="contact-content">
        <h2>Get in Touch</h2>
        <p>If you have any questions, feedback, or need support, we'd love to hear from you!</p>
        <p>📧 Email: <a href="mailto:foodies-info@gmail.com">foodies-info@gmail.com</a></p>
        <p>📱 Phone: <strong>+30 210 210 2100</strong></p>
        <p>🕒 Support Hours: Monday - Friday, 9:00 AM - 6:00 PM</p>
      </div>
      
      <button className="back-button" onClick={() => navigate('/loginsignup')}>
        Back
      </button>
    </div>
  );
}