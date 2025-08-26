import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Item } from '../models/Item';
import { useSnackbar } from '../components/SnackbarContext';
import '../services/CustomerOrder.css';

interface CartItem {
  item: Item;
  quantity: number;
}

export default function CustomerOrderPage() {
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get('table') || '1';
  const { showSuccess, showError, showWarning } = useSnackbar();
  
  const [menuItems, setMenuItems] = useState<Item[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [tip, setTip] = useState(0);

  const categories = ['All', 'Main Course', 'Appetizer', 'Dessert', 'Beverage'];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/menu-items?available=true');
      
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      
      const data = await response.json();
      const items = data.map((item: any) => new Item(
        item.id,
        item.name,
        item.description,
        item.price,
        item.imageUrl || 'placeholder.jpg',
        item.category,
        item.ingredients || []
      ));
      
      setMenuItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load menu');
      console.error('Error fetching menu items:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: Item) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.item.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(cartItem =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prev.filter(cartItem => cartItem.item.id !== itemId);
    });
  };

  const getCartItemQuantity = (itemId: number): number => {
    const cartItem = cartItems.find(item => item.item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getTotalPrice = (): number => {
    return cartItems.reduce((total, cartItem) => 
      total + (cartItem.item.price * cartItem.quantity), 0
    ) + tip;
  };

  const getTotalItems = (): number => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      showWarning('Please add items to your cart before ordering');
      return;
    }

    try {
      const orderData = {
        items: cartItems.map(cartItem => ({
          menuItemId: cartItem.item.id,
          quantity: cartItem.quantity
        })),
        tip: tip,
        notes: orderNotes,
        tableNumber: parseInt(tableNumber),
        customerName: customerName || undefined
      };

      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const order = await response.json();
        showSuccess(`Order placed successfully! Order ID: ${order.id}`);
        
        // Reset cart and form
        setCartItems([]);
        setCustomerName('');
        setOrderNotes('');
        setTip(0);
        setIsPaymentModalOpen(false);
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      showError('Failed to place order. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="customer-order-page">
        <div className="loading">Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="customer-order-page">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="customer-order-page">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome to Foodies</h1>
          <p>Table {tableNumber} • Order directly from your table</p>
        </div>
        <div className="header-actions">
          {getTotalItems() > 0 && (
            <button 
              className="cart-btn primary"
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Cart ({getTotalItems()}) • €{getTotalPrice().toFixed(2)}
            </button>
          )}
        </div>
      </div>

      <div className="filters-bar">
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="order-card menu-item-card">
            {/* <img src={item.imageUrl} alt={item.name} /> */}
            <div className="item-info">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <div className="price">€{item.price.toFixed(2)}</div>
              
              {item.ingredients && item.ingredients.length > 0 && (
                <div className="ingredients">
                  <small>Ingredients: {item.ingredients.join(', ')}</small>
                </div>
              )}
              
              <div className="item-actions">
                {getCartItemQuantity(item.id) > 0 ? (
                  <div className="quantity-controls">
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                    <span>{getCartItemQuantity(item.id)}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                ) : (
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Your Order</h2>
              <button 
                className="close-btn"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="cart-items">
                {cartItems.map(cartItem => (
                  <div key={cartItem.item.id} className="cart-item">
                    <div className="item-details">
                      <h4>{cartItem.item.name}</h4>
                      <p>€{cartItem.item.price.toFixed(2)} each</p>
                    </div>
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button onClick={() => removeFromCart(cartItem.item.id)}>−</button>
                        <span>{cartItem.quantity}</span>
                        <button onClick={() => addToCart(cartItem.item)}>+</button>
                      </div>
                      <div className="item-total">
                        €{(cartItem.item.price * cartItem.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-details">
              <div className="form-group">
                <label htmlFor="customerName">Name (optional)</label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="orderNotes">Special requests (optional)</label>
                <textarea
                  id="orderNotes"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Any special requests or allergies?"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tip">Tip</label>
                <div className="tip-section">
                  <div className="tip-buttons">
                    <button 
                      className={`tip-btn ${tip === 0 ? 'active' : ''}`}
                      onClick={() => setTip(0)}
                    >
                      No Tip
                    </button>
                    <button 
                      className={`tip-btn ${tip === Math.round((getTotalPrice() - tip) * 0.1 * 100) / 100 ? 'active' : ''}`}
                      onClick={() => setTip(Math.round((getTotalPrice() - tip) * 0.1 * 100) / 100)}
                    >
                      10%
                    </button>
                    <button 
                      className={`tip-btn ${tip === Math.round((getTotalPrice() - tip) * 0.15 * 100) / 100 ? 'active' : ''}`}
                      onClick={() => setTip(Math.round((getTotalPrice() - tip) * 0.15 * 100) / 100)}
                    >
                      15%
                    </button>
                    <button 
                      className={`tip-btn ${tip === Math.round((getTotalPrice() - tip) * 0.2 * 100) / 100 ? 'active' : ''}`}
                      onClick={() => setTip(Math.round((getTotalPrice() - tip) * 0.2 * 100) / 100)}
                    >
                      20%
                    </button>
                  </div>
                  <input
                    type="number"
                    id="tip"
                    value={tip}
                    onChange={(e) => setTip(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.50"
                    placeholder="Custom amount"
                  />
                </div>
              </div>
              </div>

              <div className="order-summary">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>€{(getTotalPrice() - tip).toFixed(2)}</span>
                </div>
                {tip > 0 && (
                  <div className="total-row">
                    <span>Tip:</span>
                    <span>€{tip.toFixed(2)}</span>
                  </div>
                )}
                <div className="total-row final">
                  <span>Total:</span>
                  <span>€{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                Continue Shopping
              </button>
              <button 
                className="place-order-btn"
                onClick={handlePayment}
                disabled={cartItems.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
