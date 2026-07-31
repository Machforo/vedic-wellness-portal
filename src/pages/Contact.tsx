import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { useState } from "react";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";
import PageGallery from "@/components/PageGallery";


const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long').regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  email: z.string().email('Invalid email address').or(z.literal('')),
  program: z.string().optional(),
  message: z.string().optional()
});

export default function ContactPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("contact");
  const mainContact = data?.mainContact || {
    address: "Knowledge Park-III, Greater Noida, Uttar Pradesh 201308",
    phone: "8448797700",
    email: "admissions@ishan.ac",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2!2d77.49!3d28.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sIshan+Ayurvedic+Medical+College!5e0!3m2!1sen!2sin!4v1"
  };

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', phone: '', email: '', program: '', message: '' }
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiBase}/ayurveda/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "Contact Page" }),
      });
      if (!response.ok) throw new Error("Failed to submit form");
      toast.success("Your message has been sent successfully!");
      setSubmitted(true);
      reset();
    } catch (err) {
      toast.error("Unable to send message. Please try again.");
      console.error(err);
    }
  };

  return (
    <Layout>
      <PageHeader title="Contact Us" subtitle="Reach out for admissions enquiries, campus visits, and general information" breadcrumbs={[{ label: "Contact" }]} />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <p className="reveal leading-relaxed max-w-3xl mb-12 text-lg">
            Ishan Ayurvedic Medical College's team is available to assist prospective students, parents, enrolled students, and visitors. Admissions queries are given priority, with responses guaranteed within 24 working hours.
          </p>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="reveal-left space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Directory</h2>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "Admissions Office", value: `${mainContact.phone} (Phone & WhatsApp)`, href: `tel:${mainContact.phone}` },
                    { icon: Mail, label: "Admissions Email", value: mainContact.email, href: `mailto:${mainContact.email}` },
                    { icon: Phone, label: "Hospital Desk", value: "0120-2323233", href: "tel:01202323233" },
                    { icon: Mail, label: "Principal's Office", value: "principal.ayurveda@ishan.ac", href: "mailto:principal.ayurveda@ishan.ac" },
                    { icon: MapPin, label: "Campus Address", value: mainContact.address },
                    { icon: Clock, label: "Office Hours", value: "Mon–Sat: 9:00 AM – 5:00 PM" },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4 p-4 rounded-xl border bg-card text-xs sm:text-sm hover:border-gold/40 hover:shadow-[0_4px_20px_hsl(var(--gold)/0.15)] hover:-translate-y-1 transition-all duration-300">
                      <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><Icon className="w-5 h-5 text-navy" /></div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                        {href ? <a href={href} className="font-semibold text-navy hover:text-gold transition-colors">{value}</a> : <p className="font-medium text-foreground">{value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <a href={`https://wa.me/91${mainContact.phone}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#128C7E] transition-colors w-full sm:w-auto">
                    <span className="text-lg">💬</span> Chat on WhatsApp
                  </a>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border h-[300px]">
                <iframe src={mainContact.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Ishan Ayurveda Location" />
              </div>
              
              {mainContact?.receptionInterior && (
                <div className="rounded-xl overflow-hidden shadow-sm aspect-video mt-6">
                  <img src={mainContact.receptionInterior} alt="Reception Interior" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="reveal-right">
              <div className="bg-card rounded-2xl p-8 shadow-[0_8px_40px_hsl(var(--navy)/0.08)] border border-border/50 hover:border-gold/30 hover:shadow-[0_8px_50px_hsl(var(--navy)/0.12)] transition-all duration-500">
                <h3 className="text-xl font-bold text-foreground mb-6">Enquiry Form</h3>
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-navy">✓</span>
                    </div>
                    <p className="font-semibold text-foreground mb-2">Enquiry Submitted!</p>
                    <p className="text-sm text-muted-foreground">We'll reach out to you within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-5 text-sm text-navy underline">Submit another enquiry</button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Full Name*" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="w-full px-4 py-3 text-sm rounded-lg border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] transition-all" />
                      <input type="tel" placeholder="Phone Number*" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required className="w-full px-4 py-3 text-sm rounded-lg border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] transition-all" />
                    </div>
                    <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-3 text-sm rounded-lg border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] transition-all" />
                    <select value={form.program} onChange={e => setForm(p => ({ ...p, program: e.target.value }))} className="w-full px-4 py-3 text-sm rounded-lg border border-border/50 bg-background/50 text-foreground focus:bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] transition-all">
                      <option value="">Select Program</option>
                      <option>BAMS</option>
                    </select>
                    <textarea placeholder="Your Message (optional)" rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="w-full px-4 py-3 text-sm rounded-lg border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] transition-all resize-none" />
                    <button type="submit" disabled={submitting} className="w-full py-3.5 text-sm font-semibold bg-navy text-primary-foreground rounded-lg shadow-lg hover:bg-navy/90 transition-all active:scale-[0.97] disabled:opacity-60">
                      {submitting ? "Submitting..." : "Submit Enquiry"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>


          {mainContact?.buildingExteriors && mainContact.buildingExteriors.length > 0 && (
            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Campus Exteriors</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {mainContact.buildingExteriors.map((photo: any, idx: number) => (
                  <div key={idx} className="rounded-xl overflow-hidden aspect-video shadow-sm border border-border group relative">
                    <img src={photo.image} alt={photo.caption || "Campus Exterior"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
    <PageGallery images={data?.pageGallery} />
    </Layout>
  );
}
