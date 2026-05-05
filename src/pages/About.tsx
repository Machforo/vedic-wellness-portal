import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2 } from "lucide-react";

const milestones = [
  { year: "Est.", event: "Ishan Educational Research Society established as the parent body of all Ishan institutions" },
  { year: "NCISM", event: "Ishan Ayurvedic Medical College received NCISM (National Commission for Indian System of Medicine) approval" },
  { year: "Hospital", event: "In-campus Ayurvedic Teaching Hospital established providing daily OPD exposure for BAMS students" },
  { year: "14 Depts", event: "All 14 Ayurvedic departments fully operational with dedicated Vaidya faculty" },
  { year: "Garden", event: "Herbal Garden expanded to over 200 medicinal plant species — the living classroom for Dravyaguna Vigyana" },
  { year: "2025", event: "BAMS graduates practising as Vaidyas across government AYUSH hospitals, private clinics, and wellness centres" },
];

const differentiators = [
  "NCISM Approved — only private AYUSH college in NCR",
  "14 Ayurvedic departments with dedicated Vaidya faculty",
  "In-campus teaching hospital with daily OPD rotation",
  "Herbal Garden of over 200 medicinal plant species",
  "BAMS MD-qualified research faculty",
  "Global Ayurvedic Summits and NCISM-recognised events",
  "Strong government AYUSH placement guidance",
  "Location: Knowledge Park, Greater Noida — Delhi NCR",
];

export default function AboutPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader title="About Ishan Ayurvedic Medical College" subtitle="NCISM-approved, the only private AYUSH college in NCR — classical Ayurvedic education with modern clinical practice." breadcrumbs={[{ label: "About IAMC" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal-left relative">
              <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--navy)/0.1)]">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop" alt="Ishan Ayurvedic Medical College Campus" className="w-full h-[400px] object-cover" />
              </div>
            </div>
            <div className="reveal-right space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Our Story</p>
              <h2 className="font-bold text-foreground leading-tight">Reviving the Classical Science of Life in the National Capital Region</h2>
              <p className="text-foreground/70 leading-relaxed">Ishan Ayurvedic Medical College and Research Centre (IAMC), located in Knowledge Park, Greater Noida, is the only private AYUSH medical college in the National Capital Region. NCISM-approved and affiliated to its university, IAMC offers the five-and-a-half-year BAMS degree programme.</p>
              <p className="text-foreground/70 leading-relaxed">The college encompasses 14 Ayurvedic academic departments, an in-campus Ayurvedic teaching hospital, a herbal garden of over 200 medicinal plant species, a comprehensive library, auditorium, hostel facilities, and a faculty of experienced Vaidyas. Our approach integrates classical Ayurvedic education with clinical exposure — students rotate through hospital OPDs from Year 1, connecting ancient wisdom to living practice.</p>
              <p className="text-foreground/70 leading-relaxed">IAMC graduates practise as Vaidyas in government AYUSH hospitals, private Ayurvedic clinics, Panchkarma centres, research institutions, and wellness organisations — contributing to India's AYUSH healthcare mission.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-section-alt">
        <div className="container-wide">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Our Journey</p>
            <h2 className="font-bold text-foreground">Milestones of Growth</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-0 relative">
            <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative flex items-start gap-6 py-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-12`}>
                <div className="shrink-0 w-11 h-11 rounded-full bg-gold flex items-center justify-center z-10 shadow-[0_2px_12px_hsl(var(--gold)/0.3)]">
                  <span className="text-xs font-bold text-foreground">{m.year}</span>
                </div>
                <div className={`bg-card rounded-xl border p-5 shadow-sm flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <p className="text-sm text-foreground/80 leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bold text-foreground mb-8">Key Differentiators</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {differentiators.map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
