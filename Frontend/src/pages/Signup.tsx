import {useNavigate} from 'react-router-dom';
import '../services/Tabs.css';

export default function Signup() {
    const navigate = useNavigate();
    
    return (
        <div className="tabs-container">
        <header className="header1">
            <h1>Sign Up</h1>
            <h2>👤</h2>
        </header>
        <div className="login-content">
            <form className="login-form">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="email">Email:</label>
            <input type= "email" id= "email" name = "email" required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
            <button type="submit">Sign Up</button>
            </form>
        </div>
        <button className="back-button" onClick={() => navigate('/loginsignup')}>
        &lt; Back
        </button>
        </div>
    );
}
