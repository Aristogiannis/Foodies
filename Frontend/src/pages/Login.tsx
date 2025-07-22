import {useNavigate} from 'react-router-dom';
import '../services/Tabs.css';

export default function Login() {
    const navigate = useNavigate();
    
    return (
        <div className="tabs-container">
        <header className="header1">
            <h1>Login</h1>
            <h2>👤</h2>
        </header>
        <div className="login-content">
            <form className="login-form">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <button onClick={() => navigate('/loginsignup/signup')}>Sign Up</button></p>
        </div>
        <button className="back-button" onClick={() => navigate('/loginsignup')}>
        &lt; Back
        </button>
        </div>
    );
    }