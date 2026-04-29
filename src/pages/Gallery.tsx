import { useState } from "react";
import { categories, galleryItems, type GalleryItem } from "../components/gallery/galleryData";
import CoverflowCarousel from "../components/gallery/CoverflowCarousel";
import AnimatedMasonryGrid from "../components/gallery/AnimatedMasonryGrid";
import GalleryModal from "../components/gallery/GalleryModal";

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filtered =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <div className="pt-20">
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 left-20 w-72 h-72 rounded-full bg-primary blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            Our Memories
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
            Photo <span className="text-gradient-gold">Gallery</span>
          </h1>

          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            A glimpse into the moments that define us — service, leadership, and celebration.
          </p>
        </div>
      </section>

      <CoverflowCarousel items={galleryItems.slice(0, 7)} onSelect={setSelectedItem} />

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                  filter === cat
                    ? "gradient-gold text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatedMasonryGrid items={filtered} onSelect={setSelectedItem} />
        </div>
      </section>

      <GalleryModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}