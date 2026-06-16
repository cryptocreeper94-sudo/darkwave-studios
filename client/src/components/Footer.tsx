import { Shield } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { Link } from "wouter";

export default function Footer() {
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const pinInputRef = useRef<HTMLInputElement>(null);

  const OWNER_PIN = "0424";

  const handleShieldClick = useCallback(() => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      setShowPinModal(true);
      setPin("");
      setPinError(false);
      setTimeout(() => pinInputRef.current?.focus(), 100);
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 2000);
    }
  }, []);

  return (
    <>
    <footer className="relative z-10 border-t transition-colors duration-300" style={{ borderColor: 'var(--glass-border)', background: 'var(--nav-bg)' }} data-testid="footer">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-3 text-center">
          {/* Ecosystem Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-2 mb-2 text-[10px] sm:text-xs">
            <a href="https://axiomstudio.dev" target="_blank" className="hover:text-cyan-600 transition-colors">Axiom 42</a>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <a href="https://trustgen.tlid.io" target="_blank" className="hover:text-cyan-600 transition-colors">TrustGen 3D</a>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <a href="https://axiom42suite.tlid.io" target="_blank" className="hover:text-cyan-600 transition-colors">Axiom42 Suite</a>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <a href="https://lume-lang.org" target="_blank" className="hover:text-cyan-600 transition-colors">Lume Cortex</a>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <a href="https://lumescan.com" target="_blank" className="hover:text-cyan-600 transition-colors">Lume Scan</a>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <a href="https://trustbook.tlid.io" target="_blank" className="hover:text-cyan-600 transition-colors">TrustBook</a>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <a href="https://trustshield.tech" target="_blank" className="hover:text-cyan-600 transition-colors">TrustShield</a>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <a href="https://chronoverse.tlid.io" target="_blank" className="hover:text-cyan-600 transition-colors">Chronoverse</a>
          </div>

          {/* Company + Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-semibold" style={{ color: 'var(--text-dim)' }}>
            <span className="text-cyan-500 border border-cyan-500/30 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider bg-cyan-500/10">Patent Pending</span>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <span style={{ color: 'var(--text-muted)' }}>DarkWave Studios, LLC</span>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <span>&copy; 2026</span>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <a href="https://dwtl.io/presale" className="text-cyan-500 hover:text-cyan-400 transition-colors">$SIG Presale</a>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <Link href="/terms" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Terms</Link>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <Link href="/privacy" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Privacy</Link>
          </div>

          {/* Powered by Lume */}
          <div className="text-[10px] mt-1" style={{ color: 'var(--text-dim)' }}>
            Architected by <span className="text-cyan-600 dark:text-cyan-400 font-bold">DarkWave Systems</span>
          </div>

          {/* Hidden shield easter egg */}
          <button
            onClick={handleShieldClick}
            className="transition-colors"
            style={{ color: 'var(--glass-border)' }}
            data-testid="shield-easter-egg"
            aria-label="Shield"
          >
            <Shield className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>

    {/* PIN Gate Modal */}
    {showPinModal && (
      <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center"
        onClick={() => setShowPinModal(false)}>
        <div onClick={(e) => e.stopPropagation()}
          className="w-[280px] p-8 rounded-2xl bg-[#0a0e1a] border border-cyan-500/15 flex flex-col items-center gap-5"
          style={{
            boxShadow: "0 32px 100px rgba(6,182,212,0.1)",
            animation: pinError ? "shake 0.4s ease" : undefined,
          }}>
          <Shield className={`w-7 h-7 ${pinError ? "text-red-500" : "text-cyan-500"}`} />
          <p className="text-sm font-bold text-white/70 tracking-wider">Enter PIN</p>
          <input
            ref={pinInputRef}
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            autoFocus
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 4);
              setPin(v);
              if (v.length === 4) {
                setTimeout(() => {
                  if (v === OWNER_PIN) {
                    setShowPinModal(false);
                    setPin("");
                    window.location.href = "/command";
                  } else {
                    setPinError(true);
                    setPin("");
                    setTimeout(() => setPinError(false), 600);
                  }
                }, 100);
              }
            }}
            onKeyDown={(e) => { if (e.key === "Escape") setShowPinModal(false); }}
            className="w-[140px] text-center text-2xl font-black tracking-[12px] p-3 rounded-xl bg-white/[0.03] text-white outline-none"
            style={{
              border: `2px solid ${pinError ? "rgba(239,68,68,0.5)" : "rgba(6,182,212,0.2)"}`,
              caretColor: "#06b6d4",
            }}
            placeholder="····"
          />
          <p className={`text-[10px] ${pinError ? "text-red-500" : "text-white/15"}`}>
            {pinError ? "Incorrect PIN" : "4-digit developer access code"}
          </p>
        </div>
      </div>
    )}
    </>
  );
}
