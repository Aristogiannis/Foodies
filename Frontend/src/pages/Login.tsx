import { useNavigate } from 'react-router-dom';
import '../services/tabs.css';

export default function Login() {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted');
  };
  
  return (
    <div className="tabs-container">
      <header className="header1">
        <h2>🔐</h2>
      </header>
      
      <div className="login-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
          
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email"
            required 
          />
          
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password"
            required 
          />
          
          <button type="submit" style={{ width: '100%', marginTop: 'var(--spacing-lg)' }}>
            Sign In
          </button>
        </form>
        
        <p style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
          Don't have an account?{' '}
          <button 
            className="secondary" 
            onClick={() => navigate('/loginsignup/signup')}
            style={{ background: 'none', border: 'none', padding: 0, color: 'var(--primary-orange)', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Sign Up
          </button>
        </p>
      </div>
      
      <button className="back-button" onClick={() => navigate('/loginsignup')}>
        Back
      </button>
    </div>
  );
}