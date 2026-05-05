import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Interactive Language Lab", description: "Interactive language lab for Sanskrit instruction combining grammar, vocabulary, and Ayurvedic text reading proficiency." },
  { icon: Microscope, title: "Shloka Memorisation", description: "Systematic memorisation of key shlokas from Charaka, Sushruta, and Ashtanga Hridaya — essential for university examinations." },
  { icon: Award, title: "Classical Text Translation", description: "Classical text translation and interpretation sessions building ability to engage with primary Ayurvedic sources." },
  { icon: Users, title: "Sanskrit for Clinicians", description: "Sanskrit for clinical application — terminology used in OPD, formulation writing, and patient documentation in Ayurveda." },
];

export default function SamhitaSanskritPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Samhita & Sanskrit"
        subtitle="Sanskrit — the language of Ayurveda — mastery of Charaka, Sushruta, and Ashtanga Hridaya classical texts"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Samhita & Sanskrit" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Samhita & Sanskrit</h2>
              <p className="text-foreground/70 leading-relaxed">Sanskrit is the language of Ayurveda. Mastery of classical texts — Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya — requires Sanskrit proficiency. This department builds the linguistic and philosophical foundation for all BAMS study, enabling students to access primary Ayurvedic sources directly.</p>
              <p className="text-foreground/70 leading-relaxed">Students learn basic Sanskrit grammar, Ayurvedic Sanskrit vocabulary, verse memorisation of key shlokas (essential for university examinations), text translation, and interpretation. Interactive language lab sessions, Sanskrit for clinical application, and verse interpretation competitive events make learning engaging and purposeful.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop" alt="Samhita & Sanskrit Department" className="w-full h-[400px] object-cover" />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div key={h.title} className={`reveal delay-00 flex gap-5 p-6 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow`}>
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">{h.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/70">{h.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
