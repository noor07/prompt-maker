import { PublicNavbar } from './PublicNavbar';
import '../App.css';

export const About = () => {
    return (
        <div className="app-container">
            <PublicNavbar />
            <main className="about-main">
                <section className="about-section">
                    <h2>About Prompt Maker</h2>
                    <p>
                        Prompt Maker is a developer-focused tool designed to streamline the interaction between humans and Large Language Models (LLMs).
                        We believe that the quality of AI output is directly dependent on the quality of the input.
                    </p>
                </section>

                <section className="tech-stack-section">
                    <h3>Under the Hood</h3>
                    <p>Prompt Maker is built with a modern, scalable technology stack:</p>
                    <ul className="tech-list">
                        <li><strong>Frontend:</strong> React + TypeScript + Vite for a blazing fast user experience.</li>
                        <li><strong>Backend:</strong> Node.js + Express deployed on AWS Lambda via Serverless Framework.</li>
                        <li><strong>AI Engine:</strong> Google Gemini Pro for state-of-the-art prompt generation.</li>
                        <li><strong>Database & Auth:</strong> Google Cloud Firestore and Firebase Authentication for secure, real-time data.</li>
                    </ul>
                </section>

                <section className="mission-section">
                    <h3>Our Mission</h3>
                    <p>To empower creators and developers by removing the friction of "prompt engineering," allowing them to focus on building and creating.</p>
                </section>
            </main>
        </div>
    );
};
