import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

const programs = [
  {
    name: "BAMS",
    type: "Degree",
    category: "5.5 Years",
    description: "Bachelor of Ayurvedic Medicine & Surgery · NCISM Recognised",
    link: "/courses/bams",
    overview: "The only AYUSH medical degree conferring the title 'Vaidya'. Five-and-a-half years including one-year compulsory internship. Covers all 14 Ayurvedic specialisations with in-campus hospital OPD exposure from Year 1.",
    outcomes: ["Vaidya — Government AYUSH Hospital", "Private Ayurvedic Practice", "Panchkarma Clinic", "BAMS MD Entrance (AIAPGET)", "Ayurvedic Research", "Wellness & Tourism"]
  },
];

const defaultDepartments = [];

/**
 * Department routes are declared per slug in App.tsx. Slugifying the display
 * name (the previous behaviour) produced paths like
 * "/departments/kayachikitsa-ayurvedic-internal-medicine-" which 404'd.
 */
function departmentPath(dept: any): string {
  if (dept?.path) return dept.path;
  if (dept?.href) return dept.href;
  if (dept?.slug) return `/${String(dept.slug).replace(/^\//, "")}`;
  return "/departments";
}

export default function ProgramsSection() {
  const ref = useScrollReveal();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { data: coursesData } = useAyurvedaData("courses");
  const { data: academicsData } = useAyurvedaData("academics");
  const { data: departmentsData } = useAyurvedaData("departments");

  const fetchedPrograms = coursesData?.length > 0 ? coursesData : (coursesData?.data?.length > 0 ? coursesData.data : programs);

  // The departments collection carries the slugs the routes are declared with;
  // the academics singleton's inline list does not, so it is only a fallback.
  const collectionDepartments = (Array.isArray(departmentsData) ? departmentsData : []).filter((d: any) => d?.name && d?.slug);
  const departments = collectionDepartments.length > 0
    ? collectionDepartments
    : (academicsData?.departments?.length > 0 ? academicsData.departments : defaultDepartments);

  return (
    <section id="programs" className="py-12 md:py-20 bg-section-alt overflow-hidden" ref={ref}>
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Academic Programme</p>
          <h2 className="reveal delay-100 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            The BAMS Programme — Becoming a Vaidya
          </h2>
          <p className="reveal delay-200 mt-5 leading-relaxed">
            NCISM-approved five-and-a-half-year degree programme, the only Ayurvedic medical qualification that confers practitioner registration — the gateway to government AYUSH service and independent clinical practice.
          </p>
        </div>

        <motion.div layout className="grid sm:grid-cols-1 lg:grid-cols-1 gap-8 max-w-3xl mx-auto">
          <AnimatePresence mode="popLayout">
            {fetchedPrograms.map((program: any, i: number) => {
              const outcomesArray = program.outcomes || (program.careerScope ? program.careerScope.split(',').map((s: string) => s.trim()) : []);
              return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={program.name}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-card rounded-2xl border p-8 shadow-[0_4px_20px_hsl(var(--navy)/0.04)] hover:shadow-[0_20px_40px_hsl(var(--navy)/0.08)] transition-all duration-500 overflow-hidden"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gold/5 flex items-center justify-center shrink-0 group-hover:bg-gold/15 transition-colors duration-300">
                    <BookOpen className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy">{program.name}</h3>
                    <p className="text-xs uppercase tracking-wider text-gold mt-1 font-semibold">{program.description || `${program.duration} • ${program.eligibility}`}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Programme Overview</p>
                    <p className="text-sm leading-relaxed italic">"{program.overview}"</p>
                  </div>

                  <AnimatePresence>
                    {hoveredIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Career Outcomes</p>
                        <div className="flex flex-wrap gap-2">
                          {outcomesArray.map((outcome: string) => (
                            <span key={outcome} className="px-2.5 py-1 bg-muted rounded-full text-xs font-medium">{outcome}</span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-6 border-t flex items-center justify-between">
                    <Link to={program.link || `/courses/${program.slug}`} className="flex items-center gap-2 text-sm font-bold text-navy hover:text-gold transition-colors group/btn">
                      Explore BAMS Programme
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                    <Link to="/admissions" className="px-4 py-2 bg-gold text-navy text-xs font-bold rounded-lg hover:bg-navy hover:text-white transition-all shimmer-btn">Apply Now</Link>
                  </div>
                </div>
              </motion.div>
            )})}
          </AnimatePresence>
        </motion.div>

        {/* Dept grid teaser */}
        {departments.length > 0 && (
          <>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {departments.slice(0, 7).map((dept: any) => (
                <Link key={dept.slug || dept.name} to={departmentPath(dept)} className="p-3 rounded-xl border bg-white text-center text-xs font-semibold text-navy hover:bg-gold hover:border-gold hover:text-navy transition-all">
                  {dept.name}
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/departments" className="text-sm font-semibold text-navy hover:text-gold transition-colors inline-flex items-center gap-1">View All {departments.length} Departments <ArrowUpRight className="w-4 h-4" /></Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
