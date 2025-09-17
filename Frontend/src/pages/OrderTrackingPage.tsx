import { useState, useEffect } from 'react';
import { useSnackbar } from '../components/SnackbarContext';
import '../services/OrderTracking.css';

interface OrderItem {
  id: number;
  menuItem: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
  priceAtTime: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  timestamp: string;
  tip: number;
  notes?: string;
  tableNumber?: number;
  customerName?: string;
}

const ORDER_STATUSES = [
  'PENDING',
  'CONFIRMED', 
  'PREPARING',
  'READY',
  'DELIVERED',
  'CANCELLED'
];

export default function OrderTrackingPage() {
  const { showError } = useSnackbar();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ACTIVE');
  // const [refreshInterval, setRefreshInterval] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [filterStatus]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem('authToken');
      const headers: HeadersInit = {};
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const url = filterStatus === 'ACTIVE' 
        ? 'http://localhost:8080/api/orders?active=true'
        : 'http://localhost:8080/api/orders';

      const response = await fetch(url, { headers });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        setError(null);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(prev => 
          prev.map(order => 
            order.id === orderId ? updatedOrder : order
          )
        );
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      showError('Failed to update order status');
    }
  };

  const getTimeSinceOrder = (timestamp: string): string => {
    const orderTime = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - orderTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ${diffMins % 60}m ago`;
    return orderTime.toLocaleDateString();
  };

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  const getActiveOrders = () => {
    return orders.filter(order => 
      ['PENDING', 'CONFIRMED', 'PREPARING', 'READY'].includes(order.status)
    );
  };

  const getOrderStats = () => {
    const activeOrders = getActiveOrders();
    const pendingCount = getOrdersByStatus('PENDING').length;
    const preparingCount = getOrdersByStatus('PREPARING').length;
    const readyCount = getOrdersByStatus('READY').length;
    
    return {
      total: activeOrders.length,
      pending: pendingCount,
      preparing: preparingCount,
      ready: readyCount
    };
  };

  const stats = getOrderStats();
  const displayOrders = filterStatus === 'ACTIVE' ? getActiveOrders() : orders;

  if (loading && orders.length === 0) {
    return (
      <div className="order-tracking-page">
        <div className="loading">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="order-tracking-page">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Order Dashboard</h1>
          <p>Real-time order management</p>
        </div>
        <div className="header-actions">
          <button 
            className="refresh-btn secondary"
            onClick={fetchOrders}
            disabled={loading}
          >
            {loading ? '⟳' : '↻'} {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="stats-dashboard">
        <div className="stat-card total">
          <h3>Active Orders</h3>
          <div className="stat-number">{stats.total}</div>
        </div>
        <div className="stat-card pending">
          <h3>Pending</h3>
          <div className="stat-number">{stats.pending}</div>
        </div>
        <div className="stat-card preparing">
          <h3>Preparing</h3>
          <div className="stat-number">{stats.preparing}</div>
        </div>
        <div className="stat-card ready">
          <h3>Ready</h3>
          <div className="stat-number">{stats.ready}</div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterStatus === 'ACTIVE' ? 'active' : ''}`}
            onClick={() => setFilterStatus('ACTIVE')}
          >
            Active Orders ({getActiveOrders().length})
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilterStatus('ALL')}
          >
            All Orders ({orders.length})
          </button>
        </div>
        
        <div className="auto-refresh">
          <span className={`refresh-indicator ${loading ? 'refreshing' : ''}`}>
            {loading ? 'Refreshing...' : 'Auto-refresh: 30s'}
          </span>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={fetchOrders}>Retry</button>
        </div>
      )}

      <div className="orders-grid">
        {displayOrders.map(order => (
          <div key={order.id} className={`order-card status-${order.status.toLowerCase()}`}>
            <div className="order-header">
              <div className="order-info">
                <h3>Order #{order.id}</h3>
                {order.tableNumber && (
                  <span className="table-badge">Table {order.tableNumber}</span>
                )}
              </div>
              <div className="order-meta">
                <span className="time-badge">{getTimeSinceOrder(order.timestamp)}</span>
                <div className={`status-badge status-${order.status.toLowerCase()}`}>
                  {order.status}
                </div>
              </div>
            </div>

            {order.customerName && (
              <div className="customer-name">
                <strong>Customer:</strong> {order.customerName}
              </div>
            )}

            <div className="order-items">
              {order.items.map(item => (
                <div key={item.id} className="order-item">
                  <span className="quantity">{item.quantity}x</span>
                  <span className="item-name">{item.menuItem.name}</span>
                  <span className="item-price">€{(item.priceAtTime * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {order.notes && (
              <div className="order-notes">
                <strong>Notes:</strong> {order.notes}
              </div>
            )}

            <div className="order-footer">
              <div className="total-price">
                Total: <strong>€{order.totalPrice.toFixed(2)}</strong>
                {order.tip > 0 && (
                  <span className="tip"> (incl. €{order.tip.toFixed(2)} tip)</span>
                )}
              </div>
              
              <div className="status-actions">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="status-select"
                >
                  {ORDER_STATUSES.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayOrders.length === 0 && !loading && !error && (
        <div className="empty-state">
          <h3>No {filterStatus.toLowerCase()} orders found</h3>
          <p>
            {filterStatus === 'ACTIVE' 
              ? 'All orders have been completed or there are no new orders.'
              : 'No orders have been placed yet.'
            }
          </p>
        </div>
      )}
    </div>
  );
}
