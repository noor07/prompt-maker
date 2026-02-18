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
    prompts: any[]; // Using any[] for now to match App.tsx state, strictly should be HistoryItem[]
    onLoadToEditor: (item: HistoryItem) => void;
    onDelete: (id: string) => void;
}

// MOCK_HISTORY removed in favor of real data passed via props


export const HistoryView: React.FC<HistoryViewProps> = ({ prompts, onLoadToEditor, onDelete }) => {
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
                    <span className="text-xs font-bold text-indigo-300">{prompts.length} Prompts</span>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {prompts.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-slate-500 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                        <p>No history yet. Generate a prompt to see it here!</p>
                    </div>
                ) : (
                    prompts.map((item, index) => (
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
                                        {item.keywords || item.title || "Untitled Prompt"}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold uppercase tracking-wider">
                                            {item.platform || item.targetPlatform || 'Generic'}
                                        </span>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                                            {(item.model || 'GEMINI').toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="h-8 w-8 rounded-lg bg-slate-800/50 border border-white/5 flex items-center justify-center">
                                    {(item.type || item.taskType) === 'coding' ? <Terminal className="h-4 w-4 text-slate-400" /> :
                                        (item.type || item.taskType) === 'writing' ? <Sparkles className="h-4 w-4 text-slate-400" /> :
                                            <MessageSquare className="h-4 w-4 text-slate-400" />}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="flex-1">
                                <p className="text-slate-400 text-sm font-mono line-clamp-3 leading-relaxed">
                                    {item.generatedPrompt || item.prompt}
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
                                        onClick={() => handleCopy(item.id, item.generatedPrompt || item.prompt)}
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
                    ))
                )}
            </div>
        </div>
    );
};
