import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, GraduationCap, Send, User, Phone as PhoneIcon, BookOpen, ChevronLeft, ChevronRight, CheckCircle, Newspaper, Sparkles, Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// ─── Slides ───────────────────────────────────────────────────────────────────
// ─── Slides ───────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    image: "https://law.ishan.ac/all-law/gallery-photos/key-highlights/key-highlights-1.jpg",
    badge: "BCI Approved · NAAC Accredited · CCS University Affiliated",
    title: "Forge Your Legacy in",
    highlight: "India's Courtrooms",
    subtitle: "Excellence in legal education through integrated BA LLB (Hons) and Professional LLB programs in Greater Noida.",
    cta1: { label: "Our Law Programs", href: "/programs-overview" },
    cta2: { label: "Moot Court Tour", href: "/moot-court" },
  },
  {
    image: "https://law.ishan.ac/all-law/gallery-photos/key-highlights/key-highlights-5.jpg",
    badge: "Clinical Legal Education",
    title: "Learn Law by",
    highlight: "Practicing It",
    subtitle: "Mandatory court visits, regular moot court sessions, and legal aid clinics ensure you are practice-ready from day one.",
    cta1: { label: "Clinical Training", href: "/moot-court" },
    cta2: { label: "Apply for 2025", href: "/admissions" },
  },
  {
    image: "https://law.ishan.ac/all-law/gallery-photos/academics/academics-11.jpg",
    badge: "Specialized Legal Infrastructure",
    title: "Dedicated Resources",
    highlight: "For Future Advocates",
    subtitle: "Comprehensive legal library, state-of-the-art moot court hall, and digital research terminals with Manupatra & SCC Online.",
    cta1: { label: "Explore Library", href: "/library" },
    cta2: { label: "Virtual Campus", href: "/infrastructure" },
  },
  {
    image: "https://law.ishan.ac/all-law/gallery-photos/key-highlights/key-highlights-8.jpg",
    badge: "Career Outcomes",
    title: "From Classrooms to",
    highlight: "Judicial Chambers",
    subtitle: "Structured guidance for Judiciary, Advocacy, and Corporate Legal roles. Join a network of successful legal professionals.",
    cta1: { label: "Placement Cell", href: "/placements" },
    cta2: { label: "Alumni Network", href: "/alumni-network" },
  },
];

// Pick a random start index once per browser session
const SESSION_START = (() => {
  try {
    const key = "ishan_law_hero_start";
    const s = sessionStorage.getItem(key);
    if (s !== null) return parseInt(s, 10) % SLIDES.length;
    const r = Math.floor(Math.random() * SLIDES.length);
    sessionStorage.setItem(key, String(r));
    return r;
  } catch { return 0; }
})();

const DELAY = 5500;

