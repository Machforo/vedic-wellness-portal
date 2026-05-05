import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Physiology Lab Setup", description: "Modern physiology lab with pulse oximeter, spirometer, ECG, and biochemistry equipment supporting parallel classical-modern study." },
  { icon: Microscope, title: "Agni & Dhatu Study", description: "In-depth study of Agni Siddhanta, Dhatu Poshana Krama, and Mala formation — the Ayurvedic physiological framework." },
  { icon: Award, title: "Lab Experiments", description: "Hands-on physiological experiments including pulse measurement, respiratory function, and blood analysis correlating with Ayurvedic concepts." },
  { icon: Users, title: "Prakriti Physiology", description: "Study of Prakriti-based physiological variation — how constitutional type influences physiological parameters." },
];

export default function KriyaSharirPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Kriya Sharir (Physiology)"
        subtitle="Functional physiology from Ayurvedic and modern perspectives — Agni, Dhatus, Malas, and physiological systems"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Kriya Sharir (Physiology)" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Kriya Sharir (Physiology)</h2>
              <p className="text-foreground/70 leading-relaxed">Kriya Sharir explores functional physiology from both Ayurvedic and modern lenses — Agni (digestive fire), Dhatus (tissues), Malas (waste), and Srotas (channels) alongside modern physiological systems including cardiovascular, respiratory, nervous, and digestive systems.</p>
              <p className="text-foreground/70 leading-relaxed">The physiology laboratory is equipped with pulse oximeters, spirometers, sphygmomanometers, blood glucose testing equipment, urine analysis apparatus, and ECG demonstration units. Students conduct lab experiments, study classical text and modern textbook in parallel, and explore Prakriti-based physiological variation.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop" alt="Kriya Sharir (Physiology) Department" className="w-full h-[400px] object-cover" />
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
