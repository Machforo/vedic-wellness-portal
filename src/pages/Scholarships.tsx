import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2 } from "lucide-react";

const scholarships = [
  { name: "UP Government Scholarship", type: "Government", eligibility: "SC/ST/OBC/General EWS students domiciled in UP. Applied through URISE portal.", benefit: "Tuition fee waiver/reimbursement as per UP scholarship norms." },
  { name: "National Scholarship Portal (NSP)", type: "Government", eligibility: "Central sector scholarship for students with NEET rank and family income below Rs 8 lakh.", benefit: "Up to Rs 12,000 per annum." },
  { name: "IAMC Merit Scholarship", type: "Institutional", eligibility: "BAMS students with high NEET rank (top 10%) and consistent academic performance from Year 1.", benefit: "Partial fee waiver — 10% to 25% of tuition fee." },
  { name: "AYUSH Ministry Fellowships", type: "Government", eligibility: "Post-BAMS researchers and internship students for research in classical Ayurveda.", benefit: "Monthly stipend as per AYUSH ministry guidelines." },
];

export default function ScholarshipsPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader title="Scholarships & Financial Aid" subtitle="Government and institutional scholarships available for BAMS students at IAMC" breadcrumbs={[{ label: "BAMS Programme", href: "/courses/bams" }, { label: "Scholarships" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-5xl">
          <div className="reveal mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Financial Assistance</p>
            <h2 className="font-bold text-foreground mb-4">Scholarships for BAMS Students</h2>
            <p className="text-foreground/70 leading-relaxed max-w-2xl">Multiple scholarship programmes are available to BAMS students at IAMC. Our admissions team assists eligible students in applying.</p>
          </div>
          <div className="space-y-6 mb-12">
            {scholarships.map((s, i) => (
              <div key={s.name} className="reveal p-6 rounded-2xl border bg-card" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-foreground">{s.name}</h3>
                  <span className={`text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${s.type === "Government" ? "bg-navy text-white" : "bg-gold text-navy"}`}>{s.type}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Eligibility</p><p className="text-foreground/70">{s.eligibility}</p></div>
                  <div><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Benefit</p><p className="text-foreground/70 font-semibold">{s.benefit}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal p-6 rounded-2xl bg-navy/5 border border-navy/10">
            <h3 className="font-bold text-foreground mb-3">How to Apply</h3>
            <ul className="space-y-2">
              {["Register on URISE portal for UP government scholarships","Register on NSP portal for central government scholarships","Contact IAMC admissions cell for institutional scholarship application","Ensure all documents including income certificate are current"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/70"><CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}