export default function HeroSection() {
  const [current, setCurrent] = useState(SESSION_START);
  const [formData, setFormData] = useState({ name: "", phone: "", course: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [heroActiveTab, setHeroActiveTab] = useState<'enquiry' | 'campus'>('enquiry');
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const newsData = [
    { 
      type: 'EVENT', 
      title: 'National Moot Court Competition 2025', 
      date: 'MAR 22', 
      action: 'popup',
      image: 'https://law.ishan.ac/all-law/gallery-photos/key-highlights/key-highlights-1.jpg',
      details: 'Ishan Law Institute hosts its annual National Moot Court Competition. Teams from across India will debate complex constitutional issues before a bench of sitting and retired High Court judges.'
    },
    { 
      type: 'NEWS', 
      title: 'Legal Aid Cell Camp at Greater Noida', 
      date: 'FEB 18', 
      action: 'popup',
      image: 'https://law.ishan.ac/all-law/gallery-photos/key-highlights/key-highlights-7.jpg',
      details: 'Our students served over 50 community members in our latest free legal awareness and assistance camp, focusing on family law and property rights.'
    },
    { 
      type: 'VISIT', 
      title: 'Students Visit Supreme Court of India', 
      date: 'JAN 25', 
      action: 'none'
    },
    { 
      type: 'EVENT', 
      title: 'Seminar on Digital Personal Data Protection', 
      date: 'APR 12', 
      action: 'popup',
      image: 'https://law.ishan.ac/all-law/gallery-photos/academics/academics-1.jpg',
      details: 'Eminent legal scholars and industry experts discuss the implications of India’s new data protection law on corporate compliance and individual privacy.'
    },
    { 
      type: 'NEWS', 
      title: 'Moot Court Hall Upgraded with Digital Tech', 
      date: 'DEC 15', 
      action: 'popup',
      image: 'https://law.ishan.ac/static/gallery/infra/infra-16.jpg',
      details: 'New high-definition recording and video conferencing facilities installed in the Moot Court Hall to support international competitions and self-review.'
    }
  ];

  const handleNewsClick = (item: any) => {
    if (item.action === 'popup') {
      setSelectedNews(item);
    } else if (item.action === 'link') {
      window.location.href = item.url || '/news';
    } else {
      toast.info("Notification: " + item.title);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    console.log("Admission enquiry submitted:", formData);
    setIsSubmitted(true);
    toast.success("Application received! Our admissions team will reach out shortly.");
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", course: "" });
    }, 5000);
  };

  const go = useCallback((idx: number) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
  }, []);

  const resetTimer = useCallback((idx?: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const start = idx ?? current;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, DELAY);
    return start;
  }, [current]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">

      {/* ── Background images (simple absolute stack, only current is visible) ── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className="w-full h-full object-cover"
            style={{
              transform: i === current ? "scale(1.04)" : "scale(1)",
              transition: "transform 7000ms ease-in-out",
            }}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to right, rgba(10,20,50,0.92) 0%, rgba(10,20,50,0.60) 50%, rgba(10,20,50,0.25) 100%)" }} />
      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 35%)" }} />

      {/* Content */}
      <div className="relative z-20 w-full container-wide pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── Text side ── */}
          <div className="lg:col-span-7 space-y-7">

            {/* Badge */}
            <div key={`badge-${current}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm" style={{ animation: "fadeUp 0.5s ease both" }}>
              <Award className="w-4 h-4 text-gold shrink-0" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">{slide.badge}</span>
            </div>

            {/* Headline */}
            <h1 key={`h1-${current}`} className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold text-white leading-[1.1] tracking-tight drop-shadow-xl" style={{ animation: "fadeUp 0.55s 0.06s ease both" }}>
              {slide.title}
              <span className="text-gold block mt-1">{slide.highlight}</span>
            </h1>

            {/* Subtitle */}
            <p key={`sub-${current}`} className="text-lg md:text-xl text-white/85 max-w-xl leading-relaxed" style={{ animation: "fadeUp 0.55s 0.12s ease both" }}>
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div key={`cta-${current}`} className="flex flex-wrap gap-4" style={{ animation: "fadeUp 0.55s 0.18s ease both" }}>
              <Link to={slide.cta1.href} className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold bg-gold text-navy rounded-xl shadow-[0_8px_30px_rgba(212,175,55,0.35)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 transition-all shimmer-btn">
                {slide.cta1.label} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to={slide.cta2.href} className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white border-2 border-white/40 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all">
                <GraduationCap className="w-4 h-4" />
                {slide.cta2.label}
              </Link>
            </div>

            {/* Slide controls */}
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => { go(current - 1); resetTimer(); }} aria-label="Previous" className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/15 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                {SLIDES.map((_, i) => (
                  <button key={i} onClick={() => { go(i); resetTimer(); }} aria-label={`Slide ${i + 1}`}
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{ width: i === current ? "2rem" : "0.75rem", background: i === current ? "hsl(var(--gold))" : "rgba(255,255,255,0.35)" }}
                  />
                ))}
              </div>

              <button onClick={() => { go(current + 1); resetTimer(); }} aria-label="Next" className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/15 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="ml-2 text-[11px] font-bold text-white/40 tabular-nums">
                {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* ── Combined Enquiry & Campus Life (Tabbed) ── */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[540px]">
              
              {/* Tabs Header */}
              <div className="flex border-b border-navy/5">
                <button 
                  onClick={() => setHeroActiveTab('enquiry')}
                  className={`flex-1 py-5 text-xs font-bold uppercase tracking-widest transition-all ${heroActiveTab === 'enquiry' ? 'bg-white text-navy' : 'bg-navy/[0.03] text-muted-foreground hover:bg-navy/[0.05]'}`}
                >
                  Quick Enquiry
                </button>
                <button 
                  onClick={() => setHeroActiveTab('campus')}
                  className={`flex-1 py-5 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${heroActiveTab === 'campus' ? 'bg-white text-navy' : 'bg-navy/[0.03] text-muted-foreground hover:bg-navy/[0.05]'}`}
                >
                  <Sparkles size={14} className="text-gold" />
                  Campus Life
                </button>
              </div>

              <div className="flex-1 relative">
                {/* Quick Enquiry Form View */}
                {heroActiveTab === 'enquiry' && (
                  <div className="p-8 lg:p-10 animate-in fade-in slide-in-from-left-4 duration-300 h-[470px] flex flex-col">
                    <div className="mb-7">
                      <h3 className="text-2xl font-display font-bold text-navy mb-2">Quick Enquiry</h3>
                      <p className="text-xs text-foreground/60 leading-relaxed font-medium uppercase tracking-wider">Start your professional journey</p>
                    </div>
                    
                    {isSubmitted ? (
                      <div className="py-10 text-center space-y-6 flex-1 flex flex-col justify-center">
                        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="w-8 h-8 text-success" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-display font-bold text-navy">Request Received!</h4>
                          <p className="text-[13px] text-muted-foreground leading-relaxed px-4">
                            Our counselor will call you within 24 hours to guide you.
                          </p>
                        </div>
                        <button onClick={() => setIsSubmitted(false)} className="text-xs font-bold text-navy hover:text-gold transition-colors underline">Submit another</button>
                      </div>
                    ) : (
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                          <input type="text" placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} required className="w-full pl-10 pr-4 py-3.5 bg-muted/60 border rounded-xl outline-none focus:ring-2 focus:ring-gold/60 focus:bg-white transition-all text-sm" />
                        </div>
                        <div className="relative">
                          <PhoneIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                          <input type="tel" placeholder="Mobile Number *" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} required className="w-full pl-10 pr-4 py-3.5 bg-muted/60 border rounded-xl outline-none focus:ring-2 focus:ring-gold/60 focus:bg-white transition-all text-sm" />
                        </div>
                        <div className="relative">
                          <BookOpen size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                          <select required value={formData.course} onChange={(e) => setFormData((p) => ({ ...p, course: e.target.value }))} className="w-full pl-10 pr-4 py-3.5 bg-muted/60 border rounded-xl outline-none focus:ring-2 focus:ring-gold/60 focus:bg-white appearance-none transition-all text-sm cursor-pointer">
                            <option value="">Select Programme *</option>
                            <option>BA LLB (Hons) - 5 Years</option>
                            <option>LLB - 3 Years</option>
                            <option>LLM - 2 Years</option>
                          </select>
                        </div>
                        <div className="flex items-start gap-2 pt-1">
                          <input type="checkbox" id="hero-consent" className="mt-1 accent-gold w-4 h-4" defaultChecked />
                          <label htmlFor="hero-consent" className="text-[11px] text-foreground/60 leading-relaxed">
                            I authorize Ishan Law to contact me regarding my admission inquiry.
                          </label>
                        </div>
                        <button type="submit" className="w-full py-4 bg-navy text-white font-bold rounded-xl shadow-lg hover:bg-gold hover:text-navy transition-all flex items-center justify-center gap-2 group mt-4">
                          Request Callback
                          <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* Campus Life View */}
                {heroActiveTab === 'campus' && (
                  <div className="p-8 lg:p-10 animate-in fade-in slide-in-from-right-4 duration-300 h-[470px] flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-display font-bold text-navy flex items-center gap-2">
                          Campus Life
                          <div className="w-1.5 h-1.5 bg-destructive rounded-full animate-pulse" />
                        </h3>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">What's going on at Ishan</p>
                      </div>
                      <Link to="/news" className="text-[10px] font-bold text-gold hover:text-navy transition-colors flex items-center gap-1">
                        View All <ArrowRight size={12} />
                      </Link>
                    </div>

                    <div className="flex-1 relative overflow-hidden group mb-6">
                      <div className="flex flex-col gap-4 animate-marquee-vertical group-hover:pause">
                        {newsData.concat(newsData.slice(0, 2)).map((item, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => handleNewsClick(item)}
                            className="p-4 rounded-2xl bg-muted/20 border border-transparent hover:border-gold/20 hover:bg-white hover:shadow-xl transition-all cursor-pointer group/item"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded ${item.type === 'EVENT' ? 'bg-gold text-navy' : 'bg-navy text-white'}`}>
                                {item.type}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-bold italic">{item.date}</span>
                            </div>
                            <h4 className="text-[13px] font-bold leading-tight group-hover/item:text-gold transition-colors italic">"{item.title}"</h4>
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/95 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/95 to-transparent pointer-events-none" />
                    </div>

                    <div className="mt-auto pt-6 border-t border-dashed border-navy/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[11px] text-navy/60 font-bold italic">
                        <Sparkles size={14} className="text-gold" />
                        <span>30 Years of Academic Excellence</span>
                      </div>
                      <Link to="/campus-experience" className="text-[10px] font-bold text-navy hover:text-gold transition-colors">Campus Tour</Link>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 100V40C240 10 480 10 720 40C960 70 1200 70 1440 40V100H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      {/* Keyframes via inline style tag */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {/* News Detail Popup Modal */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedNews(null)} 
              className="absolute inset-0" 
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/10 text-navy hover:bg-gold transition-colors flex items-center justify-center z-10"
              >
                <X size={24} />
              </button>

              {/* Left Side: Image */}
              <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden">
                <img 
                  src={selectedNews.image} 
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent flex items-end p-8">
                   <span className="text-white/80 text-xs font-bold uppercase tracking-widest">{selectedNews.date}</span>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-[10px] font-black tracking-widest px-2.5 py-1 rounded-lg ${selectedNews.type === 'EVENT' ? 'bg-gold text-navy' : 'bg-navy text-white'}`}>
                    {selectedNews.type}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-6 leading-tight italic">"{selectedNews.title}"</h2>
                <p className="text-foreground/70 leading-relaxed text-base mb-8 whitespace-pre-wrap">
                  {selectedNews.details}
                </p>
                
                <div className="mt-auto flex flex-wrap gap-4 pt-6 border-t border-navy/5">
                  <button className="px-8 py-3 bg-navy text-white font-bold rounded-xl hover:bg-gold hover:text-navy transition-all shadow-lg shimmer-btn">Register Now</button>
                  <button onClick={() => setSelectedNews(null)} className="px-8 py-3 text-navy font-bold hover:text-gold transition-colors">Close</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
