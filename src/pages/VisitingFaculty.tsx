import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import PageGallery from "@/components/PageGallery";

export default function VisitingFacultyPage() {
  const ref = useScrollReveal();
  const { data: visitingFacultyList } = useAyurvedaData("visiting-faculty");

  const visitingFaculty = Array.isArray(visitingFacultyList) && visitingFacultyList.length > 0 ? visitingFacultyList : [
    { name: "Dr. Arun Sharma", org: "Senior Pharmacologist", specialisation: "Clinical Drug Development & Trials", impact: "Provides insights into clinical trial design, GCP guidelines, and drug evaluation methodologies." },
    { name: "Mr. Rajiv Mehta", org: "Production Head, Sun Pharma", specialisation: "Pharmaceutical Manufacturing & GMP", impact: "Trains students on large-scale manufacturing, SOPs, and Good Manufacturing Practice compliance." },
    { name: "Dr. Kavita Iyer", org: "Research Scientist, Dr. Reddy's", specialisation: "Drug Formulation & Stability Studies", impact: "Guides students on formulation R&D, stability testing protocols, and regulatory submissions." },
    { name: "Ms. Priya Nair", org: "Hospital Pharmacist, Apollo", specialisation: "Clinical Pharmacy & Patient Counselling", impact: "Mentors students in hospital pharmacy operations, medication reviews, and therapeutic counselling." },
    { name: "Dr. Sanjay Gupta", org: "Drug Regulatory Expert", specialisation: "CDSCO Regulations & Drug Licensing", impact: "Equips students with knowledge of Indian drug regulations and the licensing process under CDSCO." },
    { name: "Dr. Meena Bajaj", org: "Phytochemist, CSIR-CIMAP", specialisation: "Herbal Drug Research & Phytochemistry", impact: "Demonstrates advanced techniques in extraction and characterisation of bioactive plant compounds." },
    { name: "Mr. Rahul Singh", org: "QA Manager, Cipla", specialisation: "Quality Assurance & Quality Control", impact: "Trains students in QA/QC systems, analytical testing methods, and pharmaceutical quality standards." },
    { name: "Dr. Anita Verma", org: "Pharmacovigilance Expert", specialisation: "Drug Safety & Adverse Event Reporting", impact: "Covers post-marketing surveillance, adverse drug reaction reporting, and global pharmacovigilance systems." },
  ];

  return (
    <Layout>
      <PageHeader
        title="Visiting Faculty"
        subtitle="Distinguished Vaidyas, industry scientists, and healthcare experts who bring real-world insights to the classroom"
        breadcrumbs={[{ label: "Faculty", href: "/faculty" }, { label: "Visiting Faculty" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <p className="reveal leading-relaxed max-w-4xl mx-auto text-center mb-16 text-lg">
            Ishan Ayurveda invites distinguished visiting faculty — senior practitioners from top research institutes, hospital supervisors from premier Ayurvedic hospitals, and regulatory experts; students gain direct access to professionals shaping India's AYUSH landscape.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visitingFaculty.map((f: any, i: number) => (
              <div key={i} className={`reveal delay-${Math.min(i % 4, 3)}00 bg-card rounded-xl border p-6 hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow`}>
                {f.image ? (
                  <img src={f.image} alt={f.name} className="w-14 h-14 rounded-full object-cover mb-4" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center mb-4">
                    <span className="text-sm font-bold text-primary-foreground">
                      {f.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                )}
                <h3 className="font-semibold text-foreground text-sm">{f.name}</h3>
                <p className="text-xs text-gold font-medium mt-1">{f.org}</p>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs font-semibold text-foreground/80 mb-2">{f.specialisation}</p>
                  <div className="text-xs text-muted-foreground leading-relaxed text-left [&>p]:m-0" dangerouslySetInnerHTML={{ __html: f.impact }}></div>
                </div>
                <div className="mt-3 text-left">
                  <span className="px-2 py-1 rounded bg-muted text-xs font-medium text-muted-foreground border">
                    Industry Expert
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    <PageGallery images={data?.pageGallery} />
    </Layout>
  );
}
