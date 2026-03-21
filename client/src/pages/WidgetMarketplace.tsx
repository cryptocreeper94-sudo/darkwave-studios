import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/glass-card";
import { SEOHead, BreadcrumbSchema } from "@/components/SEOHead";
import Footer from "@/components/Footer";
import {
  ArrowLeft, Code2, Copy, CheckCircle2, Search, X, ChevronLeft, ChevronRight,
  Sparkles, Star, Lock, Globe, Layers, Zap, Shield, Terminal, ExternalLink,
  Tag, Eye, Crown, Package, Filter
} from "lucide-react";

interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  category: string;
  tags: string[];
  authorName: string;
  version: string;
  downloads: number;
  likes: number;
  isPublic: boolean;
  isPremium: boolean;
  price: string | null;
}

const CATEGORIES = [
  { id: "all", label: "All", icon: Package },
  { id: "components", label: "Components", icon: Layers },
  { id: "hooks", label: "Hooks", icon: Zap },
  { id: "utilities", label: "Utilities", icon: Terminal },
  { id: "api", label: "API", icon: Globe },
  { id: "auth", label: "Auth", icon: Shield },
  { id: "lume", label: "Lume", icon: Sparkles },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
    >
      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
    </button>
  );
}

function CategoryCarousel({ title, items, onSelect }: { title: string; items: Snippet[]; onSelect: (s: Snippet) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => { checkScroll(); }, [items]);

  const scroll = (dir: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-lg font-display font-bold text-white/90">{title}</h3>
        <div className="flex items-center gap-1">
          <span className="text-xs text-white/30 mr-2">{items.length} items</span>
          <button
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-20"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-20"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -4 }}
            onClick={() => onSelect(item)}
            className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start cursor-pointer"
          >
            <GlassCard className="p-5 h-full rounded-xl hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.language === "typescript" ? "bg-blue-500/15 text-blue-400" : "bg-amber-500/15 text-amber-400"
                  }`}>
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white/90 line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h4>
                    <span className="text-[10px] text-white/30 font-mono">{item.language}</span>
                  </div>
                </div>
                {item.isPremium ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/20 text-[10px] text-amber-400 font-semibold">
                    <Crown className="w-2.5 h-2.5" />
                    ${item.price}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-[10px] text-emerald-400 font-semibold">
                    Free
                  </span>
                )}
              </div>
              <p className="text-xs text-white/50 leading-relaxed line-clamp-2 mb-3">{item.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-[10px] text-white/40">{tag}</span>
                ))}
                {item.tags.length > 3 && (
                  <span className="text-[10px] text-white/20">+{item.tags.length - 3}</span>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SnippetModal({ snippet, onClose }: { snippet: Snippet; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#0d1117] border border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0d1117]/95 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              snippet.language === "typescript" ? "bg-blue-500/15 text-blue-400" : "bg-amber-500/15 text-amber-400"
            }`}>
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-white/90">{snippet.title}</h2>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <span className="font-mono">{snippet.language}</span>
                <span>•</span>
                <span>v{snippet.version}</span>
                <span>•</span>
                <span>{snippet.authorName}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Description */}
          <p className="text-sm text-white/60 leading-relaxed">{snippet.description}</p>

          {/* Tags + Price */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {snippet.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-400">{tag}</span>
              ))}
            </div>
            {snippet.isPremium ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/25 text-sm text-amber-400 font-bold">
                <Crown className="w-3.5 h-3.5" />
                ${snippet.price}
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-semibold">
                Free
              </span>
            )}
          </div>

          {/* Code Block */}
          <div className="relative rounded-xl overflow-hidden border border-white/5">
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/5">
              <span className="text-xs text-white/30 font-mono">{snippet.title.toLowerCase().replace(/\s+/g, '-')}.{snippet.language === "typescript" ? "tsx" : "js"}</span>
              <CopyButton text={snippet.code} />
            </div>
            <pre className="p-4 text-[11px] leading-relaxed font-mono text-white/60 overflow-x-auto max-h-[350px] overflow-y-auto">
              <code>{snippet.code}</code>
            </pre>
          </div>

          {/* Embed */}
          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold text-white/60">Quick Embed</span>
            </div>
            <div className="relative bg-black/40 rounded-lg p-3">
              <code className="text-[10px] text-cyan-300 font-mono break-all">
                {`<script src="https://darkwavestudios.io/api/ecosystem/snippets/${snippet.id}/embed.js"></script>`}
              </code>
              <CopyButton text={`<script src="https://darkwavestudios.io/api/ecosystem/snippets/${snippet.id}/embed.js"></script>`} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WidgetMarketplace() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    fetch("/api/ecosystem/snippets")
      .then(r => r.json())
      .then(data => { if (data.success) setSnippets(data.snippets || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = snippets.filter(s => {
    if (activeCategory !== "all" && s.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  const grouped = CATEGORIES.filter(c => c.id !== "all").reduce((acc, cat) => {
    const items = filtered.filter(s => s.category === cat.id);
    if (items.length > 0) acc[cat.id] = items;
    return acc;
  }, {} as Record<string, Snippet[]>);

  // Premium items carousel
  const premiumItems = filtered.filter(s => s.isPremium);
  const freeItems = filtered.filter(s => !s.isPremium);

  const totalCount = snippets.length;
  const premiumCount = snippets.filter(s => s.isPremium).length;
  const freeCount = snippets.filter(s => !s.isPremium).length;
  const categoryCount = new Set(snippets.map(s => s.category)).size;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEOHead
        title="Widget Marketplace - DarkWave Studios"
        description={`Browse ${totalCount}+ production-ready widgets, hooks, and code snippets. Free and premium components for React, TypeScript, and the Trust Layer ecosystem.`}
        keywords="widgets, code snippets, React components, hooks, TypeScript, marketplace, Trust Layer"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://darkwavestudios.io" },
          { name: "Developers", url: "https://darkwavestudios.io/developers" },
          { name: "Marketplace", url: "https://darkwavestudios.io/developers/marketplace" },
        ]}
      />

      <div className="fixed inset-0 bg-background -z-20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1),transparent_50%)] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06),transparent_50%)] -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-background/60 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/developers" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Package className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <span className="font-display text-base lg:text-lg font-bold text-white/90">Marketplace</span>
                <span className="hidden sm:inline text-xs text-white/30 ml-2">{totalCount} widgets</span>
              </div>
            </div>
          </div>
          <Link
            href="/lume/library"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-semibold hover:bg-cyan-500/15 transition-all"
          >
            <Sparkles className="w-3 h-3" />
            Lume Widgets
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Stats */}
        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl lg:text-4xl font-display font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 via-primary to-purple-400 bg-clip-text text-transparent">
              Widget Marketplace
            </span>
          </h1>
          <p className="text-sm text-white/50 max-w-lg mb-6">
            Production-ready components, hooks, and utilities. Copy, embed, or purchase — all battle-tested in the Trust Layer ecosystem.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white/50">
              <Package className="w-3 h-3 text-cyan-400" /> {totalCount} Total
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white/50">
              <Sparkles className="w-3 h-3 text-emerald-400" /> {freeCount} Free
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white/50">
              <Crown className="w-3 h-3 text-amber-400" /> {premiumCount} Premium
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white/50">
              <Layers className="w-3 h-3 text-purple-400" /> {categoryCount} Categories
            </div>
          </div>
        </motion.section>

        {/* Search + Category Tabs */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search widgets, hooks, components..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/25 focus:border-cyan-500/40 focus:outline-none transition-colors"
              data-testid="search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-3.5 h-3.5 text-white/30 hover:text-white/60" />
              </button>
            )}
          </div>

          {/* Category Tabs - horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-500/30 text-cyan-400"
                    : "bg-white/[0.03] border border-white/8 text-white/40 hover:text-white/60 hover:bg-white/[0.06]"
                }`}
                data-testid={`category-${cat.id}`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-white/30">Loading marketplace...</p>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <>
            {activeCategory === "all" && !searchQuery ? (
              <>
                {/* Premium Carousel */}
                {premiumItems.length > 0 && (
                  <CategoryCarousel title="⭐ Premium" items={premiumItems} onSelect={setSelectedSnippet} />
                )}

                {/* Category Carousels */}
                {Object.entries(grouped).map(([catId, items]) => {
                  const cat = CATEGORIES.find(c => c.id === catId);
                  return (
                    <CategoryCarousel
                      key={catId}
                      title={cat?.label || catId}
                      items={items}
                      onSelect={setSelectedSnippet}
                    />
                  );
                })}
              </>
            ) : (
              /* Filtered Grid View */
              <>
                <p className="text-xs text-white/30 mb-4">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filtered.map(item => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedSnippet(item)}
                      className="cursor-pointer"
                    >
                      <GlassCard className="p-5 h-full rounded-xl hover:border-primary/30 transition-all group">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              item.language === "typescript" ? "bg-blue-500/15 text-blue-400" : "bg-amber-500/15 text-amber-400"
                            }`}>
                              <Code2 className="w-4 h-4" />
                            </div>
                            <h4 className="text-sm font-semibold text-white/90 line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h4>
                          </div>
                          {item.isPremium ? (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-[10px] text-amber-400 font-semibold">
                              <Crown className="w-2.5 h-2.5" />${item.price}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-[10px] text-emerald-400 font-semibold">Free</span>
                          )}
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed line-clamp-2 mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-white/40">{tag}</span>
                          ))}
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {filtered.length === 0 && !loading && (
              <div className="text-center py-16">
                <Search className="w-10 h-10 text-white/10 mx-auto mb-3" />
                <h3 className="text-lg font-display font-bold text-white/40 mb-1">No widgets found</h3>
                <p className="text-sm text-white/25">Try a different search or category</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedSnippet && (
          <SnippetModal snippet={selectedSnippet} onClose={() => setSelectedSnippet(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
