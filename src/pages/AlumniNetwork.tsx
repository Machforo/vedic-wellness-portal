import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Users, Building2, Star, TrendingUp } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

const defaultAlumni = [
  { name: "Dr. Priya Sharma", batch: "BAMS 2018", company: "Patanjali Ayurved", role: "Senior Medical Officer" },
  { name: "Dr. Rohit Gupta", batch: "BAMS 2019", company: "Dabur India", role: "Clinical Researcher" },
  { name: "Dr. Ankita Singh", batch: "BAMS 2018", company: "Jiva Ayurveda", role: "Ayurvedic Physician" },
  { name: "Dr. Mohit Verma", batch: "BAMS 2020", company: "Government Hospital", role: "Medical Officer" },
  { name: "Dr. Neha Jain", batch: "BAMS 2019", company: "Kama Ayurveda", role: "Consultant" },
  { name: "Dr. Aditya Kumar", batch: "BAMS 2021", company: "AIIMS (AYUSH Dept)", role: "Research Fellow" },
];

export default function AlumniNetworkPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("research");
  const al = data?.alumni || {};
  const alumni = al.items?.length > 0 ? al.items : defaultAlumni;
  const stats = al.stats?.length > 0 ? al.stats : [
    { value: "1000+", label: "Alumni Network" },
    { value: "50+", label: "Hospitals & Clinics" },
    { value: "₹4.5 LPA", label: "Average Package" },
    { value: "92%", label: "Placement Rate" }
  ];
  const icons = [Users, Building2, Star, TrendingUp];

  return (
    <Layout>
      <PageHeader
        title={al.title || "Alumni Network"}
        subtitle={al.subtitle || "Celebrating the success of Ishan Ayurveda graduates across hospitals and wellness centers"}
        breadcrumbs={[{ label: "Placements" }, { label: "Alumni Network" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {stats.map((s: any, i: number) => {
              const Icon = icons[i] || Users;
              return (
                <div key={s.label} className="reveal text-center p-6 rounded-xl bg-section-alt border shadow-[0_4px_20px_hsl(var(--navy)/0.03)] hover:border-gold transition-colors">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gold-light flex items-center justify-center">
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  <p className="font-bold text-navy text-xl">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</p>
                </div>
              );
            })}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our Notable Alumni</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {alumni.map((a: any, i: number) => (
              <div key={a.name || i} className={`reveal delay-${Math.min(i % 3, 2)}00 p-6 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow`}>
                <div className="w-14 h-14 rounded-full bg-gold-light flex items-center justify-center mb-4 border border-gold/20 overflow-hidden">
                  {a.image ? (
                    <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-bold text-navy">{a.name?.split(" ")[1]?.[0]}{a.name?.split(" ")[2]?.[0] || ""}</span>
                  )}
                </div>
                <h3 className="font-bold text-foreground">{a.name}</h3>
                <p className="text-xs text-gold font-medium mt-1">{a.batch}</p>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm font-semibold text-foreground">{a.role}</p>
                  <p className="text-xs text-muted-foreground">{a.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
