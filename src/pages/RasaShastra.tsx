import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Manufacturing Lab", description: "Fully equipped Ayurvedic pharmaceutical lab with traditional and modern apparatus for preparation of all dosage forms." },
  { icon: Microscope, title: "Classical Formulations", description: "Preparation of Rasaushadhi, Asava-Arishta, Churna, Lehya, and Taila following classical Shastriya methods." },
  { icon: Award, title: "Quality Checking", description: "Quality checking protocols for Ayurvedic formulations — organoleptic testing, density, pH, and classical quality parameters." },
  { icon: Users, title: "GMP Principles", description: "Application of Good Manufacturing Practice (GMP) principles to classical Ayurvedic pharmaceutical production." },
];

export default function RasaShastraPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Rasa Shastra & Bhaishajya Kalpana"
        subtitle="Classical Ayurvedic pharmaceutics — preparation of Rasaushadhi, Asava-Arishta, Churna, Lehya, and Taila"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Rasa Shastra & Bhaishajya Kalpana" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Rasa Shastra & Bhaishajya Kalpana</h2>
              <p className="text-foreground/70 leading-relaxed">Rasa Shastra and Bhaishajya Kalpana is the classical pharmaceutical branch of Ayurveda — covering the preparation of Rasaushadhi (mineral medicines), Asava-Arishta (fermented preparations), Churna (powders), Lehya (electuaries), and Taila (medicated oils). It is the bridge between raw medicinal material and finished Ayurvedic medicine.</p>
              <p className="text-foreground/70 leading-relaxed">A dedicated pharmaceutical Ayurveda manufacturing lab provides mortars, crucibles, heating apparatus, fermentation vessels, and quality checking equipment. Students prepare classical formulations in batches under faculty supervision, learning documentation and GMP principles alongside traditional techniques.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop" alt="Rasa Shastra & Bhaishajya Kalpana Department" className="w-full h-[400px] object-cover" />
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
