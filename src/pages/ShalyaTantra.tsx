import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Operation Theatre Facility", description: "Fully equipped OT for minor surgical training — preparing students for both classical Ayurvedic and para-surgical procedures." },
  { icon: Microscope, title: "Ksharasutra Therapy", description: "Dedicated Ksharasutra therapy unit for training in this classical para-surgical treatment for ano-rectal conditions." },
  { icon: Award, title: "Agnikarma & Leech Therapy", description: "Supervised hands-on training in Agnikarma (thermal therapy) and Jalaukavacharana (leech therapy) on eligible patients." },
  { icon: Users, title: "Wound Care Clinic", description: "Comprehensive wound care clinic for Vrana Chikitsa — classical Ayurvedic wound management from assessment to dressing." },
];

export default function ShalyaTantraPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Shalya Tantra (Ayurvedic Surgery)"
        subtitle="Ayurvedic surgical science — Ksharasutra, Agnikarma, Jalaukavacharana, wound management with OT facility"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Shalya Tantra (Ayurvedic Surgery)" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Shalya Tantra (Ayurvedic Surgery)</h2>
              <p className="text-foreground/70 leading-relaxed">Shalya Tantra is Ayurvedic surgery — encompassing Ksharasutra (para-surgical treatment for ano-rectal diseases), Agnikarma (thermal therapy), Jalaukavacharana (leech therapy), and wound management (Vrana Chikitsa). The department has an operation theatre facility for minor surgical training.</p>
              <p className="text-foreground/70 leading-relaxed">The OT is equipped for minor surgical procedures, including a dedicated Ksharasutra therapy unit and a wound care clinic. Teaching follows Sushruta Samhita's surgical chapters alongside modern surgical principles, with supervised hands-on training in para-surgical techniques.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=800&auto=format&fit=crop" alt="Shalya Tantra (Ayurvedic Surgery) Department" className="w-full h-[400px] object-cover" />
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
