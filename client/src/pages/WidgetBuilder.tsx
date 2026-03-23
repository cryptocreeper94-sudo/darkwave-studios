import { useState, useCallback, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";

// ═══════════════════════════════════════════════════════
// WIDGET CATALOG — 60+ widgets organized by category
// ═══════════════════════════════════════════════════════
interface WidgetDef {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  price: number;
  priceId: string;
  tags: string[];
  size: { w: number; h: number }; // grid columns x rows
}

const WIDGET_CATALOG: WidgetDef[] = [
  // ── CORE BUSINESS ──
  { id: 'analytics', name: 'Analytics', icon: '📊', description: 'Page view tracking & visitor insights', category: 'Core Business', price: 199, priceId: 'price_widget_analytics', tags: ['tracking','pageviews','visitors'], size: { w: 2, h: 2 } },
  { id: 'estimator', name: 'Estimator', icon: '🧮', description: 'Instant project pricing calculator', category: 'Core Business', price: 149, priceId: 'price_widget_estimator', tags: ['pricing','calculator','quotes'], size: { w: 2, h: 2 } },
  { id: 'booking', name: 'Booking', icon: '📅', description: 'Appointment scheduling & calendar', category: 'Core Business', price: 129, priceId: 'price_widget_booking', tags: ['appointments','schedule','calendar'], size: { w: 2, h: 2 } },
  { id: 'reviews', name: 'Reviews', icon: '⭐', description: 'Customer testimonial carousel', category: 'Core Business', price: 79, priceId: 'price_widget_reviews', tags: ['testimonials','ratings','social proof'], size: { w: 2, h: 1 } },
  { id: 'lead-capture', name: 'Lead Capture', icon: '📋', description: 'Convert visitors into qualified leads', category: 'Core Business', price: 99, priceId: 'price_widget_lead_capture', tags: ['forms','leads','conversion'], size: { w: 2, h: 1 } },
  { id: 'seo', name: 'SEO Health', icon: '🔍', description: 'SEO auditor & optimization checker', category: 'Core Business', price: 149, priceId: 'price_widget_seo', tags: ['seo','audit','optimization'], size: { w: 1, h: 1 } },
  { id: 'chat', name: 'Live Chat', icon: '💬', description: 'Real-time customer support widget', category: 'Core Business', price: 149, priceId: 'price_widget_chat', tags: ['support','messaging','live'], size: { w: 1, h: 2 } },
  { id: 'proposal', name: 'Proposals', icon: '📝', description: 'E-signature proposals & contracts', category: 'Core Business', price: 199, priceId: 'price_widget_proposal', tags: ['contracts','signatures','proposals'], size: { w: 2, h: 2 } },
  { id: 'crm', name: 'CRM', icon: '🤝', description: 'Deal pipeline & customer management', category: 'Core Business', price: 249, priceId: 'price_widget_crm', tags: ['pipeline','deals','customers'], size: { w: 2, h: 2 } },
  { id: 'crew-tracker', name: 'Crew Tracker', icon: '📍', description: 'GPS clock-in for field teams', category: 'Core Business', price: 179, priceId: 'price_widget_crew_tracker', tags: ['gps','time','crews'], size: { w: 2, h: 1 } },
  { id: 'weather', name: 'Weather', icon: '⛅', description: 'Weather-aware job scheduling', category: 'Core Business', price: 99, priceId: 'price_widget_weather', tags: ['weather','forecast','scheduling'], size: { w: 1, h: 1 } },

  // ── MEDIA SUITE ──
  { id: 'media-uploader', name: 'Media Uploader', icon: '📤', description: 'Drag-and-drop cloud upload', category: 'Media Suite', price: 129, priceId: 'price_widget_media_uploader', tags: ['upload','files','cloud'], size: { w: 2, h: 1 } },
  { id: 'image-editor', name: 'Image Editor', icon: '🖼️', description: 'Crop, filters, drawing & overlays', category: 'Media Suite', price: 299, priceId: 'price_widget_image_editor', tags: ['images','editing','filters'], size: { w: 2, h: 2 } },
  { id: 'audio-editor', name: 'Audio Editor', icon: '🎵', description: 'Audio trimming with EQ & effects', category: 'Media Suite', price: 199, priceId: 'price_widget_audio_editor', tags: ['audio','editing','music'], size: { w: 2, h: 1 } },
  { id: 'video-editor', name: 'Video Editor', icon: '🎬', description: 'Video trimming & color grading', category: 'Media Suite', price: 249, priceId: 'price_widget_video_editor', tags: ['video','editing','clips'], size: { w: 2, h: 2 } },
  { id: 'ai-auto-tagger', name: 'AI Auto-Tagger', icon: '🏷️', description: 'Vision-based automatic image tagging', category: 'Media Suite', price: 149, priceId: 'price_widget_ai_auto_tagger', tags: ['ai','tagging','vision'], size: { w: 1, h: 1 } },
  { id: 'ai-smart-search', name: 'AI Smart Search', icon: '🔎', description: 'Natural language media search', category: 'Media Suite', price: 129, priceId: 'price_widget_ai_smart_search', tags: ['ai','search','nlp'], size: { w: 2, h: 1 } },
  { id: 'ai-caption-gen', name: 'AI Captions', icon: '✍️', description: 'Auto-generate media descriptions', category: 'Media Suite', price: 99, priceId: 'price_widget_ai_caption_gen', tags: ['ai','captions','accessibility'], size: { w: 1, h: 1 } },
  { id: 'media-collections', name: 'Media Collections', icon: '📂', description: 'Smart media organization', category: 'Media Suite', price: 99, priceId: 'price_widget_media_collections', tags: ['gallery','organization','albums'], size: { w: 2, h: 2 } },

  // ── HR & OPERATIONS ──
  { id: 'shift-manager', name: 'Shift Manager', icon: '📋', description: 'Employee scheduling & shift management', category: 'HR & Operations', price: 179, priceId: 'price_widget_shift_manager', tags: ['scheduling','shifts','employees'], size: { w: 2, h: 2 } },
  { id: 'payroll-calc', name: 'Payroll Calculator', icon: '💰', description: 'Automated payroll with tax calculations', category: 'HR & Operations', price: 249, priceId: 'price_widget_payroll_calc', tags: ['payroll','taxes','calculations'], size: { w: 2, h: 2 } },
  { id: 'driver-leaderboard', name: 'Driver Leaderboard', icon: '🏆', description: 'Gamified employee performance rankings', category: 'HR & Operations', price: 129, priceId: 'price_widget_driver_leaderboard', tags: ['gamification','rankings','performance'], size: { w: 2, h: 2 } },
  { id: 'compliance-engine', name: 'Compliance Engine', icon: '🛡️', description: 'Worker compliance & document verification', category: 'HR & Operations', price: 199, priceId: 'price_widget_compliance_engine', tags: ['compliance','verification','documents'], size: { w: 2, h: 1 } },
  { id: 'mileage-tracker', name: 'Mileage Tracker', icon: '🚗', description: 'GPS trip logging with expenses', category: 'HR & Operations', price: 99, priceId: 'price_widget_mileage_tracker', tags: ['mileage','gps','expenses'], size: { w: 1, h: 1 } },

  // ── FOOD & DELIVERY ──
  { id: 'delivery-tracker', name: 'Delivery Tracker', icon: '🚚', description: 'Real-time order & delivery tracking', category: 'Food & Delivery', price: 199, priceId: 'price_widget_delivery_tracker', tags: ['delivery','orders','tracking'], size: { w: 2, h: 2 } },
  { id: 'menu-builder', name: 'Menu Builder', icon: '🍽️', description: 'Digital menu with ordering system', category: 'Food & Delivery', price: 149, priceId: 'price_widget_menu_builder', tags: ['menu','food','ordering'], size: { w: 2, h: 2 } },
  { id: 'zone-ordering', name: 'Zone Ordering', icon: '📦', description: 'Zone-based batch ordering with cutoffs', category: 'Food & Delivery', price: 249, priceId: 'price_widget_zone_ordering', tags: ['zones','batch','ordering'], size: { w: 2, h: 1 } },
  { id: 'b2b-ordering', name: 'B2B Ordering', icon: '🏢', description: 'Corporate ordering with vendor matching', category: 'Food & Delivery', price: 249, priceId: 'price_widget_b2b_ordering', tags: ['b2b','corporate','vendors'], size: { w: 2, h: 2 } },

  // ── FINANCE ──
  { id: 'invoice-generator', name: 'Invoice Generator', icon: '🧾', description: 'Professional invoice creation & tracking', category: 'Finance', price: 149, priceId: 'price_widget_invoice_generator', tags: ['invoices','billing','tracking'], size: { w: 2, h: 2 } },
  { id: 'subscription-manager', name: 'Subscription Manager', icon: '💳', description: 'Multi-tier Stripe subscription system', category: 'Finance', price: 249, priceId: 'price_widget_subscription_manager', tags: ['subscriptions','stripe','billing'], size: { w: 2, h: 2 } },
  { id: 'affiliate-dashboard', name: 'Affiliate Dashboard', icon: '🤝', description: 'Referral tracking with revenue share', category: 'Finance', price: 199, priceId: 'price_widget_affiliate_dashboard', tags: ['affiliates','referrals','commissions'], size: { w: 2, h: 2 } },

  // ── AI / ML ──
  { id: 'ocr-scanner', name: 'OCR Scanner', icon: '📸', description: 'Camera-based text & document scanning', category: 'AI & ML', price: 99, priceId: 'price_widget_ocr_scanner', tags: ['ocr','scanning','documents'], size: { w: 1, h: 1 } },
  { id: 'ai-lead-scoring', name: 'AI Lead Scoring', icon: '🧠', description: 'ML lead qualification & priority ranking', category: 'AI & ML', price: 199, priceId: 'price_widget_ai_lead_scoring', tags: ['ai','leads','scoring'], size: { w: 2, h: 1 } },
  { id: 'voice-estimate', name: 'Voice Estimate', icon: '🎤', description: 'AI voice input to structured estimates', category: 'AI & ML', price: 199, priceId: 'price_widget_voice_estimate', tags: ['voice','ai','estimates'], size: { w: 2, h: 1 } },
  { id: 'wellness-assessment', name: 'Wellness Assessment', icon: '🧘', description: 'AI-powered health & dosha analysis', category: 'AI & ML', price: 99, priceId: 'price_widget_wellness_assessment', tags: ['health','wellness','ai'], size: { w: 2, h: 2 } },

  // ── CRYPTO & WEB3 ──
  { id: 'token-scanner', name: 'Token Scanner', icon: '🔐', description: 'Multi-chain token safety analysis', category: 'Crypto & Web3', price: 199, priceId: 'price_widget_token_scanner', tags: ['crypto','tokens','security'], size: { w: 2, h: 1 } },
  { id: 'multi-wallet', name: 'Multi-Wallet', icon: '👛', description: 'Unified wallet for Solana + 22 EVM chains', category: 'Crypto & Web3', price: 299, priceId: 'price_widget_multi_wallet', tags: ['wallet','solana','evm'], size: { w: 2, h: 2 } },

  // ── PLATFORM ──
  { id: 'signal-chat', name: 'Signal Chat', icon: '💬', description: 'Cross-ecosystem community chat with SSO', category: 'Platform', price: 349, priceId: 'price_widget_signal_chat', tags: ['chat','community','sso'], size: { w: 2, h: 2 } },
  { id: 'effects-kit', name: 'Effects Kit', icon: '✨', description: 'Glass, 3D hover, shimmer & animations', category: 'Platform', price: 149, priceId: 'price_widget_effects_kit', tags: ['animations','effects','ui'], size: { w: 1, h: 1 } },
  { id: 'room-visualizer', name: 'Room Visualizer', icon: '🎨', description: 'AI color visualizer for painting & design', category: 'Platform', price: 199, priceId: 'price_widget_room_visualizer', tags: ['paint','visualization','ar'], size: { w: 2, h: 2 } },
  { id: 'emergency-dashboard', name: 'Emergency Dashboard', icon: '🚨', description: 'Real-time emergency command center', category: 'Platform', price: 349, priceId: 'price_widget_emergency_dashboard', tags: ['emergency','alerts','command'], size: { w: 2, h: 2 } },
  { id: 'inventory-counter', name: 'Inventory Counter', icon: '📦', description: '3-phase inventory counting system', category: 'Platform', price: 129, priceId: 'price_widget_inventory_counter', tags: ['inventory','counting','warehouse'], size: { w: 2, h: 1 } },

  // ── AUTO / FLEET ──
  { id: 'vin-decoder', name: 'VIN Decoder', icon: '🔍', description: 'Decode any vehicle by VIN instantly', category: 'Auto & Fleet', price: 129, priceId: 'price_widget_vin_decoder', tags: ['vin','vehicles','decode'], size: { w: 2, h: 1 } },
  { id: 'parts-aggregator', name: 'Parts Aggregator', icon: '🔧', description: 'Search 93+ auto parts retailers', category: 'Auto & Fleet', price: 299, priceId: 'price_widget_parts_aggregator', tags: ['parts','auto','search'], size: { w: 2, h: 2 } },

  // ── ONBOARDING ──
  { id: 'welcome-guide', name: 'Welcome Guide', icon: '👋', description: 'Multi-slide onboarding walkthrough', category: 'Onboarding', price: 79, priceId: 'price_widget_welcome_guide', tags: ['onboarding','walkthrough','setup'], size: { w: 2, h: 2 } },
  { id: 'franchise-onboard', name: 'Franchise Onboard', icon: '🏪', description: 'Multi-step franchise setup wizard', category: 'Onboarding', price: 349, priceId: 'price_widget_franchise_onboard', tags: ['franchise','setup','tenants'], size: { w: 2, h: 2 } },
  { id: 'shop-onboarding', name: 'Shop Onboarding', icon: '🛒', description: 'Business setup with blockchain verification', category: 'Onboarding', price: 199, priceId: 'price_widget_shop_onboarding', tags: ['shop','setup','blockchain'], size: { w: 2, h: 2 } },
  { id: 'calculator-hub', name: 'Calculator Hub', icon: '🧮', description: '85+ professional trade calculators', category: 'Onboarding', price: 149, priceId: 'price_widget_calculator_hub', tags: ['calculators','tools','trades'], size: { w: 2, h: 2 } },

  // ── REAL ESTATE ──
  { id: 'mls-search', name: 'MLS Search', icon: '🏠', description: 'Real estate MLS with 10+ data providers', category: 'Real Estate', price: 299, priceId: 'price_widget_mls_search', tags: ['real estate','mls','listings'], size: { w: 2, h: 2 } },

  // ── WORK ORDERS ──
  { id: 'work-order', name: 'Work Orders', icon: '🔨', description: 'Repair work order management', category: 'Operations', price: 249, priceId: 'price_widget_work_order', tags: ['work orders','repairs','tracking'], size: { w: 2, h: 2 } },

  // ── REVIEWS PRO ──
  { id: 'reviews-pro', name: 'Reviews Pro', icon: '🌟', description: 'Advanced review system with analytics', category: 'Core Business', price: 129, priceId: 'price_widget_reviews_pro', tags: ['reviews','analytics','premium'], size: { w: 2, h: 2 } },
];

const CATEGORIES = [...new Set(WIDGET_CATALOG.map(w => w.category))];

// ═══════════════════════════════════════════════════════
// CANVAS ITEM (placed widget)
// ═══════════════════════════════════════════════════════
interface CanvasItem {
  instanceId: string;
  widgetId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  config: Record<string, string>;
}

// ═══════════════════════════════════════════════════════
// WIDGET BUILDER PAGE
// ═══════════════════════════════════════════════════════
export default function WidgetBuilder() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [dragWidget, setDragWidget] = useState<WidgetDef | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [showCheckout, setShowCheckout] = useState<WidgetDef | null>(null);
  const [purchasedWidgets, setPurchasedWidgets] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('dw_purchased_widgets') || '[]')); } catch { return new Set(); }
  });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Filter widgets
  const filteredWidgets = WIDGET_CATALOG.filter(w => {
    const matchSearch = !search || w.name.toLowerCase().includes(search.toLowerCase()) || w.tags.some(t => t.includes(search.toLowerCase()));
    const matchCat = activeCategory === 'All' || w.category === activeCategory;
    return matchSearch && matchCat;
  });

  // Drag start from palette
  const onDragStart = useCallback((w: WidgetDef) => {
    setDragWidget(w);
  }, []);

  // Drop on canvas
  const onCanvasDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!dragWidget || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const gridCol = Math.max(0, Math.min(5, Math.floor((e.clientX - rect.left) / (rect.width / 6))));
    const gridRow = Math.max(0, Math.floor((e.clientY - rect.top) / 120));
    const newItem: CanvasItem = {
      instanceId: `inst_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      widgetId: dragWidget.id,
      x: gridCol,
      y: gridRow,
      w: dragWidget.size.w,
      h: dragWidget.size.h,
      config: { primaryColor: '#06b6d4', position: 'inline' }
    };
    setCanvasItems(prev => [...prev, newItem]);
    setDragWidget(null);
  }, [dragWidget]);

  // Remove from canvas
  const removeItem = useCallback((id: string) => {
    setCanvasItems(prev => prev.filter(i => i.instanceId !== id));
    if (selectedItem === id) setSelectedItem(null);
  }, [selectedItem]);

  // Update config
  const updateConfig = useCallback((id: string, key: string, value: string) => {
    setCanvasItems(prev => prev.map(i => i.instanceId === id ? { ...i, config: { ...i.config, [key]: value } } : i));
  }, []);

  // Generate embed code
  const generateEmbedCode = useCallback(() => {
    return canvasItems.map(item => {
      const w = WIDGET_CATALOG.find(c => c.id === item.widgetId);
      if (!w) return '';
      return `<!-- ${w.name} Widget -->\n<script src="https://darkwavestudios.io/widgets/tl-${w.id}.js"\n  data-site-id="YOUR_SITE_ID"\n  data-primary-color="${item.config.primaryColor || '#06b6d4'}"\n  data-position="${item.config.position || 'inline'}"\n></script>`;
    }).join('\n\n');
  }, [canvasItems]);

  // Generate Lume code
  const generateLumeCode = useCallback(() => {
    return canvasItems.map(item => {
      const w = WIDGET_CATALOG.find(c => c.id === item.widgetId);
      if (!w) return '';
      return `place widget "${w.id}"\n  at row: ${item.y + 1}, col: ${item.x + 1}\n  with color: "${item.config.primaryColor || '#06b6d4'}"`;
    }).join('\n\n');
  }, [canvasItems]);

  // Simulate purchase
  const purchaseWidget = useCallback((w: WidgetDef) => {
    const updated = new Set(purchasedWidgets);
    updated.add(w.id);
    setPurchasedWidgets(updated);
    localStorage.setItem('dw_purchased_widgets', JSON.stringify([...updated]));
    setShowCheckout(null);
  }, [purchasedWidgets]);

  const selectedWidget = selectedItem ? canvasItems.find(i => i.instanceId === selectedItem) : null;
  const selectedDef = selectedWidget ? WIDGET_CATALOG.find(w => w.id === selectedWidget.widgetId) : null;

  return (
    <>
      <Helmet>
        <title>Widget Builder - DarkWave Studios</title>
        <meta name="description" content="Drag-and-drop widget builder. Build pages visually with 60+ production-ready widgets. No code required." />
      </Helmet>

      <style>{`
        .wb-layout { display: grid; grid-template-columns: 300px 1fr 280px; height: calc(100vh - 64px); overflow: hidden; }
        @media(max-width:1024px) { .wb-layout { grid-template-columns: 240px 1fr; } .wb-config { display: none; } }
        @media(max-width:768px) { .wb-layout { grid-template-columns: 1fr; } .wb-palette { display: none; } }

        .wb-palette { background: rgba(8,12,24,.95); border-right: 1px solid rgba(255,255,255,.06); overflow-y: auto; padding: 0; }
        .wb-palette::-webkit-scrollbar { width: 4px; }
        .wb-palette::-webkit-scrollbar-thumb { background: rgba(255,255,255,.06); border-radius: 4px; }

        .wb-canvas-wrap { background: rgba(3,7,18,.9); overflow-y: auto; padding: 24px; position: relative; }
        .wb-canvas { min-height: 600px; background: rgba(255,255,255,.01); border: 2px dashed rgba(255,255,255,.06); border-radius: 20px; position: relative; display: grid; grid-template-columns: repeat(6, 1fr); grid-auto-rows: 120px; gap: 8px; padding: 16px; transition: all .3s; }
        .wb-canvas.drag-over { border-color: rgba(6,182,212,.3); background: rgba(6,182,212,.02); box-shadow: inset 0 0 60px rgba(6,182,212,.03); }

        .wb-config { background: rgba(8,12,24,.95); border-left: 1px solid rgba(255,255,255,.06); overflow-y: auto; padding: 20px; }

        .wb-search { width: 100%; padding: 12px 16px 12px 40px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06); border-radius: 12px; color: #fff; font-size: 13px; outline: none; font-family: inherit; transition: border-color .25s; }
        .wb-search:focus { border-color: rgba(6,182,212,.3); }
        .wb-search-wrap { position: relative; padding: 16px; }
        .wb-search-icon { position: absolute; left: 28px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,.15); font-size: 14px; pointer-events: none; }

        .wb-cat-pills { display: flex; gap: 4px; padding: 0 16px 12px; overflow-x: auto; scrollbar-width: none; flex-wrap: wrap; }
        .wb-cat-pill { padding: 5px 12px; border-radius: 8px; font-size: 10px; font-weight: 700; cursor: pointer; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.02); color: rgba(255,255,255,.3); transition: all .2s; white-space: nowrap; text-transform: uppercase; letter-spacing: .04em; }
        .wb-cat-pill:hover { border-color: rgba(255,255,255,.1); color: rgba(255,255,255,.5); }
        .wb-cat-pill.active { border-color: rgba(6,182,212,.2); background: rgba(6,182,212,.06); color: #67e8f9; }

        .wb-widget-card { display: flex; align-items: center; gap: 12px; padding: 12px 16px; margin: 0 12px 4px; border-radius: 12px; cursor: grab; border: 1px solid transparent; transition: all .2s; }
        .wb-widget-card:hover { background: rgba(255,255,255,.03); border-color: rgba(255,255,255,.06); }
        .wb-widget-card:active { cursor: grabbing; }
        .wb-widget-card .w-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.04); flex-shrink: 0; }
        .wb-widget-card .w-name { font-size: 12px; font-weight: 700; color: rgba(255,255,255,.7); }
        .wb-widget-card .w-desc { font-size: 10px; color: rgba(255,255,255,.2); margin-top: 1px; }
        .wb-widget-card .w-price { font-size: 10px; font-weight: 800; color: #67e8f9; margin-left: auto; flex-shrink: 0; }
        .wb-widget-card .w-owned { font-size: 9px; font-weight: 700; color: #6ee7b7; margin-left: auto; flex-shrink: 0; padding: 2px 8px; border-radius: 6px; background: rgba(16,185,129,.08); border: 1px solid rgba(16,185,129,.15); }

        .wb-canvas-item { background: rgba(12,18,36,.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,.08); border-radius: 14px; padding: 16px; position: relative; cursor: pointer; transition: all .25s; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; overflow: hidden; }
        .wb-canvas-item:hover { border-color: rgba(6,182,212,.2); transform: scale(1.02); }
        .wb-canvas-item.selected { border-color: rgba(6,182,212,.4); box-shadow: 0 0 20px rgba(6,182,212,.1); }
        .wb-canvas-item .ci-icon { font-size: 28px; margin-bottom: 6px; }
        .wb-canvas-item .ci-name { font-size: 11px; font-weight: 700; color: rgba(255,255,255,.6); }
        .wb-canvas-item .ci-remove { position: absolute; top: 6px; right: 6px; width: 20px; height: 20px; border-radius: 50%; background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.2); color: #fca5a5; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .2s; }
        .wb-canvas-item:hover .ci-remove { opacity: 1; }
        .wb-canvas-item .ci-locked { position: absolute; inset: 0; background: rgba(3,7,18,.7); backdrop-filter: blur(3px); border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 2; }

        .wb-empty-canvas { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; }

        .wb-toolbar { display: flex; align-items: center; justify-content: space-between; padding: 12px 24px; background: rgba(8,12,24,.95); border-bottom: 1px solid rgba(255,255,255,.06); }
        .wb-toolbar h1 { font-size: 16px; font-weight: 900; letter-spacing: -.02em; }
        .wb-toolbar-actions { display: flex; gap: 8px; }

        .wb-btn { padding: 8px 16px; border-radius: 10px; font-size: 11px; font-weight: 700; cursor: pointer; border: none; font-family: inherit; transition: all .25s; }
        .wb-btn-ghost { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.06); color: rgba(255,255,255,.4); }
        .wb-btn-ghost:hover { border-color: rgba(255,255,255,.12); color: rgba(255,255,255,.6); }
        .wb-btn-primary { background: linear-gradient(135deg, #06b6d4, #3b82f6); color: #fff; }
        .wb-btn-primary:hover { box-shadow: 0 0 20px rgba(6,182,212,.3); }

        .wb-cat-header { padding: 12px 16px 6px; font-size: 9px; font-weight: 800; color: rgba(255,255,255,.12); text-transform: uppercase; letter-spacing: .1em; }

        .wb-config-section { margin-bottom: 20px; }
        .wb-config-label { font-size: 9px; font-weight: 700; color: rgba(255,255,255,.2); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 6px; }
        .wb-config-input { width: 100%; padding: 10px 14px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06); border-radius: 10px; color: #fff; font-size: 12px; font-family: inherit; outline: none; }
        .wb-config-input:focus { border-color: rgba(6,182,212,.3); }

        .wb-modal-overlay { position: fixed; inset: 0; background: rgba(3,7,18,.8); backdrop-filter: blur(8px); z-index: 100; display: flex; align-items: center; justify-content: center; }
        .wb-modal { background: rgba(12,18,36,.95); border: 1px solid rgba(255,255,255,.08); border-radius: 20px; padding: 32px; max-width: 560px; width: 90%; max-height: 80vh; overflow-y: auto; }
        .wb-modal pre { background: rgba(0,0,0,.4); border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 16px; font-size: 12px; color: #67e8f9; overflow-x: auto; line-height: 1.7; margin: 12px 0; font-family: 'JetBrains Mono', monospace; white-space: pre-wrap; }

        .wb-checkout-price { font-size: 36px; font-weight: 900; background: linear-gradient(135deg, #f0f9ff, #67e8f9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .wb-counter { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 8px; font-size: 10px; font-weight: 700; background: rgba(6,182,212,.06); border: 1px solid rgba(6,182,212,.12); color: #67e8f9; }
      `}</style>

      {/* ═══ TOOLBAR ═══ */}
      <div className="wb-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ background: 'linear-gradient(135deg, #f0f9ff, #67e8f9, #f0f9ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ◆ Widget Builder
          </h1>
          <span className="wb-counter">{canvasItems.length} placed</span>
          <span className="wb-counter" style={{ background: 'rgba(168,85,247,.06)', borderColor: 'rgba(168,85,247,.12)', color: '#c4b5fd' }}>
            {WIDGET_CATALOG.length} available
          </span>
        </div>
        <div className="wb-toolbar-actions">
          <button className="wb-btn wb-btn-ghost" onClick={() => setCanvasItems([])}>Clear All</button>
          <button className="wb-btn wb-btn-ghost" onClick={() => setShowExport(true)} disabled={canvasItems.length === 0}>
            &lt;/&gt; Export Code
          </button>
          <a href="/trust-layer-hub" className="wb-btn wb-btn-primary" style={{ textDecoration: 'none' }}>
            🛒 Widget Store
          </a>
        </div>
      </div>

      {/* ═══ MAIN LAYOUT ═══ */}
      <div className="wb-layout">

        {/* ── LEFT: Widget Palette ── */}
        <div className="wb-palette">
          <div className="wb-search-wrap">
            <span className="wb-search-icon">🔍</span>
            <input
              className="wb-search"
              placeholder="Search widgets..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="wb-cat-pills">
            <div className={`wb-cat-pill ${activeCategory === 'All' ? 'active' : ''}`} onClick={() => setActiveCategory('All')}>All</div>
            {CATEGORIES.map(c => (
              <div key={c} className={`wb-cat-pill ${activeCategory === c ? 'active' : ''}`} onClick={() => setActiveCategory(c)}>{c}</div>
            ))}
          </div>

          {/* Widget cards sorted by category */}
          {(activeCategory === 'All' ? CATEGORIES : [activeCategory]).map(cat => {
            const items = filteredWidgets.filter(w => w.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                {activeCategory === 'All' && <div className="wb-cat-header">{cat}</div>}
                {items.map(w => (
                  <div
                    key={w.id}
                    className="wb-widget-card"
                    draggable
                    onDragStart={() => onDragStart(w)}
                    onDoubleClick={() => {
                      if (!purchasedWidgets.has(w.id)) { setShowCheckout(w); return; }
                      const newItem: CanvasItem = {
                        instanceId: `inst_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
                        widgetId: w.id, x: 0, y: canvasItems.length, w: w.size.w, h: w.size.h,
                        config: { primaryColor: '#06b6d4', position: 'inline' }
                      };
                      setCanvasItems(prev => [...prev, newItem]);
                    }}
                  >
                    <div className="w-icon">{w.icon}</div>
                    <div>
                      <div className="w-name">{w.name}</div>
                      <div className="w-desc">{w.description}</div>
                    </div>
                    {purchasedWidgets.has(w.id) ? (
                      <span className="w-owned">✓ Owned</span>
                    ) : (
                      <span className="w-price">${w.price}</span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}

          <div style={{ padding: '20px 16px', textAlign: 'center' }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.1)' }}>
              {WIDGET_CATALOG.length} widgets · Drag to canvas or double-click
            </span>
          </div>
        </div>

        {/* ── CENTER: Canvas ── */}
        <div className="wb-canvas-wrap">
          <div
            ref={canvasRef}
            className={`wb-canvas ${dragWidget ? 'drag-over' : ''}`}
            onDragOver={e => e.preventDefault()}
            onDrop={onCanvasDrop}
          >
            {canvasItems.length === 0 && (
              <div className="wb-empty-canvas">
                <div style={{ fontSize: 48, opacity: .15, marginBottom: 16 }}>◆</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'rgba(255,255,255,.12)', marginBottom: 4 }}>Drag widgets here</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.06)' }}>Build your page layout visually</div>
              </div>
            )}

            {canvasItems.map(item => {
              const def = WIDGET_CATALOG.find(w => w.id === item.widgetId);
              if (!def) return null;
              const owned = purchasedWidgets.has(item.widgetId);
              return (
                <div
                  key={item.instanceId}
                  className={`wb-canvas-item ${selectedItem === item.instanceId ? 'selected' : ''}`}
                  style={{
                    gridColumn: `span ${item.w}`,
                    gridRow: `span ${item.h}`,
                    borderColor: selectedItem === item.instanceId ? `${item.config.primaryColor || '#06b6d4'}40` : undefined,
                  }}
                  onClick={() => setSelectedItem(item.instanceId)}
                >
                  <div className="ci-icon">{def.icon}</div>
                  <div className="ci-name">{def.name}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,.15)', marginTop: 2 }}>{def.category}</div>
                  <button className="ci-remove" onClick={e => { e.stopPropagation(); removeItem(item.instanceId); }}>✕</button>

                  {!owned && (
                    <div className="ci-locked">
                      <div style={{ fontSize: 20, marginBottom: 4 }}>🔒</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.3)', marginBottom: 8 }}>Purchase Required</div>
                      <button
                        className="wb-btn wb-btn-primary"
                        style={{ fontSize: 10, padding: '6px 14px' }}
                        onClick={e => { e.stopPropagation(); setShowCheckout(def); }}
                      >
                        ${def.price} · Buy Now
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Lume syntax hint */}
          {canvasItems.length > 0 && (
            <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(6,182,212,.03)', border: '1px solid rgba(6,182,212,.08)', borderRadius: 12, fontSize: 11, color: 'rgba(255,255,255,.2)' }}>
              <span style={{ color: '#67e8f9', fontWeight: 700 }}>◆ Lume Syntax:</span>{' '}
              This layout generates <span style={{ color: '#67e8f9' }}>{canvasItems.length} widget placements</span> in Lume code — 90% less than raw HTML/JS. Click "Export Code" to get both formats.
            </div>
          )}
        </div>

        {/* ── RIGHT: Config Panel ── */}
        <div className="wb-config">
          {selectedDef && selectedWidget ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{selectedDef.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'rgba(255,255,255,.7)' }}>{selectedDef.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.2)', marginTop: 2 }}>{selectedDef.category}</div>
              </div>

              <div className="wb-config-section">
                <div className="wb-config-label">Primary Color</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#06b6d4', '#3b82f6', '#a855f7', '#6ee7b7', '#fbbf24', '#ef4444'].map(c => (
                    <div
                      key={c}
                      onClick={() => updateConfig(selectedWidget.instanceId, 'primaryColor', c)}
                      style={{
                        width: 28, height: 28, borderRadius: 8, background: c, cursor: 'pointer',
                        border: selectedWidget.config.primaryColor === c ? '2px solid #fff' : '2px solid transparent',
                        transition: 'all .2s'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="wb-config-section">
                <div className="wb-config-label">Site ID</div>
                <input className="wb-config-input" placeholder="your-site-id" value={selectedWidget.config.siteId || ''} onChange={e => updateConfig(selectedWidget.instanceId, 'siteId', e.target.value)} />
              </div>

              <div className="wb-config-section">
                <div className="wb-config-label">Position</div>
                <select className="wb-config-input" style={{ appearance: 'none' }} value={selectedWidget.config.position || 'inline'} onChange={e => updateConfig(selectedWidget.instanceId, 'position', e.target.value)}>
                  <option value="inline">Inline</option>
                  <option value="bottom-right">Bottom Right (Float)</option>
                  <option value="bottom-left">Bottom Left (Float)</option>
                  <option value="fullscreen">Fullscreen Modal</option>
                </select>
              </div>

              <div className="wb-config-section">
                <div className="wb-config-label">Size</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,.15)', marginBottom: 4 }}>Width</div>
                    <select className="wb-config-input" value={selectedWidget.w} onChange={e => setCanvasItems(prev => prev.map(i => i.instanceId === selectedWidget.instanceId ? { ...i, w: parseInt(e.target.value) } : i))}>
                      <option value={1}>1 col</option>
                      <option value={2}>2 cols</option>
                      <option value={3}>3 cols</option>
                      <option value={4}>4 cols</option>
                      <option value={6}>Full width</option>
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,.15)', marginBottom: 4 }}>Height</div>
                    <select className="wb-config-input" value={selectedWidget.h} onChange={e => setCanvasItems(prev => prev.map(i => i.instanceId === selectedWidget.instanceId ? { ...i, h: parseInt(e.target.value) } : i))}>
                      <option value={1}>1 row</option>
                      <option value={2}>2 rows</option>
                      <option value={3}>3 rows</option>
                      <option value={4}>4 rows</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <button className="wb-btn wb-btn-ghost" style={{ width: '100%', marginBottom: 8 }} onClick={() => removeItem(selectedWidget.instanceId)}>
                  🗑️ Remove Widget
                </button>
                {!purchasedWidgets.has(selectedDef.id) && (
                  <button className="wb-btn wb-btn-primary" style={{ width: '100%' }} onClick={() => setShowCheckout(selectedDef)}>
                    💳 Purchase · ${selectedDef.price}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <div style={{ fontSize: 32, opacity: .1, marginBottom: 12 }}>⚙️</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.12)' }}>Select a widget</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.06)', marginTop: 4 }}>Click any widget on the canvas to configure it</div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ EXPORT MODAL ═══ */}
      {showExport && (
        <div className="wb-modal-overlay" onClick={() => setShowExport(false)}>
          <div className="wb-modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 900, background: 'linear-gradient(135deg, #f0f9ff, #67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Export Code</h2>
              <button onClick={() => setShowExport(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.3)', fontSize: 18, cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.2)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>HTML Embed</div>
              <pre>{generateEmbedCode() || '<!-- No widgets placed -->'}</pre>
              <button className="wb-btn wb-btn-ghost" style={{ width: '100%' }} onClick={() => navigator.clipboard.writeText(generateEmbedCode())}>
                📋 Copy HTML
              </button>
            </div>

            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#67e8f9', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>
                ◆ Lume Syntax <span style={{ color: 'rgba(255,255,255,.15)', fontWeight: 400 }}>(90% less code)</span>
              </div>
              <pre style={{ color: '#6ee7b7' }}>{generateLumeCode() || '-- No widgets placed'}</pre>
              <button className="wb-btn wb-btn-primary" style={{ width: '100%' }} onClick={() => navigator.clipboard.writeText(generateLumeCode())}>
                ◆ Copy Lume Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ CHECKOUT MODAL ═══ */}
      {showCheckout && (
        <div className="wb-modal-overlay" onClick={() => setShowCheckout(null)}>
          <div className="wb-modal" onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{showCheckout.icon}</div>
            <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 4, color: '#fff' }}>{showCheckout.name}</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', marginBottom: 20, lineHeight: 1.6 }}>{showCheckout.description}</p>
            <div className="wb-checkout-price" style={{ marginBottom: 4 }}>${showCheckout.price}</div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,.15)', marginBottom: 20 }}>One-time purchase · Lifetime updates</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 20 }}>
              {['Frontend code', 'Backend API', 'Documentation', '30-day support', 'Lifetime updates'].map(f => (
                <span key={f} style={{ padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 600, background: 'rgba(16,185,129,.06)', border: '1px solid rgba(16,185,129,.12)', color: '#6ee7b7' }}>
                  ✓ {f}
                </span>
              ))}
            </div>

            <button className="wb-btn wb-btn-primary" style={{ width: '100%', padding: '14px', fontSize: 14, marginBottom: 8 }} onClick={() => purchaseWidget(showCheckout)}>
              💳 Purchase with Stripe · ${showCheckout.price}
            </button>
            <button className="wb-btn wb-btn-ghost" style={{ width: '100%' }} onClick={() => setShowCheckout(null)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
