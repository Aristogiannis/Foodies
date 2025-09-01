// App.tsx
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import {MenuPage} from './pages/MenuPage';
import LoginSignup from './pages/LoginSignup';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateQrForBussiness from './pages/CreateQrForBussiness';
import MenuDataEntry from './pages/MenuDataEntry';
import CustomerOrderPage from './pages/CustomerOrderPage';
import QRCodeManagementPage from './pages/QRCodeManagementPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import { SnackbarProvider } from './components/SnackbarContext';
import { JSX } from 'react';

const isLoggedIn = () => localStorage.getItem('isLoggedIn') === 'true';

// Route που προστατεύει ιδιωτικές σελίδες
const PrivateRoute = ({ children }: { children: JSX.Element }) =>
  isLoggedIn()
    ? children
    : <Navigate to="/loginsignup/login" replace />;

// Route που αποκλείει τις σελίδες login/signup όταν ο χρήστης είναι ήδη logged in
const PublicRoute = ({ children }: { children: JSX.Element }) =>
  !isLoggedIn()
    ? children
    : <Navigate to="/order-tracking" replace />;

function App() {
  return (
    <SnackbarProvider>
      <Routes>
        {/* Redirect home to order tracking for logged in users */}
        <Route 
          path="/" 
          element={
            isLoggedIn() ? (
              <Navigate to="/order-tracking" replace />
            ) : (
              <Navigate to="/loginsignup/login" replace />
            )
          } 
        />

        {/* Pages with Layout (Main App) */}
        <Route path="/order-tracking" element={
          <PrivateRoute>
            <Layout>
              <OrderTrackingPage />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/qr-management" element={
          <PrivateRoute>
            <Layout>
              <QRCodeManagementPage />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/menu-entry" element={
          <PrivateRoute>
            <Layout>
              <MenuDataEntry />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/CreateQrForBussiness" element={
          <PrivateRoute>
            <Layout>
              <CreateQrForBussiness />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/menu" element={
          <Layout>
            <MenuPage />
          </Layout>
        } />
        
        <Route path="/order" element={
          <Layout>
            <CustomerOrderPage />
          </Layout>
        } />
        {/* Auth pages without Layout */}
        <Route path="/loginsignup" element={
          <PublicRoute>
            <LoginSignup />
          </PublicRoute>
        } />
        
        <Route path="/loginsignup/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        
        <Route path="/loginsignup/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
