import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";


const defaultAlbums: any[] = [];

const defaultCategories = ["All", "Campus", "Laboratories", "Hospital & Clinical", "Seminars & Events", "Cultural", "Sports"];

export default function PhotoGalleryPage() {
  const ref = useScrollReveal();
  const { data } = useAyurvedaData("photo-gallery");

  // Since photo-gallery is a collection endpoint, data is an array
  const photos = Array.isArray(data) ? data : [];
  
  const [filter, setFilter] = useState("All");

  const usingCMS = photos.length > 0;
  
  // Extract unique categories from CMS photos if available
  const cmsCategories = usingCMS 
    ? Array.from(new Set(photos.map((p: any) => p.category).filter(Boolean)))
    : defaultCategories.slice(1);
    
  const displayCategories = ["All", ...cmsCategories];
  
  // Filtering logic
  const filtered = filter === "All" 
    ? photos 
    : photos.filter((p: any) => p.category === filter);

  const showPlaceholder = !usingCMS && filtered.length === 0;

  return (
    <Layout>
      <PageHeader title="Photo Gallery" subtitle="A visual record of Ayurvedic labs, seminars, clinical visits, and campus life" breadcrumbs={[{ label: "Gallery" }, { label: "Photos" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <p className="reveal leading-relaxed max-w-4xl mx-auto text-center mb-16 text-lg">
            Ishan Ayurvedic Medical College's gallery is a visual record — Ayurvedic laboratories, hospital outreach, medical camps, cultural activities, sports meets, and vibrant campus life.
          </p>

          <div className="reveal flex flex-wrap gap-2 mb-10 justify-center">
            {displayCategories.map((c: any) => (
              <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors active:scale-[0.97] ${filter === c ? "bg-navy text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{c}</button>
            ))}
          </div>
          
          {showPlaceholder ? (
            <div className="reveal py-20 text-center bg-muted/30 rounded-3xl border border-dashed">
              <p className="text-muted-foreground">No photos found in the "{filter}" category yet.</p>
              {filter !== "All" && <button onClick={() => setFilter("All")} className="mt-4 text-navy font-bold hover:text-gold transition-colors underline">View all photos</button>}
              <p className="text-center text-sm text-muted-foreground mt-4">Upload photos via the CMS gallery manager to populate this section.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((photo: any, i: number) => (
                <div key={photo._id || i} className={`reveal delay-${Math.min(i % 4, 3)}00 aspect-[4/3] rounded-xl bg-muted border overflow-hidden group cursor-pointer relative`}>
                  {photo.image ? (
                    <img src={photo.image} alt={photo.title || "Gallery image"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-muted/50 gap-2">
                      <span className="text-muted-foreground/20 text-3xl font-bold">📷</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-medium truncate text-sm">{photo.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
