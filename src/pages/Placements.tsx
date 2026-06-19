import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TrendingUp, Building2, Users2, Star, CheckCircle2 } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

const defaultStats: any[] = [];

const defaultRecruiters: any[] = [];

const defaultTestimonials: any[] = [];

export default function PlacementsPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("research");
  const placementsData = data?.placements || {};

  // Schema field names: placementNumbers, recruitingPartners, successStories, placementProcess
  const stats = placementsData.placementNumbers?.length > 0 ? placementsData.placementNumbers.map((p: any) => ({ label: p.label, value: p.number })) : defaultStats;
  const recruiters: string[] = placementsData.companies?.length > 0
    ? placementsData.companies
    : defaultRecruiters;
  const testimonials = placementsData.successStories?.length > 0 ? placementsData.successStories : defaultTestimonials;
  const placementProcess: Array<{step:string;desc:string}> = placementsData.placementProcess?.length > 0 ? placementsData.placementProcess : [
    { step: "1", desc: "Pre-placement clinical training: patient interaction, hospital management, medical camps" },
    { step: "2", desc: "Registration with the placement cell and profile building" },
    { step: "3", desc: "Hospital and wellness center recruitment drives" },
    { step: "4", desc: "Technical assessment and personal interviews" },
    { step: "5", desc: "Offer letter issuance and medical officer onboarding support" },
  ];

  return (
    <Layout>
      <PageHeader title={placementsData.title || "Career Outcomes"} subtitle={placementsData.subtitle || "Consistent record of placements in top-tier Ayurvedic hospitals, wellness centers, and research institutions"} breadcrumbs={[{ label: "Career Outcomes" }]} />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          {/* Stats */}
          {stats.length > 0 && (
            <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((s: any, i: number) => {
                const Icon = s.icon && typeof s.icon !== 'string' ? s.icon : TrendingUp;
                return (
                  <div key={s.label || i} className="text-center p-6 rounded-xl bg-section-alt border">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gold-light flex items-center justify-center"><Icon className="w-6 h-6 text-navy" /></div>
                    <p className="font-bold text-navy">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Process */}
          <div className="reveal delay-100 max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Placement Process</h2>
            <div className="space-y-4">
              {placementProcess.map((step: any, i: number) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-lg border bg-card">
                  <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0"><span className="text-xs font-bold text-primary-foreground">{step.step || i+1}</span></div>
                  <p className="text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recruiters */}
          {recruiters.length > 0 && (
            <div className="reveal delay-200 mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-10 text-center">Our Recruiting Partners</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {recruiters.map((r: any, i: number) => (
                  <div key={r.name || i} className="flex items-center justify-center p-8 rounded-xl border bg-card hover:shadow-md transition-shadow h-32">
                    {r.logo ? (
                      <img src={r.logo} alt={r.name} className="h-16 md:h-20 w-auto object-contain" />
                    ) : (
                      <span className="text-sm font-semibold text-foreground/50">{r.name || r}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <div className="reveal delay-300">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Student Success Stories</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {testimonials.map((t: any, i: number) => (
                  <div key={t.name || i} className="p-6 rounded-xl border bg-card">
                    {(t.quote || t.message) && <p className="text-sm leading-relaxed italic mb-4">"{t.quote || t.message}"</p>}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center">
                        {t.image ? <img src={t.image} alt={t.name} className="w-full h-full rounded-full object-cover" /> : <span className="text-sm font-bold text-navy">{t.name?.[0]}</span>}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.program || "BAMS"}{(t.program || "BAMS") && t.company ? " → " : ""}{t.company}</p>
                        {t.package && <p className="text-xs font-medium text-gold">{t.package}</p>}
                      </div>
                    </div>
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
