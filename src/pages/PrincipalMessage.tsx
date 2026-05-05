import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function PrincipalMessagePage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader title="Principal's Message" subtitle="A message from the Principal of Ishan Ayurvedic Medical College and Research Centre" breadcrumbs={[{ label: "About", href: "/about" }, { label: "Principal's Message" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="reveal-left lg:col-span-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop" alt="Principal, IAMC" className="w-full h-80 object-cover" />
              </div>
              <div className="mt-6 p-4 rounded-xl border bg-card text-center">
                <h3 className="font-bold text-foreground">Dr. Vijay Kumar Sharma</h3>
                <p className="text-sm text-gold font-semibold mt-1">Principal</p>
                <p className="text-xs text-muted-foreground mt-1">MD (Kayachikitsa) · 22 Years Experience</p>
              </div>
            </div>
            <div className="reveal-right lg:col-span-2 space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">A Word from Our Principal</p>
              <h2 className="font-bold text-foreground leading-tight">Welcome to Ishan Ayurvedic Medical College</h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>Dear future Vaidyas and well-wishers of Ayurveda,</p>
                <p>It is my privilege to welcome you to Ishan Ayurvedic Medical College and Research Centre — a home for those who wish to pursue the ancient science of Ayurveda with academic rigour and clinical commitment.</p>
                <p>Ayurveda is not merely a system of medicine — it is a comprehensive philosophy of life. At IAMC, we believe that a true Vaidya is both a scholar of classical texts and a compassionate clinician. Our curriculum is therefore designed to develop both: deep engagement with Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya alongside daily OPD exposure in our in-campus teaching hospital from Year 1.</p>
                <p>We are proud to be the only private AYUSH medical college in the National Capital Region with NCISM approval. Our 14 Ayurvedic departments, living Herbal Garden of over 200 medicinal species, and dedicated faculty of BAMS MD-qualified Vaidyas create an environment in which classical learning and clinical practice are inseparable.</p>
                <p>I invite you to visit our campus, meet our faculty, and experience the IAMC difference. The BAMS degree from IAMC is not just a qualification — it is the beginning of a life dedicated to healing, scholarship, and service.</p>
                <p className="font-semibold text-foreground">With warm regards and blessings,<br />Dr. Vijay Kumar Sharma<br />Principal, IAMC</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
