import React from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/login'); // Navigate to the login page
    };
    return (
        <div className="landing-page">
            <div className="background-image" />
            <div className="background-overlay" />
            <div className="content-area">
                <div className="text-section">
                    <header className="header">
                        <h1>Welcome to Plan2Shop</h1>
                        <p>
                            Crafting Culinary Adventures, Simplified.<br /><br />
                            From Palette to Plate to Pantry.<br />
                            Personalized meal planning, automated grocery lists,
                            and seamless store navigation – all in one.
                        </p><br /><br />
                        <a className="cta-button"  onClick={handleGetStartedClick}>Get Started</a>
                    </header>
                </div>
                {/* <div className="image-section" /> */}
            </div>
        </div>
    );
}

export default LandingPage;
