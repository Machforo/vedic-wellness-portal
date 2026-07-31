import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Calendar, MapPin, Share2 } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import PageGallery from "@/components/PageGallery";

export default function EventsCalendarPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("events");

  const defaultEvents = [
    {
      title: "National Seminar on Ayurveda",
      date: "May 15, 2024",
      location: "Main Auditorium",
      description: "A comprehensive seminar on clinical applications of classical Ayurvedic formulations.",
    },
    {
      title: "Dhanvantari Jayanti Celebration",
      date: "October 29, 2024",
      location: "Campus Grounds",
      description: "Annual celebration of National Ayurveda Day with medical camps and cultural events.",
    },
    {
      title: "Free Medical Camp",
      date: "May 20, 2024",
      location: "Hospital OPD",
      description: "Free consultation and medicine distribution camp for the local community.",
    },
    {
      title: "Workshop on Nadi Pariksha",
      date: "May 10, 2024",
      location: "Clinical Lab 1",
      description: "Hands-on skill development workshop on Ayurvedic pulse diagnosis for final year students.",
    },
  ];

  const rawEvents = Array.isArray(data) ? data : [];
  const events = rawEvents.length > 0 ? rawEvents : defaultEvents;

  return (
    <Layout>
      <PageHeader
        title="Events Calendar"
        subtitle="Stay updated with academic, cultural, and professional events at Ishan Ayurvedic Medical College."
        breadcrumbs={[{ label: "Events Calendar" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="reveal-up space-y-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">What's Happening</p>
              <h2 className="font-bold text-foreground leading-tight">
                Plan Your Campus Experience
              </h2>
              <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                Ishan Ayurvedic Medical College maintains a packed events calendar including national seminars, guest lectures, cultural festivals, medical camps, and Dhanvantari Jayanti celebrations. This helps students plan their participation and never miss an opportunity for growth.
              </p>
            </div>

            <div className="reveal-up grid gap-6">
              {events.map((e: any, i: number) => {
                const dateObj = new Date(e.date || new Date());
                const month = dateObj.toLocaleString('default', { month: 'short' });
                const day = dateObj.getDate();
                
                return (
                  <div key={e._id || i} className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl border bg-card hover:border-gold transition-all duration-300 shadow-[0_4px_20px_hsl(var(--navy)/0.03)] hover:shadow-[0_8px_30px_hsl(var(--gold)/0.15)]">
                    <div className="md:w-32 shrink-0 flex flex-col items-center justify-center p-4 bg-muted/50 rounded-xl text-center group-hover:bg-gold group-hover:text-white transition-colors border border-dashed group-hover:border-transparent">
                      <Calendar className="w-6 h-6 mb-2 text-gold group-hover:text-white transition-colors" />
                      <span className="text-sm font-bold uppercase tracking-tighter leading-none">{month}</span>
                      <span className="text-2xl font-black leading-none mt-1">{day}</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5 text-foreground/50 text-xs font-medium">
                          <MapPin className="w-3.5 h-3.5 text-gold" /> {e.location || "Campus"}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-navy transition-colors">{e.title}</h3>
                        {e.description && <p className="text-sm leading-relaxed text-foreground/70 line-clamp-2">{e.description}</p>}
                      </div>
                    </div>
                    
                    <div className="md:w-32 flex items-center justify-end">
                      <button className="px-4 py-2 rounded-lg bg-navy/5 text-navy text-xs font-bold uppercase tracking-wider group-hover:bg-navy group-hover:text-white transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    <PageGallery images={data?.pageGallery} />
    </Layout>
  );
}
