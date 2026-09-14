import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { rt } from "@/lib/richText";

const defaultPublications = [
  { title: "Clinical Efficacy of Panchakarma in Management of Rheumatoid Arthritis", authors: "Dr. R. Sharma, Dr. P. Mishra", journal: "Journal of Ayurveda and Integrative Medicine", year: "2024", doi: "#" },
  { title: "Phytochemical Analysis of Ashwagandha Root for Immunomodulatory Activity", authors: "Prof. A. Kumar, Dr. S. Verma", journal: "Ancient Science of Life", year: "2023", doi: "#" },
  { title: "Standardisation of Triphala Churna: A Quality Control Study", authors: "Dr. N. Gupta, Dr. V. Singh", journal: "International Journal of Ayurveda Research", year: "2023", doi: "#" },
];

export default function PublicationsPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("research");
  const pubs = data?.publications || {};
  const publications = pubs.items?.length > 0 ? pubs.items : defaultPublications;

  return (
    <Layout>
      <PageHeader
        title={pubs.title || "Research Publications"}
        subtitle={pubs.subtitle || "Peer-reviewed research contributions by Ishan Ayurveda faculty and students"}
        breadcrumbs={[{ label: "Research" }, { label: "Publications" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          {pubs.description ? (
            <div className="reveal text-foreground/70 leading-relaxed max-w-3xl mx-auto text-center mb-12 [&>p]:m-0 rich-text" dangerouslySetInnerHTML={{ __html: rt(pubs.description) }}></div>
          ) : (
            <p className="reveal text-foreground/70 leading-relaxed max-w-3xl mx-auto text-center mb-12">
              The faculty and students of Ishan Ayurvedic Medical College are actively engaged in Ayurvedic research, regularly publishing in national and international peer-reviewed journals.
            </p>
          )}
          <div className="space-y-4 max-w-4xl mx-auto">
            {publications.map((p: any, i: number) => (
              <div key={p.title || i} className={`reveal delay-${Math.min(i, 4)}00 p-6 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow`}>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-5 h-5 text-navy" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm mb-1">{p.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{p.authors}</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">{p.journal}</span>
                      <span className="px-2.5 py-1 rounded-md bg-gold-light text-xs font-medium text-navy">{p.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
