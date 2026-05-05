import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Dissection Hall", description: "Cadaveric dissection with strict ethical protocols — direct learning from human anatomy that no model can fully replicate." },
  { icon: Microscope, title: "Anatomical Models & Charts", description: "Extensive collection of anatomical models, charts, and specimen cabinet for systematic and visual anatomical study." },
  { icon: Award, title: "Marma Point Mapping", description: "Ayurvedic Marma (vital point) mapping on living models — connecting classical Ayurvedic anatomy to clinical practice." },
  { icon: Users, title: "Modern Anatomy Integration", description: "Parallel study of Ayurvedic Sharira and modern anatomical systems including embryology, histology, and gross anatomy." },
];

export default function RachanaSharirPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Rachana Sharir (Anatomy)"
        subtitle="Human anatomy from Ayurvedic and modern perspectives — Srotas, Marma, gross anatomy, and embryology"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Rachana Sharir (Anatomy)" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Rachana Sharir (Anatomy)</h2>
              <p className="text-foreground/70 leading-relaxed">Rachana Sharir teaches human anatomy from both Ayurvedic and modern perspectives — encompassing Srotas (body channels), Marma (vital points), gross anatomy, and embryology. The department is equipped with a dissection hall where students gain direct anatomical knowledge, building the structural foundation for clinical Ayurvedic practice.</p>
              <p className="text-foreground/70 leading-relaxed">Facilities include a dissection hall with ethical protocols, an anatomical models collection, charts, specimen cabinet, and cross-sectional anatomy resources. Students study cadaveric dissection, bone collection, surface anatomy on living models, and Ayurvedic Marma mapping for clinical application.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=800&auto=format&fit=crop" alt="Rachana Sharir (Anatomy) Department" className="w-full h-[400px] object-cover" />
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
