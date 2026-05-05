import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Microscope, Award, Users } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "Crude Drug Collection", description: "Extensive crude drug specimen collection for systematic study of plant-derived Ayurvedic medicines in their natural form." },
  { icon: Microscope, title: "Herbal Garden Link", description: "Direct access to the campus Herbal Garden of 200+ medicinal species for fresh specimen identification and collection." },
  { icon: Award, title: "Plant Identification", description: "Plant identification laboratory with microscopy, botanical keys, and herbarium resources for morphological drug study." },
  { icon: Users, title: "Pharmacological Study", description: "Pharmacological cross-referencing between classical Ayurvedic drug properties and modern phytochemical research." },
];

export default function DravyagunaVigyanaPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader
        title="Dravyaguna Vigyana"
        subtitle="Science of medicinal plants — Rasa, Guna, Veerya, Vipaka, and Prabhava connected to the Herbal Garden"
        breadcrumbs={[{ label: "14 Departments", href: "/kayachikitsa" }, { label: "Dravyaguna Vigyana" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
            <div className="reveal space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Department Overview</p>
              <h2 className="font-bold text-foreground leading-tight">Dravyaguna Vigyana</h2>
              <p className="text-foreground/70 leading-relaxed">Dravyaguna Vigyana is the science of Ayurvedic pharmacognosy — the study of medicinal plants and their properties: Rasa (taste), Guna (property), Veerya (potency), Vipaka (post-digestive effect), and Prabhava (specific action). This department is uniquely connected to the college's living Herbal Garden of over 200 medicinal species.</p>
              <p className="text-foreground/70 leading-relaxed">Students use the departmental crude drug specimen collection, plant identification materials, and microscopy equipment. Regular identification exercises in the Herbal Garden, drug action analysis sessions, and pharmacological cross-referencing build practical competence in Ayurvedic plant medicine.</p>
            </div>
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop" alt="Dravyaguna Vigyana Department" className="w-full h-[400px] object-cover" />
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
