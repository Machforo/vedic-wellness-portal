import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Users, FileText, ArrowRight } from "lucide-react";

export default function ResearchJournalPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader title="Research Journal" subtitle="Peer-reviewed Ayurvedic research journal publishing clinical studies, case reports, and classical text re-examination" breadcrumbs={[{ label: "Research", href: "/publications" }, { label: "Research Journal" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="reveal-left space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Ishan Ayurveda Journal</p>
              <h2 className="font-bold text-foreground leading-tight">Advancing Ayurvedic Scholarship Through Rigorous Research</h2>
              <p className="text-foreground/70 leading-relaxed">IAMC's peer-reviewed Ayurvedic research journal provides a platform for faculty, scholars, students, and Ayurvedic practitioners to publish clinical studies, case reports, literature reviews, and experimental research — bridging classical and contemporary Ayurvedic science.</p>
              <p className="text-foreground/70 leading-relaxed">The journal covers clinical studies, pharmacognosy, Panchkarma outcomes, classical text re-examination, drug standardisation, community health, and integrative medicine. Submissions undergo blind peer review by a distinguished editorial board of Ayurvedic scholars.</p>
            </div>
            <div className="reveal-right">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop" alt="Research Journal" className="w-full h-[350px] object-cover" />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Scope", desc: "Clinical studies, pharmacognosy, Panchkarma outcomes, classical text re-examination, drug standardisation, and integrative medicine." },
              { icon: Users, title: "Editorial Board", desc: "Distinguished Ayurvedic scholars, NCISM board members, and international traditional medicine researchers." },
              { icon: FileText, title: "Submission", desc: "Vancouver/CCIM citation style, blind peer review, online submission portal, 4–6 week acceptance timeline." },
            ].map((item) => { const Icon = item.icon; return (
              <div key={item.title} className="reveal p-6 rounded-xl border bg-card">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-navy" /></div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
