import { useState } from 'react';
import { PublicNavbar } from './PublicNavbar';
import '../App.css';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would send this to a backend or service like EmailJS
        console.log('Form submitted:', formData);
        setSubmitted(true);
    };

    return (
        <div className="app-container">
            <PublicNavbar />
            <main className="contact-main">
                <h2>Contact Us</h2>
                <p>Have questions, suggestions, or feedback? We'd love to hear from you.</p>

                {submitted ? (
                    <div className="success-message" style={{ background: '#2e7d32', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                        Thank you for reaching out! We will get back to you shortly.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="prompt-form" style={{ marginTop: '2rem' }}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-control"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-primary">Send Message</button>
                    </form>
                )}
            </main>
        </div>
    );
};
