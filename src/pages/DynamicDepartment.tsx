import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users, HeartPulse, Shield, Leaf, Beaker, Brain, Stethoscope, Eye, Activity, Scale } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { Navigate } from "react-router-dom";

const iconMap: Record<string, any> = {
  BookOpen, Microscope, Award, Users, HeartPulse, Shield, Leaf, Beaker, Brain, Stethoscope, Eye, Activity, Scale, default: BookOpen
};

export default function DynamicDepartmentPage({ slug }: { slug: string }) {
  const { data: departments, isLoading } = useAyurvedaData("departments");
  
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-[hsl(var(--gold))] border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  const dept = Array.isArray(departments) ? departments.find(d => d.slug === slug) : null;

  if (!dept) {
    return <Navigate to="/courses/bams" replace />;
  }

  return <DepartmentContent dept={dept} />;
}

function DepartmentContent({ dept }: { dept: any }) {
  const ref = useScrollReveal();
  const highlights = dept?.highlights || [];

  return (
    <Layout>
      <PageHeader
        title={dept?.name || "Department"}
        subtitle={dept?.subtitle || ""}
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: dept?.name || "Department" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">{dept?.name}</h2>
              {dept?.description ? (
                <div className="text-foreground/70 leading-relaxed [&>p]:mb-4" dangerouslySetInnerHTML={{ __html: dept.description }}></div>
              ) : null}
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border bg-navy/5">
                {dept?.equipmentWideImage || dept?.image ? (
                  <img src={dept.equipmentWideImage || dept.image} alt={dept.name} className="w-full h-[400px] object-cover" />
                ) : (
                  <div className="w-full h-[400px] flex items-center justify-center bg-muted text-muted-foreground">
                    No Image Available
                  </div>
                )}
              </div>
            </div>
          </div>
          {highlights.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {highlights.map((h: any, i: number) => {
                const Icon = iconMap[h.icon] || iconMap.default;
                return (
                  <div key={i} className={`reveal delay-00 flex gap-5 p-6 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow`}>
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{h.title}</h3>
                      {h.description ? (
                        <div className="text-sm leading-relaxed text-foreground/70 [&>p]:m-0" dangerouslySetInnerHTML={{ __html: h.description }}></div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

          )}

          {((dept?.equipmentCloseups && dept.equipmentCloseups.length > 0) || (dept?.studentsWorkingImages && dept.studentsWorkingImages.length > 0)) && (
            <div className="mt-16 pt-16 border-t border-border">
              <h3 className="font-bold text-foreground mb-8 text-center">Laboratory & Practical Training</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dept?.equipmentCloseups?.map((photo: any, idx: number) => (
                  <div key={`eq-${idx}`} className="rounded-xl overflow-hidden aspect-[4/3] group relative shadow-sm border border-border">
                    <img src={photo.image} alt={photo.caption || "Equipment"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {photo.caption && (
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs font-medium">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
                {dept?.studentsWorkingImages?.map((photo: any, idx: number) => (
                  <div key={`st-${idx}`} className="rounded-xl overflow-hidden aspect-[4/3] group relative shadow-sm border border-border">
                    <img src={photo.image} alt={photo.caption || "Students Working"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
