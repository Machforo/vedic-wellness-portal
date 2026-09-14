import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TrendingUp, Building2, Globe, BookOpen, ArrowRight, HeartPulse, Stethoscope, Microscope } from "lucide-react";
import { Link } from "react-router-dom";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { rt } from "@/lib/richText";

const iconMap: Record<string, any> = {
  Building2,
  TrendingUp,
  BookOpen,
  Globe,
  HeartPulse,
  Stethoscope,
  Microscope,
  default: Building2
};

export default function ScopeOfBAMSPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("academics");
  const scopeOfBams = data?.scopeOfBams || {};

  const sectors = scopeOfBams.sectors && scopeOfBams.sectors.length > 0 ? scopeOfBams.sectors : [
    { icon: "Building2", title: "Government AYUSH Service", desc: "BAMS graduates are eligible for government AYUSH hospitals, dispensaries, and NHM AYUSH posts across all states. Over 50,000 AYUSH health centres under the National AYUSH Mission need qualified Vaidyas - a vast and growing public sector opportunity." },
    { icon: "TrendingUp", title: "Private Clinical Practice", desc: "Setting up an Ayurvedic clinic, Panchkarma centre, or Wellness Centre - demand for qualified Vaidyas is growing rapidly in urban India. BAMS graduates can open independent practice immediately after registration with state councils." },
    { icon: "BookOpen", title: "Advanced Study - BAMS MD", desc: "AIAPGET entrance examination opens doors to MD Ayurveda in all 14 specialisations, PhD research, international WHO fellowships, and academic positions. IAMC's research culture prepares students for competitive postgraduate entrance." },
    { icon: "Globe", title: "Global Wellness Sector", desc: "Ayurvedic wellness tourism, international wellness resorts, and AYUSH regulations growing in UAE, UK, Germany, and Southeast Asia. Global demand for classically trained Vaidyas continues to expand with India's AYUSH soft power." },
  ];

  return (
    <Layout>
      <PageHeader title="Scope of BAMS" subtitle="The expanding landscape of opportunities for BAMS graduates in government, private practice, research, and global wellness" breadcrumbs={[{ label: "BAMS Programme", href: "/courses/bams" }, { label: "Scope of BAMS" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Career Landscape</p>
            <h2 className="font-bold text-foreground leading-tight mb-6">India's AYUSH Sector Is One of the Fastest Growing Health Sectors</h2>
            {scopeOfBams.description ? (
              <div className="text-foreground/70 leading-relaxed rich-text" dangerouslySetInnerHTML={{ __html: rt(scopeOfBams.description) }}></div>
            ) : (
              <p className="text-foreground/70 leading-relaxed">With 50,000+ AYUSH health centres, a National AYUSH Mission, WHO recognition of traditional medicine, and growing global wellness demand - BAMS is no longer a niche qualification. It is a gateway to a broad and expanding professional landscape.</p>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-8 mb-16">
            {sectors.map((s: any, i: number) => { 
              const Icon = iconMap[s.icon as string] || iconMap.default; 
              return (
                <div key={i} className={`reveal delay- p-8 rounded-2xl border bg-card hover:shadow-[0_8px_32px_hsl(var(--navy)/0.08)] transition-all`}>
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-navy" /></div>
                  <h3 className="font-bold text-foreground mb-3">{s.title}</h3>
                  <div className="text-sm text-foreground/70 leading-relaxed rich-text" dangerouslySetInnerHTML={{ __html: rt(s.desc) }}></div>
                </div>
              ); 
            })}
          </div>

          {scopeOfBams?.editorialImages && scopeOfBams.editorialImages.length > 0 && (
            <div className="reveal mb-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {scopeOfBams.editorialImages.map((photo: any, index: number) => (
                  <div key={index} className="rounded-xl overflow-hidden aspect-[4/3] relative group shadow-sm border border-border">
                    <img src={photo.image} alt={photo.caption || "Editorial"} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
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

          <div className="text-center">
            <Link to="/admissions" className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white font-bold rounded-xl hover:bg-gold hover:text-navy transition-all shimmer-btn">Apply for BAMS {new Date().getFullYear()}-{String(new Date().getFullYear() + 1).slice(2)} <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
