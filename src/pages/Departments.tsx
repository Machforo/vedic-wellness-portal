import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import PageGallery from "@/components/PageGallery";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { richTextToPlain } from "@/lib/richText";
import { ArrowUpRight } from "lucide-react";

/**
 * Index of the Ayurvedic departments.
 *
 * Previously the homepage "View All Departments" link pointed at /academics,
 * which is not a route — the link 404'd. The list is read from the departments
 * collection so adding a department in the admin panel adds it here.
 */
export default function DepartmentsPage() {
  const ref = useScrollReveal();
  const { data, isLoading } = useAyurvedaData("departments");

  const departments = (Array.isArray(data) ? data : []).filter((d: any) => d?.name && d?.slug);

  return (
    <Layout>
      <PageHeader
        title="Ayurvedic Departments"
        subtitle="Every branch of Ayurvedic medicine, from Siddhanta to Surgery — each with dedicated faculty and clinical exposure"
        breadcrumbs={[{ label: "Academics" }, { label: "Departments" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-3 border-[hsl(var(--gold))] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : departments.length === 0 ? (
            <p className="text-center text-foreground/60">Departments will be listed here shortly.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept: any, i: number) => (
                <Link
                  key={dept.slug}
                  to={`/${dept.slug}`}
                  className={`reveal delay-${Math.min(i, 4)}00 group flex flex-col rounded-2xl border bg-card overflow-hidden hover:shadow-lg hover:border-gold/50 transition-all`}
                >
                  {dept.image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={dept.image}
                        alt={dept.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col gap-2">
                    <h2 className="text-lg font-bold text-navy leading-snug">{dept.name}</h2>
                    {(dept.subtitle || dept.description) && (
                      <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
                        {dept.subtitle || richTextToPlain(dept.description)}
                      </p>
                    )}
                    <span className="mt-auto pt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-gold transition-colors">
                      View department <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <PageGallery />
      <EnquiryCTA />
    </Layout>
  );
}
