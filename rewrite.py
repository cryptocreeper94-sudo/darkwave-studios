import re

with open(r'D:\darkwavestudios\client\src\pages\Home.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

projects_match = re.search(r'(const projects = \[.*?\];)', content, re.DOTALL)
projects_str = projects_match.group(1) if projects_match else 'const projects = [];'

new_home = f"""import {{ useState, useEffect }} from "react";
import {{ Link }} from "wouter";
import {{ motion }} from "framer-motion";
import {{ GlassCard }} from "@/components/glass-card";
import {{ ChevronLeft, ChevronRight, ArrowRight, Menu, X, Shield, ShieldAlert, Cpu, Lock, Database, Code, Zap }} from "lucide-react";

{projects_str}

const CORE_APPS = [
  {{
    title: "Axiom 42",
    desc: "The Apex Predator IDE. A multi-agent AI coding environment with Claude Opus, Sonnet, and GPT-4o.",
    icon: Code,
    url: "https://axiomstudio.dev",
    tag: "Enterprise"
  }},
  {{
    title: "TrustGen 3D",
    desc: "The Deterministic 3D Intelligence Studio. Generate and orchestrate verifiable real-time 3D environments.",
    icon: Cpu,
    url: "https://trustgen.tlid.io",
    tag: "Creative"
  }},
  {{
    title: "Trust Vault",
    desc: "Offline-capable media vault with military-grade AES-256 encryption and decentralized syncing.",
    icon: Lock,
    url: "https://trustvault.tlid.io",
    tag: "Security"
  }},
  {{
    title: "Lume Cortex",
    desc: "The deterministic meta-operating system. 17 highly specialized AI agents in a zero-latency workspace.",
    icon: Zap,
    url: "https://lume-lang.org",
    tag: "Architecture"
  }},
  {{
    title: "Lume Scan",
    desc: "The premier bidirectional diagnostic and fleet management suite featuring Mode 06 remote execution.",
    icon: Database,
    url: "https://lumescan.com",
    tag: "Automotive"
  }},
  {{
    title: "TrustBook",
    desc: "The decentralized enterprise e-reader. Cryptographically secure highlights and reading progress.",
    icon: Database,
    url: "https://trustbook.tlid.io",
    tag: "Publishing"
  }},
  {{
    title: "TrustShield",
    desc: "The enterprise-grade privacy and security command center for the DarkWave ecosystem.",
    icon: ShieldAlert,
    url: "https://trustshield.tech",
    tag: "Security"
  }},
  {{
    title: "Chronoverse",
    desc: "Parallel life simulation across historical eras with AI NPCs, voice cloning, and real-time world.",
    icon: Cpu,
    url: "https://chronoverse.tlid.io",
    tag: "Simulation"
  }}
];

const staggerContainer = {{ hidden: {{ opacity: 0 }}, show: {{ opacity: 1, transition: {{ staggerChildren: 0.1 }} }} }};
const staggerItem = {{ hidden: {{ opacity: 0, y: 20 }}, show: {{ opacity: 1, y: 0 }} }};

export default function Home() {{
  const [currentProject, setCurrentProject] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {{
    if (mobileMenuOpen) {{
      document.body.style.overflow = 'hidden';
    }} else {{
      document.body.style.overflow = '';
    }}
    return () => {{ document.body.style.overflow = ''; }};
  }}, [mobileMenuOpen]);

  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);

  const visibleProjects = () => {{
    const visible = [];
    for (let i = 0; i < 3; i++) {{
      visible.push(projects[(currentProject + i) % projects.length]);
    }}
    return visible;
  }};

  return (
    <div className=\"min-h-screen bg-background text-foreground overflow-x-hidden font-sans\">
      <div className=\"fixed inset-0 bg-background pointer-events-none\" />

      <div className=\"relative z-10\">
        <nav className=\"fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5\">
          <div className=\"lg:hidden max-w-7xl mx-auto px-4 py-3 flex items-center justify-between\">
            <div className=\"font-display text-base font-bold tracking-tight\">
              DarkWave Systems
            </div>
            <button 
              onClick={{() => setMobileMenuOpen(!mobileMenuOpen)}}
              className=\"w-10 h-10 flex items-center justify-center rounded-lg glass hover:bg-white/10 transition-colors\"
            >
              {{mobileMenuOpen ? <X className=\"w-5 h-5\" /> : <Menu className=\"w-5 h-5\" />}}
            </button>
          </div>
          
          {{mobileMenuOpen && (
            <div className=\"lg:hidden fixed inset-x-0 top-[57px] bottom-0 bg-background/95 backdrop-blur-xl border-t border-white/5 overflow-y-auto z-50\">
              <div className=\"max-w-7xl mx-auto px-4 py-4 pb-20 flex flex-col gap-1\">
                <a href=\"#core\" onClick={{() => setMobileMenuOpen(false)}} className=\"text-sm font-semibold py-3 border-b border-white/5\">Core Ecosystem</a>
                <a href=\"#extended\" onClick={{() => setMobileMenuOpen(false)}} className=\"text-sm font-semibold py-3 border-b border-white/5\">Extended Network</a>
                <a href=\"https://dwtl.io\" target=\"_blank\" className=\"text-sm font-semibold py-3 border-b border-white/5\">Trust Layer</a>
                <a href=\"https://dwtl.io/presale\" target=\"_blank\" className=\"text-sm font-semibold py-3 text-cyan-500\">$SIG Presale</a>
              </div>
            </div>
          )}}
          
          <div className=\"hidden lg:flex max-w-7xl mx-auto px-6 py-4 items-center justify-between\">
            <Link href=\"/\" className=\"font-display text-xl font-black tracking-tight flex items-center gap-2\">
              <Shield className=\"w-5 h-5 text-cyan-500\" />
              DarkWave Systems
            </Link>
            <div className=\"flex items-center gap-8\">
              <a href=\"#core\" className=\"text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors\">Core Platforms</a>
              <a href=\"#extended\" className=\"text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors\">Extended Network</a>
              <a href=\"https://dwtl.io\" target=\"_blank\" className=\"text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors\">Trust Layer</a>
              <a 
                href=\"https://dwtl.io/presale\" 
                target=\"_blank\"
                className=\"btn-glow bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-cyan-500/20 transition-all\"
              >
                $SIG Presale
              </a>
            </div>
          </div>
        </nav>

        <main className=\"container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24 max-w-7xl\">
          
          <motion.section variants={{staggerContainer}} initial=\"hidden\" animate=\"show\" className=\"text-center max-w-4xl mx-auto mb-20 lg:mb-32\">
            <motion.div variants={{staggerItem}} className=\"inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-8\">
              <span className=\"w-2 h-2 bg-cyan-500 rounded-full animate-pulse\" />
              <span className=\"text-xs font-bold text-cyan-500 uppercase tracking-widest\">Patent Pending</span>
            </motion.div>
            
            <motion.h1 variants={{staggerItem}} className=\"text-4xl lg:text-7xl font-black font-display leading-[1.1] tracking-tighter mb-6\">
              Deterministic Infrastructure for the <span className=\"text-cyan-500\">Next Era</span>.
            </motion.h1>
            
            <motion.p variants={{staggerItem}} className=\"text-sm lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-medium\">
              The architectural engine powering the 8-platform DarkWave ecosystem. 
              Zero-trust design, unified by the $SIG asset layer.
            </motion.p>

            <motion.div variants={{staggerItem}} className=\"flex items-center justify-center gap-4\">
               <a href=\"#core\" className=\"bg-white text-black px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors\">
                 Explore Platforms
               </a>
               <a href=\"https://dwtl.io/presale\" target=\"_blank\" className=\"bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-cyan-500/20 transition-colors flex items-center gap-2\">
                 Join Presale <ArrowRight className=\"w-4 h-4\" />
               </a>
            </motion.div>
          </motion.section>

          <section id=\"core\" className=\"mb-20 lg:mb-32 scroll-mt-32\">
            <div className=\"flex flex-col lg:flex-row items-baseline justify-between mb-8 lg:mb-12 border-b border-white/5 pb-4\">
              <h2 className=\"text-2xl lg:text-4xl font-black font-display tracking-tight\">The Apex Predator Ecosystem</h2>
              <p className=\"text-muted-foreground text-sm lg:text-base font-medium mt-2 lg:mt-0\">8 Core Platforms. 1 Unified Trust Layer.</p>
            </div>

            <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6\">
              {{CORE_APPS.map((app, idx) => (
                <a href={{app.url}} target=\"_blank\" key={{idx}} className=\"block group\">
                  <GlassCard className=\"p-6 lg:p-8 h-full rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:-translate-y-1 hover:border-cyan-500/30\">
                    <div className=\"w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:border-cyan-500/50 transition-colors\">
                      <app.icon className=\"w-6 h-6 text-white group-hover:text-cyan-500 transition-colors\" />
                    </div>
                    <div className=\"text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-2\">{{app.tag}}</div>
                    <h3 className=\"text-xl font-bold mb-3 text-white\">{{app.title}}</h3>
                    <p className=\"text-sm text-muted-foreground leading-relaxed\">{{app.desc}}</p>
                  </GlassCard>
                </a>
              ))}}
            </div>
          </section>

          <section id=\"extended\" className=\"mb-20 scroll-mt-32\">
            <div className=\"flex items-center justify-between mb-8\">
              <h2 className=\"text-xl lg:text-3xl font-black font-display tracking-tight\">Extended Network</h2>
              <div className=\"flex items-center gap-2\">
                <button onClick={{prevProject}} className=\"w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors\">
                  <ChevronLeft className=\"w-5 h-5\" />
                </button>
                <button onClick={{nextProject}} className=\"w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors\">
                  <ChevronRight className=\"w-5 h-5\" />
                </button>
              </div>
            </div>

            <div className=\"grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6\">
              {{visibleProjects().map((project, index) => (
                <a
                  href={{project.url}}
                  target=\"_blank\"
                  key={{`${{project.id}}-${{currentProject}}`}}
                  className=\"group block\"
                >
                  <GlassCard className=\"p-6 rounded-2xl border border-white/5 bg-black h-full hover:border-white/20 transition-all\">
                    <h3 className=\"text-lg font-bold mb-2 text-white\">{{project.title}}</h3>
                    <p className=\"text-sm text-muted-foreground line-clamp-2 mb-4\">{{project.description}}</p>
                    <div className=\"flex flex-wrap gap-2\">
                      {{project.tech.slice(0, 3).map((tech) => (
                        <span key={{tech}} className=\"text-[10px] font-semibold bg-white/5 px-2.5 py-1 rounded-md text-gray-400\">{{tech}}</span>
                      ))}}
                    </div>
                  </GlassCard>
                </a>
              ))}}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}}
"""

with open(r'D:\darkwavestudios\client\src\pages\Home.tsx', 'w', encoding='utf-8') as f:
    f.write(new_home)

print("Successfully rewrote Home.tsx")
