import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../components/SnackbarContext';
import '../services/MenuDataEntry.css';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
  photo: File | null;
}

export default function MenuDataEntry() {
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useSnackbar();
  const [menuItem, setMenuItem] = useState<MenuItem>({
    name: '',
    description: '',
    price: 0,
    category: '',
    photo: null
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const categories = [
    'Appetizers',
    'Main Course',
    'Desserts',
    'Beverages',
    'Salads',
    'Soups',
    'Pizza',
    'Pasta',
    'Burgers',
    'Seafood',
    'Vegetarian',
    'Kids Menu'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMenuItem(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMenuItem(prev => ({ ...prev, photo: file }));
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      console.log("Form submitted", menuItem);
    // Validate form
  if (!menuItem.name || !menuItem.description || !menuItem.price || Number(menuItem.price) <= 0 || !menuItem.category) {
  showWarning('Please fill in all required fields');
  return;
}

    const formData = new FormData();
    formData.append('name',menuItem.name);
    formData.append('description',menuItem.description);
    formData.append('price', menuItem.price.toString());
    formData.append('category', menuItem.category);
    if (menuItem.photo) {
      formData.append('photo', menuItem.photo);
    }

    // Try to send the data to the backend
    try {
      const authToken = localStorage.getItem('authToken');
      const headers: HeadersInit = {};
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch('http://localhost:8080/api/menu-items', {
        method: 'POST',
        headers: headers,
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Menu item created:', data);
        showSuccess('Menu item added successfully!');
        
        // Reset form
        setMenuItem({
          name: '',
          description: '',
          price: 0,
          category: '',
          photo: null
        });
        setPreviewUrl('');
      } else {
        const errorText = await response.text();
        console.error('Failed to add menu item:', errorText);
        showError('Failed to add menu item. Please check your permissions and try again.');
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
      showError('Network error. Please try again.');
    }
  };

const handleReset = () => {
    setMenuItem({
      name: '',
      description: '',
      price: 0,
      category: '',
      photo: null
    });
    setPreviewUrl('');
  };

  return (
    <div className="menu-entry-page">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Add New Menu Item</h1>
          <p>Fill out the form below to add a new item to your restaurant's menu</p>
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
        <form className="menu-entry-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Item Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={menuItem.name}
              onChange={handleInputChange}
              placeholder="Enter item name"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea 
              id="description" 
              name="description" 
              value={menuItem.description}
              onChange={handleInputChange}
              placeholder="Describe the item, ingredients, etc."
              rows={4}
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (€) *</label>
              <input 
                type="number" 
                id="price" 
                name="price" 
                value={menuItem.price || ''}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select 
                id="category" 
                name="category" 
                value={menuItem.category}
                onChange={handleInputChange}
                required 
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="photo">Item Photo</label>
            <input 
              type="file" 
              id="photo" 
              name="photo" 
              accept="image/*"
              onChange={handlePhotoChange}
              className="file-input"
            />
            {previewUrl && (
              <div className="photo-preview">
                {/* <img src={previewUrl} alt="Preview" /> */}
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button type="button" className="reset-button" onClick={handleReset}>
              Reset Form
            </button>
            <button type="submit" className="submit-button">
              Add Menu Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  }

