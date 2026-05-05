import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Padartha Vigyana & Maulik Siddhanta", description: "Comprehensive study of Charaka Samhita and Sushruta Samhita shloka, building the philosophical framework for clinical practice." },
  { icon: Microscope, title: "Classical Text Study", description: "Sanskrit proficiency and classical text interpretation essential for all BAMS examinations and clinical documentation." },
  { icon: Award, title: "Clinical Application", description: "Prakriti analysis methodology applied in hospital OPD settings, connecting foundational concepts to daily clinical practice." },
  { icon: Users, title: "Research Foundation", description: "Research into classical formulations and Ayurvedic philosophy, contributing to evidence-based Ayurvedic scholarship." },
];

export default function AyurvedicSiddhantaPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Ayurvedic Siddhanta"
        subtitle="Foundation of all Ayurvedic learning — Tridosha, Pancha Mahabhuta, Prakriti, classical texts"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Ayurvedic Siddhanta" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Ayurvedic Siddhanta</h2>
              <p className="text-foreground/70 leading-relaxed">Ayurvedic Siddhanta — or Fundamentals of Ayurveda — is the cornerstone of all Ayurvedic learning. This department introduces students to the philosophical foundations: Tridosha (Vata, Pitta, Kapha), Pancha Mahabhuta, Prakriti, Saptadhatu, and the classical texts of Charaka Samhita and Sushruta Samhita. Every clinical judgment in Ayurveda begins with the frameworks established in this department.</p>
              <p className="text-foreground/70 leading-relaxed">Students develop proficiency in Padartha Vigyana, Maulik Siddhanta, Sanskrit as the language of Ayurveda, and classical text interpretation. The department bridges Ayurvedic philosophy with modern science, laying the intellectual foundation for all subsequent clinical training.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop" alt="Ayurvedic Siddhanta Department" className="w-full h-[400px] object-cover" />
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
