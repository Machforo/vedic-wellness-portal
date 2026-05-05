import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Antenatal OPD Rotation", description: "Structured hospital rotation through antenatal, delivery, and postnatal care under senior Vaidya supervision." },
  { icon: Microscope, title: "Garbhini Paricharya", description: "Comprehensive study of Garbhini Paricharya — classical Ayurvedic antenatal care protocols from conception to birth." },
  { icon: Award, title: "Stri Roga Management", description: "Clinical management of PCOS, menstrual disorders, leucorrhoea, and menopausal conditions using Ayurvedic protocols." },
  { icon: Users, title: "Modern Correlation", description: "Integration of Ayurvedic Stri Roga with modern gynaecological diagnostics and obstetric management principles." },
];

export default function PrasutiStriRogaPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Prasuti & Stri Roga (OB/GYN)"
        subtitle="Ayurvedic women health — antenatal care, postnatal care, menstrual disorders, PCOS, and hospital OPD rotation"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Prasuti & Stri Roga (OB/GYN)" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Prasuti & Stri Roga (OB/GYN)</h2>
              <p className="text-foreground/70 leading-relaxed">Prasuti and Stri Roga is the Ayurvedic speciality for women's health — encompassing antenatal care (Garbhini Paricharya), postnatal care (Sutika Paricharya), menstrual disorders, PCOS management, menopausal care, and infertility. Clinical exposure is provided through the teaching hospital's dedicated OPD.</p>
              <p className="text-foreground/70 leading-relaxed">Students rotate through the Prasuti and Stri Roga OPD, antenatal ward, and postnatal care unit. Ayurvedic classical protocols are studied alongside modern gynaecology, equipping students for comprehensive women's healthcare practice.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&auto=format&fit=crop" alt="Prasuti & Stri Roga (OB/GYN) Department" className="w-full h-[400px] object-cover" />
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
