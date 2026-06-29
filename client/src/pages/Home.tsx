import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Menu, X, Shield, ShieldAlert, Cpu, Lock, Database, Code, Zap } from "lucide-react";
import { KenBurnsBackground } from "@/components/ken-burns-background";

const projects = [
  {
    id: 99,
    title: "Strata",
    description: "Sovereign research registry for deterministic systems. Mint your researcher ID and publish to the ecosystem.",
    tech: ["Research", "Registry", "Academic"],
    image: "/ecosystem/darkwave-studios-new.jpg",
    gradient: "from-cyan-500/20 to-teal-500/20",
    url: "https://strata.tlid.io"
  },
  {
    id: 2,
    title: "Lume",
    description: "The deterministic natural-language programming language — ask/think/generate as syntax keywords, 4-layer self-sustaining runtime, voice-to-code pipeline, and 2,000+ tests",
    tech: ["AI", "Language", "Runtime", "Toolchain"],
    image: "/ecosystem/darkwave-chain.jpg",
    gradient: "from-cyan-500/20 to-teal-600/20",
    url: "https://lume-lang.org"
  },
  {
    id: 1,
    title: "Trust Layer",
    description: "Layer 1 blockchain providing verified identity and AI agent certification",
    tech: ["Blockchain", "Identity", "AI"],
    image: "/ecosystem/trust-layer-new.jpg",
    gradient: "from-sky-500/20 to-pink-600/20",
    url: "https://dwtl.io"
  },
  {
    id: 3,
    title: "TrustShield",
    description: "24/7 continuous security monitoring for enterprise blockchain operations",
    tech: ["Security", "Monitoring", "Enterprise"],
    image: "/ecosystem/trust-shield.png",
    gradient: "from-emerald-500/20 to-teal-600/20",
    url: "https://trustshield.tech"
  },
  {
    id: 4,
    title: "Pulse",
    description: "AI-driven cryptocurrency trading and analytics with predictive signals",
    tech: ["AI", "Trading", "Analytics"],
    image: "/ecosystem/pulse.png",
    gradient: "from-cyan-500/20 to-sky-600/20",
    url: "https://darkwavepulse.com"
  },
  {
    id: 5,
    title: "Strike Agent",
    description: "Autonomous AI-powered asset discovery and trading system",
    tech: ["AI", "Trading", "Multi-chain"],
    image: "/ecosystem/strikeagent.png",
    gradient: "from-cyan-500/20 to-blue-600/20",
    url: "https://strikeagent.io"
  },
  {
    id: 6,
    title: "ORBIT Staffing",
    description: "Automated staffing platform with GPS tracking and payroll processing",
    tech: ["HR Tech", "Payroll", "GPS"],
    image: "/ecosystem/orbit-staffing.png",
    gradient: "from-orange-500/20 to-red-600/20",
    url: "https://orbitstaffing.io"
  },
  {
    id: 7,
    title: "Orby Commander",
    description: "Venue operations PWA with emergency command center and team comms",
    tech: ["Operations", "PWA", "Venues"],
    image: "/ecosystem/orby-commander.png",
    gradient: "from-amber-500/20 to-orange-600/20",
    url: "https://getorby.io"
  },
  {
    id: 9,
    title: "Brew & Board",
    description: "Nashville's premium B2B coffee and catering concierge platform",
    tech: ["Delivery", "B2B", "Catering"],
    image: "/ecosystem/brew-board.png",
    gradient: "from-lime-500/20 to-green-600/20",
    url: "https://brewandboard.coffee"
  },
  {
    id: 10,
    title: "TradeWorks AI",
    description: "Mobile field tools with 85+ professional calculators and voice-to-estimate",
    tech: ["AI", "Trades", "Estimation"],
    image: "/ecosystem/tradeworks-ai.png",
    gradient: "from-teal-500/20 to-cyan-600/20",
    url: "https://tradeworksai.io"
  },
  {
    id: 11,
    title: "PaintPros",
    description: "Flagship trade services platform with estimating, CRM, and 74 pages",
    tech: ["SaaS", "Leads", "Marketing"],
    image: "/ecosystem/paint-pros.png",
    gradient: "from-rose-500/20 to-pink-600/20",
    url: "https://paintpros.io"
  },
  {
    id: 12,
    title: "Nashville Painting Professionals",
    description: "Ecosystem hub connecting 20+ platforms with affiliate tracking",
    tech: ["Painting", "Estimates", "Booking"],
    image: "/ecosystem/nash-paint-pros.png",
    gradient: "from-cyan-500/20 to-sky-600/20",
    url: "https://nashpaintpros.io"
  },
  {
    id: 14,
    title: "GarageBot",
    description: "AI parts aggregator with 93+ retailers, VIN decoding, and AI symptom diagnosis engine",
    tech: ["AI", "Automotive", "E-commerce"],
    image: "/ecosystem/garagebot.png",
    gradient: "from-red-500/20 to-orange-600/20",
    url: "https://garagebot.io"
  },
  {
    id: 15,
    title: "TL Driver Connect",
    description: "All-in-one driver services platform with GPS mileage, fuel finder, CDL directory, and delivery network",
    tech: ["Delivery", "PWA", "AI", "WebSocket"],
    image: "/ecosystem/happy-eats.png",
    gradient: "from-green-500/20 to-emerald-600/20",
    url: "https://tldriverconnect.com"
  },
  {
    id: 16,
    title: "VedaSolus",
    description: "Holistic wellness platform bridging Eastern and Western healing",
    tech: ["Health", "AI", "Wellness"],
    image: "/ecosystem/vedasolus.png",
    gradient: "from-teal-500/20 to-cyan-600/20",
    url: "https://vedasolus.io"
  },
  {
    id: 17,
    title: "Chronicles",
    description: "Parallel life simulation across historical eras with AI NPCs, voice cloning, and real-time world",
    tech: ["Life Sim", "AI", "Voice", "Real-time"],
    image: "/ecosystem/chronicles.jpg",
    gradient: "from-amber-500/20 to-red-600/20",
    url: "https://yourlegacy.io"
  },
  {
    id: 22,
    title: "The Arcade",
    description: "Premium arcade games with provably fair sweepstakes, slots, and Stripe-powered coin store",
    tech: ["Arcade", "Sweepstakes", "Stripe"],
    image: "/ecosystem/darkwave-games.png",
    gradient: "from-pink-500/20 to-rose-600/20",
    url: "https://darkwavegames.io"
  },
  {
    id: 24,
    title: "DarkWave Studio",
    description: "Browser-based IDE for smart contract development on DWSC",
    tech: ["IDE", "Smart Contracts", "DevTools"],
    image: "/ecosystem/darkwave-studio.png",
    gradient: "from-cyan-500/20 to-blue-600/20",
    url: "https://studio.tlid.io"
  },
  {
    id: 18,
    title: "TrustHome",
    description: "White-label real estate platform with Voice AI, CRM, blockchain doc vault, and 103 API endpoints",
    tech: ["Real Estate", "Voice AI", "CRM", "PWA"],
    image: "/ecosystem/trusthome.png",
    gradient: "from-sky-500/20 to-indigo-600/20",
    url: "https://trusthome.tlid.io"
  },
  {
    id: 19,
    title: "Axiom42 Suite",
    description: "Universal media vault with image/audio/video editors, Spinny AI agent, 14 AI tools, and 156 API endpoints",
    tech: ["Media", "AI", "Editors", "PWA"],
    image: "/ecosystem/trustvault.png",
    gradient: "from-emerald-500/20 to-cyan-600/20",
    url: "https://axiom42suite.tlid.io"
  },
  {
    id: 20,
    title: "TORQUE",
    description: "Shop management OS for professional auto repair shops with blockchain verification",
    tech: ["PWA", "Auto", "Blockchain"],
    image: "/ecosystem/torque.png",
    gradient: "from-slate-500/20 to-zinc-600/20",
    url: "https://torque.tlid.io"
  },
  {
    id: 21,
    title: "TLID.io",
    description: "Decentralized identity provider with passkey authentication and cross-app SSO",
    tech: ["Identity", "Auth", "Blockchain"],
    image: "/ecosystem/tlid-new.jpg",
    gradient: "from-indigo-500/20 to-sky-600/20",
    url: "https://tlid.io"
  },
  {
    id: 23,
    title: "Guardian Scanner",
    description: "AI agent security scanner with trust scores and certification registry",
    tech: ["Security", "AI", "Scanning"],
    image: "/ecosystem/guardian-scanner-new.jpg",
    gradient: "from-green-500/20 to-emerald-600/20",
    url: "https://guardianscanner.tlid.io"
  },
  {
    id: 25,
    title: "Signal Chat",
    description: "Blockchain-verified messaging platform with real-time WebSocket channels and AI bot integration",
    tech: ["Chat", "WebSocket", "Blockchain"],
    image: "/ecosystem/signal-chat-new.jpg",
    gradient: "from-cyan-500/20 to-sky-600/20",
    url: "https://signalchat.tlid.io"
  },
  {
    id: 26,
    title: "THE VOID",
    description: "Immersive entertainment and digital experience platform",
    tech: ["Entertainment", "AI", "Immersive"],
    image: "/ecosystem/the-void-new.jpg",
    gradient: "from-[#0a0a0a]0/20 to-slate-600/20",
    url: "https://intothevoid.app"
  },
  {
    id: 27,
    title: "Guardian Screener",
    description: "AI-powered DEX screener with rug pull detection and whale tracking",
    tech: ["DeFi", "AI", "Security"],
    image: "/projects/guardian-screener.png",
    gradient: "from-red-500/20 to-rose-600/20",
    url: "https://guardianscreener.tlid.io"
  },
  {
    id: 28,
    title: "DarkWave Academy",
    description: "Education and certification platform for the Trust Layer ecosystem",
    tech: ["Education", "Certification", "Stripe"],
    image: "/ecosystem/darkwave-academy-new.jpg",
    gradient: "from-yellow-500/20 to-amber-600/20",
    url: "https://academy.tlid.io"
  },
  {
    id: 29,
    title: "Happy Eats",
    description: "Zone-based food delivery connecting food trucks with customers across Tennessee",
    tech: ["Delivery", "PWA", "Stripe"],
    image: "/emblems/happy-eats.png",
    gradient: "from-orange-500/20 to-amber-600/20",
    url: "https://happyeats.app"
  },
  {
    id: 30,
    title: "Trust Book",
    description: "Censorship-free ebook publishing platform with AI narration and blockchain provenance",
    tech: ["Publishing", "AI", "E-Reader"],
    image: "/emblems/trust-book.png",
    gradient: "from-cyan-500/20 to-sky-600/20",
    url: "https://trustbook.tlid.io"
  },
  {
    id: 31,
    title: "Trust Golf",
    description: "Premium golf companion with AI swing analysis, GPS distance, and USGA handicap tracking",
    tech: ["Sports", "AI", "GPS"],
    image: "/emblems/trust-golf.png",
    gradient: "from-emerald-500/20 to-green-600/20",
    url: "https://trustgolf.app"
  },
  {
    id: 32,
    title: "Verdara",
    description: "Ultimate outdoor recreation super-app with species ID, trails, and campground booking",
    tech: ["Outdoor", "AI", "PWA"],
    image: "/ecosystem/verdara-new.jpg",
    gradient: "from-lime-500/20 to-emerald-600/20",
    url: "https://verdara.tlid.io"
  },
  {
    id: 33,
    title: "Arbora",
    description: "Professional arborist CRM with estimates, jobs, invoicing, and crew management",
    tech: ["Arborist", "CRM", "PWA"],
    image: "/ecosystem/arbora-new.jpg",
    gradient: "from-green-500/20 to-teal-600/20",
    url: "https://arbora.tlid.io"
  },
  {
    id: 34,
    title: "Bomber",
    description: "3D long-drive golf game with Three.js physics, procedural venues, Mixamo avatars, and 299K+ lines of code",
    tech: ["Three.js", "3D Physics", "Vite", "React"],
    image: "/ecosystem/the-arcade-new.jpg",
    gradient: "from-red-500/20 to-yellow-600/20",
    url: "https://bomber.tlid.io"
  },
  {
    id: 35,
    title: "Trust Layer Hub",
    description: "Unified mobile command center — DeFi wallet, 5 staking pools, encrypted chat, AI agent, multi-sig vaults. 21,026 LOC, 66 endpoints, 24 screens",
    tech: ["React Native", "Expo SDK 54", "DeFi", "PWA"],
    image: "/ecosystem/hub_home_overview.jpg",
    gradient: "from-cyan-500/20 to-blue-600/20",
    url: "https://trusthub.tlid.io"
  },
  {
    id: 36,
    title: "TrustGen",
    description: "AI-powered 3D creation and code studio — Three.js editor, Meshy.ai text-to-3D, Studio IDE with Monaco editor, auto-rigging, GPU particles, and blockchain provenance",
    tech: ["Three.js", "AI", "3D", "Blockchain"],
    image: "/ecosystem/cc_developer_tools.jpg",
    gradient: "from-sky-500/20 to-cyan-600/20",
    url: "https://trustgen.tlid.io"
  },
  {
    id: 37,
    title: "LumeLine",
    description: "Odds intelligence platform — tracks 47+ bookmakers, detects line manipulation, ML consensus with confidence scoring. Built in Lume",
    tech: ["ML", "Analytics", "Lume", "Sports"],
    image: "/ecosystem/darkwave-pulse-new.jpg",
    gradient: "from-emerald-500/20 to-cyan-600/20",
    url: "https://lumeline.bet"
  },
  {
    id: 38,
    title: "Axiom Studio",
    description: "Multi-agent AI development environment with auto-routing engine, snippet dock, and artifact viewer. 5-tier SaaS billing.",
    tech: ["AI", "IDE", "Agents", "Stripe"],
    image: "/ecosystem/cc_developer_tools.jpg",
    gradient: "from-cyan-500/20 to-sky-600/20",
    url: "https://axiomstudio.dev"
  }
];

