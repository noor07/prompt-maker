import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Code,
    Zap,
    MessageSquare,
    Check,
    X,
    History,
    Users,
    Sparkles,
    ArrowLeft
} from 'lucide-react';

// --- Sub-Components ---

const FeatureCard = ({ icon: Icon, title, description }: any) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}
        className="group relative rounded-2xl border border-white/5 bg-white/5 p-8 transition-all hover:bg-white/10 hover:border-white/10"
    >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100 rounded-2xl" />
        <div className="mb-4 inline-block rounded-lg bg-indigo-500/10 p-3 text-indigo-400 ring-1 ring-indigo-500/20">
            <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
);

const BentoCard = ({ title, description, children, className }: any) => (
    <div className={`p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm relative overflow-hidden group ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">{description}</p>
            <div className="mt-auto">
                {children}
            </div>
        </div>
    </div>
);

export const FeaturesPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Features | Prompt Maker - AI Prompt Engineering Tool";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans pb-24">
            {/* Header / Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 group"
                    >
                        <div className="p-2 rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                            <Sparkles className="h-5 w-5 text-indigo-400" />
                        </div>
                        <span className="font-bold text-white">Prompt Maker</span>
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </button>
                </div>
            </nav>

            {/* A. SEO Hero Section */}
            <header className="relative pt-48 pb-24 overflow-hidden">
                {/* Hero Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] -z-10 rounded-full" />

                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
                            Supercharge your <br />
                            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                LLM workflows.
                            </span>
                        </h1>
                        <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
                            The only toolkit designed for professional prompt engineering. <br className="hidden md:block" />
                            Compatible with GPT-4, Claude 3.5, and Gemini Ultra.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => navigate('/signup')}
                                className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 active:scale-[0.98]"
                            >
                                Start Engineering
                            </button>
                            <a href="#core-features" className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full transition-all border border-white/10">
                                Explore Tools
                            </a>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* B. The Core Grid */}
            <section id="core-features" className="py-24 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Everything you need</h2>
                    <p className="mt-4 text-lg text-slate-400">Master the art of prompt engineering with our advanced toolkit.</p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    <FeatureCard
                        icon={Code}
                        title="Optimized Structure"
                        description="Auto-apply CO-STAR and RTF frameworks to ensure your prompts are built on industry-leading structural foundations."
                    />
                    <FeatureCard
                        icon={Zap}
                        title="Instant Refinement"
                        description="Turn one-liners into pro prompts in milliseconds. Our engine refines every input for maximum clarity and precision."
                    />
                    <FeatureCard
                        icon={MessageSquare}
                        title="Context Awareness"
                        description="Smart variable injection and tonal control allow you to keep consistent outputs across massive datasets and complex tasks."
                    />
                </motion.div>
            </section>

            {/* C. The Problem vs Solution */}
            <section className="py-24 bg-slate-900/30 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">Stop wasting time</h2>
                        <p className="mt-4 text-lg text-slate-400">The difference between guessing and engineering.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* The Old Way */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl border border-red-500/10 bg-red-500/5 p-10 flex flex-col"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="rounded-2xl bg-red-500/10 p-3">
                                    <X className="h-8 w-8 text-red-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">The Old Way</h3>
                            </div>
                            <ul className="space-y-6 flex-1">
                                {[
                                    "Generic outputs leading to boring content",
                                    "Frequent hallucinations and made-up facts",
                                    "Wasted API tokens and unnecessary costs",
                                    "Messy, unstructured text dumps",
                                    "Inconsistent results across many attempts"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-400 text-lg">
                                        <X className="h-6 w-6 text-red-500/40 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* The PromptMaker Way */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-10 backdrop-blur-md relative overflow-hidden group flex flex-col"
                        >
                            <div className="absolute top-6 right-8">
                                <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-black uppercase tracking-widest text-indigo-400">Recommended</span>
                            </div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="rounded-2xl bg-indigo-500/20 p-3 ring-1 ring-indigo-500/50">
                                    <Check className="h-8 w-8 text-indigo-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">The PromptMaker Way</h3>
                            </div>
                            <ul className="space-y-6 flex-1">
                                {[
                                    "Predictable, high-quality professional results",
                                    "Context-anchored accuracy for every response",
                                    "Optimized token usage to save money",
                                    "Clean formats (JSON, Markdown, Code)",
                                    "Zero-shot accuracy on complex instructions"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-200 text-lg font-medium">
                                        <Check className="h-6 w-6 text-indigo-400 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* D. Advanced Capabilities Bento Grid */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Advanced capabilities.</h2>
                    <p className="mt-4 text-xl text-slate-400">Precision tools for high-scale AI infrastructure.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <BentoCard
                        title="Multi-Model Support"
                        description="Optimized for GPT-4, Claude 3.5, Gemini, and Llama 3. Seamlessly switch between providers."
                        className="lg:col-span-2"
                    >
                        <div className="flex flex-wrap gap-3">
                            {["OpenAI", "Anthropic", "Google DeepMind", "Meta AI", "Mistral"].map(model => (
                                <span key={model} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-slate-300">
                                    {model}
                                </span>
                            ))}
                        </div>
                    </BentoCard>

                    <BentoCard
                        title="Version Control"
                        description="Track prompt history and roll back changes instantly."
                        className="lg:col-span-1"
                    >
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-white/5">
                            <History className="h-5 w-5 text-indigo-400" />
                            <div className="flex-1">
                                <div className="h-2 w-3/4 bg-slate-800 rounded animate-pulse mb-2" />
                                <div className="h-2 w-1/2 bg-slate-800 rounded animate-pulse" />
                            </div>
                        </div>
                    </BentoCard>

                    <BentoCard
                        title="Team Library"
                        description="Share prompts with your team and collaborate on complex logic."
                        className="lg:col-span-1"
                    >
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-emerald-400" />
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Team Sync Active</span>
                        </div>
                    </BentoCard>

                    <BentoCard
                        title="API Access"
                        description="Integrate our prompt refinement engine directly into your own applications."
                        className="lg:col-span-2"
                    >
                        <div className="rounded-xl bg-black/50 border border-white/5 p-4 font-mono text-[10px] text-indigo-300">
                            <code>POST /api/v1/refine<br />{`{ "prompt": "Write a blog post", "framework": "CO-STAR" }`}</code>
                        </div>
                    </BentoCard>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 max-w-4xl mx-auto px-6">
                <div className="rounded-[40px] bg-gradient-to-br from-indigo-600 to-violet-700 p-12 text-center shadow-3xl shadow-indigo-600/20">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to engineer?</h2>
                    <p className="text-indigo-100/80 text-lg mb-10 max-w-xl mx-auto">Join 50,000+ developers using Prompt Maker to build better AI software.</p>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-10 py-4 bg-white text-indigo-600 font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                        Get Free Access
                    </button>
                </div>
            </section>

            {/* E. SEO Footer Info */}
            <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-indigo-400" />
                        <span className="font-bold text-white">Prompt Maker</span>
                    </div>
                    <p className="text-xs text-slate-500 max-w-md">
                        Prompt Maker is the industry-standard toolkit for professional AI engineers. Crafted for GPT-4, Claude, and Gemini optimization.
                    </p>
                    <p className="text-[10px] text-slate-700 uppercase tracking-[0.2em] font-bold mt-4">
                        © 2024 PROMPT MAKER AI • PRIVACY • TERMS
                    </p>
                </div>
            </footer>
        </div>
    );
};
