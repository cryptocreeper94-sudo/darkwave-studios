import { Shield, Code2 } from "lucide-react";
import { useRef } from "react";

export default function Footer() {
  const dwscClickRef = useRef({ count: 0, timer: null as any });
  const handleDWSCClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dwscClickRef.current.count++;
    if (dwscClickRef.current.count === 3) {
      dwscClickRef.current.count = 0;
      clearTimeout(dwscClickRef.current.timer);
      window.open('https://dwsc.io/#portal', '_blank');
    } else {
      clearTimeout(dwscClickRef.current.timer);
      dwscClickRef.current.timer = setTimeout(() => { dwscClickRef.current.count = 0; }, 800);
    }
  };

  return (
    <footer className="relative z-10 mt-6 lg:mt-12 border-t border-white/10 bg-background/80 backdrop-blur-sm" data-testid="footer">
      {/* Lume Promotional Banner */}
      <div className="border-b border-white/5 bg-gradient-to-r from-cyan-950/30 via-background/50 to-teal-950/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs lg:text-sm text-white/80">
              Built with <a href="https://lume-lang.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">Lume</a> — the deterministic natural-language programming language
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <a href="https://dwsc.io" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 hover:bg-cyan-500/10 transition-colors" data-testid="footer-link-dwsc">
              <Code2 className="w-3 h-3" />
              <span>DWSC.io</span>
            </a>
            <a href="https://lume-lang.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 hover:bg-teal-500/10 transition-colors" data-testid="footer-link-lume">
              <span>Lume Docs</span>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-muted-foreground text-xs lg:text-sm" data-testid="text-copyright">
            &copy; 2026 DarkWave Studios
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs lg:text-sm text-muted-foreground">
            <a
              href="https://trustshield.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              data-testid="footer-link-trustshield"
            >
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Protected by <span className="text-primary font-semibold">TrustShield.tech</span></span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href="https://dwtl.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              data-testid="footer-link-trustlayer"
            >
              Powered by <span className="text-primary font-semibold">Trust Layer</span>
            </a>
            <span className="text-white/30">|</span>
            <span
              onClick={handleDWSCClick}
              className="hover:text-cyan-400 transition-colors cursor-default select-none"
              data-testid="footer-link-dwsc"
            >
              <span className="text-cyan-400 font-semibold">◈ DWSC</span> R&D
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
