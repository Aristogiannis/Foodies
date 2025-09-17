import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../components/SnackbarContext';
import '../services/CreateQrForBussiness.css';

interface QRFormData {
  menuUrl: string;
  numTables: number;
}

export default function CreateQrForBussiness() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();
  const [formData, setFormData] = useState<QRFormData>({
    menuUrl: '',
    numTables: 1
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numTables' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const authToken = localStorage.getItem('authToken');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch('http://localhost:8080/api/qr-codes', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          menuUrl: formData.menuUrl,
          numTables: formData.numTables
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('QR codes generated:', data);
        showSuccess(`Successfully generated ${data.length} QR codes for tables!`);
        
        // Reset form
        setFormData({
          menuUrl: '',
          numTables: 1
        });
      } else {
        const errorText = await response.text();
        console.error('Failed to generate QR codes:', errorText);
        showError('Failed to generate QR codes. Please check your permissions and try again.');
      }
    } catch (error) {
      console.error('Error generating QR codes:', error);
      showError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="qr-create-page">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Generate QR Codes</h1>
          <p>Create QR codes for your restaurant tables to enable digital menu ordering</p>
        </div>
        <div className="header-actions">
          <button 
            className="refresh-btn secondary"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="form-container">
        <form className="CreateQr-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="menuUrl">Menu URL</label>
            <input 
              type="url" 
              id="menuUrl" 
              name="menuUrl" 
              value={formData.menuUrl}
              onChange={handleInputChange}
              placeholder="https://your-restaurant-menu.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="numTables">Number of Tables</label>
            <input 
              type="number" 
              id="numTables" 
              name="numTables"
              value={formData.numTables}
              onChange={handleInputChange}
              placeholder="Enter number of tables"
              min="1"
              max="100"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Generating...' : 'Generate QR Codes'}
          </button>
        </form>
      </div>
    </div>
  );
}