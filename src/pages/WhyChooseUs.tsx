import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, Building, Leaf, Users, BookOpen, Globe } from "lucide-react";

const reasons = [
  { icon: Award, title: "NCISM Approved", desc: "The only approval that confers practitioner registration eligibility. IAMC's BAMS graduates are registered Vaidyas, eligible for government AYUSH service and independent clinical practice." },
  { icon: Building, title: "In-Campus Teaching Hospital", desc: "Daily OPD exposure from Year 1 — over 5,000 patients per year. No commute, no waiting — clinical learning is integrated into the academic week from the first semester." },
  { icon: Leaf, title: "Living Herbal Garden", desc: "Over 200 medicinal plant species on campus — the living classroom for Dravyaguna Vigyana. Students connect classical drug knowledge to living botanical specimens daily." },
  { icon: Users, title: "14 Departments, MD Faculty", desc: "Every Ayurvedic specialisation covered by a dedicated MD-qualified Vaidya. Students engage with subject experts who practise what they teach in the hospital OPD." },
  { icon: BookOpen, title: "Research Culture", desc: "Peer-reviewed Ayurvedic journal, annual Global Ayurvedic Summit, and AYUSH ministry-recognised research projects. AIAPGET preparation guidance for MD aspirants." },
  { icon: Globe, title: "Only Private AYUSH College in NCR", desc: "Greater Noida's strategic location in Delhi NCR means proximity to AIIMS, Safdarjung, and major AYUSH hospitals — additional clinical exposure opportunities for internship students." },
];

export default function WhyChooseUsPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader title="Why Choose IAMC" subtitle="What makes Ishan Ayurvedic Medical College the right choice for your BAMS degree in the National Capital Region" breadcrumbs={[{ label: "About", href: "/about" }, { label: "Why Choose Us" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Our Advantage</p>
            <h2 className="font-bold text-foreground leading-tight mb-4">6 Reasons BAMS Students Choose IAMC</h2>
            <p className="text-foreground/70 leading-relaxed">Choosing a BAMS college is choosing your entire clinical career. IAMC's unique combination of NCISM approval, an in-campus teaching hospital, 14 specialised departments, and a living herbal garden makes it unrivalled in NCR.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => { const Icon = r.icon; return (
              <div key={r.title} className={`reveal delay- p-6 rounded-2xl border bg-card hover:shadow-[0_8px_32px_hsl(var(--navy)/0.08)] transition-all`}>
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-navy" /></div>
                <h3 className="font-bold text-foreground mb-2">{r.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{r.desc}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
