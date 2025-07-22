import { useNavigate } from 'react-router-dom';
import '../services/CreateQrForBussiness.css';

export default function CreateQrForBussiness() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle QR creation logic here
    console.log('QR creation submitted');
  };

  return (
    <div className="qr-container">
      <header className="header1">
        <h1>Create QR for Business</h1>
      </header>
      
      <div className="qr-content">
        <h2>Generate QR Codes</h2>
        <p>Create QR codes for your restaurant tables to enable digital menu ordering.</p>
        
        <form className="CreateQr-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="menu-url">Menu URL</label>
            <input 
              type="url" 
              id="menu-url" 
              name="menu-url" 
              placeholder="https://your-restaurant-menu.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="num-tables">Number of Tables</label>
            <input 
              type="number" 
              id="num-tables" 
              name="num-tables"
              placeholder="Enter number of tables"
              min="1"
              max="100"
            />
          </div>
          
          <button type="submit">
            Generate QR Codes
          </button>
        </form>
      </div>
      
      <button className="back-button" onClick={() => navigate('/')}>
        Back
      </button>
    </div>
  );
}