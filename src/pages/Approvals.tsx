import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield } from "lucide-react";

import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { rt } from "@/lib/richText";


const defaultApprovals = [
  { name: "NCISM", description: "NCISM is the apex statutory body governing Ayurvedic, Unani, Siddha, and Sowa-Rigpa medical education and practice in India. IAMC's BAMS programme is NCISM-approved, ensuring the degree is recognised across India and eligible for practitioner registration.", logo: "https://placehold.co/150x150/e2e8f0/1e293b?text=NCISM" },
  { name: "AYUSH", description: "Ministry of AYUSH of the Government of India oversees all AYUSH institutions. IAMC operates under AYUSH regulatory guidelines and is eligible for AYUSH national mission schemes, scholarships, and research grants.", logo: "https://placehold.co/150x150/e2e8f0/1e293b?text=AYUSH" },
  { name: "UP AYUSH Directorate", description: "State-level AYUSH regulatory authority in Uttar Pradesh overseeing admissions, inspections, and affiliation. IAMC's BAMS seats are filled through UP state AYUSH counselling under the state Directorate's authority.", logo: "https://pharmacy.ishan.ac/wp-content/uploads/2023/07/Scholarship-UP-150x150.jpg" }
];

export default function ApprovalsPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("aboutus");
  const approvals = data?.approvals?.length > 0 ? data.approvals : defaultApprovals;

  return (
    <Layout>
      <PageHeader title="Approvals & Affiliations" subtitle="IAMC's regulatory approvals and affiliations ensuring the BAMS degree is fully recognised and practitioner-eligible" breadcrumbs={[{ label: "About", href: "/about" }, { label: "Approvals & Affiliations" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-5xl">
          <div className="reveal mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">{data?.approvalsSection?.subtitle || "Regulatory Standing"}</p>
            <h2 className="font-bold text-foreground mb-4">{data?.approvalsSection?.title || "Approved by India's Apex AYUSH Regulatory Body"}</h2>
            <div 
              className="text-foreground/70 leading-relaxed max-w-3xl rich-text" 
              dangerouslySetInnerHTML={{ __html: rt(data?.approvalsSection?.description || "IAMC's BAMS degree is NCISM-approved — the only approval that confers full practitioner registration eligibility in all states of India. Without NCISM approval, an Ayurvedic degree is not recognised for medical practice. IAMC graduates are registered as Vaidyas and eligible for government AYUSH service.") }} 
            />
          </div>
          <div className="space-y-6">
            {approvals.map((a: any) => (
              <div key={a.name || a._id} className="reveal flex gap-6 p-6 rounded-2xl border bg-card items-start">
                <div className="w-20 h-20 shrink-0 bg-white rounded-xl border p-2 flex items-center justify-center shadow-sm">
                  <img src={a.logo || a.image || "https://placehold.co/150x150/e2e8f0/1e293b?text=Logo"} alt={a.name} className="h-full w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-gold" />
                    <h3 className="font-bold text-foreground">{a.name}</h3>
                  </div>
                  <div className="text-sm text-foreground/70 leading-relaxed rich-text" dangerouslySetInnerHTML={{ __html: rt(a.description) }} />
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
