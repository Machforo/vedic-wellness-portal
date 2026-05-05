import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Paediatrics OPD Exposure", description: "Regular OPD rotation at the teaching hospital's Paediatrics clinic — real case exposure for clinical competence." },
  { icon: Microscope, title: "Suvarna Prashan", description: "Study and practice of Suvarna Prashan — the Ayurvedic immunity-building protocol for children from infancy." },
  { icon: Award, title: "Developmental Health", description: "Ayurvedic assessment of child growth, development milestones, and constitutional management from birth onwards." },
  { icon: Users, title: "Classical Texts", description: "Classical Ayurvedic texts on paediatrics correlated with modern paediatric medicine for comprehensive child healthcare." },
];

export default function KaumarabhrityaPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Kaumarabhritya (Ayurvedic Paediatrics)"
        subtitle="Ayurvedic child health — from conception to adolescence, Suvarna Prashan, and hospital paediatric OPD"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Kaumarabhritya (Ayurvedic Paediatrics)" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Kaumarabhritya (Ayurvedic Paediatrics)</h2>
              <p className="text-foreground/70 leading-relaxed">Kaumarabhritya is the Ayurvedic speciality of child health — encompassing care from conception through adolescence. Key areas include Suvarna Prashan (gold-based immunity building), childhood diseases, growth monitoring, developmental health, and Ayurvedic neonatal care. Students receive clinical exposure through the hospital's Paediatrics OPD.</p>
              <p className="text-foreground/70 leading-relaxed">Students observe the Kaumarabhritya OPD at IAMC's teaching hospital, participating in preventive, curative, and promotive child healthcare. Classical text study is combined with modern paediatric correlation and case discussion with senior Vaidyas.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=800&auto=format&fit=crop" alt="Kaumarabhritya (Ayurvedic Paediatrics) Department" className="w-full h-[400px] object-cover" />
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
