import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Check,
    Sparkles,
    Layout,
    Search,
    ArrowRight
} from 'lucide-react';

// --- Sub-Components ---

const FeatureRow = ({ title, headline, description, bullets, visual, reversed }: any) => (
    <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`py-24 flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}
    >
        {/* Text Content */}
        <div className="flex-1 space-y-8">
            <div className="space-y-4">
                <span className="text-sm font-bold tracking-[0.2em] text-indigo-400 uppercase">{title}</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">{headline}</h2>
                <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                    {description}
                </p>
            </div>

            <ul className="space-y-4">
                {bullets.map((bullet: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                        <div className="rounded-full bg-indigo-500/10 p-1">
                            <Check className="h-4 w-4 text-indigo-400" />
                        </div>
                        {bullet}
                    </li>
                ))}
            </ul>

            <button className="flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors group">
                Learn more about {title.toLowerCase()}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
        </div>

        {/* Visual Content */}
        <div className="flex-1 w-full">
            <div className="relative aspect-video rounded-3xl border border-white/10 bg-slate-900 overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                    {visual}
                </div>
            </div>
        </div>
    </motion.section>
);

export const FeaturesPage = () => {
    useEffect(() => {
        document.title = "Features | Prompt Maker - AI Prompt Engineering Tool";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans pb-24">
            {/* A. Hero Section - Adjusted Spacing for Floating Navbar */}
            <header className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
                {/* Subtle Spotlight Background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-indigo-500/10 blur-[120px] -z-10 rounded-full" />

                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                            <Sparkles className="h-3 w-3" />
                            Pro Tier Extensions
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight">
                            Supercharge your <br />
                            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
                                workflow.
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium">
                            Advanced tools for the professional prompt engineer.
                        </p>
                    </motion.div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6">
                {/* B. Zig-Zag Feature Detail Rows */}

                {/* Row 1: Context Injection */}
                <FeatureRow
                    title="Context Injection"
                    headline="Smart Context Injection"
                    description="Typically, LLMs struggle with ambiguity. Our system automatically identifies missing context and prompts you for clarification."
                    bullets={[
                        "Auto-detected variables",
                        "Tone analysis",
                        "Format standardization"
                    ]}
                    visual={
                        <div className="w-full h-full p-8 flex flex-col gap-4">
                            <div className="h-8 w-1/3 bg-white/5 rounded-lg border border-white/10 flex items-center px-4 gap-2">
                                <Search className="h-4 w-4 text-indigo-400" />
                                <div className="h-2 flex-1 bg-white/10 rounded" />
                            </div>
                            <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-6 relative">
                                <div className="space-y-3">
                                    <div className="h-3 w-full bg-white/10 rounded" />
                                    <div className="h-3 w-[90%] bg-white/10 rounded" />
                                    <div className="h-3 w-[40%] bg-indigo-500/20 rounded border border-indigo-500/30" />
                                </div>
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute bottom-6 right-6 px-4 py-2 bg-indigo-600 rounded-lg text-[10px] font-black uppercase text-white shadow-xl"
                                >
                                    Scanning Context...
                                </motion.div>
                            </div>
                        </div>
                    }
                />

                {/* Row 2: Version Control (Reversed) */}
                <FeatureRow
                    title="Versioning"
                    headline="Iterative Versioning"
                    description="Never lose a perfect prompt again. Roll back to previous versions with a single click and compare changes side-by-side."
                    bullets={[
                        "Instant rollback",
                        "Diff highlighting",
                        "Git-like history"
                    ]}
                    reversed={true}
                    visual={
                        <div className="w-full h-full p-8 flex flex-col gap-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${i === 1 ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-white/5 border-white/5'}`}>
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${i === 1 ? 'bg-indigo-500 text-white' : 'bg-white/10 text-slate-400'}`}>v{4 - i}</div>
                                    <div className="flex-1 space-y-2">
                                        <div className={`h-2 rounded ${i === 1 ? 'bg-indigo-400/30 w-1/2' : 'bg-white/10 w-1/3'}`} />
                                        <div className={`h-2 rounded ${i === 1 ? 'bg-indigo-400/20 w-3/4' : 'bg-white/5 w-1/2'}`} />
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-600">2h ago</div>
                                </div>
                            ))}
                        </div>
                    }
                />

                {/* Row 3: Shared Libraries */}
                <FeatureRow
                    title="Collaboration"
                    headline="Shared Libraries"
                    description="Create a central repository of approved prompts for your entire organization. Ensure consistency across your whole team."
                    bullets={[
                        "Role-based access",
                        "Team-wide templates",
                        "Shared variables"
                    ]}
                    visual={
                        <div className="w-full h-full p-8 grid grid-cols-2 gap-4">
                            <div className="col-span-1 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
                                <Layout className="h-5 w-5 text-emerald-400" />
                                <div className="h-2 w-full bg-white/10 rounded" />
                                <div className="mt-auto flex -space-x-2">
                                    {[1, 2, 3].map(j => (
                                        <div key={j} className="h-6 w-6 rounded-full border border-slate-900 bg-slate-700 overflow-hidden" />
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-1 grid grid-rows-2 gap-4">
                                <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-4">
                                    <div className="h-2 w-full bg-indigo-400/30 rounded" />
                                </div>
                                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                                    <div className="h-2 w-3/4 bg-white/10 rounded" />
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>

            {/* D. SEO Footer Info - Using the main Footer now, but keeping semantic content */}
            <section className="max-w-7xl mx-auto px-6 pt-24 pb-12 text-center">
                <div className="flex flex-col items-center gap-4">
                    <p className="text-xs text-slate-500 max-w-md">
                        * Some advanced context features require a Prompt Maker Professional subscription.
                        Compatible with all major LLM providers including OpenAI, Anthropic, and Google.
                    </p>
                </div>
            </section>
        </div>
    );
};
