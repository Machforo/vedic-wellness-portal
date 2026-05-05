import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Leaf } from "lucide-react";

const plants = [
  { sanskrit: "Ashwagandha", latin: "Withania somnifera", part: "Root", use: "Adaptogen, stress management, vitality" },
  { sanskrit: "Brahmi", latin: "Bacopa monnieri", part: "Leaf", use: "Memory, cognitive enhancement, nervine" },
  { sanskrit: "Tulsi", latin: "Ocimum sanctum", part: "Leaf, seed", use: "Respiratory, immunity, adaptogen" },
  { sanskrit: "Neem", latin: "Azadirachta indica", part: "Leaf, bark, seed", use: "Antimicrobial, skin conditions, diabetes" },
  { sanskrit: "Haritaki", latin: "Terminalia chebula", part: "Fruit", use: "Tridosha balancing, digestion, rasayana" },
  { sanskrit: "Shatavari", latin: "Asparagus racemosus", part: "Root", use: "Women health, lactation, adaptogen" },
  { sanskrit: "Guduchi", latin: "Tinospora cordifolia", part: "Stem", use: "Immunity, fever, anti-inflammatory" },
  { sanskrit: "Arjuna", latin: "Terminalia arjuna", part: "Bark", use: "Cardiac tonic, hypertension, wound healing" },
];

export default function HerbalGardenPage() {
  const ref = useScrollReveal();
  return (
    <Layout>
      <PageHeader title="Herbal Garden" subtitle="Over 200 medicinal plant species — the living classroom for Dravyaguna Vigyana students and Ayurvedic research scholars" breadcrumbs={[{ label: "Facilities", href: "/infrastructure" }, { label: "Herbal Garden" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="reveal-left space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Living Laboratory</p>
              <h2 className="font-bold text-foreground leading-tight">200+ Medicinal Species on Campus</h2>
              <p className="text-foreground/70 leading-relaxed">The IAMC Herbal Garden is one of the most distinctive features of the campus — over 200 medicinal plant species cultivated as the living classroom for Dravyaguna Vigyana students, research scholars, and visiting Ayurvedic practitioners. Plants are labelled with Sanskrit, common, and botanical names.</p>
              <p className="text-foreground/70 leading-relaxed">BAMS students use the garden for plant identification exercises, collection of specimens for classical drug preparation practicals in the Rasa Shastra laboratory, and understanding the habitat and seasonal availability of medicinal plants. The garden is shared with the Ishan Institute of Pharmacy, serving as a bridge between Ayurvedic and modern pharmacognosy.</p>
              <p className="text-foreground/70 leading-relaxed">Guided tours are arranged for incoming BAMS batches, visiting scholars, and delegates at the Global Ayurvedic Summit. The garden represents the living connection between ancient text and present-day clinical practice.</p>
            </div>
            <div className="reveal-right">
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop" alt="IAMC Herbal Garden" className="w-full h-[400px] object-cover" />
              </div>
            </div>
          </div>
          <div className="reveal mb-8">
            <h3 className="font-bold text-foreground mb-6 flex items-center gap-2"><Leaf className="w-5 h-5 text-gold" />Key Medicinal Species</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left p-3 font-bold">Sanskrit Name</th>
                    <th className="text-left p-3 font-bold">Botanical Name</th>
                    <th className="text-left p-3 font-bold">Part Used</th>
                    <th className="text-left p-3 font-bold">Therapeutic Use</th>
                  </tr>
                </thead>
                <tbody>
                  {plants.map((p, i) => (
                    <tr key={p.sanskrit} className={i % 2 === 0 ? "bg-muted/30" : "bg-white"}>
                      <td className="p-3 font-semibold text-gold">{p.sanskrit}</td>
                      <td className="p-3 italic text-foreground/70">{p.latin}</td>
                      <td className="p-3 text-foreground/70">{p.part}</td>
                      <td className="p-3 text-foreground/70">{p.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
