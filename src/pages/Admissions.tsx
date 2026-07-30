import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2, ArrowRight, FileText, Phone } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

export default function AdmissionsPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("admissions");
  const admissionProcess = data?.admissionProcess || {};

  const steps = admissionProcess.steps && admissionProcess.steps.length > 0 ? admissionProcess.steps : [
    { step: "01", title: "Register for NEET-UG", desc: "All BAMS admissions in India require a valid NEET-UG score. Register and appear for NEET-UG conducted by NTA. 10+2 Biology (PCB) with minimum 50% marks required." },
    { step: "02", title: "Appear for NEET-UG", desc: "Appear for the NEET-UG examination. Your NEET score and rank determine eligibility for AYUSH counselling." },
    { step: "03", title: "AYUSH Counselling Registration", desc: "Register for AYUSH central counselling (AACCC) or UP state AYUSH counselling based on your preference and rank." },
    { step: "04", title: "Merit-Based Allotment", desc: "Seat allotment based on NEET rank, category, and preference. IAMC seats available through both central and state AYUSH counselling." },
    { step: "05", title: "IAMC Document Verification & Fee", desc: "Report to IAMC with all original documents for verification. Complete fee payment to confirm your seat and begin your BAMS journey." },
  ];

  const documents = admissionProcess.documents && admissionProcess.documents.length > 0 ? admissionProcess.documents : [
    { text: "10+2 Marksheet & Certificate" },
    { text: "NEET-UG Scorecard" },
    { text: "AYUSH Counselling Allotment Letter" },
    { text: "Category Certificate (SC/ST/OBC if applicable)" },
    { text: "Domicile Certificate" },
    { text: "Passport-size Photographs" },
    { text: "Aadhaar Card / Government ID" },
  ];

  const helpContact = admissionProcess.helpContact || "8448797700";
  const whatsappContact = admissionProcess.whatsappContact || "918448797700";

  return (
    <Layout>
      <PageHeader 
        title={`BAMS Admissions ${new Date().getFullYear()}-${String(new Date().getFullYear() + 1).slice(2)}`} 
        subtitle="Admission to BAMS at IAMC is through NEET-UG followed by AYUSH central or UP state counselling - our team guides you through every step" 
        breadcrumbs={[{ label: "Admissions" }]} 
        backgroundImage={admissionProcess?.bannerImage}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-5xl">
          <div className="reveal mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Admission Process</p>
            <h2 className="font-bold text-foreground mb-4">5-Step Admission Process</h2>
            {admissionProcess.description ? (
              <div className="text-foreground/70 leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: admissionProcess.description }}></div>
            ) : (
              <p className="text-foreground/70 leading-relaxed max-w-2xl">BAMS admission is regulated - all students must appear for NEET-UG and obtain a seat through AYUSH counselling. IAMC's admissions team guides students through central and UP state counselling processes, stray vacancy rounds, and document verification.</p>
            )}
          </div>
          <div className="space-y-4 mb-16">
            {steps.map((s: any, i: number) => (
              <div key={i} className={`reveal delay-${i * 100} flex gap-6 p-6 rounded-2xl border bg-card`}>
                <div className="w-12 h-12 rounded-xl bg-gold text-navy font-black text-lg flex items-center justify-center shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{s.title}</h3>
                  <div className="text-sm text-foreground/70 leading-relaxed [&>p]:m-0" dangerouslySetInnerHTML={{ __html: s.desc }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="reveal p-6 rounded-2xl border bg-card">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-gold" />Documents Required</h3>
              <ul className="space-y-2">
                {documents.map((d: any, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />{d.text || d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal delay-100 p-6 rounded-2xl border bg-navy text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Phone className="w-5 h-5 text-gold" />Admissions Helpline</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">Our admissions counsellors are available Mon-Sat, 9 AM-5 PM to answer all NEET, counselling, eligibility, and documentation queries.</p>
                <div className="space-y-3">
                  <a href={`tel:+91${helpContact}`} className="flex items-center gap-2 text-gold font-bold hover:text-white transition-colors"><Phone className="w-4 h-4" />{helpContact}</a>
                  <a href={`https://wa.me/${whatsappContact}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-gold text-navy font-bold rounded-xl hover:bg-white transition-all w-full justify-center">WhatsApp Us <ArrowRight className="w-4 h-4" /></a>
                </div>
              </div>
              {admissionProcess?.counsellorImage && (
                <div className="absolute inset-0 z-0 opacity-20">
                  <img src={admissionProcess.counsellorImage} alt="Counsellor" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {admissionProcess?.orientationPhotos && admissionProcess.orientationPhotos.length > 0 && (
            <div className="reveal mt-16 pt-16 border-t border-border">
              <div className="grid md:grid-cols-3 gap-6">
                {admissionProcess.orientationPhotos.map((photo: any, idx: number) => (
                  <div key={idx} className="rounded-2xl overflow-hidden aspect-[4/3] group relative shadow-sm border border-border">
                    <img src={photo.image} alt={photo.caption || "Orientation"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {photo.caption && (
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium">{photo.caption}</p>
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
