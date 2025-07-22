import {useNavigate} from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="tabs-container">
      <header className="header1">
        <h1>Contact Us</h1>
        <h2>👤</h2> 
        
      </header>
      <div className="contact-content">
        <p>If you have any questions, feel free to reach out!</p>
        <p>📩: 
            <a href="mailto:foodies-info@gmail.com"> foodies-info@gmail.com</a>
         </p>
        <p>📞:2102102100</p>
         </div>
         <button className="back-button" onClick={() => navigate('/loginsignup')}>
        &lt; Back
        </button>
    </div>  
    );
}