import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Users, FileText } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import PageGallery from "@/components/PageGallery";

export default function ResearchJournalPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("research");
  const journal = data?.researchJournal || {};

  const defaultStats = [
    { label: "Journal Name", value: "Ishan Ayurveda Journal" },
    { label: "Frequency", value: "Bi-annual" },
    { label: "Format", value: "Peer-Reviewed" },
    { label: "Focus", value: "Ayurvedic & Integrative Medicine" }
  ];
  const stats = journal.stats?.length > 0 ? journal.stats : defaultStats;

  return (
    <Layout>
      <PageHeader
        title={journal.title || "Research Journal"}
        subtitle={journal.subtitle || "Peer-reviewed Ayurvedic research journal publishing clinical studies, case reports, and classical text re-examination"}
        breadcrumbs={[{ label: "Research", href: "/publications" }, { label: "Research Journal" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="reveal-left space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Ishan Ayurveda Journal</p>
              <h2 className="font-bold text-foreground leading-tight">Advancing Ayurvedic Scholarship Through Rigorous Research</h2>
              {journal.description ? (
                <div className="text-foreground/70 leading-relaxed [&>p]:m-0" dangerouslySetInnerHTML={{ __html: journal.description }}></div>
              ) : (
                <p className="text-foreground/70 leading-relaxed">IAMC's peer-reviewed Ayurvedic research journal provides a platform for faculty, scholars, students, and Ayurvedic practitioners to publish clinical studies, case reports, literature reviews, and experimental research — bridging classical and contemporary Ayurvedic science.</p>
              )}
            </div>
            <div className="reveal-right">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src={journal.image || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop"} alt="Research Journal" className="w-full h-[350px] object-cover" />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((s: any) => (
              <div key={s.label} className="reveal p-5 rounded-xl border bg-card text-center">
                <p className="font-bold text-navy text-sm">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          {journal.guidelinesLink && (
            <div className="text-center">
              <a href={journal.guidelinesLink} className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold/90 transition-all">
                <FileText className="w-4 h-4" /> Download Submission Guidelines
              </a>
            </div>

          )}

          {journal?.boardHeadshots && journal.boardHeadshots.length > 0 && (
            <div className="reveal mt-16 pt-16 border-t border-border">
              <h3 className="font-bold text-foreground mb-8 text-center">Editorial Board</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {journal.boardHeadshots.map((person: any, idx: number) => (
                  <div key={idx} className="text-center group">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-sm border border-border mb-3 group-hover:shadow-md transition-shadow">
                      <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{person.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {journal?.researchActivityImages && journal.researchActivityImages.length > 0 && (
            <div className="reveal mt-16 pt-16 border-t border-border">
              <h3 className="font-bold text-foreground mb-8 text-center">Research Activities</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {journal.researchActivityImages.map((photo: any, idx: number) => (
                  <div key={idx} className="rounded-xl overflow-hidden aspect-video shadow-sm border border-border group relative">
                    <img src={photo.image} alt={photo.caption || "Research Activity"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {photo.caption && (
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
      <PageGallery images={data?.pageGallery} />
      <EnquiryCTA />
    </Layout>
  );
}
