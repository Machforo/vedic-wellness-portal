import { useScrollReveal } from "@/hooks/useScrollReveal";

const accreditations = [
  { name: "NCISM", url: "https://ncism.gov.in/images/NCISM_LOGO.png" },
  { name: "Ministry of AYUSH", url: "https://main.ayush.gov.in/sites/default/files/Ayush_logo.png" },
  { name: "UP AYUSH", url: "https://pharmacy.ishan.ac/wp-content/uploads/2023/07/Scholarship-UP-150x150.jpg" }, // Placeholder for UP AYUSH logo
  { name: "AKTU", url: "https://pharmacy.ishan.ac/wp-content/uploads/2023/07/AKTU-150x150.png" },
  { name: "URISE", url: "https://pharmacy.ishan.ac/wp-content/uploads/2023/07/URISE.png" },
  { name: "NSP", url: "https://pharmacy.ishan.ac/wp-content/uploads/2023/07/Scholarship-UP-150x150.jpg" }, // Placeholder
];

export default function AccreditationsSection() {
  const ref = useScrollReveal();

  return (
    <section id="accreditations" className="py-16 md:py-20 border-y bg-muted/30" ref={ref}>
      <div className="container-wide">
        <p className="reveal text-center text-xs font-bold uppercase tracking-[0.25em] text-gold mb-1">
          Approved By &amp; Partnered With
        </p>
        <p className="reveal text-center text-xs text-muted-foreground/60 mb-10">
          Ishan Ayurvedic Medical College and Research Centre holds all mandatory approvals from India's premier regulatory bodies
        </p>
        <div className="reveal delay-100 flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {accreditations.map((acc) => (
            <div
              key={acc.name}
              className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <div className="h-14 md:h-16 w-32 flex items-center justify-center bg-white p-2 rounded-lg shadow-sm border">
                <img
                  src={acc.url}
                  alt={acc.name}
                  className="h-full w-auto object-contain"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground tracking-wide">{acc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
