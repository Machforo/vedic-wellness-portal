import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

export default function FeePaymentPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("digital");
  const feePayment = data?.feePayment || {};

  return (
    <Layout>
      <PageHeader 
        title={feePayment.title || "Fee Structure"} 
        subtitle={feePayment.subtitle || "Pay your fees online securely through our portal"} 
        breadcrumbs={[{ label: "Admissions" }, { label: "Fee Structure" }]} 
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="reveal rounded-2xl overflow-hidden shadow-2xl border bg-navy/5">
              <img src={feePayment.image || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80"} alt="Online Fee Payment" className="w-full h-80 object-cover" />
            </div>
            <div className="text-center lg:text-left">
              <div className="reveal space-y-4 mb-10">
                {feePayment.description ? (
                  <div className="text-foreground/70 leading-relaxed whitespace-pre-wrap [&>p]:m-0" dangerouslySetInnerHTML={{ __html: feePayment.description }}></div>
                ) : (
                  <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">Pay tuition fees, hostel charges, and examination fees online through the Ishan Fee Payment Portal. Select Ishan Ayurveda as your institution, choose your program (BAMS), and complete payment via net banking, UPI, or card. Download your receipt immediately after payment.</p>
                )}
                <p className="text-sm text-muted-foreground">For payment issues, contact the accounts office at <a href="tel:+918448797700" className="text-navy font-semibold">8448797700</a></p>
              </div>
              <a href={feePayment.link || "https://fee.ishan.ac"} target="_blank" rel="noopener noreferrer" className="reveal delay-100 inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-gold text-foreground rounded-lg shadow-[0_4px_16px_hsl(var(--gold)/0.3)] hover:shadow-[0_6px_24px_hsl(var(--gold)/0.4)] transition-shadow active:scale-[0.97]">
                Go to Fee Payment Portal →
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
