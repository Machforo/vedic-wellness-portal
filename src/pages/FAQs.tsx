import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

const defaultFaqs = [
  { question: "Is the BAMS degree approved by NCISM?", answer: "Yes, Ishan Ayurvedic Medical College is approved by the National Commission for Indian System of Medicine (NCISM), ensuring the BAMS degree is fully recognized across India." },
  { question: "Do you have an in-campus hospital?", answer: "Yes, we have a fully functional 100-bed Ayurvedic hospital on campus with daily OPDs, IPD, Panchkarma center, and operation theater." },
  { question: "Are hostel facilities available?", answer: "Yes, we provide separate hostel facilities for boys and girls with modern amenities, nutritious food, and 24/7 security." },
];

export default function FAQsPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("faqs");

  // Since faqs is a collection, data is an array
  const faqs = Array.isArray(data) && data.length > 0 ? data : defaultFaqs;

  return (
    <Layout>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common queries about admissions, facilities, and BAMS curriculum at IAMC"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "FAQs" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start max-w-6xl mx-auto">
            <div className="space-y-10 reveal">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Common Inquiries</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq: any, i: number) => (
                    <AccordionItem key={faq._id || i} value={`faq-${i}`} className="border rounded-lg bg-card px-5">
                      <AccordionTrigger className="text-sm font-semibold text-foreground text-left py-4 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed pb-4">
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            <div className="reveal hidden lg:block sticky top-32">
              <div className="rounded-2xl overflow-hidden shadow-2xl border mb-6">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80" alt="IAMC Hospital and Campus" className="w-full h-[450px] object-cover" />
              </div>
              <div className="p-6 rounded-xl bg-gold-light border border-[hsl(var(--gold)/0.2)]">
                <p className="text-sm font-bold text-navy mb-2">Still have questions?</p>
                <p className="text-xs leading-relaxed">Our admissions counselors are available Monday to Saturday, 9 AM to 6 PM.</p>
                <a href="tel:+918448797700" className="inline-block mt-3 text-sm font-bold text-navy hover:underline">Call: +91 8448797700</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </Layout>
  );
}
