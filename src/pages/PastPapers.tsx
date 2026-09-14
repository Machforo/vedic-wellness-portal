import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Download, FileText, Search } from "lucide-react";
import { useState } from "react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { rt } from "@/lib/richText";


export default function PastPapersPage() {
  const ref = useScrollReveal();
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useAyurvedaData("digital");

  const defaultPapers = [
    { title: "Rachana Sharir - Paper I", year: "2023", fileUrl: "#" },
    { title: "Kriya Sharir - Paper I", year: "2023", fileUrl: "#" },
    { title: "Padartha Vigyan", year: "2023", fileUrl: "#" },
    { title: "Sanskrit", year: "2022", fileUrl: "#" },
    { title: "Samhita Adhyayan - I", year: "2022", fileUrl: "#" },
  ];

  const papers = data?.pastPapers?.length > 0 ? data.pastPapers : defaultPapers;

  const filteredPapers = papers.filter((p: any) => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.year && p.year.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pastPapersSection = data?.pastPapersSection || {};

  return (
    <Layout>
      <PageHeader
        title={pastPapersSection.title || "Past Exam Papers"}
        subtitle={pastPapersSection.subtitle || "Access previous years' question papers for comprehensive exam preparation."}
        breadcrumbs={[{ label: "Past Papers" }]}
      />

      <section className="py-20" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="reveal grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{pastPapersSection.tag || "Exam Resources"}</p>
                <h2 className="font-bold text-foreground leading-tight">{pastPapersSection.title || "Prepare with Confidence"}</h2>
                {pastPapersSection.description ? (
                  <div className="text-foreground/70 leading-relaxed [&>p]:m-0 rich-text" dangerouslySetInnerHTML={{ __html: rt(pastPapersSection.description) }}></div>
                ) : (
                  <p className="text-foreground/70 leading-relaxed">
                    Access previous years' Mahayogi Guru Gorakhnath AYUSH University question papers for BAMS. These are invaluable resources for understanding exam patterns, critical topics, and frequently asked questions in Ayurvedic classical texts and modern science.
                  </p>
                )}
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl border bg-navy/5">
                <img src={pastPapersSection.image || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80"} alt="Ayurveda Exam Preparation" className="w-full h-64 object-cover" />
              </div>
            </div>

            <div className="reveal">
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by subject or year..."
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border bg-card focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-muted border-b">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Programme</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Year</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredPapers.map((p: any, i: number) => (
                        <tr key={i} className="hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-navy">BAMS</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-gold" />
                              <span className="text-sm text-foreground/80">{p.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs">{p.year || "N/A"}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <a href={p.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gold hover:text-navy transition-colors font-bold text-xs uppercase tracking-wider">
                              <Download className="w-4 h-4" />
                              PDF
                            </a>
                          </td>
                        </tr>
                      ))}
                      {filteredPapers.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-foreground/50">
                            No papers found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="mt-6 text-center text-xs text-foreground/50">
                New papers are added after each AYUSH University examination cycle.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
