import { useState } from "react";
import { X } from "lucide-react";

type GalleryItem = {
  id: number;
  title: string;
  category: "Events" | "Community" | "Leadership" | "Social";
  image: string;
};

const categories = ["All", "Events", "Community", "Leadership", "Social"];

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Community Clean-Up 2025",
    category: "Events",
    image: "https://placehold.co/900x650/7a2e2e/f5d06f?text=Community+Clean-Up",
  },
  {
    id: 2,
    title: "Leadership Summit",
    category: "Leadership",
    image: "https://placehold.co/900x700/5a1f1f/f5d06f?text=Leadership+Summit",
  },
  {
    id: 3,
    title: "Tree Plantation Drive",
    category: "Community",
    image: "https://placehold.co/900x800/8a6b1f/ffffff?text=Tree+Plantation",
  },
  {
    id: 4,
    title: "Annual Gala Night",
    category: "Social",
    image: "https://placehold.co/900x600/7a2e2e/ffffff?text=Annual+Gala",
  },
  {
    id: 5,
    title: "Blood Donation Camp",
    category: "Events",
    image: "https://placehold.co/900x750/5a1f1f/f5d06f?text=Blood+Donation",
  },
  {
    id: 6,
    title: "Food Distribution",
    category: "Community",
    image: "https://placehold.co/900x680/8a6b1f/ffffff?text=Food+Distribution",
  },
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
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

      <section className="py-20 bg-background">
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

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
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
        </div>
      </section>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="h-[70vh] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-flex rounded-full gradient-gold px-3 py-1 text-xs font-semibold text-primary-foreground mb-3">
                {selectedItem.category}
              </span>

              <h3 className="font-heading text-3xl font-bold text-secondary-foreground">
                {selectedItem.title}
              </h3>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 text-foreground hover:bg-background inline-flex items-center justify-center"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}