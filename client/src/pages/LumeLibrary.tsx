import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/glass-card";
import { SEOHead, BreadcrumbSchema } from "@/components/SEOHead";
import Footer from "@/components/Footer";
import {
  Code2, Terminal, Cpu, Shield, Zap, Layers, ArrowRight, ArrowLeft,
  ExternalLink, Play, Copy, CheckCircle2, Activity, Brain, Sparkles,
  Eye, Wrench, RefreshCw, Heart, Wifi, WifiOff, Clock, BarChart3,
  AlertTriangle, CheckCircle, XCircle, Gauge, Database, Globe,
  Monitor, RotateCcw, Boxes, ChevronRight, BookOpen, Rocket
} from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// ─── Self-Healing Widget Demos ────────────────────────────────
// These are live React implementations that demonstrate what each
// Lume widget does. The Lume source code is shown alongside.

function StatusMonitorWidget() {
  const [services, setServices] = useState([
    { name: "API Gateway", status: "healthy", latency: 12, uptime: 99.97 },
    { name: "Auth Service", status: "healthy", latency: 8, uptime: 99.99 },
    { name: "Database", status: "healthy", latency: 3, uptime: 99.95 },
    { name: "CDN Edge", status: "healthy", latency: 22, uptime: 99.92 },
    { name: "AI Engine", status: "healthy", latency: 145, uptime: 99.88 },
  ]);
  const [healCount, setHealCount] = useState(0);
  const [isHealing, setIsHealing] = useState(false);
  const tickRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    tickRef.current = setInterval(() => {
      setServices(prev => prev.map(s => {
        const shouldFail = Math.random() < 0.08;
        if (shouldFail && s.status === "healthy") {
          return { ...s, status: "degraded", latency: s.latency * 4 };
        }
        return s;
      }));
    }, 3000);
    return () => clearInterval(tickRef.current);
  }, []);

  useEffect(() => {
    const degraded = services.filter(s => s.status === "degraded");
    if (degraded.length > 0 && !isHealing) {
      setIsHealing(true);
      setTimeout(() => {
        setServices(prev => prev.map(s =>
          s.status === "degraded"
            ? { ...s, status: "healed", latency: Math.max(s.latency / 4, 3) }
            : s
        ));
        setHealCount(c => c + degraded.length);
        setTimeout(() => {
          setServices(prev => prev.map(s =>
            s.status === "healed" ? { ...s, status: "healthy" } : s
          ));
          setIsHealing(false);
        }, 1500);
      }, 2000);
    }
  }, [services, isHealing]);

  const statusIcon = (s: string) => {
    if (s === "healthy") return <CheckCircle className="w-3 h-3 text-emerald-400" />;
    if (s === "degraded") return <AlertTriangle className="w-3 h-3 text-red-400 animate-pulse" />;
    return <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>Live Status</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-cyan-400">
          <Heart className="w-3 h-3" />
          <span>{healCount} healed</span>
        </div>
      </div>
      {services.map((s, i) => (
        <div key={i} className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-all duration-500 ${
          s.status === "degraded" ? "bg-red-500/10 border border-red-500/20" :
          s.status === "healed" ? "bg-cyan-500/10 border border-cyan-500/20" :
          "bg-white/[0.03] border border-white/5"
        }`}>
          <div className="flex items-center gap-2">
            {statusIcon(s.status)}
            <span className="text-xs text-white/70">{s.name}</span>
          </div>
          <span className={`text-[10px] font-mono ${s.latency > 50 ? "text-red-400" : "text-white/40"}`}>
            {s.latency}ms
          </span>
        </div>
      ))}
      {isHealing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[10px] text-cyan-400 text-center py-1.5 bg-cyan-500/5 rounded-lg border border-cyan-500/10"
        >
          ⚡ Self-healing in progress...
        </motion.div>
      )}
    </div>
  );
}

function CircuitBreakerWidget() {
  const [state, setState] = useState<"CLOSED" | "OPEN" | "HALF-OPEN">("CLOSED");
  const [failures, setFailures] = useState(0);
  const [requests, setRequests] = useState(0);
  const [successes, setSuccesses] = useState(0);
  const threshold = 3;

  const simulateRequest = () => {
    setRequests(r => r + 1);
    if (state === "OPEN") return;

    const willFail = Math.random() < 0.4;
    if (willFail) {
      const newFailures = failures + 1;
      setFailures(newFailures);
      if (newFailures >= threshold) {
        setState("OPEN");
        setTimeout(() => {
          setState("HALF-OPEN");
          setTimeout(() => {
            setState("CLOSED");
            setFailures(0);
          }, 2000);
        }, 3000);
      }
    } else {
      setSuccesses(s => s + 1);
      if (state === "HALF-OPEN") {
        setState("CLOSED");
        setFailures(0);
      }
    }
  };

  useEffect(() => {
    const t = setInterval(simulateRequest, 1500);
    return () => clearInterval(t);
  }, [state, failures]);

  const stateColor = state === "CLOSED" ? "text-emerald-400" : state === "OPEN" ? "text-red-400" : "text-amber-400";
  const stateBg = state === "CLOSED" ? "bg-emerald-500/10 border-emerald-500/20" : state === "OPEN" ? "bg-red-500/10 border-red-500/20" : "bg-amber-500/10 border-amber-500/20";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Circuit Breaker</span>
        </div>
        <span className={`text-[10px] font-mono font-bold ${stateColor}`}>{state}</span>
      </div>
      <div className={`rounded-xl p-3 border ${stateBg} transition-all duration-500`}>
        <div className="flex items-center justify-center gap-3 mb-3">
          {state === "CLOSED" && <Wifi className="w-6 h-6 text-emerald-400" />}
          {state === "OPEN" && <WifiOff className="w-6 h-6 text-red-400 animate-pulse" />}
          {state === "HALF-OPEN" && <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-white/80">{requests}</div>
            <div className="text-[10px] text-white/40">Requests</div>
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-400">{successes}</div>
            <div className="text-[10px] text-white/40">Success</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-400">{failures}</div>
            <div className="text-[10px] text-white/40">Failures</div>
          </div>
        </div>
      </div>
      <div className="text-[10px] text-white/30 text-center">
        Threshold: {threshold} failures → auto-trip → recover
      </div>
    </div>
  );
}

function MetricsWidget() {
  const [metrics, setMetrics] = useState({
    cpu: 34, memory: 62, requests: 1247, errors: 3, latency: 18
  });

  useEffect(() => {
    const t = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 15)),
        memory: Math.max(20, Math.min(90, prev.memory + (Math.random() - 0.5) * 8)),
        requests: prev.requests + Math.floor(Math.random() * 12),
        errors: prev.errors + (Math.random() < 0.1 ? 1 : 0),
        latency: Math.max(5, Math.min(200, prev.latency + (Math.random() - 0.5) * 20)),
      }));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const GaugeBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
        <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
        <span>Runtime Metrics</span>
        <span className="ml-auto text-[10px] text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          live
        </span>
      </div>
      <div className="space-y-2.5">
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-white/50">CPU</span>
            <span className="text-white/70 font-mono">{Math.round(metrics.cpu)}%</span>
          </div>
          <GaugeBar value={metrics.cpu} max={100} color={metrics.cpu > 80 ? "bg-red-500" : "bg-cyan-500"} />
        </div>
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-white/50">Memory</span>
            <span className="text-white/70 font-mono">{Math.round(metrics.memory)}%</span>
          </div>
          <GaugeBar value={metrics.memory} max={100} color={metrics.memory > 75 ? "bg-amber-500" : "bg-emerald-500"} />
        </div>
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-white/50">Latency</span>
            <span className="text-white/70 font-mono">{Math.round(metrics.latency)}ms</span>
          </div>
          <GaugeBar value={metrics.latency} max={200} color={metrics.latency > 100 ? "bg-red-500" : "bg-purple-500"} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="bg-white/[0.03] rounded-lg p-2 text-center border border-white/5">
          <div className="text-sm font-bold text-white/80">{metrics.requests.toLocaleString()}</div>
          <div className="text-[10px] text-white/40">Requests</div>
        </div>
        <div className="bg-white/[0.03] rounded-lg p-2 text-center border border-white/5">
          <div className="text-sm font-bold text-red-400">{metrics.errors}</div>
          <div className="text-[10px] text-white/40">Errors</div>
        </div>
      </div>
    </div>
  );
}

function FallbackChainWidget() {
  const [chain, setChain] = useState([
    { model: "claude-opus", status: "idle", latency: 0 },
    { model: "gpt-4o", status: "idle", latency: 0 },
    { model: "gemini-pro", status: "idle", latency: 0 },
    { model: "claude-haiku", status: "idle", latency: 0 },
  ]);
  const [result, setResult] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runCount, setRunCount] = useState(0);

  const runChain = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setResult(null);
    setRunCount(c => c + 1);

    const resetChain = chain.map(c => ({ ...c, status: "idle", latency: 0 }));
    setChain(resetChain);

    for (let i = 0; i < resetChain.length; i++) {
      setChain(prev => prev.map((c, j) =>
        j === i ? { ...c, status: "trying" } : c
      ));

      await new Promise(r => setTimeout(r, 800 + Math.random() * 400));

      const willFail = Math.random() < 0.55;
      if (willFail && i < resetChain.length - 1) {
        setChain(prev => prev.map((c, j) =>
          j === i ? { ...c, status: "failed", latency: Math.floor(800 + Math.random() * 200) } : c
        ));
      } else {
        setChain(prev => prev.map((c, j) =>
          j === i ? { ...c, status: "success", latency: Math.floor(200 + Math.random() * 300) } : c
        ));
        setResult(resetChain[i].model);
        break;
      }
    }
    setIsRunning(false);
  };

  useEffect(() => {
    runChain();
    const t = setInterval(runChain, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Fallback Chain</span>
        </div>
        <span className="text-[10px] text-white/30">Run #{runCount}</span>
      </div>
      {chain.map((c, i) => (
        <div key={i} className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-all duration-300 ${
          c.status === "trying" ? "bg-amber-500/10 border border-amber-500/20" :
          c.status === "failed" ? "bg-red-500/8 border border-red-500/15" :
          c.status === "success" ? "bg-emerald-500/10 border border-emerald-500/20" :
          "bg-white/[0.02] border border-white/5"
        }`}>
          <div className="flex items-center gap-2">
            {c.status === "trying" && <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" />}
            {c.status === "failed" && <XCircle className="w-3 h-3 text-red-400" />}
            {c.status === "success" && <CheckCircle className="w-3 h-3 text-emerald-400" />}
            {c.status === "idle" && <CircleDot className="w-3 h-3 text-white/20" />}
            <span className="text-xs text-white/60 font-mono">{c.model}</span>
          </div>
          {c.latency > 0 && (
            <span className="text-[10px] font-mono text-white/30">{c.latency}ms</span>
          )}
        </div>
      ))}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] text-center text-emerald-400 py-1"
        >
          ✓ Resolved via {result}
        </motion.div>
      )}
    </div>
  );
}

