import type { GalleryItem } from "./galleryData";

type AnimatedMasonryGridProps = {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
};

export default function AnimatedMasonryGrid({
  items,
  onSelect,
}: AnimatedMasonryGridProps) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item)}
          className="group relative mb-6 block w-full overflow-hidden rounded-3xl bg-card shadow-md hover:shadow-2xl border border-border transition-all duration-300"
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              index % 3 === 0 ? "h-72" : index % 3 === 1 ? "h-64" : "h-80"
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
            <span className="inline-flex rounded-full gradient-gold px-3 py-1 text-xs font-semibold text-primary-foreground mb-2">
              {item.category}
            </span>

            <h3 className="font-heading text-xl font-bold text-secondary-foreground">
              {item.title}
            </h3>
          </div>
        </button>
      ))}
    </div>
  );
}