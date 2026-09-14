import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { rt } from "@/lib/richText";


const defaultRules = [
  { category: "1. Professional Conduct", items: "Ayurvedic students are expected to maintain the highest standards of decorum and dignity, reflecting the noble nature of the Vaidya profession. Respectful behavior towards faculty, staff, and fellow students is mandatory. Any form of misconduct will result in immediate disciplinary action." },
  { category: "2. Dress Code (Clinical Uniform)", items: "As per NCISM standards, students must adhere to the prescribed professional dress code, including a clean White Apron/Lab Coat. Clean and formal attire is mandatory during academic hours, laboratory sessions, and hospital clinical postings." },
  { category: "3. Attendance (NCISM Regulations)", items: "A strict minimum of 75% attendance in theory and 80% in practicals/clinicals is mandatory for each subject as per National Commission for Indian System of Medicine (NCISM) regulations. Students falling below this threshold will not be permitted to appear for university examinations." },
  { category: "4. Academic Integrity & Clinical Ethics", items: "Plagiarism, cheating, or any form of academic dishonesty is strictly prohibited. Falsifying clinical data, patient records, or research results will lead to immediate disqualification and potential expulsion, as these acts are contrary to the ethics of the medical profession." },
  { category: "5. Hospital & Campus Decorum", items: "Students must maintain strict safety protocols, absolute silence, and decorum in the Hospital OPD/IPD, Laboratories, and Library. Use of mobile phones is strictly prohibited in these clinical and academic areas. Respect for patients and hospital equipment is expected from every student." },
  { category: "6. Zero Tolerance for Ragging", items: "As per UGC and NCISM regulations, ragging in any form is a criminal offense. IAMC maintains zero tolerance towards ragging. Offenders will face immediate expulsion, FIR registration, and criminal prosecution." },
];

export default function CodeOfConductPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("codeofconduct");
  
  const rules = data?.rules?.length > 0 ? data.rules : defaultRules;

  return (
    <Layout>
      <PageHeader 
        title={data?.title || "Code of Conduct"} 
        subtitle={data?.subtitle || "Student rules, dress code, and academic integrity guidelines for BAMS students"} 
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Code of Conduct" }]} 
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start max-w-6xl mx-auto">
            <div className="reveal space-y-8">
              {rules.map((s: any) => (
                <div key={s.category}>
                  <h2 className="text-lg font-bold text-foreground mb-3">{s.category}</h2>
                  <div className="text-sm leading-relaxed rich-text" dangerouslySetInnerHTML={{ __html: rt(s.items) }} />
                </div>
              ))}
            </div>
            <div className="reveal hidden lg:block sticky top-32">
              <div className="rounded-2xl overflow-hidden shadow-2xl border mb-6">
                <img src={data?.image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"} alt="Professional Conduct" className="w-full h-[500px] object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
