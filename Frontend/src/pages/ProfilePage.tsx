import { useState } from 'react';
import '../services/profilePage.css';

export default function ProfilePage() {
    const [tab,setTab] = useState<'about' | 'contact'|'My notifications'|'login/sign up'> ('about');

    return(
        <div className="profile-container">
            <header className="header1">
                <h1>Profile Name</h1>
                <h2>👤</h2>
            </header>
            <nav className="profile-nav">
                <button onClick={() => setTab('about')}>About</button>
                <button onClick={() => setTab('contact')}>Contact</button>
                <button onClick={() => setTab('My notifications')}>My notifications</button>
                <button onClick={() => setTab('login/sign up')}>Login/Sign Up</button>
            </nav>
            {tab === 'about' && (
                <div className="profile-about">
                </div>
            )}
            {tab === 'contact' && (
                <div className="profile-contact">
                   
                </div>
            )}
            {tab === 'My notifications' && (
                <div className="profile-notifications">
                    
                </div>
            )}
            {tab === 'login/sign up' && (
                <div className="profile-login">
                </div>
            )}
        </div>
    );
}