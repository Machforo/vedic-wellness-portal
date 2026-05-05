import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, Component, ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any, errorInfo: any) { console.error("Uncaught error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong.</h2>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-navy text-white rounded-lg">Refresh Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

// About
const About = lazy(() => import("./pages/About"));
const PrincipalMessage = lazy(() => import("./pages/PrincipalMessage"));
const MissionVision = lazy(() => import("./pages/MissionVision"));
const Approvals = lazy(() => import("./pages/Approvals"));
const MandatoryDisclosure = lazy(() => import("./pages/MandatoryDisclosure"));
const WhyChooseUs = lazy(() => import("./pages/WhyChooseUs"));
const CodeOfConduct = lazy(() => import("./pages/CodeOfConduct"));
const FAQs = lazy(() => import("./pages/FAQs"));

// BAMS Programme
const DynamicCourse = lazy(() => import("./pages/DynamicCourse"));
const ScopeOfBAMS = lazy(() => import("./pages/ScopeOfBAMS"));
const Syllabus = lazy(() => import("./pages/Syllabus"));
const Admissions = lazy(() => import("./pages/Admissions"));
const Scholarships = lazy(() => import("./pages/Scholarships"));

// Faculty
const Faculty = lazy(() => import("./pages/Faculty"));
const VisitingFaculty = lazy(() => import("./pages/VisitingFaculty"));

// 14 Departments
const AyurvedicSiddhanta = lazy(() => import("./pages/AyurvedicSiddhanta"));
const RachanaSharir = lazy(() => import("./pages/RachanaSharir"));
const KriyaSharir = lazy(() => import("./pages/KriyaSharir"));
const DravyagunaVigyana = lazy(() => import("./pages/DravyagunaVigyana"));
const RasaShastra = lazy(() => import("./pages/RasaShastra"));
const Kaumarabhritya = lazy(() => import("./pages/Kaumarabhritya"));
const PrasutiStriRoga = lazy(() => import("./pages/PrasutiStriRoga"));
const Kayachikitsa = lazy(() => import("./pages/Kayachikitsa"));
const Panchkarma = lazy(() => import("./pages/Panchkarma"));
const ShalyaTantra = lazy(() => import("./pages/ShalyaTantra"));
const ShalakYaTantra = lazy(() => import("./pages/ShalakYaTantra"));
const SwasthavrittaYoga = lazy(() => import("./pages/SwasthavrittaYoga"));
const AgadaTantra = lazy(() => import("./pages/AgadaTantra"));
const SamhitaSanskrit = lazy(() => import("./pages/SamhitaSanskrit"));

// Campus Facilities
const Infrastructure = lazy(() => import("./pages/Infrastructure"));
const HerbalGarden = lazy(() => import("./pages/HerbalGarden"));
const Hostel = lazy(() => import("./pages/Hostel"));
const AuditoriumSports = lazy(() => import("./pages/AuditoriumSports"));

// Events & Gallery
const NewsEvents = lazy(() => import("./pages/NewsEvents"));
const EventsCalendar = lazy(() => import("./pages/EventsCalendar"));
const PhotoGallery = lazy(() => import("./pages/PhotoGallery"));
const VideoGallery = lazy(() => import("./pages/VideoGallery"));
const PressCoverage = lazy(() => import("./pages/PressCoverage"));

// Student Zone
const Downloads = lazy(() => import("./pages/Downloads"));
const PastPapers = lazy(() => import("./pages/PastPapers"));
const FeePayment = lazy(() => import("./pages/FeePayment"));
const StudentPortal = lazy(() => import("./pages/StudentPortal"));

// Research & Placements
const ResearchJournal = lazy(() => import("./pages/ResearchJournal"));
const Publications = lazy(() => import("./pages/Publications"));
const ResearchProjects = lazy(() => import("./pages/ResearchProjects"));
const AlumniNetwork = lazy(() => import("./pages/AlumniNetwork"));
const Placements = lazy(() => import("./pages/Placements"));

// Contact
const Contact = lazy(() => import("./pages/Contact"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Careers = lazy(() => import("./pages/Careers"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-[hsl(var(--gold))] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* ── 301 Redirects ── */}
              <Route path="/join-us" element={<Navigate to="/careers" replace />} />
              {/* Hospital redirects — external, handled by vercel.json */}

              {/* ── Homepage ── */}
              <Route path="/" element={<Index />} />

              {/* ── About ── */}
              <Route path="/about" element={<About />} />
              <Route path="/principal-message" element={<PrincipalMessage />} />
              <Route path="/mission-vision" element={<MissionVision />} />
              <Route path="/approvals" element={<Approvals />} />
              <Route path="/mandatory-disclosure" element={<MandatoryDisclosure />} />
              <Route path="/why-choose-us" element={<WhyChooseUs />} />
              <Route path="/code-of-conduct" element={<CodeOfConduct />} />
              <Route path="/faqs" element={<FAQs />} />

              {/* ── BAMS Programme ── */}
              <Route path="/courses/:courseId" element={<DynamicCourse />} />
              <Route path="/scope-of-bams" element={<ScopeOfBAMS />} />
              <Route path="/syllabus" element={<Syllabus />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/scholarships" element={<Scholarships />} />

              {/* ── Faculty ── */}
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/visiting-faculty" element={<VisitingFaculty />} />

              {/* ── 14 Departments ── */}
              <Route path="/ayurvedic-siddhanta" element={<AyurvedicSiddhanta />} />
              <Route path="/rachana-sharir" element={<RachanaSharir />} />
              <Route path="/kriya-sharir" element={<KriyaSharir />} />
              <Route path="/dravyaguna-vigyana" element={<DravyagunaVigyana />} />
              <Route path="/rasa-shastra" element={<RasaShastra />} />
              <Route path="/kaumarabhritya" element={<Kaumarabhritya />} />
              <Route path="/prasuti-stri-roga" element={<PrasutiStriRoga />} />
              <Route path="/kayachikitsa" element={<Kayachikitsa />} />
              <Route path="/panchkarma" element={<Panchkarma />} />
              <Route path="/shalya-tantra" element={<ShalyaTantra />} />
              <Route path="/shalakya-tantra" element={<ShalakYaTantra />} />
              <Route path="/swasthavritta-yoga" element={<SwasthavrittaYoga />} />
              <Route path="/agada-tantra" element={<AgadaTantra />} />
              <Route path="/samhita-sanskrit" element={<SamhitaSanskrit />} />

              {/* ── Campus Facilities ── */}
              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/herbal-garden" element={<HerbalGarden />} />
              <Route path="/hostel" element={<Hostel />} />
              <Route path="/auditorium-sports" element={<AuditoriumSports />} />

              {/* ── Events & Gallery ── */}
              <Route path="/news-events" element={<NewsEvents />} />
              <Route path="/events-calendar" element={<EventsCalendar />} />
              <Route path="/photo-gallery" element={<PhotoGallery />} />
              <Route path="/video-gallery" element={<VideoGallery />} />
              <Route path="/press-coverage" element={<PressCoverage />} />

              {/* ── Student Zone ── */}
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/past-papers" element={<PastPapers />} />
              <Route path="/fee-payment" element={<FeePayment />} />
              <Route path="/student-portal" element={<StudentPortal />} />

              {/* ── Research & Placements ── */}
              <Route path="/research-journal" element={<ResearchJournal />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/research-projects" element={<ResearchProjects />} />
              <Route path="/alumni-network" element={<AlumniNetwork />} />
              <Route path="/placements" element={<Placements />} />

              {/* ── Contact ── */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/thank-you" element={<ThankYou />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
