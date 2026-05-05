import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Dedicated Yoga Hall", description: "Dedicated Yoga hall with daily morning practice sessions — Yoga is both a subject and a daily practice at IAMC." },
  { icon: Microscope, title: "Dinacharya & Ritucharya", description: "In-depth study of Dinacharya and Ritucharya — the Ayurvedic frameworks for daily and seasonal health maintenance." },
  { icon: Award, title: "Medical Camp Programme", description: "Medical camp coordination including free health camps for communities surrounding Greater Noida campus." },
  { icon: Users, title: "Therapeutic Yoga", description: "Therapeutic Yoga integration for clinical applications in chronic disease management and rehabilitation." },
];

export default function SwasthavrittaYogaPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Swasthavritta & Yoga"
        subtitle="Ayurvedic preventive health — Dinacharya, Ritucharya, Yoga therapy, community health, and medical camps"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Swasthavritta & Yoga" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Swasthavritta & Yoga</h2>
              <p className="text-foreground/70 leading-relaxed">Swasthavritta and Yoga is the department of Ayurvedic preventive and social medicine — covering Dinacharya (daily routine), Ritucharya (seasonal adaptation), Yoga therapy, community health, and occupational health. It represents the backbone of Ayurvedic wellness philosophy and is uniquely positioned at the intersection of prevention and clinical practice.</p>
              <p className="text-foreground/70 leading-relaxed">The department has a dedicated Yoga hall with an experienced Yoga teacher, morning practice sessions for students, and therapeutic Yoga integration for clinical applications. Medical camp programmes are co-ordinated through this department, and World Yoga Day events are a major annual institutional highlight.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop" alt="Swasthavritta & Yoga Department" className="w-full h-[400px] object-cover" />
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
