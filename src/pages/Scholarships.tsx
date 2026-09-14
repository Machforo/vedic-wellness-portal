import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2 } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { rt } from "@/lib/richText";

export default function ScholarshipsPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("admissions");
  const scholarshipsData = data?.scholarships || {};

  const scholarships = scholarshipsData.schemes && scholarshipsData.schemes.length > 0 ? scholarshipsData.schemes : [
    { name: "UP Government Scholarship", typeStr: "Government", eligibility: "SC/ST/OBC/General EWS students domiciled in UP. Applied through URISE portal.", benefit: "Tuition fee waiver/reimbursement as per UP scholarship norms." },
    { name: "National Scholarship Portal (NSP)", typeStr: "Government", eligibility: "Central sector scholarship for students with NEET rank and family income below Rs 8 lakh.", benefit: "Up to Rs 12,000 per annum." },
    { name: "IAMC Merit Scholarship", typeStr: "Institutional", eligibility: "BAMS students with high NEET rank (top 10%) and consistent academic performance from Year 1.", benefit: "Partial fee waiver - 10% to 25% of tuition fee." },
    { name: "AYUSH Ministry Fellowships", typeStr: "Government", eligibility: "Post-BAMS researchers and internship students for research in classical Ayurveda.", benefit: "Monthly stipend as per AYUSH ministry guidelines." },
  ];

  const howToApply = scholarshipsData.howToApply && scholarshipsData.howToApply.length > 0 ? scholarshipsData.howToApply : [
    { text: "Register on URISE portal for UP government scholarships" },
    { text: "Register on NSP portal for central government scholarships" },
    { text: "Contact IAMC admissions cell for institutional scholarship application" },
    { text: "Ensure all documents including income certificate are current" }
  ];

  return (
    <Layout>
      <PageHeader title="Scholarships & Financial Aid" subtitle="Government and institutional scholarships available for BAMS students at IAMC" breadcrumbs={[{ label: "BAMS Programme", href: "/courses/bams" }, { label: "Scholarships" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-5xl">
          <div className="reveal mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Financial Assistance</p>
            <h2 className="font-bold text-foreground mb-4">Scholarships for BAMS Students</h2>
            {scholarshipsData.description ? (
              <div className="text-foreground/70 leading-relaxed max-w-2xl rich-text" dangerouslySetInnerHTML={{ __html: rt(scholarshipsData.description) }}></div>
            ) : (
              <p className="text-foreground/70 leading-relaxed max-w-2xl">Multiple scholarship programmes are available to BAMS students at IAMC. Our admissions team assists eligible students in applying.</p>
            )}
          </div>
          <div className="space-y-6 mb-12">
            {scholarships.map((s: any, i: number) => (
              <div key={i} className="reveal p-6 rounded-2xl border bg-card" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-foreground">{s.name}</h3>
                  <span className={`text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${s.typeStr === "Government" ? "bg-navy text-white" : "bg-gold text-navy"}`}>{s.typeStr}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Eligibility</p>
                    <div className="text-foreground/70 [&>p]:m-0 rich-text" dangerouslySetInnerHTML={{ __html: rt(s.eligibility) }}></div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Benefit</p>
                    <div className="text-foreground/70 font-semibold [&>p]:m-0 rich-text" dangerouslySetInnerHTML={{ __html: rt(s.benefit) }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal p-6 rounded-2xl bg-navy/5 border border-navy/10">
            <h3 className="font-bold text-foreground mb-3">How to Apply</h3>
            <ul className="space-y-2">
              {howToApply.map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70"><CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />{item.text || item}</li>
              ))}
            </ul>
          </div>

          {scholarshipsData?.certificateHandoverImages && scholarshipsData.certificateHandoverImages.length > 0 && (
            <div className="reveal mt-16 pt-12 border-t border-border">
              <h3 className="font-bold text-foreground mb-6 text-center">Scholarship Awardees</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {scholarshipsData.certificateHandoverImages.map((photo: any, index: number) => (
                  <div key={index} className="rounded-xl overflow-hidden aspect-[4/3] relative group shadow-sm border border-border">
                    <img src={photo.image} alt={photo.caption || "Scholarship Certificate"} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                    {photo.caption && (
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs font-medium">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
