import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, GraduationCap, Send, User, Phone as PhoneIcon, BookOpen, ChevronLeft, ChevronRight, CheckCircle, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
    badge: "NCISM Approved · Only Private AYUSH College in NCR",
    title: "Reviving the Science",
    highlight: "of Holistic Healing",
    subtitle: "Ishan Ayurvedic Medical College — Greater Noida's premier institution for classical Ayurvedic education with in-campus teaching hospital.",
    cta1: { label: "BAMS Programme", href: "/courses/bams" },
    cta2: { label: "Campus Tour", href: "/infrastructure" },
  },
  {
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=1600&auto=format&fit=crop",
    badge: "In-Campus Teaching Hospital",
    title: "Clinical Training",
    highlight: "From Year One",
    subtitle: "Students rotate through OPDs and 14 Ayurvedic departments — gaining real patient exposure bridging ancient wisdom with modern diagnosis.",
    cta1: { label: "14 Departments", href: "/kayachikitsa" },
    cta2: { label: "Apply Now", href: "/admissions" },
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    badge: "Living Herbal Garden · 200+ Medicinal Species",
    title: "Rooted in Nature,",
    highlight: "Guided by Knowledge",
    subtitle: "Our herbal garden, dedicated Vaidya faculty, and research culture make IAMC the NCR's destination for authentic Ayurvedic education.",
    cta1: { label: "Herbal Garden", href: "/herbal-garden" },
    cta2: { label: "Campus Life", href: "/news-events" },
  },
];

const SESSION_START = (() => {
  try {
    const key = "ishan_ayurveda_hero_start";
    const s = sessionStorage.getItem(key);
    if (s !== null) return parseInt(s, 10) % SLIDES.length;
    const r = Math.floor(Math.random() * SLIDES.length);
    sessionStorage.setItem(key, String(r));
    return r;
  } catch { return 0; }
})();

const DELAY = 5500;

