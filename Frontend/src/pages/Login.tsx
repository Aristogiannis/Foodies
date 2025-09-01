import { useNavigate } from 'react-router-dom';
import '../services/LoginSignup.css';
import { useState } from 'react';
import { useSnackbar } from '../components/SnackbarContext';

interface LoginProps {
  email: string;
  password: string;
}



export default function Login() {
  const navigate = useNavigate();
  const { showError } = useSnackbar();
  
const [LoginProps,  setLoginProps] = useState<LoginProps>({
  email: '',
  password: ''
});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: LoginProps.email, 
          password: LoginProps.password 
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Store authentication data
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        console.log('Login successful:', data.user);
        navigate('/');
      } else {
        const errorText = await response.text();
        showError('Login failed. Please check your credentials.');
        console.error('Login failed:', errorText);
      }
    } catch (error) {
      console.error('Login error:', error);
      showError('Network error. Please try again.');
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">FOODIES</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="form-input"
              placeholder="Enter your email"
              required 
              value={LoginProps.email}
              onChange={(e) => setLoginProps({ ...LoginProps, email: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="form-input"
              placeholder="Enter your password"
              required 
              value={LoginProps.password}
              onChange={ (e) => setLoginProps({ ...LoginProps, password: e.target.value }) }
            />
          </div>
          
          <button type="submit" className="auth-button primary">
            Sign In
          </button> 
        </form>
        
        <div className="auth-links">
          Don't have an account?{' '}
          <button 
            type="button"
            className="auth-link" 
            onClick={() => navigate('/loginsignup/signup')}
            style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}
          >
            Sign Up
          </button>
        </div>
        
        <div className="auth-links">
          <button 
            type="button"
            className="auth-link" 
            onClick={() => navigate('/loginsignup')}
            style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
