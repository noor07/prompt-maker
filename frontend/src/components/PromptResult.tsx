import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Copy,
    Bookmark,
    Sparkles,
    Check,
    Terminal,
    ArrowRight
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
        <div className="h-full flex flex-col p-6 overflow-hidden">
            {/* Action Header */}
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Output</h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        disabled={!prompt}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                            prompt
                                ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                                : "bg-transparent border-transparent text-slate-600 cursor-not-allowed"
                        )}
                    >
                        {copied ? (
                            <>
                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy className="h-3.5 w-3.5" />
                                Copy
                            </>
                        )}
                    </button>
                    {onSave && (
                        <button
                            onClick={onSave}
                            disabled={!prompt || isSaving}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                                prompt && !isSaving
                                    ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20"
                                    : "bg-transparent border-transparent text-slate-600 cursor-not-allowed"
                            )}
                        >
                            <Bookmark className="h-3.5 w-3.5" />
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        /* Loading State */
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col gap-4"
                        >
                            <div className="h-4 w-1/3 bg-slate-900 animate-pulse rounded" />
                            <div className="flex-1 space-y-3 bg-slate-900/50 rounded-2xl p-6 border border-white/5">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-3 w-full bg-slate-800 rounded animate-pulse" style={{ opacity: 1 - i * 0.1 }} />
                                ))}
                            </div>
                        </motion.div>
                    ) : prompt ? (
                        /* Result State */
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="h-full flex flex-col"
                        >
                            <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden shadow-2xl flex flex-col h-full ring-1 ring-white/5">
                                <div className="px-4 py-2 bg-slate-900 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
                                            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/40" />
                                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/40" />
                                        </div>
                                        <div className="ml-4 h-4 w-[1px] bg-white/10" />
                                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 font-medium">
                                            <Terminal className="h-3 w-3" />
                                            output.md
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Markdown</span>
                                </div>
                                <div className="p-6 overflow-y-auto font-mono text-sm text-slate-300 leading-relaxed scrollbar-hide flex-1">
                                    <pre className="whitespace-pre-wrap">{prompt}</pre>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* Empty State */
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" />
                                <div className="relative h-20 w-20 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center">
                                    <Sparkles className="h-10 w-10 text-indigo-400" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-white font-bold text-lg">Ready to engineer?</h4>
                                <p className="text-slate-500 text-sm max-w-[200px] mx-auto">
                                    Describe your task and select parameters to see the magic.
                                </p>
                            </div>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="flex items-center gap-2 text-indigo-400/60 font-bold text-xs uppercase tracking-widest"
                            >
                                Start typing
                                <ArrowRight className="h-3 w-3" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
