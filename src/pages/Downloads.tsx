import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FileText, Download } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import PageGallery from "@/components/PageGallery";

export default function DownloadsPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("digital");
  const defaultDownloads = [
    { title: "BAMS Syllabus 2024-25", fileUrl: "#" },
    { title: "Academic Calendar 2024-25", fileUrl: "#" },
    { title: "Clinical Posting Guidelines", fileUrl: "#" },
    { title: "Internship Completion Certificate Format", fileUrl: "#" },
    { title: "Scholarship Application Form", fileUrl: "#" },
    { title: "Anti-Ragging Undertaking (CCIM Format)", fileUrl: "#" },
  ];
  const downloads = data?.downloads?.length > 0 ? data.downloads : defaultDownloads;

  const downloadsSection = data?.downloadsSection || {};

  return (
    <Layout>
      <PageHeader 
        title={downloadsSection.title || "Downloads"} 
        subtitle={downloadsSection.subtitle || "Timetables, syllabi, forms, and notices for current students"} 
        breadcrumbs={[{ label: "Students" }, { label: "Downloads" }]} 
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div className="reveal space-y-8">
              {downloadsSection.description ? (
                <div className="text-foreground/70 leading-relaxed [&>p]:m-0" dangerouslySetInnerHTML={{ __html: downloadsSection.description }}></div>
              ) : (
                <p className="text-foreground/70 leading-relaxed">
                  Access mandatory forms, academic calendars, syllabus documents, and guidelines. All documents are in PDF format for easy accessibility across devices. For any specific document not listed here, please contact the administrative office.
                </p>
              )}
              <div className="rounded-2xl overflow-hidden shadow-2xl border bg-navy/5">
                <img src={downloadsSection.image || "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1000&q=80"} alt="Ishan Ayurveda Resources" className="w-full h-80 object-cover" />
              </div>
            </div>
            <div className="space-y-3">
            {downloads.map((d: any, i: number) => (
              <div key={i} className={`reveal delay-${Math.min(i % 4, 3)}00 flex items-center gap-4 p-4 rounded-xl border bg-card hover:shadow-sm transition-shadow`}>
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-destructive" /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate">{d.title}</h3>
                  <p className="text-xs text-muted-foreground">PDF Document</p>
                </div>
                <a href={d.fileUrl} target="_blank" rel="noreferrer" className="shrink-0 p-2 rounded-lg hover:bg-muted transition-colors text-navy hover:text-gold"><Download className="w-4 h-4" /></a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <PageGallery images={data?.pageGallery} />
    </Layout>
  );
}
