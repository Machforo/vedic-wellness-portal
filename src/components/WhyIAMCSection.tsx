import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, Building, Users, Leaf } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

export default function WhyIAMCSection() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("homepage");
  const reasons = data?.whyChooseUs?.length > 0 ? data.whyChooseUs : [
    { icon: Award, title: "NCISM Approved", desc: "Only NCISM-approved private AYUSH college in NCR — BAMS graduates registered as Ayurvedic practitioners, eligible for government AYUSH jobs." },
    { icon: Building, title: "In-Campus Teaching Hospital", desc: "Students rotate through OPDs from Year 1 — real patients, real consultations, real Ayurvedic clinical learning from Day One." },
    { icon: Users, title: "14 Ayurvedic Departments", desc: "Every specialisation from Siddhanta to Shalya Tantra, each with dedicated Vaidya faculty and NCISM-standard facilities." },
    { icon: Leaf, title: "Living Herbal Garden", desc: "Over 200 medicinal plant species on campus — the living laboratory for Dravyaguna Vigyana students and Ayurvedic researchers." },
  ];

  return (
    <section id="why-choose-us" className="py-12 md:py-20" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Left */}
          <div className="reveal-left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Why Choose IAMC</p>
            <h2 className="font-bold text-foreground leading-tight">
              What Makes Ishan Ayurveda the NCR's Premier Choice
            </h2>
            <p className="mt-4 leading-relaxed">
              Choosing a BAMS college is choosing your entire clinical career. IAMC's unique combination of NCISM approval, an in-campus teaching hospital, 14 specialised departments, and a living herbal garden makes it unrivalled in the National Capital Region.
            </p>
            <a
              href="/why-choose-us"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 text-sm font-semibold bg-navy text-primary-foreground rounded-lg hover:bg-gold hover:text-navy transition-all active:scale-[0.97] shimmer-btn"
            >
              Schedule a Campus Tour
            </a>
          </div>

          {/* Right grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((r: any, i: number) => {
              const Icon = r.icon && typeof r.icon !== 'string' ? r.icon : [Award, Building, Users, Leaf][i % 4];
              return (
                <div key={r.title || r.heading} className={`reveal delay-${Math.min(i % 4, 4)}00 flex gap-4 p-5 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow group`}>
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{r.title || r.heading}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.desc || r.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
