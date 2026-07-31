import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { Lock, GraduationCap } from "lucide-react";
import PageGallery from "@/components/PageGallery";

export default function StudentPortalPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("digital");
  const portal = data?.studentPortal || {};

  return (
    <Layout>
      <PageHeader 
        title={portal?.title || "Student Portal"} 
        subtitle={portal?.subtitle || "Access timetables, attendance, and university results"} 
        breadcrumbs={[{ label: "Students" }, { label: "Student Portal" }]} 
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="reveal space-y-8">
              {portal?.description ? (
                <div className="text-foreground/70 leading-relaxed whitespace-pre-wrap [&>p]:m-0" dangerouslySetInnerHTML={{ __html: portal.description }}></div>
              ) : (
                <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">Current BAMS students can access their academic profiles, attendance records, clinical postings, and library resources through the unified student portal. University examination results are available via the official Mahayogi Guru Gorakhnath AYUSH University portal.</p>
              )}
              <div className="rounded-2xl overflow-hidden shadow-2xl border bg-navy/5">
                <img src={portal?.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"} alt="Ishan Ayurveda Student Resources" className="w-full h-80 object-cover" />
              </div>
            </div>
            
            <div className="space-y-6">
              {portal?.link ? (
                <div className="flex justify-center">
                  <a href={portal.link} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-gold text-foreground rounded-lg shadow-[0_4px_16px_hsl(var(--gold)/0.3)] hover:shadow-[0_6px_24px_hsl(var(--gold)/0.4)] transition-shadow active:scale-[0.97]">
                    <Lock className="w-4 h-4" /> Access Student Portal →
                  </a>
                </div>
              ) : (
                <div className="reveal delay-100 grid gap-4">
                  <a href="https://login.microsoftonline.com" target="_blank" rel="noopener" className="flex items-center gap-6 p-6 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow group">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-navy/5 flex items-center justify-center group-hover:bg-[#0078d4]/10 transition-colors"><Lock className="w-6 h-6 text-[#0078d4]" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground">ERP Login</h3>
                      <p className="text-xs text-muted-foreground mt-1">Check attendance, schedule and internal marks</p>
                    </div>
                  </a>
                  <a href="https://mggaugkp.ac.in/" target="_blank" rel="noopener" className="flex items-center gap-6 p-6 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow group">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors"><GraduationCap className="w-6 h-6 text-navy" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground">AYUSH University Portal</h3>
                      <p className="text-xs text-muted-foreground mt-1">Check examination dates and results</p>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    <PageGallery images={data?.pageGallery} />
    </Layout>
  );
}
