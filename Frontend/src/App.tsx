// App.tsx
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import {MenuPage} from './pages/MenuPage';
import LoginSignup from './pages/LoginSignup';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateQrForBussiness from './pages/CreateQrForBussiness';
import MenuDataEntry from './pages/MenuDataEntry';
import { JSX } from 'react';

// Συνάρτηση που ελέγχει αν ο χρήστης είναι logged in
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
    : <Navigate to="/" replace />;

function App() {
  return (
    <Routes>
      {/* Home είναι προσβάσιμο από όλους */}
      <Route path="/" element={<HomePage />} />

      {/* Ιδιωτικές σελίδες: Create QR & Menu Entry */}
      <Route
        path="/CreateQrForBussiness"
        element={
          <PrivateRoute>
            <CreateQrForBussiness />
          </PrivateRoute>
        }
      />
      <Route
        path="/menu-entry"
        element={
          <PrivateRoute>
            <MenuDataEntry />
          </PrivateRoute>
        }
      />

      {/* Δημόσια σελίδα menu (scan QR) */}
      <Route path="/menu" element={<MenuPage />} />

      {/* Login/Signup & επακόλουθες σελίδες, μόνο για μη-συνδεδεμένους */}
      <Route
        path="/loginsignup"
        element={
          <PublicRoute>
            <LoginSignup />
          </PublicRoute>
        }
      />
      <Route
        path="/loginsignup/about"
        element={
          <PublicRoute>
            <About />
          </PublicRoute>
        }
      />
      <Route
        path="/loginsignup/contact"
        element={
          <PublicRoute>
            <Contact />
          </PublicRoute>
        }
      />
      <Route
        path="/loginsignup/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/loginsignup/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default App;
