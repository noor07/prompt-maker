import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Copy,
    Bookmark,
    Sparkles,
    Check,
    Terminal
} from 'lucide-react';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface PromptResultProps {
    prompt: string;
    onSave?: () => void;
    isSaving?: boolean;
    isLoading?: boolean;
}

export const PromptResult: React.FC<PromptResultProps> = ({ prompt, onSave, isSaving, isLoading }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!prompt) return;
        try {
            await navigator.clipboard.writeText(prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="h-full flex flex-col p-6 overflow-hidden bg-slate-900/50 backdrop-blur-xl">
            {/* Action Header */}
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] px-1">Output Preview</h3>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={handleCopy}
                        disabled={!prompt}
                        className={cn(
                            "p-2 rounded-lg transition-all border",
                            prompt
                                ? "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                                : "text-slate-700 border-transparent cursor-not-allowed"
                        )}
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                    {onSave && (
                        <button
                            onClick={onSave}
                            disabled={!prompt || isSaving}
                            className={cn(
                                "p-2 rounded-lg transition-all border",
                                prompt && !isSaving
                                    ? "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                                    : "text-slate-700 border-transparent cursor-not-allowed"
                            )}
                            title="Save to history"
                        >
                            <Bookmark className={cn("h-4 w-4", isSaving && "animate-pulse")} />
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-0 flex flex-col">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 space-y-4"
                        >
                            <div className="h-4 w-1/2 bg-slate-800 animate-pulse rounded-full" />
                            <div className="flex-1 space-y-3 bg-[#0d1117] rounded-xl p-6 border border-white/5">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                    <div key={i} className="h-2 w-full bg-slate-800/50 rounded animate-pulse" style={{ opacity: 1 - i * 0.1 }} />
                                ))}
                            </div>
                        </motion.div>
                    ) : prompt ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1 flex flex-col min-h-0"
                        >
                            <div className="flex-1 bg-[#0d1117] rounded-xl border border-white/5 overflow-hidden flex flex-col shadow-2xl">
                                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2 bg-slate-950/50">
                                    <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Prompt Output</span>
                                </div>
                                <div className="flex-1 overflow-auto p-6 font-mono text-sm leading-relaxed text-slate-300">
                                    <pre className="whitespace-pre-wrap selection:bg-indigo-500/30 selection:text-indigo-200">{prompt}</pre>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
                                <div className="relative h-16 w-16 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center">
                                    <Sparkles className="h-8 w-8 text-indigo-500/50" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-base mb-1">Ready to generate</h4>
                                <p className="text-slate-500 text-xs leading-relaxed max-w-[180px]">
                                    Your professional prompt will appear here in real-time.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
