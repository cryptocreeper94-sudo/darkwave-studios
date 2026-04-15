import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Play, Pause, Headphones, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CANON_MODULES = [
    {
        id: '1-37',
        title: 'Core Foundations \u0026 Physics',
        desc: 'Papers 1–37 define the overarching syntax, physics Engine block, Governance Layer, and primary industry vertical applications scaling the initial Trust Layer.',
        duration: '1h 14m'
    },
    {
        id: '38',
        title: 'Chronos Substrate',
        desc: 'Deterministic time. Establishing universal synchronization, frame-locking, and state progression without relative drift across organisms.',
        duration: '22m'
    },
    {
        id: '39',
        title: 'Dimensional Substrate',
        desc: 'Deterministic space. Mapping spatial topologies, collision bounding, and geographic presence utilizing the universal grid taxonomy.',
        duration: '18m'
    },
    {
        id: '40',
        title: 'Identity Substrate',
        desc: 'Deterministic self. Bootstrapping intrinsic soul signatures, memory provenance, and cryptographic autonomy for synthetic organisms.',
        duration: '29m'
    },
    {
        id: '41',
        title: 'Causal Substrate',
        desc: 'Deterministic cause and effect. The C-Chain ledger tracking unbroken physical interactions to eliminate branching paradoxes.',
        duration: '31m'
    },
    {
        id: '42',
        title: 'Relational Substrate',
        desc: 'Final architectural layer bridging multi-organism behavioral interaction and macroscopic ecosystem governance. The capstone of the 42-paper canon.',
        duration: '45m'
    }
];

export default function LumeLearn() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pinEntry, setPinEntry] = useState('');
    const [error, setError] = useState(false);
    
    const [playingId, setPlayingId] = useState<string | null>(null);

    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pinEntry === '0424') {
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
            setPinEntry('');
        }
    };

    const togglePlayback = (id: string) => {
        if (playingId === id) setPlayingId(null);
        else setPlayingId(id);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 border border-[#1e293b] bg-[#0f172a]/50 backdrop-blur-md rounded-2xl w-full max-w-sm text-center shadow-2xl"
                >
                    <Lock className="w-12 h-12 text-cyan-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-black text-white tracking-widest mb-2">RESTRICTED</h2>
                    <p className="text-slate-400 text-sm mb-6">Enter Director PIN to access LumeLearn Portal</p>
                    <form onSubmit={handlePinSubmit}>
                        <Input 
                            type="password" 
                            className={`bg-black/50 border-${error ? 'red-500' : 'cyan-900'} text-center tracking-[1em] text-lg mb-4 text-cyan-400`}
                            value={pinEntry}
                            onChange={(e) => setPinEntry(e.target.value)}
                            maxLength={4}
                            autoFocus
                        />
                        <Button type="submit" variant="outline" className="w-full border-cyan-800 text-cyan-400 hover:bg-cyan-950/50">
                            VERIFY
                        </Button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-[#e2e8f0] font-sans selection:bg-teal-500/30 overflow-x-hidden pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-teal-950/30 border border-teal-800/50 rounded-full px-4 py-1.5 mb-6 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                        <Headphones className="w-4 h-4 text-teal-400" />
                        <span className="text-sm font-medium text-teal-300 tracking-wider">AUDIO MASTERY PORTAL</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 drop-shadow-md">
                        Lume<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Learn</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                        The definitive auditory extraction of the overarching 42-Paper Lume Architecture. Synthesized for passive integration by ElevenLabs/OpenAI intelligence.
                    </p>
                </motion.div>

                {/* Simulated Player Banner */}
                <AnimatePresence>
                    {playingId && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="w-full bg-gradient-to-r from-teal-950 to-cyan-950 border border-teal-500/50 rounded-2xl p-6 mb-12 shadow-[0_0_30px_rgba(20,184,166,0.2)] flex items-center justify-between"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center border border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)]">
                                    <div className="w-3 h-3 bg-teal-400 rounded-full animate-ping" />
                                </div>
                                <div>
                                    <h3 className="text-teal-400 text-xs tracking-widest font-bold mb-1">NOW PLAYING STREAM</h3>
                                    <p className="text-white font-medium text-lg">
                                        {CANON_MODULES.find(m => m.id === playingId)?.title}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex gap-1 h-8 items-end opacity-50">
                                    {[1,2,3,4,5,6,7].map(i => (
                                        <motion.div 
                                            key={i} 
                                            animate={{ height: ['20%', '100%', '30%'] }} 
                                            transition={{ repeat: Infinity, duration: 0.5 + (i*0.1) }}
                                            className="w-2 bg-teal-400 rounded-t-sm"
                                        />
                                    ))}
                                </div>
                                <Button variant="ghost" onClick={() => setPlayingId(null)} className="text-teal-400 hover:text-white hover:bg-teal-900 border border-teal-800">
                                    <Pause className="w-5 h-5 mr-2" /> STOP STREAM
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 3-Column Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CANON_MODULES.map((module, idx) => {
                        const isPlaying = playingId === module.id;
                        return (
                            <motion.div 
                                key={module.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`
                                    bg-[#0b0c10] border rounded-3xl p-8 relative group overflow-hidden transition-all duration-500
                                    ${isPlaying ? 'border-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.15)]' : 'border-slate-800/60 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]'}
                                `}
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] rounded-full transition-all duration-1000 ${isPlaying ? 'bg-teal-500/20' : 'bg-cyan-500/10 group-hover:bg-cyan-400/20'}`} />
                                
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white leading-tight pr-4">{module.title}</h3>
                                    <div className="text-xs font-mono text-cyan-500 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900/50 shrink-0">
                                        {module.duration}
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 h-20 overflow-hidden">
                                    {module.desc}
                                </p>
                                
                                <div className="flex items-center gap-3 relative z-10 w-full">
                                    <Button 
                                        onClick={() => togglePlayback(module.id)}
                                        className={`flex-1 ${isPlaying ? 'bg-teal-600 hover:bg-teal-500' : 'bg-cyan-600 hover:bg-cyan-500'} text-white transition-colors`}
                                    >
                                        {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                                        {isPlaying ? 'PAUSE' : 'LISTEN'}
                                    </Button>
                                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" title="Download MP3">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" title="View Transcript">
                                        <FileText className="w-4 h-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