const newsData = [
  { type: 'EVENT', title: 'Global Ayurvedic Summit 2025', date: 'MAR 14', action: 'popup', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop', details: 'IAMC hosted the Annual Global Ayurvedic Summit bringing together Ayurvedacharyas, NCISM officials, and wellness practitioners for a landmark two-day conference on classical and contemporary Ayurvedic practice.' },
  { type: 'EVENT', title: 'World Yoga Day Celebration', date: 'JUN 21', action: 'popup', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop', details: 'Students and faculty celebrated International Yoga Day with a sunrise session on campus grounds, followed by a seminar on Yoga therapy in clinical Ayurvedic practice.' },
  { type: 'NEWS', title: 'Shishyopanyan Sanshkar — 2025 Induction', date: 'SEP 5', action: 'none' },
  { type: 'EVENT', title: 'Free Medical Camp — Knowledge Park', date: 'FEB 12', action: 'popup', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop', details: 'IAMC students and faculty organised a free Ayurvedic health camp serving over 200 patients, providing Nadi Pariksha, dietary counselling, and herbal medicine distribution.' },
  { type: 'NEWS', title: 'New Panchkarma Suite Inaugurated', date: 'JAN 20', action: 'popup', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop', details: 'A new fully-equipped Panchkarma therapy suite has been added to the IAMC teaching hospital, providing students hands-on training in Shirodhara, Abhyanga, and Basti therapies.' }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(SESSION_START);
  const [formData, setFormData] = useState({ name: "", phone: "", course: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [heroActiveTab, setHeroActiveTab] = useState<'enquiry' | 'campus'>('enquiry');
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleNewsClick = (item: any) => {
    if (item.action === 'popup') setSelectedNews(item);
    else toast.info("Notification: " + item.title);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.phone)) { toast.error("Please enter a valid 10-digit phone number."); return; }
    setIsSubmitted(true);
    toast.success("Application received! Our counsellor will call you shortly.");
    setTimeout(() => { setIsSubmitted(false); setFormData({ name: "", phone: "", course: "" }); }, 5000);
  };

  const go = useCallback((idx: number) => { setCurrent((idx + SLIDES.length) % SLIDES.length); }, []);
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => { setCurrent((c) => (c + 1) % SLIDES.length); }, DELAY);
  }, []);

  useEffect(() => { resetTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []); // eslint-disable-line

  const slide = SLIDES[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {SLIDES.map((s, i) => (
        <div key={i} aria-hidden={i !== current} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === current ? 1 : 0 }}>
          <img src={s.image} alt="" loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" style={{ transform: i === current ? "scale(1.04)" : "scale(1)", transition: "transform 7000ms ease-in-out" }} />
        </div>
      ))}
      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to right, rgba(10,20,50,0.92) 0%, rgba(10,20,50,0.60) 50%, rgba(10,20,50,0.25) 100%)" }} />
      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 35%)" }} />

      <div className="relative z-20 w-full container-wide pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-7">
            <div key={`badge-${current}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm" style={{ animation: "fadeUp 0.5s ease both" }}>
              <Award className="w-4 h-4 text-gold shrink-0" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">{slide.badge}</span>
            </div>
            <h1 key={`h1-${current}`} className="font-bold text-white leading-[1.1] tracking-tight drop-shadow-xl" style={{ animation: "fadeUp 0.55s 0.06s ease both" }}>
              {slide.title}<span className="text-gold block mt-1">{slide.highlight}</span>
            </h1>
            <p key={`sub-${current}`} className="text-lg md:text-xl text-white/85 max-w-xl leading-relaxed" style={{ animation: "fadeUp 0.55s 0.12s ease both" }}>{slide.subtitle}</p>
            <div key={`cta-${current}`} className="flex flex-wrap gap-4" style={{ animation: "fadeUp 0.55s 0.18s ease both" }}>
              <Link to={slide.cta1.href} className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold bg-gold text-navy rounded-xl shadow-[0_8px_30px_rgba(190,140,40,0.35)] hover:shadow-[0_12px_40px_rgba(190,140,40,0.5)] hover:scale-105 active:scale-95 transition-all shimmer-btn">
                {slide.cta1.label} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to={slide.cta2.href} className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white border-2 border-white/40 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all">
                <GraduationCap className="w-4 h-4" />{slide.cta2.label}
              </Link>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => { go(current - 1); resetTimer(); }} aria-label="Previous" className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/15 transition-all"><ChevronLeft className="w-4 h-4" /></button>
              <div className="flex gap-2">
                {SLIDES.map((_, i) => (
                  <button key={i} onClick={() => { go(i); resetTimer(); }} aria-label={`Slide ${i + 1}`} className="h-1.5 rounded-full transition-all duration-500" style={{ width: i === current ? "2rem" : "0.75rem", background: i === current ? "hsl(var(--gold))" : "rgba(255,255,255,0.35)" }} />
                ))}
              </div>
              <button onClick={() => { go(current + 1); resetTimer(); }} aria-label="Next" className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/15 transition-all"><ChevronRight className="w-4 h-4" /></button>
              <span className="ml-2 text-xs font-bold text-white/40 tabular-nums">{String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[540px]">
              <div className="flex border-b border-navy/5">
                <button onClick={() => setHeroActiveTab('enquiry')} className={`flex-1 py-5 text-xs font-bold uppercase tracking-widest transition-all ${heroActiveTab === 'enquiry' ? 'bg-white text-navy' : 'bg-navy/[0.03] text-muted-foreground hover:bg-navy/[0.05]'}`}>Quick Enquiry</button>
                <button onClick={() => setHeroActiveTab('campus')} className={`flex-1 py-5 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${heroActiveTab === 'campus' ? 'bg-white text-navy' : 'bg-navy/[0.03] text-muted-foreground hover:bg-navy/[0.05]'}`}>
                  <Sparkles size={14} className="text-gold" />Campus Life
                </button>
              </div>
              <div className="flex-1 relative">
                {heroActiveTab === 'enquiry' && (
                  <div className="p-8 lg:p-10 animate-in fade-in slide-in-from-left-4 duration-300 h-[470px] flex flex-col">
                    <div className="mb-7">
                      <h3 className="text-2xl font-bold text-navy mb-2">Quick Enquiry</h3>
                      <p className="text-xs leading-relaxed font-medium uppercase tracking-wider">Begin your journey as a Vaidya</p>
                    </div>
                    {isSubmitted ? (
                      <div className="py-10 text-center space-y-6 flex-1 flex flex-col justify-center">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto"><CheckCircle className="w-8 h-8 text-green-600" /></div>
                        <div className="space-y-2"><h4 className="text-xl font-bold text-navy">Request Received!</h4><p className="text-sm text-muted-foreground leading-relaxed px-4">Our admissions counsellor will call within 2 working hours.</p></div>
                        <button onClick={() => setIsSubmitted(false)} className="text-xs font-bold text-navy hover:text-gold transition-colors underline">Submit another</button>
                      </div>
                    ) : (
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" /><input type="text" placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} required className="w-full pl-10 pr-4 py-3.5 bg-muted/60 border rounded-xl outline-none focus:ring-2 focus:ring-gold/60 focus:bg-white transition-all text-sm" /></div>
                        <div className="relative"><PhoneIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" /><input type="tel" placeholder="Mobile Number *" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} required className="w-full pl-10 pr-4 py-3.5 bg-muted/60 border rounded-xl outline-none focus:ring-2 focus:ring-gold/60 focus:bg-white transition-all text-sm" /></div>
                        <div className="relative"><BookOpen size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" /><select required value={formData.course} onChange={(e) => setFormData((p) => ({ ...p, course: e.target.value }))} className="w-full pl-10 pr-4 py-3.5 bg-muted/60 border rounded-xl outline-none focus:ring-2 focus:ring-gold/60 focus:bg-white appearance-none transition-all text-sm cursor-pointer"><option value="">Select Programme *</option><option>BAMS — 5.5 Years (incl. Internship)</option></select></div>
                        <div className="flex items-start gap-2 pt-1"><input type="checkbox" id="hero-consent" className="mt-1 accent-gold w-4 h-4" defaultChecked /><label htmlFor="hero-consent" className="text-xs leading-relaxed">I authorise IAMC to contact me regarding my BAMS admission enquiry.</label></div>
                        <button type="submit" className="w-full py-4 bg-navy text-white font-bold rounded-xl shadow-lg hover:bg-gold hover:text-navy transition-all flex items-center justify-center gap-2 group mt-4">Request Callback<Send size={16} className="group-hover:translate-x-1 transition-transform" /></button>
                      </form>
                    )}
                  </div>
                )}
                {heroActiveTab === 'campus' && (
                  <div className="p-8 lg:p-10 animate-in fade-in slide-in-from-right-4 duration-300 h-[470px] flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <div><h3 className="text-2xl font-bold text-navy flex items-center gap-2">Campus Life<div className="w-1.5 h-1.5 bg-destructive rounded-full animate-pulse" /></h3><p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mt-1">What's happening at IAMC</p></div>
                      <Link to="/news-events" className="text-xs font-bold text-gold hover:text-navy transition-colors flex items-center gap-1">View All <ArrowRight size={12} /></Link>
                    </div>
                    <div className="flex-1 relative overflow-hidden group mb-6">
                      <div className="flex flex-col gap-4 animate-marquee-vertical group-hover:pause">
                        {newsData.concat(newsData.slice(0, 2)).map((item, idx) => (
                          <div key={idx} onClick={() => handleNewsClick(item)} className="p-4 rounded-2xl bg-muted/20 border border-transparent hover:border-gold/20 hover:bg-white hover:shadow-xl transition-all cursor-pointer group/item">
                            <div className="flex items-center gap-2 mb-2"><span className={`text-xs font-black tracking-widest px-1.5 py-0.5 rounded ${item.type === 'EVENT' ? 'bg-gold text-navy' : 'bg-navy text-white'}`}>{item.type}</span><span className="text-xs text-muted-foreground font-bold italic">{item.date}</span></div>
                            <h4 className="text-sm font-bold leading-tight group-hover/item:text-gold transition-colors italic">"{item.title}"</h4>
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/95 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/95 to-transparent pointer-events-none" />
                    </div>
                    <div className="mt-auto pt-6 border-t border-dashed border-navy/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-navy/60 font-bold italic"><Sparkles size={14} className="text-gold" /><span>Authentic Ayurvedic Education</span></div>
                      <Link to="/infrastructure" className="text-xs font-bold text-navy hover:text-gold transition-colors">Campus Tour</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 100V40C240 10 480 10 720 40C960 70 1200 70 1440 40V100H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/60 backdrop-blur-md">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedNews(null)} className="absolute inset-0" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <button onClick={() => setSelectedNews(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/10 text-navy hover:bg-gold transition-colors flex items-center justify-center z-10"><X size={24} /></button>
              <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden"><img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent flex items-end p-8"><span className="text-white/80 text-xs font-bold uppercase tracking-widest">{selectedNews.date}</span></div></div>
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6"><span className={`text-xs font-black tracking-widest px-2.5 py-1 rounded-lg ${selectedNews.type === 'EVENT' ? 'bg-gold text-navy' : 'bg-navy text-white'}`}>{selectedNews.type}</span></div>
                <h2 className="font-bold text-navy mb-6 leading-tight italic">"{selectedNews.title}"</h2>
                <p className="text-foreground/70 leading-relaxed text-base mb-8">{selectedNews.details}</p>
                <div className="mt-auto flex flex-wrap gap-4 pt-6 border-t border-navy/5">
                  <button className="px-8 py-3 bg-navy text-white font-bold rounded-xl hover:bg-gold hover:text-navy transition-all shadow-lg shimmer-btn">Know More</button>
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
