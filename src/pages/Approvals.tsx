import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield } from "lucide-react";

const approvals = [
  { name: "NCISM", fullName: "National Commission for Indian System of Medicine", logo: "https://placehold.co/150x150/e2e8f0/1e293b?text=NCISM", desc: "NCISM is the apex statutory body governing Ayurvedic, Unani, Siddha, and Sowa-Rigpa medical education and practice in India. IAMC's BAMS programme is NCISM-approved, ensuring the degree is recognised across India and eligible for practitioner registration." },
  { name: "AYUSH", fullName: "Ministry of Ayurveda, Yoga & Naturopathy, Unani, Siddha and Homoeopathy", logo: "https://placehold.co/150x150/e2e8f0/1e293b?text=AYUSH", desc: "Ministry of AYUSH of the Government of India oversees all AYUSH institutions. IAMC operates under AYUSH regulatory guidelines and is eligible for AYUSH national mission schemes, scholarships, and research grants." },
  { name: "UP AYUSH Directorate", fullName: "Directorate of AYUSH, Government of Uttar Pradesh", logo: "https://pharmacy.ishan.ac/wp-content/uploads/2023/07/Scholarship-UP-150x150.jpg", desc: "State-level AYUSH regulatory authority in Uttar Pradesh overseeing admissions, inspections, and affiliation. IAMC's BAMS seats are filled through UP state AYUSH counselling under the state Directorate's authority." },
];

export default function ApprovalsPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader title="Approvals & Affiliations" subtitle="IAMC's regulatory approvals and affiliations ensuring the BAMS degree is fully recognised and practitioner-eligible" breadcrumbs={[{ label: "About", href: "/about" }, { label: "Approvals & Affiliations" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-5xl">
          <div className="reveal mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Regulatory Standing</p>
            <h2 className="font-bold text-foreground mb-4">Approved by India's Apex AYUSH Regulatory Body</h2>
            <p className="text-foreground/70 leading-relaxed max-w-3xl">IAMC's BAMS degree is NCISM-approved � the only approval that confers full practitioner registration eligibility in all states of India. Without NCISM approval, an Ayurvedic degree is not recognised for medical practice. IAMC graduates are registered as Vaidyas and eligible for government AYUSH service.</p>
          </div>
          <div className="space-y-6">
            {approvals.map((a, i) => (
              <div key={a.name} className={`reveal delay- flex gap-6 p-6 rounded-2xl border bg-card items-start`}>
                <div className="w-20 h-20 shrink-0 bg-white rounded-xl border p-2 flex items-center justify-center shadow-sm">
                  <img src={a.logo} alt={a.name} className="h-full w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-gold" />
                    <h3 className="font-bold text-foreground">{a.name}</h3>
                  </div>
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">{a.fullName}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed">{a.desc}</p>
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
