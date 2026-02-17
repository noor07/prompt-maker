import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    Sparkles,
    Code,
    PenTool,
    Database,
    Terminal,
    MessageSquare,
    Image,
    ChevronDown
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
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    model: string;
    setModel: (value: string) => void;
}

const TASK_TYPES = [
    { value: 'coding', label: 'Coding', icon: Code },
    { value: 'writing', label: 'Writing', icon: PenTool },
    { value: 'analysis', label: 'Data', icon: Database },
];

const PLATFORMS = [
    { value: 'vscode', label: 'VS Code', icon: Terminal },
    { value: 'chatgpt', label: 'ChatGPT', icon: MessageSquare },
    { value: 'midjourney', label: 'Midjourney', icon: Image },
];

const SelectCard = ({ label, icon: Icon, active, onClick }: any) => (
    <button
        type="button"
        onClick={onClick}
        className={cn(
            "flex items-center gap-3 p-4 rounded-2xl border transition-all text-sm font-medium",
            active
                ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 ring-1 ring-indigo-500/20"
                : "bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/10 hover:bg-slate-900"
        )}
    >
        <div className={cn(
            "rounded-lg p-2 transition-colors",
            active ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-slate-500"
        )}>
            <Icon className="h-4 w-4" />
        </div>
        {label}
    </button>
);

export const PromptForm: React.FC<PromptFormProps> = ({
    keywords,
    setKeywords,
    taskType,
    setTaskType,
    targetPlatform,
    setTargetPlatform,
    onSubmit,
    isLoading,
    model,
    setModel
}) => {
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight">Generate Prompt</h2>

                {/* Model Selector */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
                    >
                        {model === 'gpt4' ? 'GPT-4 Omni' : 'Claude 3.5 Sonnet'}
                        <ChevronDown className={cn("h-4 w-4 transition-transform", isModelDropdownOpen && "rotate-180")} />
                    </button>

                    {isModelDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 rounded-xl border border-white/10 bg-slate-900 shadow-2xl z-50 overflow-hidden">
                            {[
                                { id: 'gpt4', name: 'GPT-4 Omni' },
                                { id: 'claude', name: 'Claude 3.5 Sonnet' }
                            ].map(m => (
                                <button
                                    key={m.id}
                                    type="button"
                                    onClick={() => {
                                        setModel(m.id);
                                        setIsModelDropdownOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    {m.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <form onSubmit={onSubmit} className="space-y-10">
                {/* Main Input Canvas */}
                <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">
                        What do you want to build?
                    </label>
                    <div className="relative group">
                        <textarea
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="Describe your prompt requirements in detail..."
                            className="w-full min-h-[200px] bg-slate-900/50 border border-slate-800 rounded-[24px] p-6 text-slate-200 font-mono text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 leading-relaxed"
                        />
                        <button
                            type="button"
                            className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 hover:bg-indigo-500/20 transition-all active:scale-95 group-hover:shadow-lg group-hover:shadow-indigo-500/10"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            Auto-Enhance
                        </button>
                    </div>
                </div>

                {/* Parameters Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Task Type */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">
                            Task Type
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                            {TASK_TYPES.map((type) => (
                                <SelectCard
                                    key={type.value}
                                    label={type.label}
                                    icon={type.icon}
                                    active={taskType === type.value}
                                    onClick={() => setTaskType(type.value)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Platform */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">
                            Platform
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                            {PLATFORMS.map((platform) => (
                                <SelectCard
                                    key={platform.value}
                                    label={platform.label}
                                    icon={platform.icon}
                                    active={targetPlatform === platform.value}
                                    onClick={() => setTargetPlatform(platform.value)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Submit Action */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[20px] blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[18px] text-lg font-black text-white hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-indigo-600/20">
                        {isLoading ? (
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles className="h-6 w-6" />
                                </motion.div>
                                Engineering Prompts...
                            </div>
                        ) : (
                            <>
                                <Zap className="h-6 w-6 fill-white" />
                                Generate Professional Prompt
                            </>
                        )}
                    </div>
                </button>
            </form>
        </div>
    );
};
