import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FileText, Download } from "lucide-react";

const phases = [
  { phase: "Phase I", years: "Year 1 – 1.5", subjects: ["Padartha Vigyana & Ayurveda Siddhanta", "Rachana Sharir", "Kriya Sharir", "Sanskrit & Samhita (Parichaya)", "Maulik Siddhanta"], pdf: "#" },
  { phase: "Phase II", years: "Year 1.5 – 3", subjects: ["Dravyaguna Vigyana", "Rasa Shastra & Bhaishajya Kalpana", "Rog Nidan & Vikriti Vigyana", "Charak Samhita (Purvardha)", "Swasthavritta"], pdf: "#" },
  { phase: "Phase III", years: "Year 3 – 4.5", subjects: ["Kayachikitsa", "Panchkarma", "Shalya Tantra", "Shalakya Tantra", "Prasuti & Stri Roga", "Kaumarabhritya", "Agada Tantra", "Charak Samhita (Uttarardha)"], pdf: "#" },
  { phase: "Final Year + Internship", years: "Year 4.5 – 5.5", subjects: ["All Clinical Departments (Rotation)", "Research Dissertation", "Compulsory Rotatory Internship (12 months)"], pdf: "#" },
];

export default function SyllabusPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader title="BAMS Syllabus — Year Wise" subtitle="NCISM-prescribed BAMS curriculum organised by phase, balancing classical Ayurvedic texts with modern science subjects" breadcrumbs={[{ label: "BAMS Programme", href: "/courses/bams" }, { label: "Syllabus" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-5xl">
          <div className="reveal mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">NCISM Curriculum</p>
            <h2 className="font-bold text-foreground mb-4">Phase-wise BAMS Syllabus</h2>
            <p className="text-foreground/70 leading-relaxed max-w-2xl">BAMS curriculum follows the NCISM-prescribed syllabus divided into phases. It balances classical Ayurvedic texts with modern science subjects; clinical training begins in Phase 2 and each phase builds progressively toward clinical competence in all 14 specialised departments.</p>
          </div>
          <div className="space-y-6">
            {phases.map((p, i) => (
              <div key={p.phase} className={`reveal delay- border rounded-2xl bg-card overflow-hidden`}>
                <div className="flex items-center justify-between p-6 bg-navy/[0.03] border-b">
                  <div>
                    <h3 className="font-bold text-navy">{p.phase}</h3>
                    <p className="text-xs text-gold font-semibold uppercase tracking-widest mt-1">{p.years}</p>
                  </div>
                  <a href={p.pdf} className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-navy text-xs font-bold rounded-lg hover:bg-gold/20 transition-colors">
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {p.subjects.map(s => (
                      <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-xs font-medium">
                        <FileText className="w-3 h-3 text-gold" />{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
