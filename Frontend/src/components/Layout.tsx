import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';
import { ChartIcon, CameraIcon, PlusIcon, MobileIcon, PlateIcon, DoorIcon, KeyIcon, CheckIcon, CloseIcon } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<any>;
  requiredAuth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const navItems: NavItem[] = [
    { id: 'order-tracking', label: 'Order Tracking', path: '/order-tracking', icon: ChartIcon, requiredAuth: true },
    { id: 'qr-management', label: 'QR Management', path: '/qr-management', icon: CameraIcon, requiredAuth: true },
    { id: 'menu-entry', label: 'Menu Entry', path: '/menu-entry', icon: PlusIcon, requiredAuth: true },
    { id: 'menu', label: 'View Menu', path: '/menu', icon: MobileIcon},
    { id: 'order', label: 'Customer Order', path: '/order?table=1', icon: PlateIcon },
  ];

  const filteredNavItems = navItems.filter(item => 
    !item.requiredAuth || (item.requiredAuth && isLoggedIn)
  );

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    navigate('/loginsignup/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const isActivePath = (path: string) => {
    // Special case for home/order-tracking
    if (path === '/order-tracking' && location.pathname === '/') return true;
    
    // Handle paths with query parameters (like /order?table=1)
    const currentPath = location.pathname;
    const currentPathWithQuery = location.pathname + location.search;
    
    // Exact match for the full path with query parameters
    if (currentPathWithQuery === path) return true;
    
    // Exact match for pathname only
    if (currentPath === path) return true;
    
    // For paths without query parameters, only allow exact matches to prevent
    // /menu from matching /menu-entry
    return false;
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            <span className="app-name">FOODIES</span>
          </h2>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {filteredNavItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${isActivePath(item.path) ? 'nav-item-active' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="nav-icon"><item.icon size={20} /></span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              <span className="nav-icon"><DoorIcon size={20} /></span>
              <span className="nav-label">Logout</span>
            </button>
          ) : (
            <button 
              className="login-btn" 
              onClick={() => handleNavigation('/loginsignup/login')}
            >
              <span className="nav-icon"><KeyIcon size={20} /></span>
              <span className="nav-label">Login</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-layout">
        {/* Header */}
        <header className="layout-header">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          
          <div className="header-title">
            <h1>FOODIES</h1>
          </div>

          <div className="header-actions">
            {isLoggedIn ? (
              <div className="user-info">
                <span className="user-status"><CheckIcon size={16} /> Logged in</span>
              </div>
            ) : (
              <button 
                className="header-login-btn"
                onClick={() => handleNavigation('/loginsignup/login')}
              >
                Login
              </button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
