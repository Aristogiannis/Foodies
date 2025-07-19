import {useNavigate} from 'react-router-dom';
import '../services/CreateQrForBussiness.css';

export default function CreateQrForBussiness() {
  const navigate = useNavigate();

  return (
    <div className="qr-container">
      <header className="header1">
        <h1>Create QR for Business</h1>
        
      </header>
      <div className="qr-content">
        <p>Welcome to the QR Code creation page!</p>
        <p>Here you can create a QR code for your business.</p>
            <form className="CreateQr-form">
            <label htmlFor="Menu URL">Menu URL: </label>
            <input type="text" id="menu-url" name="menu-url" placeholder="E.g. https://mymenu.com/" required />
            <label htmlFor="Num of Tables">Number of Tables: </label>
            <input type="number" id="num-tables" name="num-tables"/>
            <button type="submit">Create QR Code</button>
            </form>
        </div>
      <button className="back-button" onClick={() => navigate('/')}>
        &lt; Back
      </button>
    </div>
  );
}