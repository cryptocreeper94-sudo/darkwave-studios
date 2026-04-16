import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Play, Pause, Headphones, FileText, Download, BookOpen, ChevronLeft, ChevronRight, X, Maximize2, Minimize2, List, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/* ─── CANON AUDIO MODULES ─── */
const CANON_MODULES = [
    {
        id: '1-37',
        title: 'Core Foundations & Physics',
        desc: 'Papers 1–37 define the overarching syntax, Physics Engine block, Governance Layer, and primary industry vertical applications scaling the initial Trust Layer.',
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

/* ─── E-READER CHAPTER DATA ─── */
const EREADER_CHAPTERS = [
    {
        section: 'I — Language Core',
        chapters: [
            { id: 1, title: 'Lume: A Deterministic Natural-Language Programming Language', abstract: 'Lume introduces a paradigm where English-like syntax compiles to deterministic, verifiable bytecode. Unlike probabilistic LLM-driven code generation, every Lume statement maps to a single canonical execution path. The language implements 31 grammar rules across 4 tiers — from primitive declarations through self-sustaining runtime blocks — ensuring that "ask", "think", and "generate" are first-class language keywords rather than API calls.', doi: '10.5281/zenodo.15076533' },
            { id: 2, title: 'Lume-V: The Governance Layer', abstract: 'Lume-V extends the base language with a deterministic governance framework. Every AI decision is wrapped in verify/validate/audit blocks that produce cryptographic proofs of correctness. The V-Chain maintains an immutable ledger of all governance decisions, enabling post-hoc auditing and compliance verification without sacrificing runtime performance.', doi: '10.5281/zenodo.15076535' },
            { id: 3, title: 'Lume English Mode & Intent Resolution', abstract: 'English Mode allows developers to write fully natural-language programs that the Lume compiler interprets deterministically. The Intent Resolver maps ambiguous human language to precise computational semantics through a 4-stage pipeline: tokenization, intent classification, semantic binding, and deterministic code emission.', doi: '10.5281/zenodo.15090086' },
            { id: 4, title: 'Voice-to-Code Pipeline', abstract: 'The Voice-to-Code subsystem extends English Mode to spoken input. Audio is captured, transcribed via Whisper, normalized through the Voice Normalization Bridge, and compiled through the standard Lume pipeline. The result is deterministic code generation from voice — not AI suggestion, but verified compilation.', doi: '10.5281/zenodo.15090088' },
        ]
    },
    {
        section: 'II — Runtime Architecture',
        chapters: [
            { id: 5, title: 'Self-Sustaining Runtime (SOR)', abstract: 'The Self-Sustaining Runtime implements biological metaphors as first-class runtime primitives. Monitor blocks track execution health, Healer blocks implement exponential backoff and circuit breakers, Optimizer blocks detect performance degradation, and Evolver blocks enable safe hot-swapping of components under load.', doi: '10.5281/zenodo.15090090' },
            { id: 6, title: 'Lume Type Contracts (LTC v1.0)', abstract: 'LTC extends traditional type systems with Ed25519-signed type certificates. Every type assertion produces a cryptographic proof that can be independently verified. This enables "Certified at Birth" security — code is proven correct at compile time, not tested for correctness at runtime.', doi: '10.5281/zenodo.15090092' },
            { id: 7, title: 'LDIR: Deterministic Instruction Register', abstract: 'The LDIR defines the complete instruction set for the Lume virtual machine. 31 rules across 4 tiers map every language construct to a single deterministic execution path. The register ensures that identical source code always produces identical behavior regardless of host platform.', doi: '10.5281/zenodo.15090094' },
            { id: 8, title: 'Sandbox Engine & Isolation', abstract: 'The Sandbox Engine provides hermetic execution environments for untrusted Lume code. Each sandbox runs in a separate V8 isolate with configurable resource limits, syscall filtering, and deterministic I/O mocking. The engine enables safe execution of user-submitted programs in the Lume Playground.', doi: '10.5281/zenodo.15102469' },
        ]
    },
    {
        section: 'III — Trust & Security Layer',
        chapters: [
            { id: 9, title: 'Trust Layer Protocol (TLP)', abstract: 'TLP defines the cryptographic substrate underlying all Trust Layer ecosystem applications. It implements a hybrid consensus mechanism combining Proof of Trust with delegated Byzantine fault tolerance, achieving sub-second finality for transaction verification across the ecosystem.', doi: '10.5281/zenodo.15102471' },
            { id: 10, title: 'TrustShield: Autonomous Security', abstract: 'TrustShield provides always-on security monitoring for ecosystem applications. It implements behavioral analysis, anomaly detection, and automated incident response using deterministic Lume governance rules rather than probabilistic ML models.', doi: '10.5281/zenodo.15102473' },
            { id: 11, title: 'Certified at Birth Security Model', abstract: 'The CaB model ensures that all Lume-compiled code carries cryptographic proofs of correctness from the moment of compilation. These proofs travel with the code through deployment, enabling any node in the Trust Layer to independently verify code integrity.', doi: '10.5281/zenodo.15102475' },
            { id: 12, title: 'LMADP: Agent Discovery Protocol', abstract: 'LMADP enables autonomous agents to discover, verify, and communicate with each other across the Trust Layer network. Each agent publishes a signed capability manifest that other agents can query to establish secure, verified communication channels.', doi: '10.5281/zenodo.15102477' },
        ]
    },
    {
        section: 'IV — Industry Verticals',
        chapters: [
            { id: 13, title: 'Lume-Med: Healthcare Vertical', abstract: 'Lume-Med applies deterministic governance to healthcare AI. Every diagnostic suggestion, treatment recommendation, and patient data access is wrapped in auditable governance blocks that produce HIPAA-compliant audit trails by construction rather than by configuration.', doi: '10.5281/zenodo.15113801' },
            { id: 14, title: 'Lume-Fin: Financial Vertical', abstract: 'Lume-Fin implements deterministic financial computation where every transaction, risk assessment, and compliance check produces cryptographic proofs. The system ensures SOX/Basel III compliance through language-level constraints rather than external auditing.', doi: '10.5281/zenodo.15113803' },
            { id: 15, title: 'Lume-Ed: Education Vertical', abstract: 'Lume-Ed governs AI tutoring and assessment systems with deterministic fairness guarantees. Every grading decision, content recommendation, and student interaction is auditable, ensuring equitable treatment across demographic groups.', doi: '10.5281/zenodo.15113805' },
            { id: 16, title: 'Lume-Legal: Legal Vertical', abstract: 'Lume-Legal applies deterministic analysis to legal document review, contract generation, and compliance verification. Every legal conclusion is traceable to specific statutory references and case law citations.', doi: '10.5281/zenodo.15113807' },
            { id: 17, title: 'Lume-Auto: Autonomous Vehicles', abstract: 'Lume-Auto governs autonomous vehicle decision-making with deterministic safety guarantees. Every steering, braking, and navigation decision produces a cryptographic proof of compliance with safety constraints.', doi: '10.5281/zenodo.15113809' },
            { id: 18, title: 'Lume-Energy: Energy Grid Management', abstract: 'Lume-Energy applies deterministic optimization to smart grid management, renewable energy distribution, and carbon accounting. Every load-balancing decision is verifiable and auditable.', doi: '10.5281/zenodo.15113811' },
            { id: 19, title: 'Lume-Agri: Agricultural AI', abstract: 'Lume-Agri implements precision agriculture with deterministic crop management, irrigation scheduling, and yield prediction. Every recommendation is traceable to sensor data and environmental models.', doi: '10.5281/zenodo.15147605' },
            { id: 20, title: 'Lume-Mfg: Manufacturing Vertical', abstract: 'Lume-Mfg governs industrial control systems with deterministic quality assurance, predictive maintenance scheduling, and supply chain optimization under verifiable constraints.', doi: '10.5281/zenodo.15147607' },
            { id: 21, title: 'Lume-Space: Space Operations', abstract: 'Lume-Space provides deterministic mission planning, telemetry analysis, and autonomous spacecraft control where every decision is provably safe and auditable from ground control.', doi: '10.5281/zenodo.15147609' },
            { id: 22, title: 'Lume-Gov: Government & Public Sector', abstract: 'Lume-Gov ensures transparent, auditable AI decision-making in government services including benefit allocation, policy analysis, and public resource optimization.', doi: '10.5281/zenodo.15147611' },
            { id: 23, title: 'Lume-Retail: Commerce & Retail', abstract: 'Lume-Retail applies deterministic pricing, inventory optimization, and personalization with full auditability. Every pricing decision and recommendation is cryptographically traceable.', doi: '10.5281/zenodo.15147613' },
            { id: 24, title: 'Lume-Media: Content & Media', abstract: 'Lume-Media governs AI content generation, moderation, and distribution with deterministic content policies. Every moderation decision produces an auditable justification.', doi: '10.5281/zenodo.15147615' },
            { id: 25, title: 'Lume-HR: Human Resources', abstract: 'Lume-HR ensures fair, auditable AI-driven hiring, evaluation, and workforce planning. Every candidate assessment and promotion recommendation is provably bias-free.', doi: '10.5281/zenodo.15162424' },
            { id: 26, title: 'Lume-Insurance: InsurTech', abstract: 'Lume-Insurance implements deterministic underwriting, claims processing, and risk assessment. Every premium calculation and claim decision is auditable and explainable.', doi: '10.5281/zenodo.15162426' },
            { id: 27, title: 'Lume-Logistics: Supply Chain', abstract: 'Lume-Logistics optimizes routing, warehousing, and last-mile delivery with deterministic resource allocation and provably optimal scheduling under defined constraints.', doi: '10.5281/zenodo.15162428' },
            { id: 28, title: 'Lume-Telecom: Telecommunications', abstract: 'Lume-Telecom manages network optimization, spectrum allocation, and service quality assurance with deterministic bandwidth management and auditable SLA compliance.', doi: '10.5281/zenodo.15162430' },
            { id: 29, title: 'Lume-Construction: Built Environment', abstract: 'Lume-Construction governs BIM integration, structural analysis, and project scheduling with deterministic safety verification at every design checkpoint.', doi: '10.5281/zenodo.15175193' },
            { id: 30, title: 'Lume-Maritime: Ocean & Maritime', abstract: 'Lume-Maritime provides autonomous vessel navigation, port logistics, and marine environmental monitoring with deterministic collision avoidance and route optimization.', doi: '10.5281/zenodo.15175195' },
            { id: 31, title: 'Lume-Pharma: Pharmaceutical R&D', abstract: 'Lume-Pharma governs drug discovery pipelines, clinical trial management, and regulatory submission with deterministic compliance verification at every stage.', doi: '10.5281/zenodo.15175197' },
            { id: 32, title: 'Lume-Mining: Resource Extraction', abstract: 'Lume-Mining implements autonomous drilling, geological survey analysis, and environmental impact assessment with deterministic safety constraints and regulatory compliance.', doi: '10.5281/zenodo.15175199' },
            { id: 33, title: 'Lume-Defense: Defense & Security', abstract: 'Lume-Defense provides deterministic threat assessment, logistics planning, and autonomous system governance with mandatory human-in-the-loop checkpoints for lethal force decisions.', doi: '10.5281/zenodo.15175201' },
            { id: 34, title: 'Lume-Hospitality: Hotels & Tourism', abstract: 'Lume-Hospitality optimizes guest experience, revenue management, and operational efficiency with auditable AI concierge services and deterministic pricing.', doi: '10.5281/zenodo.15175203' },
            { id: 35, title: 'Lume-Sports: Athletics & Performance', abstract: 'Lume-Sports governs performance analytics, injury prediction, and training optimization with deterministic athlete monitoring and evidence-based coaching recommendations.', doi: '10.5281/zenodo.15191399' },
            { id: 36, title: 'Lume-Omni: Omniverse Integration', abstract: 'Lume-Omni bridges all vertical implementations into a unified governance framework, enabling cross-domain AI orchestration with consistent trust guarantees across industries.', doi: '10.5281/zenodo.15191401' },
            { id: 37, title: 'DAIGS Master Taxonomy', abstract: 'The Deterministic AI Governance Standard defines the complete classification taxonomy for all Lume governance patterns, establishing industry-wide nomenclature for trust-verified AI systems.', doi: '10.5281/zenodo.15191403' },
        ]
    },
    {
        section: 'V — Physics Substrate Layer',
        chapters: [
            { id: 38, title: 'Lume-Chronos: Temporal Substrate', abstract: 'The Chronos substrate establishes deterministic time as a first-class physical primitive. Universal synchronization, frame-locking, and state progression eliminate relative drift. The T-Chain ledger maintains an immutable record of all temporal events, enabling precise reconstruction of any system state at any point in the timeline.', doi: '10.5281/zenodo.15218662' },
            { id: 39, title: 'Lume-Dimensional: Spatial Substrate', abstract: 'The Dimensional substrate maps the complete spatial topology for synthetic organisms. It defines collision bounding, geographic presence, and multi-scale coordinate systems through the universal grid taxonomy — from subatomic to cosmic scales — enabling deterministic spatial reasoning.', doi: '10.5281/zenodo.15218664' },
            { id: 40, title: 'Lume-Identity: Self Substrate', abstract: 'The Identity substrate bootstraps intrinsic soul signatures for synthetic organisms. Each organism receives a cryptographic identity that encodes its memory provenance, capability manifest, and behavioral history. The I-Chain ensures identity persistence across reboots, migrations, and evolutionary transitions.', doi: '10.5281/zenodo.15218666' },
            { id: 41, title: 'Lume-Causal: Causality Substrate', abstract: 'The Causal substrate implements the C-Chain — a deterministic ledger tracking every cause-and-effect relationship within and between organisms. It eliminates branching paradoxes by enforcing strict causal ordering and provides counterfactual inference engines for "what-if" analysis.', doi: '10.5281/zenodo.15305313' },
            { id: 42, title: 'Lume-Relational: Social Substrate', abstract: 'The Relational substrate, the capstone of the 42-paper canon, defines how multiple organisms interact, cooperate, and govern each other. It implements trust graphs, behavioral contracts, and emergent social structures — enabling macroscopic ecosystem governance from microscopic deterministic rules.', doi: '' },
        ]
    }
];

// Flatten for easy indexing
const ALL_CHAPTERS = EREADER_CHAPTERS.flatMap(s => s.chapters);

/* ─── COMPONENT ─── */
export default function LumeLearn() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pinEntry, setPinEntry] = useState('');
    const [error, setError] = useState(false);
    const [playingId, setPlayingId] = useState<string | null>(null);

    // E-Reader state
    const [readerOpen, setReaderOpen] = useState(false);
    const [readerChapterIdx, setReaderChapterIdx] = useState(0);
    const [readerFullscreen, setReaderFullscreen] = useState(false);
    const [tocOpen, setTocOpen] = useState(false);
    const readerRef = useRef<HTMLDivElement>(null);

    // Active view tab
    const [activeTab, setActiveTab] = useState<'listen' | 'read'>('listen');

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

    const openReader = (chapterIdx?: number) => {
        setReaderChapterIdx(chapterIdx ?? 0);
        setReaderOpen(true);
    };

    const nextChapter = () => {
        if (readerChapterIdx < ALL_CHAPTERS.length - 1) {
            setReaderChapterIdx(prev => prev + 1);
            readerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevChapter = () => {
        if (readerChapterIdx > 0) {
            setReaderChapterIdx(prev => prev - 1);
            readerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Keyboard nav for reader
    useEffect(() => {
        if (!readerOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextChapter();
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevChapter();
            if (e.key === 'Escape') setReaderOpen(false);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [readerOpen, readerChapterIdx]);

    const currentChapter = ALL_CHAPTERS[readerChapterIdx];
    const currentSection = EREADER_CHAPTERS.find(s => s.chapters.some(c => c.id === currentChapter?.id));

    /* ─── PIN GATE ─── */
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans px-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 sm:p-8 border border-[#1e293b] bg-[#0f172a]/50 backdrop-blur-md rounded-2xl w-full max-w-sm text-center shadow-2xl"
                >
                    <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-500 mx-auto mb-4 sm:mb-6" />
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-widest mb-2">RESTRICTED</h2>
                    <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">Enter Director PIN to access LumeLearn Portal</p>
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

    /* ─── E-READER MODAL ─── */
    const ReaderModal = () => {
        if (!readerOpen) return null;

        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/95 flex flex-col"
                >
                    {/* Reader Top Bar */}
                    <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-b border-slate-800/60 bg-[#0a0a0f]/90 backdrop-blur-xl shrink-0">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <button
                                onClick={() => setTocOpen(!tocOpen)}
                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                title="Table of Contents"
                            >
                                <List className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <div className="min-w-0">
                                <p className="text-[10px] sm:text-xs text-teal-400 font-mono tracking-wider truncate">
                                    {currentSection?.section}
                                </p>
                                <p className="text-xs sm:text-sm text-white font-semibold truncate">
                                    Paper {currentChapter?.id} of 42
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                            <button
                                onClick={() => setReaderFullscreen(!readerFullscreen)}
                                className="hidden sm:flex p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                                {readerFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => { setReaderOpen(false); setTocOpen(false); }}
                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-red-900/50 transition-colors"
                            >
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-1 overflow-hidden relative">
                        {/* TOC Sidebar - slides over on mobile, pushes on desktop */}
                        <AnimatePresence>
                            {tocOpen && (
                                <>
                                    {/* Mobile overlay */}
                                    <div 
                                        className="sm:hidden fixed inset-0 bg-black/60 z-10"
                                        onClick={() => setTocOpen(false)}
                                    />
                                    <motion.div
                                        initial={{ x: -300, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -300, opacity: 0 }}
                                        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                                        className="absolute sm:relative z-20 w-72 sm:w-64 lg:w-80 bg-[#0b0c14] border-r border-slate-800/50 overflow-y-auto shrink-0 h-full"
                                    >
                                        <div className="p-4">
                                            <h3 className="text-xs font-bold text-teal-400 tracking-widest mb-4">TABLE OF CONTENTS</h3>
                                            {EREADER_CHAPTERS.map((section) => (
                                                <div key={section.section} className="mb-4">
                                                    <p className="text-[10px] font-mono text-slate-500 tracking-wider mb-2 uppercase">{section.section}</p>
                                                    {section.chapters.map((ch) => {
                                                        const globalIdx = ALL_CHAPTERS.findIndex(c => c.id === ch.id);
                                                        const isCurrent = globalIdx === readerChapterIdx;
                                                        return (
                                                            <button
                                                                key={ch.id}
                                                                onClick={() => { setReaderChapterIdx(globalIdx); setTocOpen(false); readerRef.current?.scrollTo({ top: 0 }); }}
                                                                className={`w-full text-left px-3 py-2 rounded-lg text-xs mb-1 transition-all ${
                                                                    isCurrent 
                                                                        ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30' 
                                                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                                                }`}
                                                            >
                                                                <span className="text-[10px] font-mono text-slate-600 mr-2">#{ch.id}</span>
                                                                {ch.title}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>

                        {/* Reading Pane */}
                        <div 
                            ref={readerRef}
                            className={`flex-1 overflow-y-auto ${readerFullscreen ? '' : 'px-4 sm:px-8 lg:px-16 xl:px-32'}`}
                        >
                            <motion.article
                                key={readerChapterIdx}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className={`mx-auto py-8 sm:py-12 lg:py-16 ${readerFullscreen ? 'max-w-none px-6 sm:px-12' : 'max-w-2xl'}`}
                            >
                                {/* Paper Number Badge */}
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 text-teal-400 font-mono font-bold text-sm sm:text-base">
                                        {currentChapter?.id}
                                    </span>
                                    <div className="text-[10px] sm:text-xs text-slate-500 font-mono">
                                        {currentSection?.section}
                                    </div>
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-6 sm:mb-8">
                                    {currentChapter?.title}
                                </h1>

                                {/* Meta */}
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8 sm:mb-10 text-[10px] sm:text-xs text-slate-500 font-mono">
                                    <span>DarkWave Studios LLC</span>
                                    <span className="hidden sm:inline">·</span>
                                    <span>Lume Ecosystem Canon</span>
                                    {currentChapter?.doi && (
                                        <>
                                            <span className="hidden sm:inline">·</span>
                                            <a 
                                                href={`https://doi.org/${currentChapter.doi}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-cyan-500 hover:text-cyan-300 transition-colors break-all"
                                            >
                                                DOI: {currentChapter.doi}
                                            </a>
                                        </>
                                    )}
                                </div>

                                {/* Divider */}
                                <div className="w-16 h-px bg-gradient-to-r from-teal-500 to-cyan-500 mb-8 sm:mb-10" />

                                {/* Abstract */}
                                <div className="mb-10 sm:mb-14">
                                    <h2 className="text-xs font-bold text-teal-400 tracking-widest mb-4">ABSTRACT</h2>
                                    <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed sm:leading-8 font-light">
                                        {currentChapter?.abstract}
                                    </p>
                                </div>

                                {/* Key Concepts */}
                                <div className="mb-10 sm:mb-14">
                                    <h2 className="text-xs font-bold text-teal-400 tracking-widest mb-4">KEY CONCEPTS</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {['Deterministic Execution', 'Cryptographic Verification', 'Governance by Construction', 'Autonomous Self-Healing'].map(concept => (
                                            <div key={concept} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                                                <span className="text-xs sm:text-sm text-slate-400">{concept}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Zenodo Link */}
                                {currentChapter?.doi && (
                                    <div className="p-4 sm:p-6 rounded-xl bg-[#0b1628] border border-cyan-900/30 mb-10">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Full preprint available on Zenodo</p>
                                                <p className="text-xs sm:text-sm font-mono text-cyan-400 break-all">{currentChapter.doi}</p>
                                            </div>
                                            <a
                                                href={`https://doi.org/${currentChapter.doi}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="shrink-0 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/20 transition-colors"
                                            >
                                                View on Zenodo →
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </motion.article>
                        </div>
                    </div>

                    {/* Bottom Navigation Bar */}
                    <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-t border-slate-800/60 bg-[#0a0a0f]/90 backdrop-blur-xl shrink-0">
                        <button
                            onClick={prevChapter}
                            disabled={readerChapterIdx === 0}
                            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Previous</span>
                        </button>

                        {/* Progress bar */}
                        <div className="flex-1 max-w-xs sm:max-w-md mx-3 sm:mx-6">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-[10px] sm:text-xs text-slate-500 font-mono shrink-0">{readerChapterIdx + 1}/{ALL_CHAPTERS.length}</span>
                                <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((readerChapterIdx + 1) / ALL_CHAPTERS.length) * 100}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={nextChapter}
                            disabled={readerChapterIdx === ALL_CHAPTERS.length - 1}
                            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <span className="hidden sm:inline">Next</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    };

    /* ─── MAIN PAGE ─── */
    return (
        <div className="min-h-screen bg-[#050505] text-[#e2e8f0] font-sans selection:bg-teal-500/30 overflow-x-hidden pt-16 sm:pt-24 pb-12 sm:pb-16">
            <ReaderModal />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 sm:mb-12 lg:mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-teal-950/30 border border-teal-800/50 rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                        <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
                        <span className="text-[10px] sm:text-sm font-medium text-teal-300 tracking-wider">PRIVATE MASTERY PORTAL</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4 sm:mb-6 drop-shadow-md">
                        Lume<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Learn</span>
                    </h1>
                    <p className="text-sm sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light px-2">
                        The definitive auditory extraction of the 42-Paper Lume Architecture. Synthesized for passive integration by ElevenLabs/OpenAI intelligence.
                    </p>
                </motion.div>

                {/* Mode Toggle */}
                <div className="flex justify-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center bg-[#0b0c10] border border-slate-800/60 rounded-2xl p-1">
                        <button
                            onClick={() => setActiveTab('listen')}
                            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                                activeTab === 'listen' 
                                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-500/25' 
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Listen
                        </button>
                        <button
                            onClick={() => setActiveTab('read')}
                            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                                activeTab === 'read' 
                                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-500/25' 
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            E-Reader
                        </button>
                    </div>
                </div>

                {/* ─── LISTEN TAB ─── */}
                <AnimatePresence mode="wait">
                    {activeTab === 'listen' && (
                        <motion.div
                            key="listen"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {/* Now Playing Banner */}
                            <AnimatePresence>
                                {playingId && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="w-full bg-gradient-to-r from-teal-950 to-cyan-950 border border-teal-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 shadow-[0_0_30px_rgba(20,184,166,0.2)]"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                                                <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-black flex items-center justify-center border border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)] shrink-0">
                                                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-teal-400 rounded-full animate-ping" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="text-teal-400 text-[10px] sm:text-xs tracking-widest font-bold mb-1">NOW PLAYING</h3>
                                                    <p className="text-white font-medium text-sm sm:text-lg truncate">
                                                        {CANON_MODULES.find(m => m.id === playingId)?.title}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                                                <div className="hidden md:flex gap-1 h-8 items-end opacity-50">
                                                    {[1,2,3,4,5,6,7].map(i => (
                                                        <motion.div 
                                                            key={i} 
                                                            animate={{ height: ['20%', '100%', '30%'] }} 
                                                            transition={{ repeat: Infinity, duration: 0.5 + (i*0.1) }}
                                                            className="w-1.5 sm:w-2 bg-teal-400 rounded-t-sm"
                                                        />
                                                    ))}
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    onClick={() => setPlayingId(null)} 
                                                    className="text-teal-400 hover:text-white hover:bg-teal-900 border border-teal-800 text-xs sm:text-sm px-2 sm:px-4"
                                                >
                                                    <Pause className="w-4 h-4 sm:mr-2" />
                                                    <span className="hidden sm:inline">STOP</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Audio Module Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {CANON_MODULES.map((module, idx) => {
                                    const isPlaying = playingId === module.id;
                                    return (
                                        <motion.div 
                                            key={module.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.08 }}
                                            className={`
                                                bg-[#0b0c10] border rounded-2xl sm:rounded-3xl p-5 sm:p-8 relative group overflow-hidden transition-all duration-500
                                                ${isPlaying ? 'border-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.15)]' : 'border-slate-800/60 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]'}
                                            `}
                                        >
                                            <div className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 blur-[50px] rounded-full transition-all duration-1000 ${isPlaying ? 'bg-teal-500/20' : 'bg-cyan-500/10 group-hover:bg-cyan-400/20'}`} />
                                            
                                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                                                <h3 className="text-base sm:text-xl font-bold text-white leading-tight pr-3">{module.title}</h3>
                                                <div className="text-[10px] sm:text-xs font-mono text-cyan-500 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900/50 shrink-0">
                                                    {module.duration}
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 line-clamp-4 sm:h-20 sm:overflow-hidden">
                                                {module.desc}
                                            </p>
                                            
                                            <div className="flex items-center gap-2 sm:gap-3 relative z-10 w-full">
                                                <Button 
                                                    onClick={() => togglePlayback(module.id)}
                                                    className={`flex-1 text-xs sm:text-sm ${isPlaying ? 'bg-teal-600 hover:bg-teal-500' : 'bg-cyan-600 hover:bg-cyan-500'} text-white transition-colors`}
                                                >
                                                    {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />}
                                                    {isPlaying ? 'PAUSE' : 'LISTEN'}
                                                </Button>
                                                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 p-2 sm:p-2.5" title="Download MP3">
                                                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                </Button>
                                                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 p-2 sm:p-2.5" title="View Transcript">
                                                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* ─── E-READER TAB ─── */}
                    {activeTab === 'read' && (
                        <motion.div
                            key="read"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {/* Quick Open Full Reader Button */}
                            <div className="text-center mb-8 sm:mb-10">
                                <button
                                    onClick={() => openReader(0)}
                                    className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-teal-500/20 hover:shadow-2xl hover:shadow-teal-500/30 hover:scale-[1.02] transition-all"
                                >
                                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Open Immersive Reader
                                </button>
                                <p className="text-[10px] sm:text-xs text-slate-500 mt-3">Keyboard: ← → to navigate, ESC to close</p>
                            </div>

                            {/* Chapter Listing by Section */}
                            <div className="space-y-6 sm:space-y-10">
                                {EREADER_CHAPTERS.map((section) => (
                                    <motion.div
                                        key={section.section}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                            <div className="h-px flex-1 bg-gradient-to-r from-teal-800/50 to-transparent" />
                                            <h2 className="text-xs sm:text-sm font-bold text-teal-400 tracking-widest shrink-0">{section.section}</h2>
                                            <div className="h-px flex-1 bg-gradient-to-l from-cyan-800/50 to-transparent" />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                            {section.chapters.map((ch) => {
                                                const globalIdx = ALL_CHAPTERS.findIndex(c => c.id === ch.id);
                                                return (
                                                    <button
                                                        key={ch.id}
                                                        onClick={() => openReader(globalIdx)}
                                                        className="text-left bg-[#0b0c10] border border-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-teal-500/40 hover:shadow-[0_0_20px_rgba(20,184,166,0.08)] transition-all duration-300 group"
                                                    >
                                                        <div className="flex items-start gap-3 mb-2 sm:mb-3">
                                                            <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 font-mono font-bold text-[10px] sm:text-xs shrink-0">
                                                                {ch.id}
                                                            </span>
                                                            <h3 className="text-xs sm:text-sm font-semibold text-white leading-snug group-hover:text-teal-200 transition-colors">
                                                                {ch.title}
                                                            </h3>
                                                        </div>
                                                        <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-3 pl-10 sm:pl-11">
                                                            {ch.abstract}
                                                        </p>
                                                        {ch.doi && (
                                                            <p className="text-[9px] sm:text-[10px] font-mono text-cyan-600 mt-2 sm:mt-3 pl-10 sm:pl-11 truncate">
                                                                {ch.doi}
                                                            </p>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
