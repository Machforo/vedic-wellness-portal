import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Daily OPD Rotation", description: "Daily hospital OPD rotation from Year 3 — highest patient volume in the teaching hospital for maximum clinical exposure." },
  { icon: Microscope, title: "Nadi Pariksha Training", description: "Systematic training in Nadi Pariksha (Ayurvedic pulse diagnosis) — the cornerstone of Ayurvedic clinical assessment." },
  { icon: Award, title: "Chronic Disease Management", description: "Clinical management of Madhumeha, Amavata, Vata-vyadhi, Kasa, Shwasa, and Arsha using classical Ayurvedic protocols." },
  { icon: Users, title: "Evidence-Based Protocols", description: "Evidence-based Ayurvedic treatment protocols combining Charaka Samhita guidelines with contemporary clinical research." },
];

export default function KayachikitsaPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Kayachikitsa (Ayurvedic Internal Medicine)"
        subtitle="The largest clinical department — management of chronic diseases through classical Ayurvedic medicine and daily OPD"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Kayachikitsa (Ayurvedic Internal Medicine)" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Kayachikitsa (Ayurvedic Internal Medicine)</h2>
              <p className="text-foreground/70 leading-relaxed">Kayachikitsa — Ayurvedic Internal Medicine — is the largest clinical department at IAMC, managing chronic conditions including diabetes (Madhumeha), arthritis (Amavata), digestive disorders (Anaha, Arsha), neurological conditions (Vata-vyadhi), and respiratory diseases. The department has the highest patient OPD volume in the teaching hospital.</p>
              <p className="text-foreground/70 leading-relaxed">Daily OPD rotation from Year 3, case discussion sessions, treatment protocol design, and Nadi Pariksha (pulse diagnosis) practice are central to clinical training. Charaka Samhita's clinical chapters form the textual foundation, supplemented by modern disease correlation and evidence-based Ayurvedic protocols.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop" alt="Kayachikitsa (Ayurvedic Internal Medicine) Department" className="w-full h-[400px] object-cover" />
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
