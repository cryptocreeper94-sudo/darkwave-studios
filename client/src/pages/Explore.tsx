import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/glass-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Home, Sparkles, TrendingUp, Mail, Store, Layers,
  FileText, Globe, BarChart3, Boxes, Terminal, Shield,
  Search, Zap, Radio, MessageSquare, Newspaper, Eye,
  FolderOpen, Lock, Calendar, Compass, ChevronRight, Unlock, Command,
  Code2, Database, Cpu, Rocket, BookOpen
} from "lucide-react";

interface LaunchCard {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  image: string;
  glowColor: string;
  badge?: string;
  featured?: boolean;
}

interface ExploreCategory {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  description: string;
  cards: LaunchCard[];
}

// Rotating color accents for card image overlays — breaks the strict grayscale monotony
const ACCENT_COLORS = [
  "rgba(6,182,212,0.12)",    // cyan
  "rgba(168,85,247,0.12)",   // purple
  "rgba(245,158,11,0.12)",   // amber
  "rgba(16,185,129,0.12)",   // emerald
  "rgba(244,63,94,0.12)",    // rose
  "rgba(59,130,246,0.12)",   // blue
  "rgba(234,179,8,0.12)",    // yellow
  "rgba(99,102,241,0.12)",   // indigo
];

const categories: ExploreCategory[] = [
  {
    title: "Home & About",
    icon: <Home className="size-4" />,
    gradient: "from-cyan-500 to-blue-500",
    description: "Start here. Visit the main site, learn about the mission, see who's behind DarkWave Studios, or get in touch with the team directly.",
    cards: [
      {
        label: "Homepage",
        description: "The main site — services, portfolio, and more",
        href: "/home",
        icon: <Home className="size-5" />,
        image: "/command/homepage.png",
        glowColor: "shadow-[0_10px_30px_rgba(255,255,255,0.05)]",
        badge: "Start Here",
        featured: true,
      },
      {
        label: "Mission",
        description: "What drives us and where we're heading",
        href: "/mission",
        icon: <Sparkles className="size-5" />,
        image: "/command/mission.png",
        glowColor: "shadow-indigo-500/20",
      },
      {
        label: "Investors",
        description: "Equity information and growth trajectory",
        href: "/investors",
        icon: <TrendingUp className="size-5" />,
        image: "/command/investors.png",
        glowColor: "shadow-emerald-500/20",
      },
      {
        label: "Contact Us",
        description: "Reach out — tell us about your project",
        href: "/contact",
        icon: <Mail className="size-5" />,
        image: "/command/contact.png",
        glowColor: "shadow-blue-500/20",
      },
    ],
  },
  {
    title: "Services",
    icon: <Store className="size-4" />,
    gradient: "from-sky-500 to-pink-500",
    description: "See what we build and what it costs. Compare plans, request a custom quote, or book a free consultation call to discuss your project.",
    cards: [
      {
        label: "Services & Pricing",
        description: "Starter, Growth, and Enterprise packages",
        href: "/services",
        icon: <Store className="size-5" />,
        image: "/command/services.png",
        glowColor: "shadow-[0_10px_30px_rgba(255,255,255,0.05)]",
        featured: true,
      },
      {
        label: "Compare Plans",
        description: "Side-by-side feature comparison across tiers",
        href: "/compare",
        icon: <Layers className="size-5" />,
        image: "/command/compare.png",
        glowColor: "shadow-[0_10px_30px_rgba(255,255,255,0.05)]",
      },
      {
        label: "Get a Quote",
        description: "Tell us what you need — we'll estimate the cost",
        href: "/quote",
        icon: <FileText className="size-5" />,
        image: "/command/quotes.png",
        glowColor: "shadow-amber-500/20",
      },
      {
        label: "Book a Call",
        description: "Schedule a free consultation to talk through your project",
        href: "/book",
        icon: <Calendar className="size-5" />,
        image: "/command/book-call.png",
        glowColor: "shadow-emerald-500/20",
        badge: "Free",
      },
    ],
  },
  {
    title: "Platform & Ecosystem",
    icon: <Globe className="size-4" />,
    gradient: "from-emerald-500 to-teal-500",
    description: "Explore the full Trust Layer ecosystem — 42 interconnected apps, a portfolio of live projects, and detailed codebase metrics across 29.2M+ lines of code.",
    cards: [
      {
        label: "Ecosystem",
        description: "All 42 connected applications in one view",
        href: "/ecosystem",
        icon: <Globe className="size-5" />,
        image: "/command/ecosystem.png",
        glowColor: "shadow-indigo-500/20",
        badge: "42 Apps",
        featured: true,
      },
      {
        label: "Projects",
        description: "Portfolio of live sites and applications we've built",
        href: "/projects",
        icon: <FolderOpen className="size-5" />,
        image: "/command/projects.png",
        glowColor: "shadow-[0_10px_30px_rgba(255,255,255,0.05)]",
      },
      {
        label: "Ecosystem Metrics",
        description: "Codebase stats — line counts, tech stacks, breakdowns",
        href: "/metrics",
        icon: <BarChart3 className="size-5" />,
        image: "/command/metrics.png",
        glowColor: "shadow-[0_10px_30px_rgba(255,255,255,0.05)]",
        badge: "Stats",
      },
    ],
  },
  {
    title: "Tools & Widgets",
    icon: <Boxes className="size-4" />,
    gradient: "from-amber-500 to-orange-500",
    description: "Access free tools and the widget marketplace. Run a website audit, scan AI agents for security, browse 102 embeddable widgets, or explore the developer API.",
    cards: [
      {
        label: "Trust Layer Hub",
        description: "102 embeddable widgets with live previews and pricing",
        href: "/hub",
        icon: <Boxes className="size-5" />,
        image: "/command/trust-hub.png",
        glowColor: "shadow-amber-500/20",
        badge: "102 Widgets",
        featured: true,
      },
      {
        label: "Website Audit",
        description: "Free SEO and performance scan for any website",
        href: "/audit",
        icon: <Search className="size-5" />,
        image: "/command/website-audit.png",
        glowColor: "shadow-blue-500/20",
        badge: "Free",
      },
      {
        label: "Guardian AI",
        description: "AI agent security scanner and certification",
        href: "/guardian-ai",
        icon: <Shield className="size-5" />,
        image: "/command/guardian-ai.png",
        glowColor: "shadow-red-500/20",
        badge: "Security",
      },
      {
        label: "AI Credits",
        description: "Purchase credits for AI-powered features",
        href: "/credits",
        icon: <Zap className="size-5" />,
        image: "/command/ai-credits.png",
        glowColor: "shadow-yellow-500/20",
      },
      {
        label: "Developer Tools",
        description: "Pulse API docs, publications directory, and resources",
        href: "/developers",
        icon: <Terminal className="size-5" />,
        image: "/command/developers.png",
        glowColor: "shadow-green-500/20",
      },
      {
        label: "Lume Language",
        description: "The deterministic natural-language programming language — ask/think/generate as syntax",
        href: "/lume",
        icon: <Code2 className="size-5" />,
        image: "/command/developers.png",
        glowColor: "shadow-[0_10px_30px_rgba(255,255,255,0.05)]",
        badge: "New",
        featured: true,
      },
      {
        label: "DarkWave Academy",
        description: "The learning & building nexus — courses, certifications, Lume curriculum",
        href: "/academy",
        icon: <BookOpen className="size-5" />,
        image: "/command/developers.png",
        glowColor: "shadow-teal-500/20",
        badge: "Learn",
      },
    ],
  },
  {
    title: "Community",
    icon: <Radio className="size-4" />,
    gradient: "from-cyan-500 to-sky-500",
    description: "Join the conversation. Chat in real-time, read the latest blog posts, get support, browse resources, or create in the media studio.",
    cards: [
      {
        label: "ChronoChat",
        description: "Real-time community chat with channels",
        href: "/chat",
        icon: <Radio className="size-5" />,
        image: "/command/signal-chat.png",
        glowColor: "shadow-[0_10px_30px_rgba(255,255,255,0.05)]",
        badge: "Live",
        featured: true,
      },
      {
        label: "Blog",
        description: "Articles on web development, AI, and tech",
        href: "/blog",
        icon: <Newspaper className="size-5" />,
        image: "/command/blog-public.png",
        glowColor: "shadow-[0_10px_30px_rgba(255,255,255,0.05)]",
      },
      {
        label: "Support Center",
        description: "FAQ, help articles, and contact options",
        href: "/support",
        icon: <MessageSquare className="size-5" />,
        image: "/command/support.png",
        glowColor: "shadow-[0_10px_30px_rgba(255,255,255,0.05)]",
      },
      {
        label: "Resources",
        description: "Guides, templates, and educational downloads",
        href: "/resources",
        icon: <FolderOpen className="size-5" />,
        image: "/command/resources.png",
        glowColor: "shadow-[0_10px_30px_rgba(255,255,255,0.05)]",
      },
      {
        label: "Axiom42 Suite Studio",
        description: "Media editor — images, audio, video, and merges",
        href: "/studio",
        icon: <Eye className="size-5" />,
        image: "/command/studio.png",
        glowColor: "shadow-pink-500/20",
        badge: "Studio",
      },
    ],
  },
  {
    title: "Legal",
    icon: <FileText className="size-4" />,
    gradient: "from-slate-400 to-gray-500",
    description: "Transparency matters. Review our terms, privacy practices, and affiliate disclosures.",
    cards: [
      {
        label: "Terms of Service",
        description: "Platform terms and conditions",
        href: "/terms",
        icon: <FileText className="size-5" />,
        image: "/command/terms.png",
        glowColor: "shadow-gray-500/20",
      },
      {
        label: "Privacy Policy",
        description: "How we handle and protect your data",
        href: "/privacy",
        icon: <Lock className="size-5" />,
        image: "/command/privacy.png",
        glowColor: "shadow-gray-500/20",
      },
      {
        label: "Affiliate Disclosure",
        description: "FTC-compliant partnership and affiliate information",
        href: "/affiliate-disclosure",
        icon: <FileText className="size-5" />,
        image: "/command/affiliate.png",
        glowColor: "shadow-amber-500/20",
      },
    ],
  },
];

