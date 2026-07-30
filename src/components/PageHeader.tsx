import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  backgroundImage?: string;
}

export default function PageHeader({ title, subtitle, breadcrumbs, backgroundImage }: PageHeaderProps) {
  const ref = useScrollReveal();

  return (
    <section className="bg-navy relative overflow-hidden" ref={ref}>
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage} alt={title} className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
        </div>
      )}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--gold) / 0.3) 0%, transparent 50%)" }} />
      </div>
      <div className="relative container-wide pt-28 pb-16 md:pt-36 md:pb-24">
        <h1 className="reveal delay-100 text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="reveal delay-200 mt-4 text-lg text-primary-foreground/60 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
