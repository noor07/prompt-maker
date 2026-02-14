import React, { useState } from 'react';

interface PromptResultProps {
    prompt: string;
    onSave?: () => void;
    isSaving?: boolean;
}

export const PromptResult: React.FC<PromptResultProps> = ({ prompt, onSave, isSaving }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    if (!prompt) return null;

    return (
        <div className="prompt-result">
            <div className="result-header">
                <h3>Generated Prompt</h3>
                <div className="actions">
                    <button onClick={handleCopy} className="btn-secondary">
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    {onSave && (
                        <button
                            onClick={onSave}
                            className="btn-primary"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Prompt'}
                        </button>
                    )}
                </div>
            </div>
            <div className="prompt-content">
                <pre>{prompt}</pre>
            </div>
        </div>
    );
};
