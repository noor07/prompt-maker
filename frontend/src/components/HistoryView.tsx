import React from 'react';
import { motion } from 'framer-motion';
import {
    Copy,
    Trash2,
    Play,
    MessageSquare,
    Terminal,
    Sparkles,
    Check,
    History as HistoryIconLucide
} from 'lucide-react';
interface HistoryItem {
    id: string;
    title: string;
    prompt: string;
    platform: string;
    type: string;
    model: string;
    tone: string;
}

interface HistoryViewProps {
    onLoadToEditor: (item: HistoryItem) => void;
    onDelete: (id: string) => void;
}

const MOCK_HISTORY: HistoryItem[] = [
    {
        id: '1',
        title: "Video Script for YouTube",
        prompt: "Create a detailed 10-minute video script focusing on the historical evolution of artificial intelligence. Start from Alan Turing's conceptual work and move through the first AI winter, the rise of expert systems, and finally the current generative AI explosion. Tone should be educational yet engaging for a general tech audience.",
        platform: "Gemini",
        type: "writing",
        model: "claude",
        tone: "creative"
    },
    {
        id: '2',
        title: "React Auth Hook Fix",
        prompt: "Write a custom React hook called `useAuth` that integrates with Firebase Auth. It should handle login, signup, and persistent state using the `onAuthStateChanged` listener. Include TypeScript types and ensure the hook provides a `loading` state to prevent UI flickering during initial mount.",
        platform: "VS Code",
        type: "coding",
        model: "gpt4",
        tone: "professional"
    },
    {
        id: '3',
        title: "Python Data Analysis",
        prompt: "Analyze a CSV dataset containing monthly sales data. The script should calculate the MoM growth, identify the top 3 performing regions, and generate a matplotlib visualization for sales trends. Ensure the code handles missing values by interpolating based on previous month's data.",
        platform: "Jupyter",
        type: "analysis",
        model: "gpt4",
        tone: "academic"
    },
    {
        id: '4',
        title: "Brand Voice Guidelines",
        prompt: "Develop a comprehensive brand voice guide for a new luxury skincare line called 'Aether'. The voice should be minimalist, sophisticated, and science-backed. Include examples of social media copy, product descriptions, and email marketing subject lines.",
        platform: "Notion",
        type: "writing",
        model: "claude",
        tone: "creative"
    }
];

export const HistoryView: React.FC<HistoryViewProps> = ({ onLoadToEditor, onDelete }) => {
    const [copiedId, setCopiedId] = React.useState<string | null>(null);

    const handleCopy = async (id: string, text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Prompt Library</h2>
                    <p className="text-slate-500 text-sm">Access and manage your engineered prompts.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                    <HistoryIconLucide className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-bold text-indigo-300">{MOCK_HISTORY.length} Prompts</span>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {MOCK_HISTORY.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-slate-900/50 border border-white/5 rounded-xl p-5 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all flex flex-col h-full"
                    >
                        {/* Card Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="space-y-1">
                                <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold uppercase tracking-wider">
                                        {item.platform}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                                        {item.model.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="h-8 w-8 rounded-lg bg-slate-800/50 border border-white/5 flex items-center justify-center">
                                {item.type === 'coding' ? <Terminal className="h-4 w-4 text-slate-400" /> :
                                    item.type === 'writing' ? <Sparkles className="h-4 w-4 text-slate-400" /> :
                                        <MessageSquare className="h-4 w-4 text-slate-400" />}
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="flex-1">
                            <p className="text-slate-400 text-sm font-mono line-clamp-3 leading-relaxed">
                                {item.prompt}
                            </p>
                        </div>

                        {/* Card Footer: Actions */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                            <button
                                onClick={() => onLoadToEditor(item)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600/10 text-indigo-400 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all"
                            >
                                <Play className="h-3 w-3 fill-current" />
                                Load to Editor
                            </button>

                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => handleCopy(item.id, item.prompt)}
                                    className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                                    title="Copy Prompt"
                                >
                                    {copiedId === item.id ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                                </button>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
                                    title="Delete Prompt"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