function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/80 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse" />
            <div className="w-36 h-6 rounded-lg bg-white/5 animate-pulse" />
          </div>
          <div className="w-28 h-9 rounded-lg bg-white/5 animate-pulse" />
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse" />
              <div className="space-y-2">
                <div className="w-32 h-5 rounded bg-white/5 animate-pulse" />
                <div className="w-72 h-3 rounded bg-white/5 animate-pulse" />
              </div>
            </div>
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="min-w-[280px] h-[220px] rounded-2xl bg-white/[0.03] animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExploreCard({ card, index, globalIndex }: { card: LaunchCard; index: number; globalIndex: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const accent = ACCENT_COLORS[globalIndex % ACCENT_COLORS.length];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2 + 10}px 30px rgba(255,255,255,0.05)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={card.href}
        data-testid={`explore-link-${card.href.replace(/\//g, "-").slice(1) || "home"}`}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative rounded-[4px] overflow-hidden cursor-pointer border border-white/[0.08] bg-[#0a0a0a] flex flex-col transition-[transform,box-shadow] duration-100 ease-out will-change-transform"
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.5)', transformStyle: 'preserve-3d' }}
          data-testid={`explore-card-${card.href.replace(/\//g, "-").slice(1) || "home"}`}
        >
          {/* Card Image — grayscale base + per-card color accent */}
          <div className="relative w-full h-[200px] lg:h-[250px] overflow-hidden border-b border-white/[0.08]" style={{ pointerEvents: 'none' }}>
            <img
              src={card.image}
              alt={card.label}
              className="w-full h-full object-cover grayscale contrast-[1.1] group-hover:grayscale-0 transition-[filter] duration-500"
              loading="lazy"
              draggable={false}
            />
            {/* Color accent overlay */}
            <div className="absolute inset-0" style={{ backgroundColor: accent, mixBlendMode: 'color' }} />
          </div>

          {/* Card Content */}
          <div className="p-6 lg:p-8 flex flex-col flex-grow justify-between" style={{ pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,1) 100%)' }}>
            <div>
              {card.badge && (
                <span className="inline-block text-[10px] font-bold px-2.5 py-1 mb-3 rounded-[2px] bg-white/5 border border-white/10 text-gray-500 uppercase tracking-widest">
                  {card.badge}
                </span>
              )}
              <h3 className="font-display font-[800] text-xl lg:text-2xl text-white uppercase tracking-tight mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }} data-testid={`explore-label-${card.href.replace(/\//g, "-").slice(1) || "home"}`}>
                {card.label}
              </h3>
              <p className="text-sm lg:text-base text-[#888] leading-relaxed line-clamp-3 font-sans">
                {card.description}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm text-[#888] font-display font-[800] uppercase tracking-[0.1em] group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
              <span>Explore</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Track cumulative card index for unique accent colors
let globalCardCounter = 0;

function CategoryCarousel({ category, catIndex }: { category: ExploreCategory; catIndex: number }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<any>(null);
  const baseIndex = useRef(globalCardCounter);

  useEffect(() => {
    globalCardCounter += category.cards.length;
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentSlide(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => { api.off("select", onSelect); };
  }, [api]);

  return (
    <section
      className="py-16 lg:py-24 border-b border-white/[0.08] last:border-b-0"
    >
      <div className="mb-6 lg:mb-8 text-center">
        <h2 className="text-sm font-display font-[800] text-[#888] uppercase tracking-[0.2em] mb-3">{category.title}</h2>
        <h3 className="text-2xl lg:text-4xl font-display font-[900] text-white uppercase tracking-[-0.03em] leading-[1.1]">{category.description}</h3>
      </div>

      <div className="mt-8">
        <Carousel
          opts={{ align: "start", loop: true, dragFree: false, skipSnaps: false }}
          setApi={setApi}
          className="w-full touch-pan-y"
        >
          <CarouselContent className="-ml-6">
            {category.cards.map((card, cardIndex) => (
              <CarouselItem key={card.href} className="pl-6 basis-[85%] md:basis-1/2 lg:basis-1/3">
                <ExploreCard card={card} index={cardIndex} globalIndex={baseIndex.current + cardIndex} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {category.cards.length > 1 && (
            <>
              <CarouselPrevious className="-left-2 lg:-left-5 top-1/2 w-12 h-12 rounded-full bg-transparent border border-white/10 text-[#888] hover:bg-white hover:text-black hover:border-white transition-all" />
              <CarouselNext className="-right-2 lg:-right-5 top-1/2 w-12 h-12 rounded-full bg-transparent border border-white/10 text-[#888] hover:bg-white hover:text-black hover:border-white transition-all" />
            </>
          )}
        </Carousel>
        {category.cards.length > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            {category.cards.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "w-3 h-3 bg-white scale-150"
                    : "w-2 h-2 bg-white/10 hover:bg-white/30"
                }`}
                data-testid={`dot-${category.title.toLowerCase().replace(/\s/g, "-")}-${i}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const ADMIN_KEY = "0424";

export default function Explore() {
  const [loading, setLoading] = useState(true);
  const [showDevLogin, setShowDevLogin] = useState(false);
  const [devPassword, setDevPassword] = useState("");
  const [devError, setDevError] = useState(false);
  const [, setLocation] = useLocation();

  const handleDevLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (devPassword === ADMIN_KEY) {
      sessionStorage.setItem("dw_command_auth", "true");
      setLocation("/command");
    } else {
      setDevError(true);
      setTimeout(() => setDevError(false), 2000);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  const totalDestinations = categories.reduce((sum, cat) => sum + cat.cards.length, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-background pointer-events-none z-[-20]" />
      <div className="fixed inset-0 bg-[#050505]/80 pointer-events-none z-[-10]" />

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/90 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-lg lg:text-xl font-bold text-white">Explore</span>
              <p className="text-[10px] text-white/40 -mt-0.5 hidden lg:block">{totalDestinations} destinations &middot; {categories.length} categories</p>
            </div>
          </div>
          <Link
            href="/home"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm text-white/70 hover:text-white"
            data-testid="explore-go-home"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>
      </header>

      {/* Film Grain Noise */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Hero Section — CSS Ken Burns */}
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-0 animate-[kenburns_24s_infinite]" style={{ backgroundImage: "url('/assets/brutalist/hero_bg_1.png')" }} />
        <div className="absolute inset-0 bg-cover bg-center opacity-0 animate-[kenburns_24s_infinite_8s]" style={{ backgroundImage: "url('/assets/brutalist/hero_bg_2.png')", animationDelay: '8s' }} />
        <div className="absolute inset-0 bg-cover bg-center opacity-0 animate-[kenburns_24s_infinite_16s]" style={{ backgroundImage: "url('/assets/brutalist/hero_bg_3.png')", animationDelay: '16s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 to-[#050505] z-[2]" />

        <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] relative z-10 text-center">
          <h1 className="font-display font-[900] uppercase tracking-[-0.03em] leading-[0.95] mb-6" style={{ fontSize: 'clamp(1.5rem, 5vw, 5rem)', textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            The Architectural<br />
            <span className="text-[#888]">Nexus.</span>
          </h1>
          <p className="text-lg lg:text-xl text-[#888] font-sans max-w-[800px] mx-auto mb-12">
            {totalDestinations} destinations across {categories.length} categories. Everything DarkWave Studios has to offer — one click away.
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Link href="/home" className="inline-block bg-transparent text-white border border-white/20 backdrop-blur-md px-12 py-4 font-display text-lg font-[800] uppercase tracking-[0.05em] rounded-[2px] hover:bg-white hover:text-[#050505] hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all duration-300">
              Enter The Core
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-8">

        {/* Metrics Bar */}
        <div className="py-16 lg:py-24 border-b border-white/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Rocket className="w-5 h-5" />, value: "42", label: "Live Apps" },
              { icon: <Code2 className="w-5 h-5" />, value: "29.2M+", label: "Lines of Code" },
              { icon: <Boxes className="w-5 h-5" />, value: "102", label: "Widgets" },
              { icon: <Database className="w-5 h-5" />, value: "2,500+", label: "API Endpoints" },
            ].map((stat, i) => (
              <div key={stat.label} className="bg-[#0a0a0a] border border-white/[0.08] rounded-[4px] p-6 lg:p-8 text-center">
                <div className="text-3xl lg:text-4xl font-[900] font-display text-white mb-1 tracking-tighter" data-testid={`explore-stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-[#888] font-display font-[800] uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {categories.map((category, catIndex) => (
            <CategoryCarousel key={category.title} category={category} catIndex={catIndex} />
          ))}
        </div>

        {/* Footer — Invariant standard */}
        <footer className="py-16 border-t border-white/[0.08] mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="font-display font-[900] text-2xl tracking-[0.1em] text-[#888] uppercase">
              DarkWave.
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              {!showDevLogin ? (
                <button
                  onClick={() => setShowDevLogin(true)}
                  className="inline-flex items-center gap-2 text-white/20 hover:text-white/50 transition-all duration-300 text-xs"
                  data-testid="button-show-dev-login"
                >
                  <Lock className="w-3 h-3" />
                  <span>Dev</span>
                </button>
              ) : (
                <form onSubmit={handleDevLogin} className="flex items-center gap-2">
                  <input
                    type="password"
                    value={devPassword}
                    onChange={(e) => setDevPassword(e.target.value)}
                    placeholder="Code"
                    className={`w-24 px-3 py-1.5 bg-white/5 border rounded-[2px] text-xs text-white placeholder:text-white/20 focus:outline-none ${
                      devError ? "border-red-500/50" : "border-white/10"
                    }`}
                    data-testid="input-dev-password"
                    autoFocus
                  />
                  <button type="submit" className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-[2px] text-xs text-white hover:bg-white/10" data-testid="button-dev-login">
                    <Unlock className="w-3 h-3" />
                  </button>
                  <button type="button" onClick={() => { setShowDevLogin(false); setDevPassword(""); setDevError(false); }} className="text-white/30 hover:text-white/60 text-xs" data-testid="button-dev-cancel">✕</button>
                </form>
              )}
              <span className="text-white/15 font-sans text-sm">© 2026 The Architectural Nexus. All Rights Reserved.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
