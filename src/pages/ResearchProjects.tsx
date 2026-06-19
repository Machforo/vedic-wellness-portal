import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FlaskConical, Users, Award, TrendingUp } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

const defaultProjects = [
  { title: "Clinical Validation of Panchakarma Protocols for Metabolic Syndrome", pi: "Dr. R. Sharma", department: "Kayachikitsa", status: "Ongoing", funding: "CCIM Research Grant" },
  { title: "Pharmacognostical Studies of Regional Medicinal Plants (Western UP)", pi: "Dr. P. Mishra", department: "Dravyaguna", status: "Ongoing", funding: "Institutional Funding" },
  { title: "Development of Ayurvedic Formulations for Respiratory Disorders", pi: "Dr. A. Kumar", department: "Rasashastra", status: "Completed", funding: "DST-AYUSH" },
  { title: "In-Silico Docking Study of Classical Ayurvedic Compounds", pi: "Dr. S. Verma", department: "Agadtantra", status: "Completed", funding: "Institutional Funding" },
];

export default function ResearchProjectsPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("research");
  const rp = data?.researchProjects || {};
  const projects = rp.items?.length > 0 ? rp.items : defaultProjects;
  const stats = rp.stats?.length > 0 ? rp.stats : [
    { value: "10+", label: "Active Projects" },
    { value: "12", label: "Research Faculty" },
    { value: "40+", label: "Publications" },
    { value: "4", label: "Funded Projects" }
  ];
  const icons = [FlaskConical, Users, Award, TrendingUp];

  return (
    <Layout>
      <PageHeader
        title={rp.title || "Research Projects"}
        subtitle={rp.subtitle || "Active Ayurvedic research initiatives led by Ishan faculty"}
        breadcrumbs={[{ label: "Research" }, { label: "Research Projects" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {stats.map((s: any, i: number) => {
              const Icon = icons[i] || TrendingUp;
              return (
                <div key={s.label} className="reveal text-center p-6 rounded-xl bg-section-alt border">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gold-light flex items-center justify-center">
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  <p className="font-bold text-navy text-xl">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</p>
                </div>
              );
            })}
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            {projects.map((p: any, i: number) => (
              <div key={p.title || i} className={`reveal delay-${Math.min(i, 3)}00 p-6 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">PI: <span className="font-medium text-foreground">{p.pi}</span></p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">{p.department}</span>
                      <span className="px-2.5 py-1 rounded-md bg-gold-light text-xs font-medium text-navy">{p.funding}</span>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${p.status === "Ongoing" ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>{p.status}</span>
                    </div>
                  </div>
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
