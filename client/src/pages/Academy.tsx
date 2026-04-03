import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/glass-card";
import { SEOHead, BreadcrumbSchema } from "@/components/SEOHead";
import Footer from "@/components/Footer";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  GraduationCap, Code2, Globe, Shield, Cpu, Smartphone, Layers, BookOpen,
  Award, Users, MessageSquare, Trophy, Zap, Terminal, Brain, Lock, Rocket,
  Star, ChevronRight, ChevronLeft, ExternalLink, ArrowRight, CheckCircle2,
  Clock, Blocks, FileCode2, Sparkles, Target, BadgeCheck, Languages, XCircle
} from "lucide-react";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const learningPaths = [
  { id: "lume", title: "Lume Programming", description: "Master the deterministic natural-language programming language from syntax basics to self-sustaining runtime architecture.", icon: Terminal, image: "/academy/lume-programming.png", courses: 8, hours: 40, level: "All Levels" },
  { id: "web-dev", title: "Web Development", description: "Full-stack web development with React, Node.js, and the DarkWave ecosystem toolchain.", icon: Globe, image: "/academy/web-dev.png", courses: 12, hours: 60, level: "All Levels" },
  { id: "blockchain", title: "Blockchain & Trust Layer", description: "Build on the DWSC chain — smart contracts, DeFi protocols, and Trust Layer architecture.", icon: Blocks, image: "/academy/blockchain.png", courses: 10, hours: 50, level: "Intermediate" },
  { id: "ai", title: "AI Integration", description: "Integrate GPT, vision models, voice synthesis, and autonomous agents into production apps.", icon: Brain, image: "/academy/ai-integration.png", courses: 9, hours: 45, level: "Intermediate" },
  { id: "mobile", title: "Mobile Development", description: "Cross-platform mobile apps with React Native, Expo SDK 54, and PWA deployment.", icon: Smartphone, image: "/academy/mobile-dev.png", courses: 7, hours: 35, level: "Intermediate" },
  { id: "security", title: "Security & Guardian AI", description: "AI agent certification, security scanning, and the Guardian Certification Program.", icon: Shield, image: "/academy/security.png", courses: 6, hours: 30, level: "Advanced" },
  { id: "natural-language", title: "Natural Language Programming", description: "Write code in plain English or any human language. Master intent resolution, voice-to-code, and multilingual compilation.", icon: Languages, image: "/academy/nlp.png", courses: 8, hours: 36, level: "All Levels" },
];

const featuredCourses = [
  { id: "lume-fundamentals", title: "Lume Fundamentals", description: "Learn the basics of Lume — variables, types, functions, and your first deterministic natural-language program.", level: "Beginner", duration: "6 hours", lessons: 24, path: "Lume Programming", icon: FileCode2, image: "/academy/lume-programming.png" },
  { id: "self-sustaining-apps", title: "Building Self-Sustaining Apps", description: "Harness the 4-layer runtime to create apps that monitor, heal, optimize, and evolve themselves.", level: "Advanced", duration: "8 hours", lessons: 32, path: "Lume Programming", icon: Cpu, image: "/academy/ai-integration.png" },
  { id: "trust-layer-sso", title: "Trust Layer SSO Integration", description: "Implement cross-app single sign-on using the Trust Layer identity protocol and TLID.", level: "Intermediate", duration: "4 hours", lessons: 16, path: "Blockchain & Trust Layer", icon: Lock, image: "/academy/blockchain.png" },
  { id: "ai-agent-dev", title: "AI Agent Development", description: "Build autonomous AI agents with GPT-5.2, voice synthesis, and real-time decision making.", level: "Advanced", duration: "10 hours", lessons: 40, path: "AI Integration", icon: Brain, image: "/academy/ai-integration.png" },
  { id: "guardian-certification", title: "Guardian AI Certification", description: "Prepare for and earn the Guardian AI certification — scan, certify, and protect AI agents.", level: "Advanced", duration: "6 hours", lessons: 24, path: "Security & Guardian AI", icon: BadgeCheck, image: "/academy/security.png" },
  { id: "widget-dev", title: "Widget Development", description: "Create embeddable Trust Layer widgets — from design to deployment on the Widget Marketplace.", level: "Intermediate", duration: "5 hours", lessons: 20, path: "Web Development", icon: Layers, image: "/academy/web-dev.png" },
  { id: "english-mode", title: "English Mode Programming", description: "Write full programs in plain English sentences. Learn pattern matching, intent resolution, and voice-to-code workflows.", level: "Beginner", duration: "7 hours", lessons: 28, path: "Natural Language Programming", icon: Languages, image: "/academy/nlp.png" },
];

