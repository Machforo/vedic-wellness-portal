import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { Calendar, Search, X } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";


const defaultEvents: any[] = [];

export default function NewsEventsPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("news");
  
  const rawNews = Array.isArray(data) ? data : [];
  const events = rawNews.length > 0 
    ? rawNews.map((e: any) => ({ ...e, excerpt: e.description })) 
    : defaultEvents;

  const categories = ["All", ...Array.from(new Set(events.map((e: any) => e.category))).filter(Boolean) as string[]];
  const [activeCategory, setActiveCategory] = useState("All");
  const [newsSearch, setNewsSearch] = useState("");

  const filteredEvents = events.filter((e: any) => {
    const matchesCategory = activeCategory === "All" || e.category === activeCategory;
    const matchesSearch = newsSearch.trim() === "" || 
      e.title?.toLowerCase().includes(newsSearch.toLowerCase()) || 
      (e.excerpt || "").toLowerCase().includes(newsSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <PageHeader
        title="News & Events"
        subtitle="Stay updated with the latest happenings at Ishan Ayurvedic Medical College — medical camps, seminars, and more"
        breadcrumbs={[{ label: "News & Events" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="reveal max-w-2xl mx-auto mb-10 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-gold transition-colors" />
            <input 
              type="text" 
              placeholder="Search news, events, seminars..."
              value={newsSearch}
              onChange={(e) => setNewsSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-card border rounded-2xl outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all text-sm shadow-[0_4px_20px_hsl(var(--navy)/0.03)]"
            />
            {newsSearch && (
              <button 
                onClick={() => setNewsSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {categories.length > 1 && (
            <div className="reveal flex flex-wrap gap-2 mb-12 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all active:scale-[0.97] ${
                    activeCategory === cat ? "bg-navy text-white shadow-lg shadow-navy/20" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((item: any, i: number) => (
              <article key={item._id || i} className={`reveal delay-${Math.min(i % 3, 2)}00 group bg-card rounded-xl border overflow-hidden shadow-sm hover:shadow-[0_8px_30px_hsl(var(--navy)/0.1)] transition-shadow cursor-pointer flex flex-col h-full`}>
                <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-navy/5">
                      <span className="text-4xl font-bold text-navy/10">{(item.category || item.title || "N")?.[0]}</span>
                    </div>
                  )}
                  {item.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-navy shadow-sm uppercase tracking-wider">{item.category}</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 text-gold" /> {item.date ? new Date(item.date).toLocaleDateString() : "Recent"}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground leading-snug mb-3 group-hover:text-navy transition-colors">{item.title}</h3>
                  {item.excerpt && <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3 mb-4 flex-1">{item.excerpt}</p>}
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noreferrer" className="text-sm font-bold text-navy hover:text-gold transition-colors inline-flex items-center gap-1 mt-auto">
                      Read More <span aria-hidden="true">&rarr;</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          
          {events.length === 0 && (
            <div className="reveal py-20 text-center bg-muted/30 rounded-3xl border border-dashed">
              <p className="text-muted-foreground">No news or events found.</p>
              <p className="text-center text-sm text-muted-foreground mt-4">Add news articles via the CMS to populate this section.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
