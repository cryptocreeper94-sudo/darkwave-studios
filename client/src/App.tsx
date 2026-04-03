import { Switch, Route, useLocation } from "wouter";
import React, { useEffect } from "react";

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean; error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary] Academy crashed:', error, info.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '40px', color: '#ff6b6b', background: '#0a0a0f', minHeight: '100vh', fontFamily: 'monospace'}}>
          <h1 style={{color: '#06b6d4'}}>Academy Error</h1>
          <pre style={{whiteSpace: 'pre-wrap', color: '#fff', marginTop: '20px'}}>{this.state.error?.message}</pre>
          <pre style={{whiteSpace: 'pre-wrap', color: '#888', marginTop: '10px', fontSize: '12px'}}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Compare from "@/pages/Compare";
import Quote from "@/pages/Quote";
import Admin from "@/pages/Admin";
import Book from "@/pages/Book";
import Payment from "@/pages/Payment";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentCancel from "@/pages/PaymentCancel";
import Analytics from "@/pages/Analytics";
import Blog from "@/pages/Blog";
import BlogAdmin from "@/pages/BlogAdmin";
import Mission from "@/pages/Mission";
import Investors from "@/pages/Investors";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Documents from "@/pages/Documents";
import TrustLayerHub from "@/pages/TrustLayerHub";
import GuardianAI from "@/pages/GuardianAI";
import GuardianAIRegistry from "@/pages/GuardianAIRegistry";
import Developers from "@/pages/Developers";
import Ecosystem from "@/pages/Ecosystem";
import NotFound from "@/pages/not-found";
import WebsiteAudit from "@/pages/WebsiteAudit";
import Resources from "@/pages/Resources";
import MarketingHub from "@/pages/MarketingHub";
import SignalChat from "@/pages/SignalChat";
import EcosystemMetrics from "@/pages/EcosystemMetrics";
import AffiliateDisclosure from "@/pages/AffiliateDisclosure";
import Support from "@/pages/Support";
import Studio from "@/pages/Studio";
import Credits from "@/pages/Credits";
import CommandCenter from "@/pages/CommandCenter";
import Explore from "@/pages/Explore";
import SharedComponentsManager from "@/pages/SharedComponentsManager";
import DeveloperApi from "@/pages/DeveloperApi";
import EcosystemDashboard from "@/pages/EcosystemDashboard";
import AffiliateDashboard from "@/pages/AffiliateDashboard";
import Lume from "@/pages/Lume";
import Academy from "@/pages/Academy";
import LumePlayground from "@/pages/LumePlayground";
import LumeLibrary from "@/pages/LumeLibrary";
import WidgetMarketplace from "@/pages/WidgetMarketplace";
import WidgetBuilder from "@/pages/WidgetBuilder";
import SignalChatSidebar from "@/components/SignalChatSidebar";

function Router() {
  const hostname = window.location.hostname;
  const isAcademySubdomain = hostname === "academy.tlid.io" || hostname.startsWith("academy.");
  if (typeof window !== 'undefined' && window.location.hostname.includes('academy')) {
    console.log('[Router] Academy subdomain detected:', hostname, 'isAcademy:', isAcademySubdomain);
  }

  if (isAcademySubdomain) {
    return (
      <ErrorBoundary>
        <Switch>
          {/* Force the Academy component to be the homepage on this subdomain */}
          <Route path="/" component={Academy}/>
          {/* Retain the explicitly requested /academy path so hard-links don't break */}
          <Route path="/academy" component={Academy}/>
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
    );
  }

  return (
    <Switch>
      <Route path="/" component={Explore}/>
      <Route path="/home" component={Home}/>
      <Route path="/services" component={Services}/>
      <Route path="/projects" component={Projects}/>
      <Route path="/about" component={About}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/compare" component={Compare}/>
      <Route path="/quote" component={Quote}/>
      <Route path="/book" component={Book}/>
      <Route path="/payment" component={Payment}/>
      <Route path="/payment/success" component={PaymentSuccess}/>
      <Route path="/payment/cancel" component={PaymentCancel}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/analytics" component={Analytics}/>
      <Route path="/blog" component={Blog}/>
      <Route path="/blog/admin" component={BlogAdmin}/>
      <Route path="/mission" component={Mission}/>
      <Route path="/investors" component={Investors}/>
      <Route path="/terms" component={Terms}/>
      <Route path="/privacy" component={Privacy}/>
      <Route path="/documents" component={Documents}/>
      <Route path="/hub" component={TrustLayerHub}/>
      <Route path="/guardian-ai" component={GuardianAI}/>
      <Route path="/guardian-ai-registry" component={GuardianAIRegistry}/>
      <Route path="/developers" component={Developers}/>
      <Route path="/ecosystem" component={Ecosystem}/>
      <Route path="/audit" component={WebsiteAudit}/>
      <Route path="/resources" component={Resources}/>
      <Route path="/marketing" component={MarketingHub}/>
      <Route path="/chat" component={SignalChat}/>
      <Route path="/metrics" component={EcosystemMetrics}/>
      <Route path="/affiliate-disclosure" component={AffiliateDisclosure}/>
      <Route path="/support" component={Support}/>
      <Route path="/studio" component={Studio}/>
      <Route path="/credits" component={Credits}/>
      <Route path="/command" component={CommandCenter}/>
      <Route path="/explore" component={Explore}/>
      <Route path="/developers/components" component={SharedComponentsManager}/>
      <Route path="/developers/api" component={DeveloperApi}/>
      <Route path="/developers/ecosystem" component={EcosystemDashboard}/>
      <Route path="/affiliate" component={AffiliateDashboard}/>
      <Route path="/lume" component={Lume}/>
      <Route path="/lume/playground" component={LumePlayground}/>
              <Route path="/lume/library" component={LumeLibrary}/>
              <Route path="/developers/marketplace" component={WidgetMarketplace}/>
              <Route path="/widget-builder" component={WidgetBuilder}/>
      <Route path="/academy" component={Academy}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollToTop />
        <Router />
        <SignalChatSidebar />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
