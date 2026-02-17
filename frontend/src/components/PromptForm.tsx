import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    Sparkles,
    ChevronDown,
    Terminal,
    Video,
    Linkedin,
    Bot,
    PenTool,
    Database,
    Palette,
    GraduationCap,
    BarChart3,
    Mail,
    Image as ImageIcon,
    Cpu,
    Globe,
    Layers,
    MessageSquare,
    Code,
    Mic,
    Briefcase
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
    { value: 'marketing', label: 'Marketing & SEO', icon: BarChart3 },
    { value: 'linkedin', label: 'LinkedIn Post', icon: Linkedin },
    { value: 'blog', label: 'Blog Writing', icon: PenTool },
    { value: 'video', label: 'Video Script Writing', icon: Video },
    { value: 'email', label: 'Email Copy', icon: Mail },
    { value: 'bot', label: 'Bot / AI Training', icon: Bot },
    { value: 'creative', label: 'Creative Storytelling', icon: Palette },
    { value: 'academic', label: 'Academic / Research', icon: GraduationCap },
    { value: 'image', label: 'Image Generation', icon: ImageIcon },
];

const PLATFORM_CATEGORIES = [
    {
        name: "Text & Chat Models",
        icon: MessageSquare,
        options: [
            { value: 'ChatGPT', label: 'ChatGPT' },
            { value: 'Gemini', label: 'Gemini' },
            { value: 'Claude', label: 'Claude' },
            { value: 'DeepSeek', label: 'DeepSeek' },
            { value: 'Perplexity', label: 'Perplexity' },
            { value: 'Grok', label: 'Grok' },
            { value: 'Jasper', label: 'Jasper / Copy.ai' },
            { value: 'Notion', label: 'Notion AI / Grammarly' },
            { value: 'Sudowrite', label: 'Sudowrite' },
        ]
    },
    {
        name: "Image Generation",
        icon: ImageIcon,
        options: [
            { value: 'Midjourney', label: 'Midjourney' },
            { value: 'DALLE', label: 'DALL-E' },
            { value: 'Stable Diffusion', label: 'Stable Diffusion' },
            { value: 'Firefly', label: 'Adobe Firefly' },
            { value: 'Ideogram', label: 'Ideogram' },
            { value: 'Leonardo', label: 'Leonardo.ai' },
            { value: 'Canva', label: 'Canva Magic Media' },
            { value: 'Recraft', label: 'Recraft / Krea AI' },
            { value: 'Freepik', label: 'Freepik Pikaso' },
        ]
    },
    {
        name: "Video Creation",
        icon: Video,
        options: [
            { value: 'Sora', label: 'Sora' },
            { value: 'Runway', label: 'Runway' },
            { value: 'Veo', label: 'Google Veo' },
            { value: 'Luma', label: 'Luma Dream Machine' },
            { value: 'Kling', label: 'Kling AI' },
            { value: 'HeyGen', label: 'HeyGen / Synthesia' },
            { value: 'Higgsfield', label: 'Higgsfield' },
            { value: 'Pika', label: 'Pika Labs' },
            { value: 'InVideo', label: 'InVideo AI' },
        ]
    },
    {
        name: "Coding & Development",
        icon: Code,
        options: [
            { value: 'Copilot', label: 'GitHub Copilot' },
            { value: 'Cursor', label: 'Cursor / Windsurf' },
            { value: 'Replit', label: 'Replit / Google Antigravity' },
            { value: 'Bolt', label: 'Bolt.new / Lovable' },
            { value: 'v0', label: 'v0.dev' },
            { value: 'Tabnine', label: 'Tabnine' },
        ]
    },
    {
        name: "Audio & Voice",
        icon: Mic,
        options: [
            { value: 'ElevenLabs', label: 'ElevenLabs' },
            { value: 'Suno', label: 'Suno / Udio' },
            { value: 'Murf', label: 'Murf.ai / Speechify' },
            { value: 'StableAudio', label: 'Stable Audio' },
        ]
    },
    {
        name: "Productivity & Slides",
        icon: Briefcase,
        options: [
            { value: 'Gamma', label: 'Gamma / Beautiful.ai' },
            { value: 'Tome', label: 'Tome' },
            { value: 'Otter', label: 'Otter.ai' },
            { value: 'Zapier', label: 'Zapier' },
            { value: 'Goblin', label: 'Goblin.tools' },
        ]
    },
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

    // Find active platform across categories
    let activePlatform = { value: 'ChatGPT', label: 'ChatGPT', icon: MessageSquare }; // Default
    let activeCategoryIcon = MessageSquare;

    for (const category of PLATFORM_CATEGORIES) {
        const found = category.options.find(p => p.value === targetPlatform);
        if (found) {
            activePlatform = { ...found, icon: category.icon };
            activeCategoryIcon = category.icon;
            break;
        }
    }

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
                                        <activeCategoryIcon className="h-4 w-4 text-indigo-400" />
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
                                                    className="absolute bottom-full mb-2 left-0 w-64 bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 backdrop-blur-xl"
                                                >
                                                    <div className="max-h-60 overflow-y-auto py-1">
                                                        {PLATFORM_CATEGORIES.map((category) => (
                                                            <div key={category.name}>
                                                                <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-white/5">
                                                                    <div className="flex items-center gap-2">
                                                                        <category.icon className="h-3 w-3" />
                                                                        {category.name}
                                                                    </div>
                                                                </div>
                                                                <div className="py-1">
                                                                    {category.options.map((platform) => (
                                                                        <button
                                                                            key={platform.value}
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setTargetPlatform(platform.value);
                                                                                setIsPlatformOpen(false);
                                                                            }}
                                                                            className={cn(
                                                                                "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold transition-all text-left pl-8", // Increased padding-left for indentation
                                                                                targetPlatform === platform.value
                                                                                    ? "bg-indigo-500/10 text-indigo-400"
                                                                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                                                            )}
                                                                        >
                                                                            {platform.label}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
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
