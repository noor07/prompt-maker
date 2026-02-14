import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

export const PublicNavbar = () => {
    const { currentUser } = useAuth();

    return (
        <header className="app-header">
            <div className="header-content">
                <h1>Prompt Maker</h1>
                <nav>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </nav>
            </div>
            <div className="user-info">
                {currentUser ? (
                    <Link to="/app" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', textDecoration: 'none' }}>Go to App</Link>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/signup" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', textDecoration: 'none' }}>Sign Up</Link>
                    </div>
                )}
            </div>
        </header>
    );
};
