import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2 } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

const highlights = [
  "NCISM Approved — nationally valid BAMS degree",
  "14 Ayurvedic Departments with dedicated Vaidya faculty",
  "In-Campus Teaching Hospital for daily OPD exposure",
  "Only Private AYUSH College in NCR — Greater Noida",
];

export default function AboutSection() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("homepage");
  const profile = data?.institutionalProfile;
  const { data: instituteData } = useAyurvedaData("institute");
  const aboutInfo = instituteData?.ourStory;

  const heading = profile?.heading || "NCR's Only Private AYUSH College Rooted in Classical Ayurvedic Tradition";
  const desc = profile?.description || aboutInfo?.description || "Ishan Ayurvedic Medical College and Research Centre (IAMC), Greater Noida, is the only private AYUSH medical college in the National Capital Region. NCISM-approved and affiliated to its university, IAMC offers the five-and-a-half-year BAMS degree programme — spanning 14 academic departments, an in-campus Ayurvedic teaching hospital, a herbal garden of over 200 medicinal plant species, and a faculty of experienced Vaidyas committed to both classical scholarship and modern clinical practice.";
  const image = profile?.image || aboutInfo?.image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop";
  const ctaLink = profile?.ctaLink || "/about";
  const ctaText = profile?.ctaText || "Learn More About IAMC";

  return (
    <section id="about" className="py-12 md:py-20" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="reveal-left relative">
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--navy)/0.1)] bg-muted border">
              <img
                src={image}
                alt={heading}
                className="w-full h-[400px] object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=1200&q=80"; }}
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 md:right-8 bg-card rounded-xl shadow-[0_4px_24px_hsl(var(--navy)/0.12)] p-5 border">
              <p className="text-3xl font-bold text-navy">NCISM</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Approved</p>
            </div>
          </div>

          {/* Text */}
          <div className="reveal-right space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{profile?.subheading || "About IAMC"}</p>
            <h2 className="font-bold text-foreground leading-tight">
              {heading}
            </h2>
            <div className="text-foreground/70 leading-relaxed space-y-4">
              {desc.split('\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="space-y-3 pt-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-foreground/80 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <a href={ctaLink} className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-navy hover:text-navy/80 transition-colors group">
              {ctaText}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
