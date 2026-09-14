import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";
import { rt } from "@/lib/richText";

export default function FeedbackPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("research");
  const feedback = data?.feedback || {};
  const programmes = feedback.programmes?.length > 0
    ? feedback.programmes.map((p: any) => p.label || p)
    : ["BAMS", "MD (Ayurveda)", "None"];

  return (
    <Layout>
      <PageHeader
        title={feedback.title || "Feedback"}
        subtitle={feedback.subtitle || "Help us improve — share your experience as a student, parent, or visitor"}
        breadcrumbs={[{ label: "Contact", href: "/contact" }, { label: "Feedback" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal space-y-8">
              {feedback.description ? (
                <div className="text-foreground/70 leading-relaxed text-lg [&>p]:m-0 rich-text" dangerouslySetInnerHTML={{ __html: rt(feedback.description) }}></div>
              ) : (
                <p className="text-foreground/70 leading-relaxed text-lg">Ishan Ayurvedic Medical College values feedback from students, parents, and visitors. All responses are carefully reviewed by the Quality Assurance Cell. Your inputs remain private and confidential.</p>
              )}
              <div className="rounded-2xl overflow-hidden shadow-2xl border">
                <img src={feedback.image || "https://images.unsplash.com/photo-1559523161-0fc0d8b814f4?auto=format&fit=crop&w=1000&q=80"} alt="Ishan Ayurveda Campus" className="w-full h-80 object-cover" />
              </div>
            </div>
            <div className="reveal delay-100 bg-card rounded-2xl p-8 shadow-sm border">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Feedback submitted successfully. Thank you!"); }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name (optional)" className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow" />
                  <select required className="w-full px-4 py-3 text-sm rounded-lg border bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow">
                    <option value="">I am a...*</option>
                    <option>Student</option><option>Parent</option><option>Visitor</option>
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <select className="w-full px-4 py-3 text-sm rounded-lg border bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow">
                    <option value="">Programme (Optional)</option>
                    {programmes.map((p: string) => <option key={p}>{p}</option>)}
                  </select>
                  <input type="text" placeholder="Subject*" required className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow" />
                </div>
                <textarea placeholder="Your Message*" required rows={5} className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow resize-none" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-t mt-4 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <label key={star} className="cursor-pointer">
                          <input type="radio" name="rating" value={star} className="sr-only peer" required />
                          <span className="text-2xl text-muted peer-checked:text-gold hover:text-gold-light transition-colors">★</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="w-full sm:w-auto px-8 py-3 text-sm font-semibold bg-navy text-primary-foreground rounded-lg shadow-lg hover:bg-navy/90 transition-all active:scale-[0.97]">Submit Feedback</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
