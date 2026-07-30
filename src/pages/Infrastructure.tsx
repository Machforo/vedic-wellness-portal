import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Wifi, Monitor, BookOpen, Building2, Cctv, MapPin, ArrowRight, Scale, Microscope, Beaker, Library, Stethoscope, Droplet, TestTube } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

const iconMap: Record<string, any> = {
  Building2, BookOpen, Monitor, Scale, Wifi, Cctv, MapPin, ArrowRight, Microscope, Beaker, Library, Stethoscope, Droplet, TestTube, default: Building2
};

export default function InfrastructurePage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("facilities");
  
  const infrastructure = data?.infrastructure || {};
  const intro = infrastructure.content || "Ishan Ayurvedic Medical College provides a state-of-the-art campus designed specifically for Ayurvedic education and clinical practice. Our facilities include advanced laboratories, a comprehensive library, smart classrooms, and a dedicated teaching hospital, ensuring students receive both classical knowledge and modern scientific training.";
  
  const facilities = infrastructure.features?.length > 0 ? infrastructure.features : [
    { icon: "Microscope", title: "Rachana Sharir Lab", desc: "Anatomy laboratory equipped with cadaver dissection facilities, models, and specimens for practical anatomical study." },
    { icon: "Beaker", title: "Kriya Sharir Lab", desc: "Physiology lab with modern instruments to study human physiological functions according to Ayurvedic and modern parameters." },
    { icon: "Library", title: "Ayurvedic Library", desc: "Extensive collection of classical Samhitas, modern medical textbooks, and international research journals." },
    { icon: "TestTube", title: "Rasa Shastra Lab", desc: "Fully functional pharmacy lab for preparing classical Ayurvedic formulations, bhasmas, and quality testing." },
    { icon: "Monitor", title: "Smart Classrooms", desc: "Modern air-conditioned lecture halls equipped with AV systems for interactive learning and case presentations." },
    { icon: "Wifi", title: "Wi-Fi Campus", desc: "Seamless high-speed connectivity across the campus to support digital learning and research." },
  ];

  return (
    <Layout>
      <PageHeader
        title="Campus Infrastructure"
        subtitle="Modern facilities designed for excellence in Ayurvedic medical education"
        breadcrumbs={[{ label: "Campus", href: "/infrastructure" }, { label: "Infrastructure" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="reveal max-w-3xl mb-14">
            {infrastructure.content ? (
              <div className="text-foreground/70 leading-relaxed whitespace-pre-wrap [&>p]:mb-4" dangerouslySetInnerHTML={{ __html: infrastructure.content }}></div>
            ) : (
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                {intro}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="reveal rounded-2xl overflow-hidden border shadow-sm">
              <img src={infrastructure.image || infrastructure.entranceImage || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"} alt="Campus Building" className="w-full h-64 object-cover" />
            </div>
            <div className="reveal delay-100 rounded-2xl overflow-hidden border shadow-sm">
              <img src={infrastructure.eventPhoto || "https://images.unsplash.com/photo-1577969858595-65487779d71c?auto=format&fit=crop&w=1000&q=80"} alt="Institutional Facility" className="w-full h-64 object-cover" />
            </div>
            <div className="reveal delay-200 rounded-2xl overflow-hidden border shadow-sm lg:col-span-1 md:col-span-2 lg:block">
              <img src={infrastructure.heroWideAngle || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80"} alt="Campus Infrastructure" className="w-full h-64 object-cover md:h-[400px] lg:h-64" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f: any, i: number) => {
              const Icon = iconMap[f.icon] || iconMap.default;
              return (
                <div key={i} className={`reveal delay-${Math.min(i % 3, 2)}00 bg-card rounded-xl border p-6 h-full hover:shadow-[0_8px_30px_hsl(var(--navy)/0.08)] transition-shadow`}>
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                  {f.desc && (
                    <div className="text-sm leading-relaxed text-foreground/70 [&>p]:m-0" dangerouslySetInnerHTML={{ __html: f.desc }}></div>
                  )}
                </div>
              );
            })}
          </div>

          {infrastructure?.interiorDetails && infrastructure.interiorDetails.length > 0 && (
            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="font-bold text-foreground mb-8 text-center">Interior Details</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {infrastructure.interiorDetails.map((photo: any, idx: number) => (
                  <div key={idx} className="reveal delay-100 rounded-2xl overflow-hidden aspect-[4/3] group relative shadow-sm border border-border">
                    <img src={photo.image} alt={photo.caption || "Interior"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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

      <EnquiryCTA />
    </Layout>
  );
}