const lumeCurriculum = [
  { tier: "Beginner", step: "01", topics: ["Syntax & Keywords", "Types & Variables", "Functions & Closures", "Control Flow", "Module System", "Standard Library"], description: "Start from zero. Learn Lume syntax, types, functions, and write your first deterministic natural-language programs." },
  { tier: "Intermediate", step: "02", topics: ["ask / think / generate Keywords", "Module & Package System", "Standard Library Deep Dive", "Error Handling Patterns", "Testing with lume test", "Interop with JavaScript"], description: "Master the AI keywords, build reusable modules, and integrate Lume with existing JS ecosystems." },
  { tier: "Advanced", step: "03", topics: ["Self-Sustaining Runtime", "Performance Optimization", "Self-Evolving Behaviors", "Compiler Internals", "Custom Toolchain Extensions", "Production Deployment"], description: "Unlock the full power of the 4-layer runtime — build apps that evolve and optimize autonomously." },
];

const ecosystemSkills = [
  { skill: "Trust Layer SSO", apps: ["Trust Hub", "TrustVault", "GarageBot", "Chronicles", "TrustHome"], icon: Lock },
  { skill: "Signal Chat Integration", apps: ["All Ecosystem Apps", "Custom Widgets", "Community Bots"], icon: MessageSquare },
  { skill: "Blockchain Hallmarks", apps: ["Trust Layer", "Guardian Shield", "DarkWave Studio", "TrustGen"], icon: Blocks },
  { skill: "Widget Development", apps: ["Trust Layer Hub", "PaintPros", "TradeWorks AI", "GarageBot"], icon: Layers },
  { skill: "AI Agent Building", apps: ["Guardian Scanner", "StrikeAgent", "Pulse", "TrustVault"], icon: Brain },
  { skill: "Lume Programming", apps: ["Lume Runtime", "TrustGen", "Bomber", "DarkWave Studio", "Academy"], icon: Terminal },
];

const certifications = [
  { title: "Lume Developer", description: "Certified proficiency in the Lume programming language and self-sustaining runtime.", icon: Terminal, tier: "Silver" },
  { title: "Trust Layer Architect", description: "Advanced certification in blockchain architecture, DeFi protocols, and ecosystem integration.", icon: Blocks, tier: "Gold" },
  { title: "Guardian AI Specialist", description: "Elite certification for AI agent security, scanning, and the Guardian Certification Program.", icon: Shield, tier: "Platinum" },
  { title: "Full-Stack Ecosystem", description: "Master certification covering all tracks — the highest achievement in DarkWave Academy.", icon: Trophy, tier: "Diamond" },
  { title: "Natural Language Developer", description: "Certified in English Mode, multilingual compilation, voice-to-code, and intent resolution.", icon: Languages, tier: "CNLD" },
];

const stats = [
  { label: "Courses", value: "60+", icon: BookOpen },
  { label: "Learning Hours", value: "296+", icon: Clock },
  { label: "Certification Tracks", value: "5", icon: Award },
  { label: "Ecosystem Apps", value: "38+", icon: Rocket },
];

/* ═══════════════════════════════════════════
   CAROUSEL COMPONENT
   ═══════════════════════════════════════════ */

function useCarousel(itemCount: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scroll = useCallback((dir: "left" | "right") => {
    if (!ref.current) return;
    const cardW = ref.current.querySelector<HTMLElement>("[data-card]")?.offsetWidth || 320;
    const gap = 24;
    ref.current.scrollBy({ left: dir === "left" ? -(cardW + gap) : cardW + gap, behavior: "smooth" });
  }, []);

  const onScroll = useCallback(() => {
    if (!ref.current) return;
    const cardW = ref.current.querySelector<HTMLElement>("[data-card]")?.offsetWidth || 320;
    setIndex(Math.round(ref.current.scrollLeft / (cardW + 24)));
  }, []);

  return { ref, index, scroll, onScroll, itemCount };
}

