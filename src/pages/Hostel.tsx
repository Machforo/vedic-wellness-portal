import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2 } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

const amenities = [
  "Separate boys and girls blocks", "Furnished rooms (2/3 sharing)", "Attached washrooms",
  "Ayurvedic pure vegetarian mess facility", "CCTV surveillance 24/7", "Wi-Fi connectivity",
  "Common room with TV", "RO water purifier", "Laundry facility",
  "First aid and attached hospital support", "Warden supervision round the clock", "Located near main campus",
];

export default function HostelPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("facilities");
  const hostel = data?.hostel || {};
  const defaultDesc = "Ishan Ayurvedic Medical College provides comfortable hostel accommodation for both boys and girls in separate residential blocks. The hostel offers a home-away-from-home experience with furnished rooms, nutritious satvik mess meals, and 24/7 security — allowing students to focus on their Ayurvedic academics in a safe environment.";

  return (
    <Layout>
      <PageHeader title="Hostel" subtitle="Safe, comfortable residential facilities for outstation students" breadcrumbs={[{ label: "Campus", href: "/infrastructure" }, { label: "Hostel" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            {hostel.image && (
              <div className="reveal mb-12 rounded-2xl overflow-hidden shadow-2xl border bg-navy/5">
                <img src={hostel.image} alt="IAMC Hostel" className="w-full h-[400px] object-cover" />
              </div>
            )}
            <div className="reveal space-y-5 mb-12">
              {hostel.content ? (
                <div className="text-foreground/70 leading-relaxed [&>p]:mb-4" dangerouslySetInnerHTML={{ __html: hostel.content }}></div>
              ) : (
                <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                  {defaultDesc}
                </p>
              )}
            </div>

            <div className="reveal delay-100 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
              {amenities.map((a) => (
                <div key={a} className="flex items-center gap-2.5 px-4 py-3 rounded-lg border bg-card text-sm text-foreground/80 hover:border-gold/50 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" /> {a}
                </div>
              ))}
            </div>

            <div className="reveal delay-300 rounded-xl border bg-card p-6 border-l-4 border-l-gold mb-16">
              <h3 className="font-semibold text-foreground mb-3">Warden Contact & Admissions</h3>
              <p className="text-sm">For hostel enquiries and applications, contact the admissions office at <a href="tel:+918448797700" className="text-navy font-semibold hover:text-gold transition-colors">8448797700</a> or visit the campus administration block.</p>
            </div>

            {/* Photo Galleries */}
            {hostel?.roomInteriors && hostel.roomInteriors.length > 0 && (
              <div className="reveal mt-12">
                <h3 className="text-xl font-bold text-foreground mb-6">Room Interiors</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hostel.roomInteriors.map((photo: any, idx: number) => (
                    <div key={`ri-${idx}`} className="rounded-xl overflow-hidden aspect-[4/3] relative shadow-sm border border-border group">
                      <img src={photo.image} alt={photo.caption || "Room Interior"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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

            {hostel?.washroomImages && hostel.washroomImages.length > 0 && (
              <div className="reveal mt-12">
                <h3 className="text-xl font-bold text-foreground mb-6">Washroom Facilities</h3>
                <div className="grid grid-cols-2 gap-4 max-w-2xl">
                  {hostel.washroomImages.map((photo: any, idx: number) => (
                    <div key={`wi-${idx}`} className="rounded-xl overflow-hidden aspect-[4/3] relative shadow-sm border border-border group">
                      <img src={photo.image} alt={photo.caption || "Washroom"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hostel?.diningHallImages && hostel.diningHallImages.length > 0 && (
              <div className="reveal mt-12">
                <h3 className="text-xl font-bold text-foreground mb-6">Dining Hall & Mess</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hostel.diningHallImages.map((photo: any, idx: number) => (
                    <div key={`dh-${idx}`} className="rounded-xl overflow-hidden aspect-[4/3] relative shadow-sm border border-border group">
                      <img src={photo.image} alt={photo.caption || "Dining Hall"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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

            {hostel?.commonRoomImages && hostel.commonRoomImages.length > 0 && (
              <div className="reveal mt-12">
                <h3 className="text-xl font-bold text-foreground mb-6">Common Room & Recreation</h3>
                <div className="grid grid-cols-2 gap-4 max-w-2xl">
                  {hostel.commonRoomImages.map((photo: any, idx: number) => (
                    <div key={`cr-${idx}`} className="rounded-xl overflow-hidden aspect-[4/3] relative shadow-sm border border-border group">
                      <img src={photo.image} alt={photo.caption || "Common Room"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
