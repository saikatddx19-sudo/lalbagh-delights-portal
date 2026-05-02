import type { GalleryItem } from "./galleryData";

type Props = {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
};

export default function CoverflowCarousel({ items, onSelect }: Props) {
  const safeItems = items.slice(0, 8);
  const angleStep = 360 / safeItems.length;
  const radius = 230;

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
          className="relative mx-auto h-[420px] w-full max-w-4xl flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative h-[260px] w-[260px]"
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
                  type="button"
                  onClick={() => onSelect(item)}
                  className="absolute left-1/2 top-1/2 h-[210px] w-[180px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <span className="inline-flex rounded-full gradient-gold px-3 py-1 text-xs font-semibold text-primary-foreground mb-2">
                      {item.category}
                    </span>

                    <h3 className="font-heading text-base font-bold text-secondary-foreground">
                      {item.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}