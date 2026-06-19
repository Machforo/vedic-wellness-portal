import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

export default function PressCoveragePage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("press-coverage");
  const rawPress = Array.isArray(data) ? data : [];
  
  const pressItems = rawPress.length > 0 ? rawPress.map((p: any) => ({
    publication: p.source || "Press Release",
    date: p.date ? new Date(p.date).toLocaleDateString() : "Recent",
    headline: p.title,
    url: p.link,
    image: p.image,
    tag: "News"
  })) : [
    { publication: "Dainik Jagran", date: "15 March 2024", headline: "Ishan Ayurvedic Medical College organizes free health camp for local villages", tag: "Print", image: null, url: "#" },
    { publication: "Amar Ujala", date: "02 Feb 2024", headline: "Students of Ishan Ayurveda excel in university examinations", tag: "Print", image: null, url: "#" },
    { publication: "Hindustan", date: "20 Jan 2024", headline: "Ishan Ayurveda hosts national seminar on classical formulations", tag: "Print", image: null, url: "#" },
    { publication: "Local News TV", date: "05 Dec 2023", headline: "Dhanvantari Jayanti celebrated with enthusiasm at Ishan Ayurveda", tag: "TV", image: null, url: "#" },
  ];

  return (
    <Layout>
      <PageHeader title="Press Coverage" subtitle="Media archives detailing institutional milestones and academic achievements" breadcrumbs={[{ label: "Gallery" }, { label: "Press Coverage" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <p className="reveal leading-relaxed max-w-4xl mx-auto text-center mb-16 text-lg">
            Ishan Ayurvedic Medical College's clinical outreach, medical camps, and academic activities have been featured in regional and national media; this page archives press coverage for students, parents, and the medical community.
          </p>
          <div className="max-w-4xl mx-auto space-y-4">
            {pressItems.map((item, i) => (
              <a href={item.url || "#"} target="_blank" rel="noreferrer" key={i} className={`reveal delay-${Math.min(i, 5)}00 flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 sm:p-6 rounded-xl border bg-card hover:shadow-[0_8px_30px_hsl(var(--navy)/0.06)] transition-all group cursor-pointer`}>
                <div className="w-full sm:w-40 aspect-video sm:aspect-square rounded-lg bg-muted flex flex-col items-center justify-center shrink-0 border relative overflow-hidden">
                   {item.image ? (
                     <img src={item.image} alt={item.headline} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                        <span className="text-xl opacity-40">📰</span>
                     </div>
                   )}
                   <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-bold text-white tracking-widest">READ MORE</span>
                   </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
                    <span className="text-xs font-bold text-navy uppercase tracking-wider">{item.publication}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-xs font-medium text-muted-foreground">{item.date}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="px-2 py-0.5 rounded-md bg-gold/10 text-xs font-bold text-gold-dark">{item.tag}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground leading-tight group-hover:text-navy transition-colors">{item.headline}</h3>
                </div>
              </a>
            ))}
          </div>
          {rawPress.length === 0 && (
            <p className="text-center text-sm text-muted-foreground mt-8">Placeholder news articles shown — add real press coverage via the CMS.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
