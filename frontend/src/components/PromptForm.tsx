import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    Sparkles,
    ChevronDown,
    Terminal,
    PenTool,
    Database,
    Palette,
    GraduationCap,
    BarChart3,
    Mail,
    Image as ImageIcon,
    Cpu,
    Globe,
    Layers
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
}

const MODES = [
    { value: 'writing', label: 'General Writing', icon: PenTool },
    { value: 'coding', label: 'Coding / Development', icon: Terminal },
    { value: 'analysis', label: 'Data Analysis', icon: Database },
    { value: 'creative', label: 'Creative Storytelling', icon: Palette },
    { value: 'marketing', label: 'Marketing & SEO', icon: BarChart3 },
    { value: 'email', label: 'Email Copy', icon: Mail },
    { value: 'academic', label: 'Academic / Research', icon: GraduationCap },
    { value: 'image', label: 'Image Generation', icon: ImageIcon },
];

const PLATFORMS = [
    { value: 'ChatGPT', label: 'ChatGPT', icon: Zap },
    { value: 'Claude', label: 'Claude', icon: Layers },
    { value: 'Gemini', label: 'Gemini', icon: Sparkles },
    { value: 'DeepSeek', label: 'DeepSeek', icon: Cpu },
    { value: 'Midjourney', label: 'Midjourney', icon: ImageIcon },
    { value: 'Stable Diffusion', label: 'Stable Diffusion', icon: Globe },
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
    const [isModeOpen, setIsModeOpen] = useState(false);
    const [isPlatformOpen, setIsPlatformOpen] = useState(false);

    const activeMode = MODES.find(m => m.value === taskType) || MODES[0];
    const activePlatform = PLATFORMS.find(p => p.value === targetPlatform) || PLATFORMS[0];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header: Breadcrumb */}
            <header className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                <span className="hover:text-slate-300 cursor-pointer transition-colors">Studio</span>
                <span className="text-slate-700">/</span>
                <span className="text-indigo-400">Gemini Flash 2.5</span>
                <span className="text-slate-700">/</span>
                <span className="text-slate-500">New Prompt</span>
            </header>

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Main Input */}
                <div className="space-y-4">
                    <div className="relative group">
                        <textarea
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="Describe your prompt requirements..."
                            className="w-full min-h-[300px] bg-slate-900/50 border border-white/10 rounded-2xl p-6 text-slate-200 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 leading-relaxed resize-none shadow-2xl"
                        />

                        {/* Settings Bar (Dropdowns + Enhance) */}
                        <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-2 flex-wrap">
                                {/* Mode Dropdown */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModeOpen(!isModeOpen);
                                            setIsPlatformOpen(false);
                                        }}
                                        className="flex items-center gap-2.5 px-4 py-2 bg-slate-800 border border-white/10 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-700 hover:border-white/20 hover:border-indigo-500/50 transition-all shadow-xl backdrop-blur-md h-10"
                                    >
                                        <activeMode.icon className="h-4 w-4 text-indigo-400" />
                                        <span className="hidden sm:inline">Mode:</span> {activeMode.label}
                                        <ChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform duration-300", isModeOpen && "rotate-180")} />
                                    </button>

                                    <AnimatePresence>
                                        {isModeOpen && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setIsModeOpen(false)} />
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute bottom-full mb-2 left-0 w-64 bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 backdrop-blur-xl"
                                                >
                                                    <div className="max-h-64 overflow-y-auto py-1">
                                                        {MODES.map((mode) => (
                                                            <button
                                                                key={mode.value}
                                                                type="button"
                                                                onClick={() => {
                                                                    setTaskType(mode.value);
                                                                    setIsModeOpen(false);
                                                                }}
                                                                className={cn(
                                                                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-bold transition-all text-left",
                                                                    taskType === mode.value
                                                                        ? "bg-indigo-500/10 text-indigo-400"
                                                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                                                )}
                                                            >
                                                                <mode.icon className={cn("h-4 w-4 flex-shrink-0", taskType === mode.value ? "text-indigo-400" : "text-slate-500")} />
                                                                {mode.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Platform Dropdown */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsPlatformOpen(!isPlatformOpen);
                                            setIsModeOpen(false);
                                        }}
                                        className="flex items-center gap-2.5 px-4 py-2 bg-slate-800 border border-white/10 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-700 hover:border-white/20 hover:border-indigo-500/50 transition-all shadow-xl backdrop-blur-md h-10"
                                    >
                                        <activePlatform.icon className="h-4 w-4 text-indigo-400" />
                                        <span className="hidden sm:inline">Platform:</span> {activePlatform.label}
                                        <ChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform duration-300", isPlatformOpen && "rotate-180")} />
                                    </button>

                                    <AnimatePresence>
                                        {isPlatformOpen && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setIsPlatformOpen(false)} />
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute bottom-full mb-2 left-0 w-56 bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 backdrop-blur-xl"
                                                >
                                                    <div className="max-h-64 overflow-y-auto py-1">
                                                        {PLATFORMS.map((platform) => (
                                                            <button
                                                                key={platform.value}
                                                                type="button"
                                                                onClick={() => {
                                                                    setTargetPlatform(platform.value);
                                                                    setIsPlatformOpen(false);
                                                                }}
                                                                className={cn(
                                                                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-bold transition-all text-left",
                                                                    targetPlatform === platform.value
                                                                        ? "bg-indigo-500/10 text-indigo-400"
                                                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                                                )}
                                                            >
                                                                <platform.icon className={cn("h-4 w-4 flex-shrink-0", targetPlatform === platform.value ? "text-indigo-400" : "text-slate-500")} />
                                                                {platform.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 hover:bg-indigo-500/20 transition-all group-hover:shadow-lg backdrop-blur-md h-10"
                            >
                                <Sparkles className="h-3.5 w-3.5" />
                                Auto-Enhance
                            </button>
                        </div>
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
                                Generating with Gemini...
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
