import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import PageGallery from "@/components/PageGallery";

export default function FacultyPage() {
  const ref = useScrollReveal();
  const { data: facultyList } = useAyurvedaData("faculty");

  const faculty = Array.isArray(facultyList) && facultyList.length > 0 ? facultyList : [
    {
      name: "Dr. Vijay Kumar Sharma",
      designation: "Principal",
      qualification: "MD (Kayachikitsa), BAMS",
      specialization: "Internal Medicine (Kayachikitsa)",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Dr. Sunita Agarwal",
      designation: "Professor & HOD",
      qualification: "MD (Rachana Sharir), BAMS",
      specialization: "Ayurvedic Anatomy (Rachana Sharir)",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Dr. Ravi Shankar Mishra",
      designation: "Professor & HOD",
      qualification: "MD (Dravyaguna), BAMS",
      specialization: "Materia Medica (Dravyaguna Vigyana)",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Dr. Priyanka Singh",
      designation: "Associate Professor & HOD",
      qualification: "MD (Prasuti & Stri Roga), BAMS",
      specialization: "OB/GYN (Prasuti & Stri Roga)",
      image: "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <Layout>
      <PageHeader
        title="Faculty Directory"
        subtitle="Meet our esteemed Vaidyas and practitioners who bring decades of clinical and academic experience"
        breadcrumbs={[{ label: "Faculty" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty.map((member: any, i: number) => (
              <div key={i} className={`reveal delay-${Math.min(i % 4, 3)}00 group`}>
                <div className="bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-[4/5] relative overflow-hidden bg-navy/5">
                    <img
                      src={member.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gold font-medium text-sm mb-3">
                      {member.designation}
                    </p>

                    <div className="mt-auto space-y-2 pt-4 border-t border-navy/10">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground min-w-[80px]">Qual.</span>
                        <p className="text-sm text-foreground/80">{member.qualification}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground min-w-[80px]">Spec.</span>
                        <p className="text-sm text-foreground/80">{member.specialization}</p>
                      </div>
                      {member.experience && (
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground min-w-[80px]">Exp.</span>
                          <p className="text-sm text-foreground/80">{member.experience}</p>
                        </div>
                      )}
                    </div>
                    {member.bio && (
                      <div className="text-xs text-foreground/70 mt-4 line-clamp-3 [&>p]:m-0" dangerouslySetInnerHTML={{ __html: member.bio }}></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    <PageGallery images={data?.pageGallery} />
    </Layout>
  );
}
