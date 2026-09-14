import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { richTextToPlain } from "@/lib/richText";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  backgroundImage?: string;
}

export default function PageHeader({ title, subtitle, breadcrumbs, backgroundImage }: PageHeaderProps) {
  const ref = useScrollReveal();

  // Headings are single-line by design, so CMS markup is flattened to text here
  // rather than rendered — this also stops raw tags leaking into the banner.
  const heading = richTextToPlain(title) || title;
  const sub = richTextToPlain(subtitle);

  return (
    <section className="bg-navy relative overflow-hidden" ref={ref}>
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage} alt={heading} className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
        </div>
      )}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--gold) / 0.3) 0%, transparent 50%)" }} />
      </div>
      <div className="relative container-wide pt-28 pb-16 md:pt-36 md:pb-24">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="reveal mb-5">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs md:text-sm text-primary-foreground/60">
              <li className="flex items-center gap-1.5">
                <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" aria-hidden="true" />
              </li>
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                    {crumb.href && !isLast ? (
                      <Link to={crumb.href} className="hover:text-gold transition-colors">{crumb.label}</Link>
                    ) : (
                      <span className={isLast ? "text-primary-foreground/90 font-medium" : undefined} aria-current={isLast ? "page" : undefined}>
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && <ChevronRight className="w-3.5 h-3.5 opacity-50" aria-hidden="true" />}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <h1 className="reveal delay-100 text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight tracking-tight">
          {heading}
        </h1>
        {sub && (
          <p className="reveal delay-200 mt-4 text-lg text-primary-foreground/60 max-w-2xl leading-relaxed">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
