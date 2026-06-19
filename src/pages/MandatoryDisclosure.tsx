import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FileText, Download } from "lucide-react";

import { useAyurvedaData } from "@/hooks/useAyurvedaData";

const defaultStatement = "The information provided below is submitted as required by the National Commission for Indian System of Medicine (NCISM) and the Ministry of AYUSH, and is updated annually to ensure full transparency. Any discrepancies found in the reported data should be immediately brought to the notice of the Principal at Ishan Ayurvedic Medical College and Research Centre, Knowledge Park, Greater Noida.\n\nNCISM mandates public disclosure for the benefit of current and prospective students, healthcare practitioners, and regulatory authorities. It serves as a comprehensive record of the institution's facilities, hospital standards, and Vaidya faculty expertise, ensuring accountability in Ayurvedic medical education.";

const defaultDisclosureItems = [
  { category: "Institution Details", items: ["Name: Ishan Ayurvedic Medical College and Research Centre", "Address: Knowledge Park-III, Greater Noida", "Year of Establishment: 2017", "Status: Private Self-Financing", "Type: Co-educational Professional Medical Institution"] },
  { category: "Academic Information", items: ["Programs Offered: BAMS (Bachelor of Ayurvedic Medicine & Surgery)", "NCISM Approval Status — Current", "Annual Intake: 60 Seats", "Faculty-Student Ratio", "Student Success & Registration Rate"] },
  { category: "Regulatory Information", items: ["NCISM Approval Letters", "CCIM/AYUSH Ministry Notifications", "University Affiliation Documents", "Anti-Ragging Committee Constitution", "Grievance Redressal Mechanism"] },
  { category: "Infrastructure & Hospital", items: ["100-Bed In-Campus Ayurvedic Teaching Hospital", "14 Specialized Ayurvedic Departments", "Medical Library — Classical Texts, Journals & Digital Resources", "Machine Room & Herbal Garden (200+ Species)", "Medical Camps & Outreach Programs"] },
  { category: "Faculty & Staff", items: ["List of Core Faculty with NCISM-mandated Qualifications (MD/MS Ayurveda)", "Visiting Clinical Experts Profile", "Hospital Administrative Staff Details"] },
];

export default function MandatoryDisclosurePage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("mandatorydisclosure");
  
  const statement = data?.statement || defaultStatement;
  
  const disclosureItems = data?.disclosureItems?.length > 0 
    ? data.disclosureItems
    : defaultDisclosureItems;

  return (
    <Layout>
      <PageHeader
        title="Mandatory Disclosure"
        subtitle="NCISM / AYUSH format mandatory disclosure document — updated annually"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Mandatory Disclosure" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="reveal bg-gold-light rounded-xl p-6 mb-12 flex items-start gap-4">
              <FileText className="w-6 h-6 text-navy shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-1">NCISM Compliance Statement</p>
                <div 
                  className="text-sm leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: statement }} 
                />
              </div>
            </div>

            <div className="space-y-6">
              {disclosureItems.map((section: any, i: number) => (
                <div key={section.category} className={`reveal delay-${Math.min(i, 4)}00 rounded-xl border bg-card p-6`}>
                  <h3 className="font-bold text-foreground mb-4">{section.category}</h3>
                  {Array.isArray(section.items) ? (
                    <ul className="space-y-2">
                      {section.items.map((item: string) => (
                        <li key={item} className="flex items-start gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-sm space-y-2 prose prose-sm prose-p:my-1 prose-ul:my-1 prose-li:my-0 max-w-none text-foreground/80" dangerouslySetInnerHTML={{ __html: section.items }} />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-navy text-primary-foreground rounded-lg hover:bg-navy/90 transition-colors active:scale-[0.97]">
                <Download className="w-4 h-4" />
                Download Full Disclosure PDF
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
