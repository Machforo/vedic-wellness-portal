import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

const defaultVideos: any[] = [];

export default function VideoGalleryPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("video-gallery");

  const getYTId = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const rawVideos = Array.isArray(data) ? data : [];
  const videos = rawVideos.length > 0 ? rawVideos.map((v: any) => ({
    ...v,
    ytId: getYTId(v.videoUrl)
  })) : defaultVideos;

  return (
    <Layout>
      <PageHeader title="Video Gallery" subtitle="Visual insights into academic and extracurricular life at Ishan Ayurveda" breadcrumbs={[{ label: "Gallery" }, { label: "Videos" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <p className="reveal leading-relaxed max-w-4xl mx-auto text-center mb-16 text-lg">
            Watch Ishan Ayurvedic Medical College in action — clinical postings, hospital documentaries, faculty talks, Dhanvantari jayanti, and student testimonials; subscribe to our YouTube channel to stay updated.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v: any, i: number) => (
              <div key={v.title || v.ytId || i} className={`reveal delay-${Math.min(i % 3, 2)}00 group rounded-xl border bg-card overflow-hidden hover:shadow-[0_8px_30px_hsl(var(--navy)/0.08)] transition-shadow cursor-pointer`}>
                <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden relative">
                  {v.ytId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${v.ytId}`}
                      title={v.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full relative group/thumb cursor-pointer bg-navy-dark">
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent z-10" />
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center group-hover/thumb:bg-gold group-hover/thumb:scale-110 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                          <svg className="w-6 h-6 text-navy ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <span className="text-xs font-bold text-gold uppercase tracking-wider mb-1 block">{v.category}</span>
                        <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2">{v.title}</h3>
                      </div>
                    </div>
                  )}
                </div>
                {!v.ytId && (
                  <div className="p-4 bg-card">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider mb-1 block">{v.category}</span>
                    <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">{v.title}</h3>
                  </div>
                )}
              </div>
            ))}
          </div>
          {videos.length === 0 && (
            <div className="reveal py-20 text-center bg-muted/30 rounded-3xl border border-dashed">
              <p className="text-muted-foreground">No videos available at the moment.</p>
              <p className="text-center text-sm text-muted-foreground mt-4">Add YouTube video links via the CMS gallery manager to populate this section.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
