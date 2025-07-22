import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!menuItem.name || !menuItem.description || menuItem.price <= 0 || !menuItem.category) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Menu item to be added:', menuItem);
    
    // For now, just show success message
    alert('Menu item added successfully!');
    
    // Reset form
    setMenuItem({
      name: '',
      description: '',
      price: 0,
      category: '',
      photo: null
    });
    setPreviewUrl('');
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
    <div className="menu-entry-container">
      <header className="header1">
        <h1>Menu Data Entry Dashboard</h1>
      </header>
      
      <div className="menu-entry-content">
        <h2>Add New Menu Item</h2>
        <p>Fill out the form below to add a new item to your restaurant's menu.</p>
        
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
                <img src={previewUrl} alt="Preview" />
                <button 
                  type="button" 
                  className="remove-photo"
                  onClick={() => {
                    setMenuItem(prev => ({ ...prev, photo: null }));
                    setPreviewUrl('');
                  }}
                >
                  Remove Photo
                </button>
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
      
      <button className="back-button" onClick={() => navigate('/')}>
        Back
      </button>
    </div>
  );
} 