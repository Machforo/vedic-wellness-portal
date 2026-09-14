import { SectionLayoutItem } from "@/hooks/usePageLayout";
import { rt } from "@/lib/richText";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CustomSectionRenderer({ section }: { section: SectionLayoutItem }) {
  const ref = useScrollReveal();

  if (section.isHidden) return null;

  // 1. Raw / Custom Dangerous HTML template (URL-based / Admin custom sections)
  if (section.type === "custom_html" || (!section.type && section.htmlContent)) {
    const rawHtml = section.htmlContent || "";
    if (!rawHtml.trim()) return null;

    return (
      <section className="page-custom-section py-8">
        <div
          className="rich-text w-full max-w-7xl mx-auto px-4"
          dangerouslySetInnerHTML={{ __html: rt(rawHtml) }}
        />
      </section>
    );
  }

  // 2. Hero / Banner Strip
  if (section.type === "hero") {
    return (
      <section className="relative py-20 sm:py-28 overflow-hidden bg-navy text-white" ref={ref}>
        {section.image && (
          <div className="absolute inset-0 z-0">
            <img
              src={section.image}
              alt={section.heading || "Banner"}
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/70" />
          </div>
        )}

        <div className="container-wide relative z-10 text-center max-w-4xl mx-auto">
          <div className="reveal">
            {section.subheading && (
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-gold uppercase block mb-3">
                {section.subheading}
              </span>
            )}
            <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-6 leading-tight">
              {section.heading || section.name}
            </h2>
            {section.description && (
              <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                {section.description}
              </p>
            )}
            {section.htmlContent && (
              <div
                className="rich-text text-white/90 max-w-2xl mx-auto mb-8 text-left"
                dangerouslySetInnerHTML={{ __html: rt(section.htmlContent) }}
              />
            )}
            {section.ctaText && (
              <Link to={section.ctaLink || "/contact"}>
                <Button className="bg-gold text-foreground hover:bg-gold/90 px-8 py-6 text-base font-semibold shadow-lg">
                  {section.ctaText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 3. Content & Image Split
  if (section.type === "split") {
    return (
      <section className="py-16 sm:py-24 bg-background" ref={ref}>
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7 reveal-left">
              {section.subheading && (
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-gold uppercase block mb-3">
                  {section.subheading}
                </span>
              )}
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                {section.heading || section.name}
              </h2>
              {section.description && (
                <p className="text-foreground/70 leading-relaxed text-base mb-6">
                  {section.description}
                </p>
              )}
              {section.htmlContent && (
                <div
                  className="rich-text text-foreground/80 leading-relaxed text-base mb-6"
                  dangerouslySetInnerHTML={{ __html: rt(section.htmlContent) }}
                />
              )}
              {section.ctaText && (
                <Link to={section.ctaLink || "/contact"}>
                  <Button className="bg-navy text-white hover:bg-navy/90">
                    {section.ctaText} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>

            {section.image && (
              <div className="md:col-span-5 reveal-right">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/60">
                  <img
                    src={section.image}
                    alt={section.heading || "Feature Image"}
                    className="w-full h-[360px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 4. Feature Cards Grid
  if (section.type === "cards") {
    const cardItems = Array.isArray(section.items) && section.items.length > 0
      ? section.items
      : [
          { title: "NCISM Curriculum", desc: "Holistic 5.5-year BAMS training guided by classical Samhitas and clinical rotatory postings." },
          { title: "Herbal Garden & Dravyaguna Lab", desc: "Live identification of 200+ medicinal species for botanical pharmacology." },
          { title: "Teaching Hospital OPDs", desc: "Daily patient consultations under senior Vaidyas with full Panchkarma facilities." }
        ];

    return (
      <section className="py-16 sm:py-24 bg-section-alt border-y border-border/40" ref={ref}>
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 reveal">
            {section.subheading && (
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-gold uppercase block mb-3">
                {section.subheading}
              </span>
            )}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              {section.heading || section.name}
            </h2>
            {section.description && (
              <p className="text-foreground/70 mt-3 text-sm sm:text-base">
                {section.description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardItems.map((item: any, i: number) => (
              <div key={i} className="reveal h-full flex flex-col p-6 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center mb-4 text-gold font-bold">
                  <CheckCircle2 className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                  {item.title || item.heading}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed flex-grow">
                  {item.desc || item.description || item.text}
                </p>
              </div>
            ))}
          </div>

          {section.ctaText && (
            <div className="text-center mt-12 reveal">
              <Link to={section.ctaLink || "/contact"}>
                <Button className="bg-navy text-white hover:bg-navy/90">
                  {section.ctaText}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  // 5. Call to Action (CTA) Strip
  if (section.type === "cta") {
    return (
      <section className="py-16 sm:py-20 bg-navy text-white relative overflow-hidden" ref={ref}>
        <div className="container-wide text-center max-w-3xl mx-auto relative z-10 reveal">
          {section.subheading && (
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-gold uppercase block mb-3">
              {section.subheading}
            </span>
          )}
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-white">
            {section.heading || section.name}
          </h2>
          {section.description && (
            <p className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed">
              {section.description}
            </p>
          )}
          <Link to={section.ctaLink || "/contact"}>
            <Button className="bg-gold text-foreground hover:bg-gold/90 px-8 py-6 text-base font-semibold shadow-lg">
              {section.ctaText || "Inquire for Admissions"}
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  // 6. FAQ Accordion
  if (section.type === "faq") {
    const faqList = Array.isArray(section.items) && section.items.length > 0 ? section.items : [];

    return (
      <section className="py-16 sm:py-24 bg-background" ref={ref}>
        <div className="container-wide max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal">
            {section.subheading && (
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-gold uppercase block mb-3">
                {section.subheading}
              </span>
            )}
            <h2 className="font-serif text-3xl font-bold text-foreground">
              {section.heading || section.name}
            </h2>
            {section.description && (
              <p className="text-foreground/70 mt-2">{section.description}</p>
            )}
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqList.map((faq: any, i: number) => (
              <AccordionItem key={i} value={`custom-faq-${i}`} className="bg-card rounded-xl border border-border/50 shadow-sm px-5">
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-gold py-5">
                  {faq.q || faq.question || faq.title}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed pb-5">
                  <div className="rich-text" dangerouslySetInnerHTML={{ __html: rt(faq.a || faq.answer || faq.desc || "") }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  }

  // Fallback: render any custom HTML if present
  if (section.htmlContent) {
    return (
      <section className="py-8">
        <div className="rich-text w-full max-w-7xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: rt(section.htmlContent) }} />
      </section>
    );
  }

  return null;
}
