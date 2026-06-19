import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Music, Trophy } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

export default function AuditoriumSportsPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("facilities");
  const auditorium = data?.auditorium || {};
  const sports = data?.sports || {};

  return (
    <Layout>
      <PageHeader
        title="Auditorium & Sports"
        subtitle="World-class auditorium and sports facilities supporting holistic student development"
        breadcrumbs={[{ label: "Campus" }, { label: "Auditorium & Sports" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="reveal space-y-6 p-8 rounded-2xl border bg-card">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center">
                <Music className="w-7 h-7 text-navy" />
              </div>
              <h2 className="font-bold text-foreground text-2xl">Seminar Hall & Auditorium</h2>
              {auditorium.content ? (
                <div className="text-foreground/70 leading-relaxed [&>p]:mb-4" dangerouslySetInnerHTML={{ __html: auditorium.content }}></div>
              ) : (
                <p className="text-foreground/70 leading-relaxed">
                  The state-of-the-art auditorium at Ishan Ayurvedic Medical College provides a professional venue for guest lectures, annual convocations, cultural programmes, and national-level seminars and conferences in Ayurvedic science.
                </p>
              )}
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="flex gap-2"><span className="text-gold font-bold">•</span> Capacity: {auditorium.seating || "500+"} seats with modern audio-visual equipment</li>
                <li className="flex gap-2"><span className="text-gold font-bold">•</span> HD projection and professional sound system</li>
                <li className="flex gap-2"><span className="text-gold font-bold">•</span> Regular guest lectures by industry experts</li>
                <li className="flex gap-2"><span className="text-gold font-bold">•</span> Annual Dhanvantari Jayanti celebrations</li>
              </ul>
              {auditorium.image && (
                <img src={auditorium.image} alt="Auditorium" className="w-full h-48 object-cover rounded-xl mt-4" />
              )}
            </div>
            <div className="reveal space-y-6 p-8 rounded-2xl border bg-card">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center">
                <Trophy className="w-7 h-7 text-navy" />
              </div>
              <h2 className="font-bold text-foreground text-2xl">Sports Facilities</h2>
              {sports.content ? (
                <div className="text-foreground/70 leading-relaxed [&>p]:mb-4" dangerouslySetInnerHTML={{ __html: sports.content }}></div>
              ) : (
                <p className="text-foreground/70 leading-relaxed">
                  We believe in holistic education. The Ishan campus sports complex encourages students to maintain a healthy mind and body alongside their rigorous Ayurvedic academic pursuits.
                </p>
              )}
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="flex gap-2"><span className="text-gold font-bold">•</span> Cricket, Basketball, and Badminton courts</li>
                <li className="flex gap-2"><span className="text-gold font-bold">•</span> Gymnasium and dedicated Yoga hall</li>
                <li className="flex gap-2"><span className="text-gold font-bold">•</span> Regular inter-college sports competitions</li>
                <li className="flex gap-2"><span className="text-gold font-bold">•</span> Trained sports coaches and facilities</li>
              </ul>
              {sports.image && (
                <img src={sports.image} alt="Sports" className="w-full h-48 object-cover rounded-xl mt-4" />
              )}
            </div>
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
