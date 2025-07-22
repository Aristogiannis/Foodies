import { useNavigate } from 'react-router-dom';
import '../services/tabs.css';

export default function Signup() {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup submitted');
  };
  
  return (
    <div className="tabs-container">
      <header className="header1">
        <h1>Sign Up</h1>
        <h2>📝</h2>
      </header>
      
      <div className="login-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <p>Join Foodies today</p>
          
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Choose a username"
            required 
          />
          
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
            placeholder="Create a password"
            required 
          />
          
          <label htmlFor="confirm-password">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            name="confirm-password" 
            placeholder="Confirm your password"
            required 
          />
          
          <button type="submit" style={{ width: '100%', marginTop: 'var(--spacing-lg)' }}>
            Create Account
          </button>
        </form>
        
        <p style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
          Already have an account?{' '}
          <button 
            className="secondary" 
            onClick={() => navigate('/loginsignup/login')}
            style={{ background: 'none', border: 'none', padding: 0, color: 'var(--primary-orange)', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Sign In
          </button>
        </p>
      </div>
      
      <button className="back-button" onClick={() => navigate('/loginsignup')}>
        Back
      </button>
    </div>
  );
}
