import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Shalakya OPD Rotation", description: "Dedicated Shalakya OPD at the teaching hospital providing regular case exposure in eye, ear, nose, and throat conditions." },
  { icon: Microscope, title: "Netra Chikitsa", description: "Training in Netrabasti, Tarpana, Putapaka and other classical Ayurvedic ophthalmic therapeutic procedures." },
  { icon: Award, title: "ENT Procedures", description: "Practical training in Karnapoorana, Nasya administration, and Gandusha for ENT conditions." },
  { icon: Users, title: "Classical Text Study", description: "Study of Sushruta Samhita and Ashtanga Hridaya Shalakya chapters — the classical textual foundation for ENT and ophthalmology." },
];

export default function ShalakYaTantraPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Shalakya Tantra (ENT & Ophthalmology)"
        subtitle="Ayurvedic speciality for diseases of eye, ear, nose, and throat with dedicated Shalakya OPD"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Shalakya Tantra (ENT & Ophthalmology)" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Shalakya Tantra (ENT & Ophthalmology)</h2>
              <p className="text-foreground/70 leading-relaxed">Shalakya Tantra is the Ayurvedic speciality for diseases of the eye (Netra Chikitsa), ear (Karna Chikitsa), nose (Nasa Chikitsa), and throat/mouth (Mukha Chikitsa). A dedicated Shalakya OPD in the teaching hospital provides students with regular clinical exposure.</p>
              <p className="text-foreground/70 leading-relaxed">Specialty procedures include Netrabasti (eye bath), Karnapoorana (ear oil instillation), Nasya (nasal drops), and Gandusha (mouth gargling). Students study classical Sushruta and Vagbhata chapters, rotate through the OPD, and receive practical procedure training under supervision.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=800&auto=format&fit=crop" alt="Shalakya Tantra (ENT & Ophthalmology) Department" className="w-full h-[400px] object-cover" />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div key={h.title} className={`reveal delay-00 flex gap-5 p-6 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow`}>
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">{h.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/70">{h.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
