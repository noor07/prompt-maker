import React from 'react';

interface PromptFormProps {
    keywords: string;
    setKeywords: (value: string) => void;
    taskType: string;
    setTaskType: (value: string) => void;
    targetPlatform: string;
    setTargetPlatform: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}

const TASK_TYPES = [
    { value: 'coding', label: 'Coding' },
    { value: 'writing', label: 'Writing' },
    { value: 'analysis', label: 'Data Analysis' },
    { value: 'creative', label: 'Creative Writing' },
];

const PLATFORMS = [
    { value: 'vscode', label: 'VS Code' },
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'claude', label: 'Claude' },
    { value: 'gemini', label: 'Google Gemini' },
    { value: 'other', label: 'Other' },
];

export const PromptForm: React.FC<PromptFormProps> = ({
    keywords,
    setKeywords,
    taskType,
    setTaskType,
    targetPlatform,
    setTargetPlatform,
    onSubmit,
    isLoading,
}) => {
    return (
        <form onSubmit={onSubmit} className="prompt-form">
            <div className="form-group">
                <label htmlFor="keywords">Keywords / Context</label>
                <textarea
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g., Create a React component for a navigation bar..."
                    required
                    rows={4}
                    className="form-control"
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="taskType">Task Type</label>
                    <select
                        id="taskType"
                        value={taskType}
                        onChange={(e) => setTaskType(e.target.value)}
                        className="form-control"
                    >
                        {TASK_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="targetPlatform">Target Platform</label>
                    <select
                        id="targetPlatform"
                        value={targetPlatform}
                        onChange={(e) => setTargetPlatform(e.target.value)}
                        className="form-control"
                    >
                        {PLATFORMS.map((platform) => (
                            <option key={platform.value} value={platform.value}>
                                {platform.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary">
                {isLoading ? 'Generating...' : 'Generate Prompt'}
            </button>
        </form>
    );
};
