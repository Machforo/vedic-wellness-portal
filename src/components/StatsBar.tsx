import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState, useRef } from "react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

const defaultStats = [
  { value: "14", label: "AYURVEDIC DEPARTMENTS" },
  { value: "5000+", label: "HOSPITAL PATIENTS / YEAR" },
  { value: "200+", label: "MEDICINAL PLANT SPECIES" },
  { value: "50+", label: "VAIDYA FACULTY" },
];

function AnimatedCounter({ rawValue }: { rawValue: string }) {
  const numMatch = typeof rawValue === 'string' ? rawValue.match(/^[\d,.]+/) : null;
  const hasNumber = !!numMatch;
  const target = hasNumber ? parseFloat(numMatch[0].replace(/,/g, '')) : NaN;
  const suffix = hasNumber ? rawValue.replace(/^[\d,.]+/, '') : rawValue;
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isNaN(target)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const duration = 1500;
        const steps = 40;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else { setCount(Math.floor(current)); }
        }, duration / steps);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-value">
      {isNaN(target) ? rawValue : ((count || target).toLocaleString() + suffix)}
    </span>
  );
}

export default function StatsBar() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("homepage");
  const stats = data?.stats?.length > 0 ? data.stats : defaultStats;

  // NCISM & regulatory logos for Ayurveda
  const brands = [
    { name: "NCISM", logo: "https://ncism.gov.in/images/NCISM_LOGO.png" },
    { name: "Ministry of AYUSH", logo: "https://main.ayush.gov.in/sites/default/files/Ayush_logo.png" },
    { name: "UP AYUSH Directorate", logo: "https://pharmacy.ishan.ac/wp-content/uploads/2023/07/Scholarship-UP-150x150.jpg" },
    { name: "UP State AYUSH Counselling", logo: "https://pharmacy.ishan.ac/wp-content/uploads/2023/07/URISE.png" },
    { name: "AIAPGET", logo: "https://pharmacy.ishan.ac/wp-content/uploads/2023/07/CUET-150x150.jpg" },
    { name: "NEET UG", logo: "https://pharmacy.ishan.ac/wp-content/uploads/2023/07/Jeecup-150x150.png" },
    { name: "UP Scholarship", logo: "https://pharmacy.ishan.ac/wp-content/uploads/2023/07/Scholarship-UP-150x150.jpg" },
  ];

  return (
    <section className="bg-navy relative z-10 overflow-hidden" ref={ref}>
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mb-16 md:mb-24">
          {stats.map((stat: any, i: number) => (
            <div key={stat.label} className={`text-center reveal delay-${i * 100}`}>
              <AnimatedCounter rawValue={stat.value} />
              <p className="stat-label text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="reveal delay-500 pt-8 border-t border-white/10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/40 mb-8">
            Approved By &amp; Affiliated With
          </p>
          <div className="relative flex overflow-x-hidden">
            <div className="flex animate-marquee whitespace-nowrap items-center">
              {[...brands, ...brands].map((brand, i) => (
                <div key={`${brand.name}-${i}`} className="mx-8 md:mx-12 shrink-0 group">
                  <div className="bg-white p-4 rounded-xl shadow-lg hover:scale-110 transition-transform duration-300">
                    <img src={brand.logo} alt={brand.name} className="h-16 md:h-20 w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
