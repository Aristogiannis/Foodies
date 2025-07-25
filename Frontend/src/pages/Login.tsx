import { useNavigate } from 'react-router-dom';
import '../services/tabs.css';
import { useState } from 'react';

interface LoginProps {
  email: string;
  password: string;
}



export default function Login() {
  const navigate = useNavigate();
  
const [LoginProps,  setLoginProps] = useState<LoginProps>({
  email: '',
  password: ''
});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    try{
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: LoginProps.email, password: LoginProps.password })
    });

    if(response.ok) {
      const data = await response.json();
    console.log('Login submitted');
     localStorage.setItem('isLoggedIn', 'true');
      navigate('/');

      }else{

         alert('Login failed. Please check your credentials.');
      }
  } catch (error) {
    console.error('login error',error);
  }
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
            value={LoginProps.email}
            onChange={(e) => setLoginProps({ ...LoginProps, email: e.target.value })}
          
          />
          
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password"
            required 
            value={LoginProps.password}
            onChange={ (e) => setLoginProps({ ...LoginProps, password: e.target.value }) }
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
