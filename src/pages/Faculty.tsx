import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const facultyData = [
  { name: "Dr. Vijay Kumar Sharma", designation: "Principal & Head – Kayachikitsa", qualification: "MD (Kayachikitsa) BAMS", experience: "22 years", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop" },
  { name: "Dr. Sunita Agarwal", designation: "HOD – Rachana Sharir", qualification: "MD (Rachana Sharir) BAMS", experience: "18 years", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop" },
  { name: "Dr. Ravi Shankar Mishra", designation: "HOD – Dravyaguna Vigyana", qualification: "MD (Dravyaguna) BAMS", experience: "15 years", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop" },
  { name: "Dr. Priyanka Singh", designation: "HOD – Prasuti & Stri Roga", qualification: "MD (Prasuti & Stri Roga) BAMS", experience: "12 years", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop" },
  { name: "Dr. Ashok Tiwari", designation: "HOD – Panchkarma", qualification: "MD (Panchkarma) BAMS", experience: "14 years", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop" },
  { name: "Dr. Kavita Pandey", designation: "HOD – Kriya Sharir", qualification: "MD (Kriya Sharir) BAMS", experience: "10 years", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop" },
];

export default function FacultyPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader title="Faculty" subtitle="BAMS MD-qualified Vaidyas with deep clinical and research expertise across all 14 Ayurvedic departments" breadcrumbs={[{ label: "Faculty" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Our Vaidya Faculty</p>
            <h2 className="font-bold text-foreground leading-tight mb-4">Experienced Ayurvedic Clinicians & Scholars</h2>
            <p className="text-foreground/70 leading-relaxed">Every department is led by a qualified MD Ayurveda Vaidya with clinical and research experience. Faculty combine classical text scholarship with daily hospital OPD practice — teaching from both knowledge and active clinical experience.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyData.map((f, i) => (
              <div key={f.name} className={`reveal delay- rounded-2xl border bg-card overflow-hidden group hover:shadow-[0_8px_32px_hsl(var(--navy)/0.1)] transition-all`}>
                <div className="overflow-hidden h-56">
                  <img src={f.img} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-foreground">{f.name}</h3>
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider mt-1">{f.designation}</p>
                  <p className="text-xs text-muted-foreground mt-1">{f.qualification}</p>
                  <div className="mt-3 pt-3 border-t flex items-center justify-between">
                    <span className="text-xs text-foreground/60 font-medium">{f.experience} experience</span>
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
