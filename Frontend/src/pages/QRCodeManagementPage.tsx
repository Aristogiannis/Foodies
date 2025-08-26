import { useState, useEffect } from 'react';
import { useSnackbar } from '../components/SnackbarContext';
import '../services/QRCodeManagement.css';

interface QRCode {
  id: number;
  tableNumber: number;
  qrCodeData: string;
  menuUrl: string;
  isActive: boolean;
}

interface QRCodeForm {
  menuUrl: string;
  numTables: number;
}

export default function QRCodeManagementPage() {
  const { showSuccess, showError, showInfo } = useSnackbar();
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [editingQrCode, setEditingQrCode] = useState<QRCode | null>(null);
  const [qrForm, setQrForm] = useState<QRCodeForm>({
    menuUrl: window.location.origin + '/order',
    numTables: 1
  });

  useEffect(() => {
    fetchQRCodes();
  }, []);

  const fetchQRCodes = async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem('authToken');
      const headers: HeadersInit = {};
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch('http://localhost:8080/api/qr-codes', {
        headers
      });

      if (response.ok) {
        const data = await response.json();
        setQrCodes(data);
      } else {
        throw new Error('Failed to fetch QR codes');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load QR codes');
      console.error('Error fetching QR codes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQRCodes = async () => {
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
        headers,
        body: JSON.stringify(qrForm)
      });

      if (response.ok) {
        const newQrCodes = await response.json();
        console.log('QR codes generated:', newQrCodes);
        showSuccess(`Successfully generated ${newQrCodes.length} QR codes!`);
        
        setIsAddModalOpen(false);
        setQrForm({
          menuUrl: window.location.origin + '/order',
          numTables: 1
        });
        fetchQRCodes();
      } else {
        const errorText = await response.text();
        console.error('Failed to generate QR codes:', errorText);
        showError('Failed to generate QR codes. Please try again.');
      }
    } catch (error) {
      console.error('Error generating QR codes:', error);
      showError('Network error. Please try again.');
    }
  };

  const downloadQRCode = (tableNumber: number) => {
    // Create QR code download URL (this would typically generate the actual QR image)
    const qrCodeUrl = `${window.location.origin}/order?table=${tableNumber}`;
    
    // For demo purposes, we'll just copy the URL to clipboard
    navigator.clipboard.writeText(qrCodeUrl).then(() => {
      showSuccess(`QR code URL for Table ${tableNumber} copied to clipboard!`);
    }).catch(() => {
      showInfo(`QR code URL for Table ${tableNumber}: ${qrCodeUrl}`);
    });
  };

  const toggleQRCodeStatus = async (qrCode: QRCode) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      // For this demo, we'll just update the local state since we don't have an update endpoint
      setQrCodes(prev => 
        prev.map(qr => 
          qr.id === qrCode.id 
            ? { ...qr, isActive: !qr.isActive }
            : qr
        )
      );
      
      showSuccess(`QR code for Table ${qrCode.tableNumber} ${qrCode.isActive ? 'deactivated' : 'activated'}`);
    } catch (error) {
      console.error('Error updating QR code status:', error);
      showError('Failed to update QR code status');
    }
  };

  const getQRCodeStats = () => {
    const total = qrCodes.length;
    const active = qrCodes.filter(qr => qr.isActive).length;
    const inactive = total - active;
    return { total, active, inactive };
  };

  const stats = getQRCodeStats();

  if (loading) {
    return (
      <div className="qr-management-page">
        <div className="loading">Loading QR codes...</div>
      </div>
    );
  }

  return (
    <div className="qr-management-page">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>QR Code Management</h1>
          <p>Manage QR codes for your restaurant tables</p>
        </div>
        <div className="header-actions">
          <button 
            className="refresh-btn secondary"
            onClick={fetchQRCodes}
            disabled={loading}
          >
            {loading ? '⟳' : '↻'} {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="stats-dashboard">
        <div className="stat-card total">
          <h3>Total QR Codes</h3>
          <div className="stat-number">{stats.total}</div>
        </div>
        <div className="stat-card active">
          <h3>Active</h3>
          <div className="stat-number">{stats.active}</div>
        </div>
        <div className="stat-card inactive">
          <h3>Inactive</h3>
          <div className="stat-number">{stats.inactive}</div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="filter-buttons">
          <button 
            className="filter-btn active"
            onClick={() => setIsAddModalOpen(true)}
          >
            + Generate New QR Codes
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={fetchQRCodes}>Retry</button>
        </div>
      )}

      <div className="orders-grid">
        {qrCodes.map(qrCode => (
          <div key={qrCode.id} className={`order-card ${!qrCode.isActive ? 'status-inactive' : 'status-active'}`}>
            <div className="order-header">
              <div className="order-info">
                <h3>Table {qrCode.tableNumber}</h3>
              </div>
              <div className="order-meta">
                <div className={`status-badge ${qrCode.isActive ? 'status-active' : 'status-inactive'}`}>
                  {qrCode.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
            
            <div className="qr-info">
              <div className="qr-placeholder">
                <div className="qr-visual">
                  {/* This would be replaced with actual QR code image */}
                  <div className="qr-pattern">
                    {Array.from({ length: 25 }, (_, i) => (
                      <div key={i} className={`qr-dot ${Math.random() > 0.5 ? 'filled' : ''}`} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="qr-details">
                <p><strong>URL:</strong> {qrCode.qrCodeData}</p>
                <p><strong>Menu URL:</strong> {qrCode.menuUrl}</p>
              </div>
            </div>

            <div className="order-footer">
              <div className="qr-actions">
                <button 
                  className="download-btn"
                  onClick={() => downloadQRCode(qrCode.tableNumber)}
                >
                  📥 Get URL
                </button>
                <button 
                  className={`toggle-btn ${qrCode.isActive ? 'deactivate' : 'activate'}`}
                  onClick={() => toggleQRCodeStatus(qrCode)}
                >
                  {qrCode.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {qrCodes.length === 0 && !loading && !error && (
        <div className="empty-state">
          <h3>No QR codes found</h3>
          <p>Generate your first QR codes to get started!</p>
          <button 
            className="add-qr-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            Generate QR Codes
          </button>
        </div>
      )}

      {/* Add QR Codes Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Generate QR Codes</h2>
              <button 
                className="close-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="form-group">
                <label htmlFor="menuUrl">Menu URL</label>
                <input
                  type="url"
                  id="menuUrl"
                  value={qrForm.menuUrl}
                  onChange={(e) => setQrForm({ ...qrForm, menuUrl: e.target.value })}
                  placeholder="https://your-restaurant-menu.com"
                  required
                />
                <small>The base URL where customers will access the menu</small>
              </div>

              <div className="form-group">
                <label htmlFor="numTables">Number of Tables</label>
                <input
                  type="number"
                  id="numTables"
                  value={qrForm.numTables}
                  onChange={(e) => setQrForm({ ...qrForm, numTables: parseInt(e.target.value) || 1 })}
                  min="1"
                  max="100"
                  required
                />
                <small>How many table QR codes to generate</small>
              </div>

              <div className="preview">
                <strong>Preview URL:</strong>
                <code>{qrForm.menuUrl}?table=1</code>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="generate-btn"
                onClick={handleCreateQRCodes}
                disabled={!qrForm.menuUrl || qrForm.numTables < 1}
              >
                Generate QR Codes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
