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
    History as HistoryIconLucide,
    Maximize2,
    X
} from 'lucide-react';
interface HistoryItem {
    id: string;
    title?: string;
    keywords?: string; // Backend uses keywords
    prompt?: string;   // Legacy fallback
    targetPlatform?: string; // Backend uses targetPlatform
    platform?: string; // Legacy fallback
    taskType?: string; // Backend uses taskType
    type?: string;     // Legacy fallback
    model?: string;
    tone?: string;
    generatedPrompt?: string;
}

interface HistoryViewProps {
    prompts: any[]; // Using any[] for now to match App.tsx state, strictly should be HistoryItem[]
    onLoadToEditor: (item: HistoryItem) => void;
    onDelete: (id: string) => void;
}

// MOCK_HISTORY removed in favor of real data passed via props



export const HistoryView: React.FC<HistoryViewProps> = ({ prompts, onLoadToEditor, onDelete }) => {
    const [expandedItem, setExpandedItem] = React.useState<any | null>(null);
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
                                    onClick={() => setExpandedItem(item)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600/10 text-indigo-400 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all"
                                >
                                    <Maximize2 className="h-3 w-3" />
                                    Expand
                                </button>

                                <div className="flex items-center gap-1.5">
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

            {/* Expanded Modal */}
            {expandedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div
                        className="w-full max-w-3xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {expandedItem.keywords || expandedItem.title || "Untitled Prompt"}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold uppercase tracking-wider">
                                        {expandedItem.platform || expandedItem.targetPlatform || 'Generic'}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                                        {(expandedItem.model || 'GEMINI').toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setExpandedItem(null)}
                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* User Input Section */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Input Keywords</h4>
                                <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5 text-slate-300 text-sm">
                                    {expandedItem.keywords || "No input keywords recorded."}
                                </div>
                            </div>

                            {/* Generated Prompt Section */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Generated Prompt</h4>
                                <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/20 text-slate-200 text-sm font-mono whitespace-pre-wrap leading-relaxed">
                                    {expandedItem.generatedPrompt || expandedItem.prompt}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-white/5 bg-slate-900 flex justify-end gap-3">
                            <button
                                onClick={() => handleCopy(expandedItem.id, expandedItem.generatedPrompt || expandedItem.prompt)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-700 hover:text-white transition-all"
                            >
                                {copiedId === expandedItem.id ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                                Copy Prompt
                            </button>
                            <button
                                onClick={() => {
                                    onLoadToEditor(expandedItem);
                                    setExpandedItem(null);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all"
                            >
                                <Play className="h-4 w-4 fill-current" />
                                Load to Editor
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