const CORE_APPS = [
  {
    title: "AXIOM 42",
    tag: "ENTERPRISE",
    icon: <CodeXml className="w-5 h-5" />,
    desc: "The DLA reference implementation — a fully deterministic grounded AI agent with well over 330K+ topics and over 3K domain packs.",
    url: "https://axiom42.com"
  },
  {
    title: "TrustGen 3D",
    tag: "CREATIVE",
    icon: <Cpu className="w-5 h-5" />,
    desc: "The Deterministic 3D Intelligence Studio. Generate and orchestrate verifiable real-time 3D environments with full rigging. A complete Mixamo and Meshy AI replacement.",
    url: "https://trustgen.tlid.io"
  },
  {
    title: "Axiom42 Suite",
    desc: "Professional-grade media vault and apex media editor with military-grade AES-256 encryption and decentralized syncing.",
    icon: Lock,
    url: "https://axiom42suite.tlid.io",
    tag: "Creative"
  },
  {
    title: "Lume Cortex",
    tag: "ARCHITECTURE",
    icon: <Zap className="w-5 h-5" />,
    desc: "The deterministic meta-operating system. The gateway to native release apps including Axiom Studio, Axiom42Suite, Axiom42News, and TrustShield.",
    url: "https://lume-cortex.com"
  },
  {
    title: "Lume Scan",
    desc: "The premier bidirectional diagnostic and fleet management suite featuring Mode 06 remote execution.",
    icon: Database,
    url: "https://lumescan.com",
    tag: "Automotive"
  },
  {
    title: "TrustBook",
    desc: "The decentralized enterprise e-reader. Cryptographically secure highlights and reading progress.",
    icon: Database,
    url: "https://trustbook.tlid.io",
    tag: "Publishing"
  },
  {
    title: "TrustShield",
    desc: "The enterprise-grade privacy and security command center for the DarkWave ecosystem.",
    icon: ShieldAlert,
    url: "https://trustshield.tech",
    tag: "Security"
  },
  {
    title: "Chronoverse",
    desc: "A free parent and children learning and game platform focusing on digital learning for both children and parents.",
    icon: Cpu,
    url: "https://chronoverse.tlid.io",
    tag: "Simulation"
  }
];

