import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { rt } from "@/lib/richText";

export default function CareersPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("research");
  const careers = data?.careers || {};
  const defaultJobs = [
    { title: "Professor / Associate Professor — Kayachikitsa", qualification: "MD (Kayachikitsa) with PhD", experience: "10+ Years", dept: "Kayachikitsa", type: "Full-time" },
    { title: "Assistant Professor — Dravyaguna", qualification: "MD (Dravyaguna) with UGC NET / PhD", experience: "0–5 Years", dept: "Dravyaguna", type: "Full-time" },
    { title: "Clinical Instructor — Panchakarma", qualification: "BAMS / MD with Panchakarma training", experience: "3+ Years", dept: "Panchakarma", type: "Full-time" },
    { title: "Academic Coordinator", qualification: "Graduate", experience: "5+ Years Administration", dept: "Academic Office", type: "Full-time" },
  ];
  const jobs = careers.openings?.length > 0 ? careers.openings : defaultJobs;
  const applyEmail = careers.applyEmail || "careers@ishan.ac";

  return (
    <Layout>
      <PageHeader
        title={careers.title || "Careers at Ishan Ayurveda"}
        subtitle={careers.subtitle || "Join a community of Ayurvedic educators and healthcare professionals dedicated to excellence"}
        breadcrumbs={[{ label: "Contact", href: "/contact" }, { label: "Careers" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div className="reveal space-y-10">
              {careers.description ? (
                <div className="text-foreground/70 leading-relaxed text-lg [&>p]:m-0 rich-text" dangerouslySetInnerHTML={{ __html: rt(careers.description) }}></div>
              ) : (
                <p className="text-foreground/70 leading-relaxed text-lg">Ishan Ayurvedic Medical College invites qualified Ayurvedic educators and practitioners to join our institution, contributing to producing the next generation of India's BAMS doctors.</p>
              )}
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src={careers.facultyTeamPhoto || careers.image || "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80"} alt="Ishan Ayurveda Campus" className="w-full h-80 object-cover" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground mb-4">Current Openings</h2>
              {jobs.map((j: any, i: number) => (
                <div key={j.title || i} className={`reveal delay-${Math.min(i, 3)}00 p-6 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg">{j.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span><strong>Qual:</strong> {j.qualification}</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span><strong>Exp:</strong> {j.experience}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <span className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">{j.dept}</span>
                        <span className="px-2.5 py-1 rounded-md bg-gold-light text-xs font-medium text-navy">{j.jobType || j.type}</span>
                      </div>
                    </div>
                    <a href={`mailto:${applyEmail}`} className="shrink-0 px-6 py-2.5 text-sm font-semibold bg-navy text-primary-foreground rounded-lg hover:bg-navy/90 transition-colors">Apply Now</a>
                  </div>
                </div>
              ))}
              <div className="mt-6 p-8 bg-muted rounded-xl border text-center">
                <h3 className="text-lg font-bold text-foreground mb-2">How to Apply</h3>
                <p className="text-sm leading-relaxed max-w-xl mx-auto">
                  Send your CV and cover letter to <a href={`mailto:${applyEmail}`} className="text-navy font-bold hover:underline">{applyEmail}</a>. Shortlisted candidates will be contacted within 14 working days.
                </p>
              </div>
            </div>
          </div>

          {careers?.campusWorkplaceImages && careers.campusWorkplaceImages.length > 0 && (
            <div className="reveal mt-16 pt-16 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Life at Ishan Ayurveda</h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {careers.campusWorkplaceImages.map((photo: any, idx: number) => (
                  <div key={idx} className="rounded-xl overflow-hidden aspect-video shadow-sm border border-border group relative">
                    <img src={photo.image} alt={photo.caption || "Campus Life"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {photo.caption && (
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