function EcosystemBadgeWidget() {
  const [verified, setVerified] = useState(true);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <motion.div
        animate={pulse ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
          <Shield className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0a0f1e] flex items-center justify-center">
          <CheckCircle2 className="w-3 h-3 text-white" />
        </div>
      </motion.div>
      <div className="text-center">
        <div className="text-xs font-semibold text-white/80">Trust Layer Verified</div>
        <div className="text-[10px] text-white/40 mt-0.5">Self-healing • Auto-renewing</div>
      </div>
      <div className="flex items-center gap-1.5 text-[10px]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400">Monitoring active</span>
      </div>
    </div>
  );
}

// ─── Lume Source Code for each widget ─────────────────────────

const widgetSources: Record<string, string> = {
  "status-monitor": `# Self-Healing Status Monitor
# Automatically detects degraded services and heals them

@healable
to check_services(endpoints: list):
  let results = []
  for endpoint in endpoints:
    let response = fetch endpoint as json
    results.push({
      name: endpoint.name,
      status: response.ok ? "healthy" : "degraded",
      latency: response.latency
    })
  return results

monitor:
  dashboard: true
  alert_threshold: { error_rate: 0.05, latency: 500 }

heal:
  retry: { max: 3, backoff: "exponential" }
  fallback: -> restart_service(service.name)
  circuit_breaker: { threshold: 5, cooldown: 30 }

optimize:
  track: ["latency", "error_rate"]
  suggest: true`,

  "circuit-breaker": `# Circuit Breaker Pattern
# Prevents cascading failures with automatic recovery

define breaker = CircuitBreaker({
  threshold: 3,
  cooldown: 30,
  half_open_max: 1
})

@healable
to make_request(url: text):
  when breaker.state is
    "CLOSED" -> fetch url as json
    "OPEN" -> {
      log("Circuit open — request blocked")
      return cached_response(url)
    }
    "HALF-OPEN" -> {
      let probe = fetch url as json
      if probe.ok:
        breaker.close()
      return probe
    }

heal:
  circuit_breaker: breaker
  on_trip: -> notify("Circuit tripped for {url}")
  on_recover: -> log("Circuit recovered")`,

  "metrics": `# Runtime Metrics Monitor
# Tracks system health with live gauges

monitor:
  metrics: ["cpu", "memory", "latency", "requests"]
  interval: 2000
  dashboard: true
  
  alert:
    cpu > 80 -> notify("High CPU: {cpu}%")
    memory > 75 -> notify("Memory warning: {memory}%")
    latency > 100 -> heal("Latency spike detected")

optimize:
  track: ["response_time", "throughput"]
  auto_scale:
    cpu > 90 -> scale_up(1)
    cpu < 20 -> scale_down(1)
  
evolve:
  pattern_learning: true
  cost_analysis: true
  report_interval: "daily"`,

  "fallback-chain": `# AI Model Fallback Chain
# Automatically cascades through models on failure

@healable
to generate_response(prompt: text):
  let result = ask anthropic.claude_opus prompt
  return result

heal:
  fallback_chain: [
    anthropic.claude_opus,
    openai.gpt4,
    google.gemini_pro,
    anthropic.claude_haiku
  ]
  retry: { max: 2, backoff: "exponential" }
  on_fallback: -> log("Fell back to {model.name}")
  on_exhaust: -> return cached_response(prompt)`,

  "ecosystem-badge": `# Self-Healing Ecosystem Badge
# Verifies and auto-renews Trust Layer certification

define badge = TrustBadge({
  app_id: "my-app",
  verify_interval: 300
})

monitor:
  check: badge.is_valid
  interval: 5000
  on_expire: -> badge.renew()

heal:
  on_invalid: -> {
    log("Badge expired — auto-renewing")
    let renewed = fetch "/api/badge/renew" as json
    if renewed.ok:
      set badge.token = renewed.token
      log("Badge renewed successfully")
    else:
      notify("Badge renewal failed — manual action needed")
  }

evolve:
  auto_renew: true
  monitor_revocations: true`,
};