const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  const [currentProject, setCurrentProject] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);

  const visibleProjects = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(projects[(currentProject + i) % projects.length]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans relative">
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <KenBurnsBackground 
          images={[
            "/ecosystem/darkwave-studios-new.jpg",
            "/ecosystem/chronicles-new.jpg",
            "/ecosystem/trust-layer-new.jpg",
            "/ecosystem/guardian-scanner-new.jpg",
            "/ecosystem/orbit-staffing-new.jpg",
          ]} 
          overlayOpacity={0.15} 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 via-transparent to-purple-900/10 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
          <div className="lg:hidden max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="font-display text-base font-bold tracking-tight">
              DarkWave Systems
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg glass hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-x-0 top-[57px] bottom-0 bg-background/95 backdrop-blur-xl border-t border-white/5 overflow-y-auto z-50">
              <div className="max-w-7xl mx-auto px-4 py-4 pb-20 flex flex-col gap-1">
                <a href="#core" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold py-3 border-b border-white/5">Core Ecosystem</a>
                <a href="#extended" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold py-3 border-b border-white/5">Extended Network</a>
                <a href="https://dwtl.io" target="_blank" className="text-sm font-semibold py-3 border-b border-white/5">Trust Layer</a>
                <a href="https://dwtl.io/presale" target="_blank" className="text-sm font-semibold py-3 text-white">$SIG Presale</a>
              </div>
            </div>
          )}
          
          <div className="hidden lg:flex max-w-7xl mx-auto px-6 py-4 items-center justify-between">
            <Link href="/" className="font-display text-xl font-black tracking-tight flex items-center gap-2">
              <div className="w-6 h-6 bg-[#0a0a0a] flex items-center justify-center rounded-[2px]">
                <Shield className="w-4 h-4 text-black" />
              </div>
              DarkWave Systems
            </Link>
            <div className="flex items-center gap-8">
              <a href="#core" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Core Platforms</a>
              <a href="#extended" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Extended Network</a>
              <a href="https://dwtl.io" target="_blank" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Trust Layer</a>
              <a 
                href="https://dwtl.io/presale" 
                target="_blank"
                className="btn-glow bg-[#0a0a0a]/5 border border-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-all"
              >
                $SIG Presale
              </a>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24 max-w-7xl">
          
          <motion.section variants={staggerContainer} initial="hidden" animate="show" className="text-center max-w-4xl mx-auto mb-20 lg:mb-32 relative z-10">
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2 bg-[#0a0a0a]/5 border border-cyan-500/30 rounded-sm px-4 py-1.5 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">US Provisional Patent (64/032,339)</span>
            </motion.div>
            
            <motion.h1 variants={staggerItem} className="text-3xl sm:text-5xl lg:text-7xl font-black font-display leading-[0.95] tracking-tighter mb-6 uppercase">
              The Architectural<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500 filter drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">Nexus</span>
            </motion.h1>
            
            <motion.p variants={staggerItem} className="text-lg lg:text-xl text-gray-300 font-sans font-light max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-md">
              The deterministic mother site of the DarkWave ecosystem. We build, scale, and secure sovereign intelligence networks.
            </motion.p>

            <motion.div variants={staggerItem} className="flex items-center justify-center gap-4">
               <a href="#core" className="btn-brutal bg-transparent text-white border border-white/20 backdrop-blur-md px-8 py-3.5 rounded-sm font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all">
                 Explore Platforms
               </a>
               <a href="https://dwtl.io/presale" target="_blank" className="btn-brutal bg-white text-black px-8 py-3.5 rounded-sm font-black text-sm uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all flex items-center gap-2">
                 Join Presale <ArrowRight className="w-4 h-4" />
               </a>
            </motion.div>
          </motion.section>

          <section id="core" className="mb-20 lg:mb-32 scroll-mt-32">
            <div className="flex flex-col lg:flex-row items-baseline justify-between mb-8 lg:mb-12 border-b border-white/5 pb-4">
              <h2 className="text-2xl lg:text-4xl font-black font-display tracking-tight">The Apex Predator Ecosystem</h2>
              <p className="text-muted-foreground text-sm lg:text-base font-medium mt-2 lg:mt-0">8 Core Platforms. 1 Unified Trust Layer.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {CORE_APPS.map((app, idx) => (
                <a href={app.url} target="_blank" key={idx} className="block group">
                  <div className="bg-[#0a0a0a] border border-white/[0.08] p-6 lg:p-8 h-full rounded-sm border border-white/5 transition-all hover:-translate-y-1 hover:bg-white/[0.05] hover:border-white/30">
                    <div className="w-12 h-12 rounded-sm bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/50 transition-colors">
                      <app.icon className="w-6 h-6 text-[#555] group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-[10px] font-bold text-[#666] uppercase tracking-widest mb-2">{app.tag}</div>
                    <h3 className="text-xl font-black mb-3 text-white font-display uppercase tracking-tight">{app.title}</h3>
                    <p className="text-sm text-[#555] leading-relaxed font-sans">{app.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="extended" className="mb-20 scroll-mt-32">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl lg:text-3xl font-black font-display tracking-tight">Extended Network</h2>
              <div className="flex items-center gap-2">
                <button onClick={prevProject} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextProject} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {visibleProjects().map((project, index) => (
                <a
                  href={project.url}
                  target="_blank"
                  key={`${project.id}-${currentProject}`}
                  className="group block [perspective:1000px]"
                >
                  <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-sm overflow-hidden border border-white/5 h-full transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:-translate-y-1 group-hover:rotate-x-2 group-hover:-rotate-y-2 relative">
                    <div className="w-full h-40 bg-[#050505] overflow-hidden border-b border-white/5">
                      <img 
                        src={project.image} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                        alt="Project visualization" 
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-black mb-2 text-white font-display uppercase tracking-tight">{project.title}</h3>
                      <p className="text-sm text-[#555] line-clamp-2 mb-4 font-sans">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-[10px] font-bold bg-[#0a0a0a]/5 border border-white/10 px-2.5 py-1 rounded-sm text-[#666] uppercase tracking-widest">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
