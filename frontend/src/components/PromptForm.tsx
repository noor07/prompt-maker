import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    Sparkles
} from 'lucide-react';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface PromptFormProps {
    keywords: string;
    setKeywords: (value: string) => void;
    taskType: string;
    setTaskType: (value: string) => void;
    targetPlatform: string;
    setTargetPlatform: (value: string) => void;
    tone: string;
    setTone: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    model: string;
    setModel: (value: string) => void;
}

const MODES = [
    { value: 'coding', label: 'Coding' },
    { value: 'writing', label: 'Writing' },
    { value: 'analysis', label: 'Data' },
];

const TONES = [
    { value: 'professional', label: 'Professional' },
    { value: 'academic', label: 'Academic' },
    { value: 'creative', label: 'Creative' },
];

const MODELS = [
    { value: 'gpt4', label: 'GPT-4' },
    { value: 'claude', label: 'Claude 3.5' },
];

const SelectPill = ({ label, active, onClick, icon: Icon }: any) => (
    <button
        type="button"
        onClick={onClick}
        className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all",
            active
                ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                : "bg-slate-900 border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10"
        )}
    >
        {Icon && <Icon className="h-3 w-3" />}
        {label}
    </button>
);

export const PromptForm: React.FC<PromptFormProps> = ({
    keywords,
    setKeywords,
    taskType,
    setTaskType,
    tone,
    setTone,
    onSubmit,
    isLoading,
    model,
    setModel
}) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header: Breadcrumb */}
            <header className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                <span className="hover:text-slate-300 cursor-pointer transition-colors">Studio</span>
                <span className="text-slate-700">/</span>
                <span className="text-indigo-400">New Prompt</span>
            </header>

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Main Input */}
                <div className="space-y-4">
                    <div className="relative group">
                        <textarea
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="Describe your prompt requirements..."
                            className="w-full min-h-[250px] bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-200 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 leading-relaxed resize-none shadow-2xl"
                        />

                        {/* Settings Bar (Pills) */}
                        <div className="absolute bottom-4 left-4 flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2 pr-2 mr-2 border-r border-white/5">
                                {MODELS.map(m => (
                                    <SelectPill
                                        key={m.value}
                                        label={m.label}
                                        active={model === m.value}
                                        onClick={() => setModel(m.value)}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-2 pr-2 mr-2 border-r border-white/5">
                                {MODES.map(m => (
                                    <SelectPill
                                        key={m.value}
                                        label={m.label}
                                        active={taskType === m.value}
                                        onClick={() => setTaskType(m.value)}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                {TONES.map(t => (
                                    <SelectPill
                                        key={t.value}
                                        label={t.label}
                                        active={tone === t.value}
                                        onClick={() => setTone(t.value)}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 hover:bg-indigo-500/20 transition-all group-hover:shadow-lg"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            Auto-Enhance
                        </button>
                    </div>
                </div>

                {/* Submit Action */}
                <button
                    type="submit"
                    disabled={isLoading || !keywords.trim()}
                    className="w-full relative group transition-all"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                    <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-lg font-black text-white hover:scale-[1.005] active:scale-[0.995] transition-all shadow-xl shadow-indigo-600/20">
                        {isLoading ? (
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles className="h-5 w-5" />
                                </motion.div>
                                Generating...
                            </div>
                        ) : (
                            <>
                                <Zap className="h-5 w-5 fill-white" />
                                Generate Prompt
                            </>
                        )}
                    </div>
                </button>
            </form>
        </div>
    );
};