// ─── Widget Catalog ──────────────────────────────────────────

const widgets = [
  {
    id: "status-monitor",
    name: "Status Monitor",
    description: "Real-time service health monitoring with automatic degradation detection and self-healing recovery.",
    icon: Activity,
    gradient: "from-emerald-500 to-cyan-500",
    tags: ["monitor", "heal", "@healable"],
    component: StatusMonitorWidget,
  },
  {
    id: "circuit-breaker",
    name: "Circuit Breaker",
    description: "Prevents cascading failures with automatic state management: CLOSED → OPEN → HALF-OPEN → recovery.",
    icon: Shield,
    gradient: "from-amber-500 to-orange-500",
    tags: ["heal", "circuit_breaker", "fallback"],
    component: CircuitBreakerWidget,
  },
  {
    id: "metrics",
    name: "Runtime Metrics",
    description: "Live system metrics with CPU, memory, latency gauges and automatic optimization triggers.",
    icon: BarChart3,
    gradient: "from-purple-500 to-pink-500",
    tags: ["monitor", "optimize", "evolve"],
    component: MetricsWidget,
  },
  {
    id: "fallback-chain",
    name: "AI Fallback Chain",
    description: "Sequential model fallback — if Claude fails, try GPT-4o, then Gemini, ensuring every request succeeds.",
    icon: Layers,
    gradient: "from-cyan-500 to-blue-500",
    tags: ["heal", "fallback_chain", "@healable"],
    component: FallbackChainWidget,
  },
  {
    id: "ecosystem-badge",
    name: "Trust Badge",
    description: "Self-verifying ecosystem badge with auto-renewal, expiration monitoring, and revocation detection.",
    icon: CheckCircle2,
    gradient: "from-violet-500 to-purple-500",
    tags: ["monitor", "heal", "evolve"],
    component: EcosystemBadgeWidget,
  },
];

