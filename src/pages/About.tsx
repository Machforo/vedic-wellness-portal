import React from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2 } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { rt } from "@/lib/richText";
import DynamicPageSections from "@/components/DynamicPageSections";

const defaultMilestones: any[] = [];
const defaultDifferentiators = [
  "NCISM Approved — only private AYUSH college in NCR",
  "14 Ayurvedic departments with dedicated Vaidya faculty",
  "In-campus teaching hospital with daily OPD rotation",
  "Herbal Garden of over 200 medicinal plant species",
  "BAMS MD-qualified research faculty",
  "Global Ayurvedic Summits and NCISM-recognised events",
  "Strong government AYUSH placement guidance",
  "Location: Knowledge Park, Greater Noida — Delhi NCR",
];

export default function AboutPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("aboutus");

  const ourStory = data?.ourStory;
  const milestones = data?.milestones?.length > 0 ? data.milestones : defaultMilestones;
  const keyDifferentiators = data?.keyDifferentiators?.length > 0
    ? data.keyDifferentiators.map((k: any) => typeof k === 'string' ? k : (k.title || k.name))
    : defaultDifferentiators;

  const fallbackStory = "Ishan Ayurvedic Medical College and Research Centre (IAMC), located in Knowledge Park, Greater Noida, is the only private AYUSH medical college in the National Capital Region. NCISM-approved and affiliated to its university, IAMC offers the five-and-a-half-year BAMS degree programme.\n\nThe college encompasses 14 Ayurvedic academic departments, an in-campus Ayurvedic teaching hospital, a herbal garden of over 200 medicinal plant species, a comprehensive library, auditorium, hostel facilities, and a faculty of experienced Vaidyas. Our approach integrates classical Ayurvedic education with clinical exposure — students rotate through hospital OPDs from Year 1, connecting ancient wisdom to living practice.\n\nIAMC graduates practise as Vaidyas in government AYUSH hospitals, private Ayurvedic clinics, Panchkarma centres, research institutions, and wellness organisations — contributing to India's AYUSH healthcare mission.";

  const gh = data?.groupHistory;
  const timelineList = [
    ...(gh?.timelineImages || []).map((t: any) => t?.url || t?.image || t),
    ...(gh?.timelineInfographic ? [gh.timelineInfographic] : [])
  ].filter(Boolean);

  const defaultSections: Record<string, React.ReactNode> = {
    header: (
      <PageHeader 
        title="About Ishan Ayurvedic Medical College" 
        subtitle="NCISM-approved, the only private AYUSH college in NCR — classical Ayurvedic education with modern clinical practice." 
        breadcrumbs={[{ label: "About IAMC" }]} 
        backgroundImage={ourStory?.bannerImage}
      />
    ),
    story: (
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal-left relative">
              <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--navy)/0.1)]">
                <img src={ourStory?.image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"} alt="Ishan Ayurvedic Medical College Campus" className="w-full h-[400px] object-cover" />
              </div>
            </div>
            <div className="reveal-right space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{ourStory?.subtitle || "Our Story"}</p>
              <h2 className="font-bold text-foreground leading-tight">{ourStory?.title || "Reviving the Classical Science of Life in the National Capital Region"}</h2>
              <div 
                className="text-foreground/70 leading-relaxed space-y-4 rich-text" 
                dangerouslySetInnerHTML={{ __html: rt(ourStory?.description || fallbackStory) }} 
              />
            </div>
          </div>
        </div>
      </section>
    ),
    editorial: ourStory?.editorialPhotos && ourStory.editorialPhotos.length > 0 ? (
      <section className="py-12 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ourStory.editorialPhotos.map((photo: any, index: number) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-sm aspect-video relative group">
                <img src={photo.image} alt={photo.caption || "Editorial Photo"} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                {photo.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    ) : null,
    timeline: timelineList.length > 0 ? (
      <section className="py-12 bg-white">
        <div className="container-wide">
          <h3 className="text-xl font-bold text-navy mb-6 text-center">Timeline & Infographics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {timelineList.map((url: string, i: number) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-md border bg-slate-50 p-2">
                <img src={url} alt={`Timeline Infographic ${i + 1}`} className="w-full h-auto max-h-[450px] object-contain mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    ) : null,
    milestones: (
      <section className="py-16 md:py-24 bg-section-alt">
        <div className="container-wide">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">{data?.milestonesSection?.subtitle || "Our Journey"}</p>
            <h2 className="font-bold text-foreground">{data?.milestonesSection?.title || "Milestones of Growth"}</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-0 relative">
            <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {milestones.map((m: any, i: number) => (
              <div key={m.year} className={`relative flex items-start gap-6 py-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-12`}>
                <div className="shrink-0 w-11 h-11 rounded-full bg-gold flex items-center justify-center z-10 shadow-[0_2px_12px_hsl(var(--gold)/0.3)]">
                  <span className="text-xs font-bold text-foreground">{m.year}</span>
                </div>
                <div className={`bg-card rounded-xl border p-5 shadow-sm flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="text-sm text-foreground/80 leading-relaxed rich-text" dangerouslySetInnerHTML={{ __html: rt(m.event) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    differentiators: (
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bold text-foreground mb-8">{data?.keyDifferentiatorsSection?.title || "Key Differentiators"}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {keyDifferentiators.map((item: string) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80 font-medium rich-text" dangerouslySetInnerHTML={{ __html: rt(item) }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    ),
    cta: <EnquiryCTA />
  };

  const defaultOrder = [
    'header',
    'story',
    'editorial',
    'timeline',
    'milestones',
    'differentiators',
    'cta'
  ];

  return (
    <Layout>
      <DynamicPageSections
        pageId="about_us"
        defaultSections={defaultSections}
        defaultOrder={defaultOrder}
      />
    </Layout>
  );
}
