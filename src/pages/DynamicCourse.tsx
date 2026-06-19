import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2, BookOpen, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

export default function DynamicCoursePage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("academics");
  const bamsProgram = data?.bamsProgram || {};

  const eligibility = bamsProgram.eligibility || [];
  const outcomes = bamsProgram.outcomes || [];
  
  // The backend syllabus phases are actually in syllabus.phases, but in DynamicCourse it was showing "Year-wise Structure" with hardcoded phases. We'll use the syllabus phases if available.
  const syllabus = data?.syllabus || {};
  const phases = syllabus.phases || [];

  return (
    <Layout>
      <PageHeader title="BAMS - Bachelor of Ayurvedic Medicine and Surgery" subtitle="5.5-year NCISM-recognised degree programme - the only Ayurvedic medical degree conferring the title 'Vaidya'" breadcrumbs={[{ label: "BAMS Programme" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="reveal-left space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Programme Overview</p>
              <h2 className="font-bold text-foreground leading-tight">The BAMS Degree - Gateway to Becoming a Vaidya</h2>
              {bamsProgram.overview ? (
                <div className="text-foreground/70 leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: bamsProgram.overview }}></div>
              ) : (
                <p className="text-foreground/70 leading-relaxed">Bachelor of Ayurvedic Medicine and Surgery (BAMS) is a five-and-a-half-year degree programme including a one-year compulsory rotatory internship. NCISM recognised across India and in several foreign countries, BAMS is the only AYUSH medical degree that confers the title 'Vaidya' and confers full practitioner registration eligibility.</p>
              )}
              <div className="flex items-center gap-3 p-4 bg-gold/5 rounded-xl border border-gold/20">
                <Clock className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm font-semibold text-foreground">Duration: {bamsProgram.duration || "5.5 Years (4.5 Academic + 1 Year Internship)"}</span>
              </div>
            </div>
            <div className="reveal-right">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=800&auto=format&fit=crop" alt="BAMS Programme" className="w-full h-[380px] object-cover" />
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="reveal lg:col-span-1">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-gold" />Eligibility</h3>
              <ul className="space-y-3">
                {eligibility.length > 0 ? eligibility.map((e: any, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />{e.text || e}
                  </li>
                )) : (
                  <li className="flex items-start gap-2 text-sm text-foreground/70"><CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />10+2 Biology (PCB) - minimum 50% marks</li>
                )}
              </ul>
            </div>
            <div className="reveal delay-100 lg:col-span-2">
              <h3 className="font-bold text-foreground mb-4">Year-wise Structure</h3>
              <div className="space-y-3">
                {phases.length > 0 ? phases.map((p: any, i: number) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border bg-card">
                    <div className="w-2 h-2 rounded-full bg-gold mt-1.5 shrink-0" />
                    <div>
                      <p className="font-bold text-foreground text-sm">{p.phase} {p.years && `(${p.years})`}</p>
                      {p.desc ? (
                        <p className="text-xs text-foreground/60 mt-1">{p.desc}</p>
                      ) : (
                        <div className="text-xs text-foreground/60 mt-1 [&>p]:m-0" dangerouslySetInnerHTML={{ __html: p.subjects }}></div>
                      )}
                    </div>
                  </div>
                )) : null}
              </div>
            </div>
          </div>
          <div className="reveal mb-12">
            <h3 className="font-bold text-foreground mb-4">Career Outcomes</h3>
            <div className="flex flex-wrap gap-3">
              {outcomes.length > 0 ? outcomes.map((o: any, i: number) => <span key={i} className="px-4 py-2 bg-navy/5 text-navy text-sm font-medium rounded-xl border">{o.text || o}</span>) : null}
            </div>
          </div>
          <div className="text-center">
            <Link to="/admissions" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-navy hover:text-white transition-all shimmer-btn">Apply for BAMS {new Date().getFullYear()}-{String(new Date().getFullYear() + 1).slice(2)} <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
