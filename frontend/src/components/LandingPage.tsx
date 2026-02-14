import { Link } from 'react-router-dom';
import { PublicNavbar } from './PublicNavbar';
import '../App.css';

export const LandingPage = () => {
    return (
        <div className="app-container">
            <PublicNavbar />
            <main className="landing-main">
                <section className="hero-section">
                    <h2>Craft Perfect AI Prompts in Seconds</h2>
                    <p>Stop struggling with vague instructions. Prompt Maker helps you generate structured, effective prompts for coding, writing, and creative tasks using advanced AI models.</p>
                    <div className="hero-actions">
                        <Link to="/signup" className="btn-primary">Get Started for Free</Link>
                        <Link to="/about" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>Learn More</Link>
                    </div>
                </section>

                <section className="features-section">
                    <div className="feature-card">
                        <h3>🚀 AI-Powered Generation</h3>
                        <p>Powered by Google's Gemini Pro, our tools understand context and nuance to build high-quality prompts.</p>
                    </div>
                    <div className="feature-card">
                        <h3>💾 Save & Organize</h3>
                        <p>Keep your best prompts handy. Save, edit, and delete prompts in your personal dashboard.</p>
                    </div>
                    <div className="feature-card">
                        <h3>🎯 Platform Specific</h3>
                        <p>Tailor your prompts for VS Code, ChatGPT, Midjourney, and more with just a click.</p>
                    </div>
                </section>
            </main>
        </div>
    );
};
