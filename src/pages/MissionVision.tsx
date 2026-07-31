import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Eye, Target, CheckCircle2 } from "lucide-react";

import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import PageGallery from "@/components/PageGallery";

const defaultValues = ["Classical Scholarship", "Clinical Excellence", "Compassionate Care", "Evidence-Based Practice", "Ethical Conduct", "Community Health"];

export default function MissionVisionPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("aboutus");
  const missionVision = data?.missionVision;
  const values = missionVision?.values?.length > 0 ? missionVision.values : defaultValues;

  return (
    <Layout>
      <PageHeader title="Mission & Vision" subtitle="The institutional vision that drives Ishan Ayurvedic Medical College toward excellence in Ayurvedic education and healthcare" breadcrumbs={[{ label: "About", href: "/about" }, { label: "Mission & Vision" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="reveal p-8 rounded-2xl border bg-card">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4"><Eye className="w-6 h-6 text-navy" /></div>
              <h2 className="font-bold text-foreground mb-4">Our Vision</h2>
              <div 
                className="text-foreground/70 leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: missionVision?.vision || "To be India's most respected institution for classical Ayurvedic medical education — producing competent, compassionate Vaidyas who elevate Ayurveda's standing in global healthcare through rigorous scholarship, clinical excellence, and evidence-based practice." }} 
              />
            </div>
            <div className="reveal delay-100 p-8 rounded-2xl border bg-navy text-white">
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-4"><Target className="w-6 h-6 text-gold" /></div>
              <h2 className="font-bold text-white mb-4">Our Mission</h2>
              <div 
                className="text-white/70 leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: missionVision?.mission || "To provide NCISM-standard BAMS education that combines mastery of classical Ayurvedic texts with modern clinical training — preparing graduates to practise, research, teach, and lead in all domains of Ayurvedic healthcare in India and globally." }} 
              />
            </div>
          </div>
          <div className="reveal">
            <h3 className="font-bold text-foreground mb-6">Core Values</h3>
            <div className="flex flex-wrap gap-3">
              {values.map((v: any, i: number) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-card">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span className="text-sm font-semibold">{typeof v === 'string' ? v : v.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <PageGallery images={data?.pageGallery} />
      <EnquiryCTA />
    </Layout>
  );
}
