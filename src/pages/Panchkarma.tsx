import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Dedicated Therapy Rooms", description: "Dedicated Panchkarma therapy rooms in the teaching hospital for hands-on practical training in all classical procedures." },
  { icon: Microscope, title: "Shodhana Procedures", description: "Supervised training in all five Shodhana procedures — Vamana, Virechana, Basti, Nasya, and Raktamokshana." },
  { icon: Award, title: "Snehana & Swedana", description: "Practical training in Abhyanga, Shirodhara, Pinda Sweda, and other Purvakarma preparatory therapies." },
  { icon: Users, title: "Patient Assessment", description: "Patient assessment for Panchkarma eligibility — Prakriti determination, Dosha analysis, and contraindication screening." },
];

export default function PanchkarmaPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Panchkarma"
        subtitle="Ayurveda's premier purification therapy — Vamana, Virechana, Basti, Nasya, Raktamokshana with dedicated therapy rooms"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Panchkarma" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Panchkarma</h2>
              <p className="text-foreground/70 leading-relaxed">Panchkarma is Ayurveda's premier therapeutic purification system — comprising Vamana (emesis), Virechana (purgation), Basti (enema), Nasya (nasal administration), and Raktamokshana (bloodletting). Both preventive and therapeutic, it removes accumulated Doshas and is taught in close connection with the hospital's Panchkarma centre.</p>
              <p className="text-foreground/70 leading-relaxed">The training facility includes dedicated Panchkarma therapy rooms in the teaching hospital where students learn Abhyanga (oil massage), Shirodhara (head oil drip), Pinda Sweda (bolus fomentation) alongside the five classical Shodhana procedures under Vaidya supervision.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop" alt="Panchkarma Department" className="w-full h-[400px] object-cover" />
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
