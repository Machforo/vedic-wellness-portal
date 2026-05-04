import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIshanLawData } from "@/hooks/useIshanLawData";
import { Clock, GraduationCap, IndianRupee, Users, CheckCircle2 } from "lucide-react";
import NotFound from "./NotFound";

export default function DynamicCourse() {
  const { courseId } = useParams();
  const { data, isLoading } = useIshanLawData("courses");

  if (isLoading) return <div className="min-h-screen flex flex-col"><Navbar /><div className="flex-1 flex items-center justify-center font-display text-xl text-navy animate-pulse">Loading Academic Program...</div></div>;
  
  // Clean string to match slugs
  const sanitizeSlug = (str: string) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const fallbackCourses = [
    {
      programName: "BA LLB (Hons)",
      duration: "5 Years (Integrated)",
      eligibility: "10+2 with 45% marks (General), 42% (OBC), 40% (SC/ST). CLAT/LSAT/Ishan Entrance.",
      annualIntake: "120 Seats",
      overview: "The integrated BA LLB (Hons) at Ishan Law Institute is a flagship 5-year professional program that seamlessly blends liberal arts with legal scholarship. It is meticulously designed for students who want to enter the legal profession immediately after school. The program combines subjects like Political Science, Sociology, and Economics with core Law subjects, providing a holistic understanding of the law within its social context.",
      curriculumStructure: "The program follows the CCS University and BCI curriculum. Initial years focus on pre-law subjects and foundational legal principles. Later years dive deep into specialized areas such as Constitutional Law, IPR, Criminal Law, and Corporate Jurisprudence, with mandatory Moot Court and Legal Aid training.",
      careerScope: "Graduates can enroll as advocates, appear for Judicial Services (PCS-J), work in top-tier Law Firms, join corporate legal departments, or pursue careers in Civil Services and international organizations.",
      image: "https://law.ishan.ac/all-law/gallery-photos/academics/academics-1.jpg"
    },
    {
      programName: "LLB (Professional)",
      duration: "3 Years (Professional)",
      eligibility: "Graduation in any discipline with 45% marks (General), 42% (OBC), 40% (SC/ST).",
      annualIntake: "120 Seats",
      overview: "The 3-year LLB program is designed for graduates from any field (Arts, Science, Commerce, etc.) who wish to transition into the legal profession. This intensive course focuses strictly on legal scholarship and professional training. At Ishan Law, we emphasize procedural mastery, clinical education, and the development of advocacy skills required for successful litigation and corporate practice.",
      curriculumStructure: "The curriculum covers substantive and procedural laws including Civil Procedure, Criminal Procedure, Evidence, Property Law, and Professional Ethics. Specialized clinical modules on Drafting, Pleading, and Conveyance ensure that students are practice-ready upon graduation.",
      careerScope: "LLB graduates are eligible to practice in all Indian courts. They can pursue careers in Litigation, Corporate Law, Legal Process Outsourcing (LPOs), Legal Research, and as Law Officers in various government and private sectors.",
      image: "https://law.ishan.ac/all-law/gallery-photos/academics/academics-11.jpg"
    },
    {
      programName: "LLM (Master of Laws)",
      duration: "2 Years",
      eligibility: "LLB or BA LLB degree from a recognized university with minimum 50% marks.",
      annualIntake: "30 Seats",
      overview: "The LLM program is a postgraduate degree designed for law graduates who seek advanced specialization in specific areas of legal research and scholarship. It fosters an environment of critical inquiry, jurisprudential analysis, and academic leadership, preparing students for careers in legal research, academia, and specialized legal consulting.",
      curriculumStructure: "The program offers specializations in fields like Constitutional Law, Criminal Law, and Corporate Law. It includes advanced research methodology, comparative law studies, and a mandatory dissertation project supervised by senior faculty members.",
      careerScope: "LLM graduates are primarily suited for academic roles as Professors, legal researchers in think-tanks, specialized consultants in multinational corporations, and for competitive exams like the UGC NET/JRF.",
      image: "https://law.ishan.ac/all-law/gallery-photos/academics/academics-1.jpg"
    },
  ];

  const courseList = data?.courses?.length > 0 ? data.courses : fallbackCourses;
  const course = courseList.find((c: any) => sanitizeSlug(c.programName).includes(sanitizeSlug(courseId || '')));

  if (!course) return <NotFound />;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="bg-navy py-20 md:py-32 relative overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
           <img 
             src={course.image || "https://law.ishan.ac/all-law/gallery-photos/academics/academics-1.jpg"} 
             className="w-full h-full object-cover opacity-20 mix-blend-overlay scale-110" 
             alt="Background"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent" />
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground leading-tight mb-4">
              {course.programName}
            </h1>
            <p className="text-lg text-primary-foreground/70 leading-relaxed font-light">
              Forge your legacy at Ishan Law Institute with our comprehensive {course.duration} program.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container-wide py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-5 text-gold-underline">Program Overview</h2>
              <p className="text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">{course.overview || "Program overview details will be updated shortly."}</p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-5 text-gold-underline">Curriculum Structure</h2>
              <div className="bg-card border rounded-2xl p-6 shadow-sm">
                 <p className="text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">{course.curriculumStructure || "Curriculum structure will be updated shortly."}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-5 text-gold-underline">Career Scope</h2>
              <p className="text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">{course.careerScope || "Career scope will be updated shortly."}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-navy text-primary-foreground rounded-2xl p-8 sticky top-32 shadow-[0_8px_30px_hsl(var(--navy)/0.2)]">
              <h3 className="text-2xl font-display font-bold mb-8">Quick Facts</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60 mb-1">Duration</p>
                    <p className="font-semibold text-lg">{course.duration || "N/A"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60 mb-1">Annual Fee</p>
                    <p className="font-semibold text-lg">{course.annualFee || "N/A"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60 mb-1">Annual Intake</p>
                    <p className="font-semibold text-lg">{course.annualIntake || "N/A"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60 mb-1">Eligibility</p>
                    <p className="font-semibold">{course.eligibility || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-primary-foreground/10">
                <button className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-4 rounded-xl transition-colors shadow-lg active:scale-[0.98]">
                  Apply Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
