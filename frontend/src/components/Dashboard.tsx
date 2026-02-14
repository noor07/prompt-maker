import { useEffect, useState } from 'react';
import api from '../services/api';
import './Dashboard.css';

interface Prompt {
    id: string;
    keywords: string;
    taskType: string;
    targetPlatform: string;
    generatedPrompt: string;
    createdAt: {
        _seconds: number;
        _nanoseconds: number;
    };
}

export const Dashboard = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPrompts();
    }, []);

    const fetchPrompts = async () => {
        try {
            const response = await api.get('/get-prompts');
            setPrompts(response.data.prompts);
        } catch (err: any) {
            console.error('Error fetching prompts:', err);
            setError('Failed to fetch prompts.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this prompt?')) return;

        try {
            await api.delete(`/delete-prompt/${id}`);
            setPrompts(prompts.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error deleting prompt:', err);
            alert('Failed to delete prompt.');
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Prompt copied to clipboard!');
    };

    if (loading) return <div className="loading">Loading prompts...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="dashboard-container">
            <h2>My Saved Prompts</h2>
            {prompts.length === 0 ? (
                <p>No saved prompts yet. Go create one!</p>
            ) : (
                <div className="prompts-grid">
                    {prompts.map((prompt) => (
                        <div key={prompt.id} className="prompt-card">
                            <div className="prompt-header">
                                <span className="task-type">{prompt.taskType}</span>
                                <span className="date">
                                    {new Date(prompt.createdAt._seconds * 1000).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="prompt-details">
                                <strong>Platform:</strong> {prompt.targetPlatform} <br />
                                <strong>Keywords:</strong> {prompt.keywords}
                            </div>
                            <div className="prompt-content">
                                <p>{prompt.generatedPrompt.substring(0, 150)}...</p>
                            </div>
                            <div className="prompt-actions">
                                <button onClick={() => handleCopy(prompt.generatedPrompt)} className="btn-small">
                                    Copy
                                </button>
                                <button onClick={() => handleDelete(prompt.id)} className="btn-small btn-danger">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
