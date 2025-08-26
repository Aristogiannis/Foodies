import { useNavigate } from 'react-router-dom';
import '../services/tabs.css';
import { useState } from 'react';
import { useSnackbar } from '../components/SnackbarContext';

interface SignupProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useSnackbar();
  
const [SignupProps, setSignupProps] = useState<SignupProps>({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password confirmation
    if (SignupProps.password !== SignupProps.confirmPassword) {
      showWarning('Passwords do not match');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: SignupProps.username,
          email: SignupProps.email,
          password: SignupProps.password,
          confirmPassword: SignupProps.confirmPassword
        })
      });
   
      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data.user);
        showSuccess('Account created successfully! Please log in.');
        navigate('/loginsignup/login');
      } else {
        const errorText = await response.text();
        showError('Signup failed. Please check your details.');
        console.error('Signup failed:', errorText);
      }
    } catch (error) {
      console.error('Signup error:', error);
      showError('Network error. Please try again.');
    }
  };
  
  return (
    <div className="tabs-container">
      <header className="header1">
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
            value = {SignupProps.username}
            onChange ={(e) => setSignupProps({ ...SignupProps, username: e.target.value })}
          />
          
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email"
            required 
            value ={SignupProps.email}
            onChange = {(e) => setSignupProps({...SignupProps,email:e.target.value})}
          />
          
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Create a password"
            required 
             value ={SignupProps.password}
            onChange = {(e) => setSignupProps({...SignupProps,password:e.target.value})}
          />
          
          <label htmlFor="confirm-password">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            name="confirm-password" 
            placeholder="Confirm your password"
            required 
             value ={SignupProps.confirmPassword}
            onChange = {(e) => setSignupProps({...SignupProps,confirmPassword:e.target.value})}
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
