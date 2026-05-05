import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Toxicological Specimens", description: "Collection of toxicological specimens and reference materials for systematic study of classical and modern poison management." },
  { icon: Microscope, title: "Vishaghna Plants", description: "Vishaghna (antidote) plant collection connected to the Herbal Garden — classical Ayurvedic toxicological remedies." },
  { icon: Award, title: "Medico-Legal Practicals", description: "Medico-legal documentation practicals including inquest reports, injury certificates, and forensic examination procedures." },
  { icon: Users, title: "Forensic Medicine", description: "Modern forensic medicine correlation with Agada Tantra classical texts for comprehensive toxicology training." },
];

export default function AgadaTantraPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Agada Tantra (Toxicology & Forensic Medicine)"
        subtitle="Ayurvedic toxicology — Vishaghna plants, poison management, food toxicology, medico-legal cases"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Agada Tantra (Toxicology & Forensic Medicine)" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Agada Tantra (Toxicology & Forensic Medicine)</h2>
              <p className="text-foreground/70 leading-relaxed">Agada Tantra covers Ayurvedic toxicology and forensic medicine — including Vishaghna (antidote) plants, classical poison management, food and environmental toxicology, and medico-legal cases. The department also prepares students for the Forensic Pharmacy Certificate (FPC) examination.</p>
              <p className="text-foreground/70 leading-relaxed">The department maintains toxicological specimens, a Vishaghna plant collection, and medico-legal reference materials. Teaching combines classical Agada Tantra texts with modern forensic medicine, medico-legal documentation practicals, and poison identification exercises.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop" alt="Agada Tantra (Toxicology & Forensic Medicine) Department" className="w-full h-[400px] object-cover" />
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
