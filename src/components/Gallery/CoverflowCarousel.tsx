import type { GalleryItem } from "./galleryData";

type Props = {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
};

export default function CoverflowCarousel({ items, onSelect }: Props) {
  const safeItems = items.slice(0, 8);

  if (safeItems.length === 0) return null;

  const angleStep = 360 / safeItems.length;
  const radius = 300;

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
          Featured Moments
        </p>

        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-12">
          Rotating <span className="text-gradient-gold">Gallery</span>
        </h2>

        <div
          className="relative mx-auto h-105 w-full max-w-4xl flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative h-37.5 w-37.5 flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              animation: "galleryOrbit 12s linear infinite",
            }}
          >
            {safeItems.map((item, index) => {
              const angle = index * angleStep;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="absolute left-1/2 top-1/2 h-52.5 w-45 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}