// ─── Copy Button ─────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
    >
      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
    </button>
  );
}

// ─── Main Page ───────────────────────────────────────────────

export default function LumeLibrary() {
  const [activeWidget, setActiveWidget] = useState(widgets[0].id);
  const [showCode, setShowCode] = useState(true);
  const active = widgets.find(w => w.id === activeWidget)!;
  const ActiveComponent = active.component;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEOHead
        title="Lume Widget Library - Self-Healing Components | DarkWave Studios"
        description="Production-ready self-healing widgets written in Lume. Circuit breakers, fallback chains, status monitors — all with automatic recovery built into the language."
        keywords="Lume widgets, self-healing components, circuit breaker, fallback chain, AI-native, monitoring, auto-recovery"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://darkwavestudios.io" },
          { name: "Lume", url: "https://darkwavestudios.io/lume" },
          { name: "Widget Library", url: "https://darkwavestudios.io/lume/library" },
        ]}
      />

      <div className="fixed inset-0 bg-background -z-20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12),transparent_50%)] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06),transparent_50%)] -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-background/60 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/lume" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 transition-all duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Boxes className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display text-lg lg:text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Widget Library</span>
                <span className="hidden lg:inline text-xs text-white/30 ml-3">Lume Self-Healing Components</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/lume/playground"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              Playground
            </Link>
            <a
              href="https://lume-lang.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-xl transition-all hover:scale-105"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">lume-lang.org</span>
              <span className="sm:hidden">Lume</span>
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 text-sm font-semibold text-cyan-400 mb-8 shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-4 h-4" />
            Self-Healing by Default
          </div>
          <h1 className="text-3xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Widgets That Fix Themselves
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
            Production-ready components with monitoring, circuit breakers, fallback chains, and
            auto-recovery — all expressed in clean Lume syntax. Copy, embed, and ship.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50">
              <Activity className="w-3 h-3 text-cyan-400" />
              {widgets.length} Widgets
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50">
              <Heart className="w-3 h-3 text-emerald-400" />
              4-Layer Runtime
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50">
              <Shield className="w-3 h-3 text-purple-400" />
              Zero-Config Healing
            </div>
          </div>
        </motion.section>

        {/* Widget Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {widgets.map(w => (
            <button
              key={w.id}
              onClick={() => setActiveWidget(w.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeWidget === w.id
                  ? "bg-gradient-to-r from-cyan-500/15 to-teal-500/15 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10"
                  : "bg-white/5 border border-white/10 text-white/50 hover:text-white/70 hover:bg-white/8"
              }`}
            >
              <w.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{w.name}</span>
            </button>
          ))}
        </div>

        {/* Active Widget Display */}
        <motion.div
          key={activeWidget}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-16"
        >
          {/* Widget Card Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-white/90 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${active.gradient} flex items-center justify-center shadow-lg`}>
                  <active.icon className="w-5 h-5 text-white" />
                </div>
                {active.name}
              </h2>
              <p className="text-sm text-white/50 mt-2 max-w-xl">{active.description}</p>
            </div>
            <div className="flex items-center gap-2">
              {active.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Two-Column: Preview + Code */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Live Preview */}
            <GlassCard className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Eye className="w-3.5 h-3.5" />
                  Live Preview
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              </div>
              <ActiveComponent />
            </GlassCard>

            {/* Lume Source Code */}
            <GlassCard className="p-0 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono">{active.id}.lume</span>
                </div>
                <CopyButton text={widgetSources[active.id]} />
              </div>
              <div className="relative">
                <pre className="p-4 text-[11px] leading-relaxed font-mono text-white/60 overflow-x-auto max-h-[400px] overflow-y-auto">
                  <code>{widgetSources[active.id]}</code>
                </pre>
              </div>
            </GlassCard>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16 lg:mb-24"
        >
          <h2 className="text-2xl lg:text-4xl font-display font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Why Self-Healing?
            </span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12 text-sm lg:text-base">
            Traditional widgets crash silently. Lume widgets monitor, diagnose, and fix themselves.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Monitor, title: "Self-Monitoring", desc: "Every function tracks its own execution time, error rate, and resource usage. Dashboards appear automatically.", gradient: "from-cyan-500 to-blue-500" },
              { icon: Heart, title: "Self-Healing", desc: "Exponential backoff, circuit breakers, and fallback chains kick in before errors reach the user.", gradient: "from-emerald-500 to-green-500" },
              { icon: Gauge, title: "Self-Optimizing", desc: "Detects slow functions, suggests fixes, and tracks every optimization with full rollback support.", gradient: "from-purple-500 to-pink-500" },
              { icon: Brain, title: "Self-Evolving", desc: "Learns performance patterns over time, suggests model swaps for cost savings, and auto-updates dependencies.", gradient: "from-amber-500 to-orange-500" },
            ].map((f, i) => (
              <motion.div key={i} variants={staggerItem}>
                <GlassCard className="p-6 h-full">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-white/90 mb-2">{f.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-24"
        >
          <h2 className="text-2xl lg:text-4xl font-display font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Write Lume", desc: "Use monitor:, heal:, and @healable blocks. The language handles the complexity.", icon: Code2 },
              { step: "02", title: "Transpile", desc: "Lume compiles to JavaScript with monitoring, retry logic, and circuit breakers automatically injected.", icon: Terminal },
              { step: "03", title: "Ship & Forget", desc: "Your widget monitors itself, recovers from failures, and optimizes performance — all autonomously.", icon: Rocket },
            ].map((s, i) => (
              <GlassCard key={i} glow className="p-6 text-center relative overflow-hidden">
                <div className="absolute top-3 right-4 text-5xl font-display font-bold text-white/[0.03]">{s.step}</div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-teal-500/15 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-display font-semibold text-white/90 mb-2">{s.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GlassCard glow className="p-8 lg:p-12 max-w-2xl mx-auto">
            <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-xl lg:text-3xl font-display font-bold mb-3">
              Build with Lume
            </h2>
            <p className="text-sm text-white/50 mb-6 max-w-md mx-auto">
              The first language where self-healing isn't a library — it's a language feature.
              Write ask, think, generate. Ship code that fixes itself.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/lume/playground"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-xl transition-all hover:scale-105"
              >
                <Play className="w-4 h-4" />
                Try Playground
              </Link>
              <a
                href="https://lume-lang.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 font-semibold hover:bg-white/10 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                Documentation
              </a>
            </div>
          </GlassCard>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
