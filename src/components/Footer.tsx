import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, Twitter, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "About Ishan Law", href: "/about" },
  { label: "Law Programs", href: "/programs-overview" },
  { label: "Admissions", href: "/admissions" },
  { label: "Moot Court", href: "/moot-court" },
  { label: "Contact", href: "/contact" },
];

const programs = [
  { label: "BA LLB (Hons)", href: "/courses/ba-llb" },
  { label: "LLB (3 Years)", href: "/courses/llb" },
  { label: "LLM (2 Years)", href: "/courses/llm" },
  { label: "Certificate Courses", href: "/certificate-programs" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/ishan.law", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/ishan.law", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@ishanlaw", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/ishan-law", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/ishan_law", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-primary-foreground border-t border-white/5">
      <div className="container-wide py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white overflow-hidden flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 p-1">
                <img 
                  src="/favicon.png" 
                  alt="Ishan Law Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-navy"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>';
                  }}
                />
              </div>
              <div>
                <p className="font-display font-bold text-lg leading-tight text-white">ISHAN</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-primary-foreground/40 leading-tight">Institute of Law</p>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/50 leading-relaxed max-w-xs">
              BCI Approved | Affiliated to CCS University, Meerut | NAAC Accredited. Excellence in legal education and practice-oriented learning.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a 
                  key={s.label} 
                  href={s.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold hover:text-navy flex items-center justify-center transition-all duration-300"
                  aria-label={s.label}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-primary-foreground/50 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-gold">Law Programs</h4>
            <ul className="space-y-3">
              {programs.map((p) => (
                <li key={p.label}>
                  <Link to={p.href} className="text-sm text-primary-foreground/50 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-gold mt-0.5" />
                <span className="text-sm text-primary-foreground/50 leading-relaxed">Knowledge Park-III, Greater Noida, UP 201308</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-gold" />
                <a href="tel:+918448797700" className="text-sm text-primary-foreground/50 hover:text-white transition-colors">8448797700</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-gold" />
                <a href="mailto:info@ishan.ac" className="text-sm text-primary-foreground/50 hover:text-white transition-colors">info@ishan.ac</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 bg-black/20">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-primary-foreground/30">
            © {new Date().getFullYear()} Ishan Law Institute. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Anti-Ragging", href: "/anti-ragging" },
              { label: "Grievance", href: "/grievance-redressal" },
              { label: "Disclosures", href: "/mandatory-disclosure" },
            ].map((l) => (
              <Link key={l.label} to={l.href} className="text-[11px] text-primary-foreground/30 hover:text-gold transition-colors uppercase tracking-widest font-medium">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