function CarouselControls({ index, itemCount, scroll }: { index: number; itemCount: number; scroll: (d: "left" | "right") => void }) {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <button
        className="w-11 h-11 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
        onClick={() => scroll("left")}
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]" : "w-1.5 bg-white/15"}`}
          />
        ))}
      </div>
      <button
        className="w-11 h-11 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
        onClick={() => scroll("right")}
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LEVEL BADGE
   ═══════════════════════════════════════════ */

function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Intermediate: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    Advanced: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${colors[level] || "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"}`}>
      {level}
    </span>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function Academy() {
  const pathsCarousel = useCarousel(learningPaths.length);
  const coursesCarousel = useCarousel(featuredCourses.length);
  const certsCarousel = useCarousel(certifications.length);
  const skillsCarousel = useCarousel(ecosystemSkills.length);

  // Subscription Logic
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeCompany, setSubscribeCompany] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (data: { plan: string; email: string; companyName: string }) => {
      const res = await fetch("/api/marketing/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success && data.url) { window.location.href = data.url; }
      else { toast({ title: "Checkout failed", description: data.error, variant: "destructive" }); }
    }
  });

  const handleSubscribe = (plan: string) => { setSelectedPlan(plan); setShowSubscribe(true); };
  const handleCheckout = () => {
    if (!subscribeEmail.trim()) { toast({ title: "Email required", description: "Please enter your email", variant: "destructive" }); return; }
    subscribeMutation.mutate({ plan: selectedPlan, email: subscribeEmail, companyName: subscribeCompany });
  };

  return (
    <div className="min-h-screen bg-[#06060a] text-white overflow-x-hidden">
      <SEOHead
        title="DarkWave Academy"
        description="The Learning & Building Nexus of the Trust Layer ecosystem. Master Lume programming, blockchain development, AI integration, and earn verified certifications."
        keywords="DarkWave Academy, Lume programming, blockchain courses, AI development, Trust Layer certification"
        url="https://darkwavestudios.io/academy"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://darkwavestudios.io" },
        { name: "Academy", url: "https://darkwavestudios.io/academy" }
      ]} />

      {/* ═══ Sticky Header ═══ */}
      <header className="sticky top-0 z-50 bg-[#06060a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors"><ChevronLeft className="w-5 h-5" /></Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: "Inter, sans-serif" }}>Academy</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/lume" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-gray-300 hover:text-white">
              <Terminal className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Lume</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ═══ CINEMATIC HERO ═══ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/academy/hero-bg.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06060a]/50 via-[#06060a]/40 to-[#06060a] " />
        </div>

        {/* Ambient Orbs */}
        <motion.div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)" }} animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)" }} animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pt-20 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300/80 font-medium">academy.tlid.io</span>
            </div>
          </motion.div>

          <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">DarkWave</span>
            <br />
            <span className="text-white">Academy</span>
          </motion.h1>

          <motion.p className="text-xl md:text-2xl text-cyan-200/50 font-light mb-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            The Learning & Building Nexus
          </motion.p>
          <motion.p className="text-base md:text-lg text-white/35 max-w-2xl mx-auto mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            Master Lume programming, blockchain architecture, AI integration, and full-stack development. Earn Trust Layer verified certifications with blockchain-hallmarked completion badges.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <a href="#paths" className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Rocket className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Start Learning</span>
            </a>
            <a href="#courses" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <BookOpen className="w-4 h-4" /> Browse Courses
            </a>
          </motion.div>

          {/* Stats Ticker */}
          <motion.div className="flex flex-wrap items-center justify-center gap-3 sm:gap-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && <div className="w-px h-8 bg-white/10 mx-4 sm:mx-6 hidden sm:block" />}
                <div className="flex flex-col items-center px-4">
                  <stat.icon className="w-4 h-4 text-cyan-400/60 mb-1" />
                  <span className="text-xl sm:text-2xl font-bold font-mono bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">{stat.value}</span>
                  <span className="text-[11px] text-white/30 uppercase tracking-wider">{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ LEARNING PATHS CAROUSEL ═══ */}
      <section id="paths" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Learning Paths</span>
            </h2>
            <p className="text-white/35 max-w-2xl mx-auto">
              Choose your track and progress from fundamentals to mastery. Each path is designed to unlock real capabilities across the ecosystem.
            </p>
          </motion.div>
        </div>

        <div
          ref={pathsCarousel.ref}
          onScroll={pathsCarousel.onScroll}
          className="flex gap-6 overflow-x-auto scroll-snap-x-mandatory px-[5vw] pb-4 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {learningPaths.map((path) => (
            <div
              key={path.id}
              data-card
              className="flex-shrink-0 w-[320px] sm:w-[380px] lg:w-[420px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[rgba(12,18,36,0.65)] backdrop-blur-2xl group cursor-pointer transition-all duration-500 hover:border-cyan-500/25 hover:shadow-[0_0_50px_rgba(6,182,212,0.1)]"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${path.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,18,36,0.95)] via-[rgba(12,18,36,0.3)] to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <path.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <LevelBadge level={path.level} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-300 transition-colors">{path.title}</h3>
                <p className="text-white/35 text-sm mb-5 leading-relaxed line-clamp-2">{path.description}</p>
                <div className="flex items-center gap-4 text-xs text-white/25">
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {path.courses} courses</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {path.hours}h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CarouselControls index={pathsCarousel.index} itemCount={learningPaths.length} scroll={pathsCarousel.scroll} />
      </section>

      {/* ═══ FEATURED COURSES CAROUSEL ═══ */}
      <section id="courses" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">Featured Courses</span>
            </h2>
            <p className="text-white/35 max-w-2xl mx-auto">
              Hands-on, project-based courses designed by ecosystem builders. Learn by building real features for real apps.
            </p>
          </motion.div>
        </div>

        <div
          ref={coursesCarousel.ref}
          onScroll={coursesCarousel.onScroll}
          className="flex gap-6 overflow-x-auto px-[5vw] pb-4 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              data-card
              className="flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[400px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[rgba(12,18,36,0.65)] backdrop-blur-2xl group cursor-pointer transition-all duration-500 hover:border-cyan-500/25 hover:shadow-[0_0_50px_rgba(6,182,212,0.1)]"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Image Header */}
              <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${course.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,18,36,0.95)] via-[rgba(12,18,36,0.2)] to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <course.icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-[10px] text-cyan-400/70 font-medium uppercase tracking-wider">{course.path}</span>
                  </div>
                  <LevelBadge level={course.level} />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-base font-semibold mb-2 group-hover:text-cyan-300 transition-colors">{course.title}</h3>
                <p className="text-white/35 text-sm mb-4 leading-relaxed line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-4 text-xs text-white/25">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {course.lessons} lessons</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CarouselControls index={coursesCarousel.index} itemCount={featuredCourses.length} scroll={coursesCarousel.scroll} />
      </section>

      {/* ═══ LUME CURRICULUM — 3-Column Bento ═══ */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Ecosystem Language</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">Lume Learning Path</span>
            </h2>
            <p className="text-white/35 max-w-2xl mx-auto">
              Lume is the native programming language of the DarkWave ecosystem. This dedicated curriculum takes you from first line to production deployment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {lumeCurriculum.map((tier, index) => (
              <motion.div key={tier.tier} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="h-full">
                <GlassCard glow className="p-6 h-full relative overflow-hidden">
                  {/* Step Number Watermark */}
                  <div className="absolute -top-2 -right-2 text-[100px] font-black text-white/[0.02] leading-none select-none pointer-events-none">{tier.step}</div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-black">{tier.step}</span>
                      </div>
                      <span className="text-sm font-bold text-white">{tier.tier}</span>
                    </div>
                    <p className="text-white/40 text-sm mb-6 leading-relaxed">{tier.description}</p>
                    <ul className="space-y-3">
                      {tier.topics.map((topic) => (
                        <li key={topic} className="flex items-center gap-3 text-sm text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Lume Stats Row */}
          <motion.div className="mt-10 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-0 px-6 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              {[{ v: "316", l: "tests", c: "text-cyan-400" }, { v: "12,215", l: "LOC", c: "text-teal-400" }, { v: "90%", l: "less code", c: "text-sky-400" }].map((s, i) => (
                <div key={s.l} className="flex items-center">
                  {i > 0 && <div className="w-px h-4 bg-white/10 mx-4 hidden sm:block" />}
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className={`font-mono ${s.c}`}>{s.v}</span>
                    <span className="text-white/35">{s.l}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ECOSYSTEM SKILLS CAROUSEL ═══ */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">Ecosystem Skills</span>
            </h2>
            <p className="text-white/35 max-w-2xl mx-auto">
              Every course unlocks real capabilities across the ecosystem. See which skills power which apps.
            </p>
          </motion.div>
        </div>

        <div
          ref={skillsCarousel.ref}
          onScroll={skillsCarousel.onScroll}
          className="flex gap-6 overflow-x-auto px-[5vw] pb-4 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {ecosystemSkills.map((skill) => (
            <div
              key={skill.skill}
              data-card
              className="flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[rgba(12,18,36,0.65)] backdrop-blur-2xl p-6 group transition-all duration-500 hover:border-cyan-500/25 hover:shadow-[0_0_40px_rgba(6,182,212,0.08)]"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <skill.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-sm font-semibold group-hover:text-cyan-300 transition-colors">{skill.skill}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skill.apps.map((app) => (
                  <span key={app} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/[0.06] text-[11px] text-white/45 font-medium">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <CarouselControls index={skillsCarousel.index} itemCount={ecosystemSkills.length} scroll={skillsCarousel.scroll} />
      </section>

      {/* ═══ CERTIFICATIONS CAROUSEL ═══ */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Certification & Badges</span>
            </h2>
            <p className="text-white/35 max-w-2xl mx-auto">
              Earn Trust Layer verified certifications with blockchain-hallmarked completion badges. Every credential is permanently recorded on-chain.
            </p>
          </motion.div>
        </div>

        <div
          ref={certsCarousel.ref}
          onScroll={certsCarousel.onScroll}
          className="flex gap-6 overflow-x-auto px-[5vw] pb-4 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {certifications.map((cert) => (
            <div
              key={cert.title}
              data-card
              className="flex-shrink-0 w-[240px] sm:w-[260px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[rgba(12,18,36,0.65)] backdrop-blur-2xl p-6 text-center group transition-all duration-500 hover:border-cyan-500/25 hover:shadow-[0_0_50px_rgba(6,182,212,0.12)]"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Icon Ring */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/15 flex items-center justify-center mx-auto mb-4 group-hover:border-cyan-500/30 transition-colors">
                <cert.icon className="w-7 h-7 text-cyan-400" />
              </div>
              <div className="inline-flex px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/15 to-teal-500/15 border border-cyan-500/20 mb-3">
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">{cert.tier}</span>
              </div>
              <h3 className="text-sm font-semibold mb-2">{cert.title}</h3>
              <p className="text-white/35 text-xs leading-relaxed mb-4">{cert.description}</p>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-cyan-400/50">
                <Blocks className="w-3 h-3" />
                <span>Blockchain Verified</span>
              </div>
            </div>
          ))}
        </div>
        <CarouselControls index={certsCarousel.index} itemCount={certifications.length} scroll={certsCarousel.scroll} />
      </section>

      {/* ═══ COMMUNITY — 3-Column Bento (naturally fits) ═══ */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">Community</span>
            </h2>
            <p className="text-white/35 max-w-2xl mx-auto">
              Learning is better together. Join study groups, connect with mentors, and get real-time help in the #academy-support channel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, title: "Signal Chat", desc: "Real-time support in the #academy-support channel. Ask questions, share progress, get instant feedback from mentors.", meta: "Active community", metaIcon: Users },
              { icon: Users, title: "Study Groups", desc: "Join cohort-based study groups organized by learning path. Weekly meetups, pair programming, and collaborative projects.", meta: "Cohort-based learning", metaIcon: Sparkles },
              { icon: Star, title: "Mentorship", desc: "Connect with experienced ecosystem developers for 1-on-1 guidance. Code reviews, career advice, and project mentoring.", meta: "1-on-1 mentoring", metaIcon: Target },
            ].map((item) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <GlassCard glow className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/35 text-sm mb-4 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-white/25">
                    <item.metaIcon className="w-3.5 h-3.5" />
                    <span>{item.meta}</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING — 3-Column Bento ═══ */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Ecosystem Access</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">Invest in Your Skills</span>
            </h2>
            <p className="text-white/35 max-w-2xl mx-auto">
              Get full access to the Trust Academy curriculum, take proctor exams, and become a Certified Developer in the native Trust Layer ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Apprentice */}
            <GlassCard className="p-8 text-center flex flex-col h-full">
              <h3 className="text-lg font-semibold mb-2">Lume Apprentice</h3>
              <p className="text-4xl font-bold mb-1">$0<span className="text-sm text-white/30">/mo</span></p>
              <p className="text-sm text-white/30 mb-6">Perfect for beginners</p>
              <ul className="text-sm text-left space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-white/30 mt-0.5 shrink-0" /> <span className="text-white/50">Access to Web Dev 101</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-white/30 mt-0.5 shrink-0" /> <span className="text-white/50">Lume Syntax Fundamentals</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-white/30 mt-0.5 shrink-0" /> <span className="text-white/50">Read-only Signal Chat access</span></li>
                <li className="flex items-start gap-3 opacity-40"><XCircle className="w-5 h-5 text-red-400/60 mt-0.5 shrink-0" /> <span className="text-white/30">No Certification Exams</span></li>
                <li className="flex items-start gap-3 opacity-40"><XCircle className="w-5 h-5 text-red-400/60 mt-0.5 shrink-0" /> <span className="text-white/30">No AI Playground</span></li>
              </ul>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = "/lume"}>Start Reading</Button>
            </GlassCard>

            {/* Pro Builder */}
            <GlassCard glow className="p-8 text-center flex flex-col h-full relative border-cyan-500/30">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-black text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg shadow-cyan-500/20 relative overflow-hidden">
                  <span className="relative z-10">Most Popular</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_3s_infinite]" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-cyan-50">Pro Builder</h3>
              <p className="text-4xl font-bold mb-1 text-white">$49<span className="text-sm text-cyan-200/40">/mo</span></p>
              <p className="text-sm text-cyan-200/50 mb-6">For serious Lume developers</p>
              <ul className="text-sm text-left space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" /> <span className="text-white/80">All 60+ Advanced Courses</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" /> <span className="text-white/80">Trust Layer Architecture Guides</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" /> <span className="text-white/80">AI Content Generator Limits</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" /> <span className="text-white/80">Full Signal Chat Support</span></li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-black hover:opacity-90 font-semibold" onClick={() => handleSubscribe("pro-builder")}>Subscribe Now</Button>
            </GlassCard>

            {/* Partner */}
            <GlassCard className="p-8 text-center flex flex-col h-full">
              <h3 className="text-lg font-semibold mb-2">Certified Partner</h3>
              <p className="text-4xl font-bold mb-1">$199<span className="text-sm text-white/30">/mo</span></p>
              <p className="text-sm text-white/30 mb-6">Agencies & Guardian Specialists</p>
              <ul className="text-sm text-left space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" /> <span className="text-white/80">Everything in Pro</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" /> <span className="text-white/80">Unlimited Proctor Exams</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" /> <span className="text-white/80">On-chain Hallmarked Certifications</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" /> <span className="text-white/80">1-on-1 Mentorship</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" /> <span className="text-white/80">VIP Direct Line Support</span></li>
              </ul>
              <Button variant="outline" className="w-full border-teal-500/30 hover:bg-teal-500/10" onClick={() => handleSubscribe("certified-partner")}>Become a Partner</Button>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <GlassCard glow className="p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 pointer-events-none" />

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10">
              <GraduationCap className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start Your <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Learning Journey</span>
              </h2>
              <p className="text-white/35 max-w-xl mx-auto mb-8">
                Join DarkWave Academy and gain the skills to build, deploy, and scale across the entire Trust Layer ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#paths" className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Rocket className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Enroll Now</span>
                </a>
                <Link href="/lume" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <Terminal className="w-4 h-4" /> Explore Lume
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/25">
                <a href="https://academy.tlid.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                  <ExternalLink className="w-3 h-3" /> academy.tlid.io
                </a>
                <Link href="/explore" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                  <ArrowRight className="w-3 h-3" /> Browse Ecosystem
                </Link>
              </div>
            </motion.div>
          </GlassCard>
        </div>
      </section>

      {/* Subscription Dialog */}
      <Dialog open={showSubscribe} onOpenChange={setShowSubscribe}>
        <DialogContent className="glass-card border-white/10">
          <DialogHeader>
            <DialogTitle>Enroll in {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/40 mb-2 block">Email</label>
              <Input type="email" value={subscribeEmail} onChange={(e) => setSubscribeEmail(e.target.value)} placeholder="developer@ecosystem.io" />
            </div>
            <div>
              <label className="text-sm text-white/40 mb-2 block">Company / Agency (Optional)</label>
              <Input value={subscribeCompany} onChange={(e) => setSubscribeCompany(e.target.value)} placeholder="DarkWave Partner" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubscribe(false)}>Cancel</Button>
            <Button onClick={handleCheckout} disabled={!subscribeEmail.trim() || subscribeMutation.isPending}>
              {subscribeMutation.isPending ? "Loading..." : "Secure Checkout"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
