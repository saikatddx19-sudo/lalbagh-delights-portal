import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Leo Club of Lalbagh Delights" },
      { name: "description", content: "Browse photos and memories from Leo Club of Lalbagh Delights events and activities." },
      { property: "og:title", content: "Gallery — Leo Club of Lalbagh Delights" },
      { property: "og:description", content: "Browse photos from our events and activities." },
    ],
  }),
  component: GalleryPage,
});

const categories = ["All", "Events", "Community", "Leadership", "Social"];

const galleryItems = [
  { id: 1, category: "Events", color: "from-gold to-gold-dark", label: "Community Clean-Up 2025" },
  { id: 2, category: "Leadership", color: "from-maroon to-maroon-light", label: "Leadership Summit" },
  { id: 3, category: "Community", color: "from-gold-dark to-maroon", label: "Tree Plantation Drive" },
  { id: 4, category: "Social", color: "from-gold-light to-gold", label: "Annual Gala Night" },
  { id: 5, category: "Events", color: "from-maroon-light to-gold-dark", label: "Blood Donation Camp" },
  { id: 6, category: "Community", color: "from-gold to-maroon-light", label: "Food Distribution" },
  { id: 7, category: "Leadership", color: "from-maroon to-gold", label: "Workshop Series" },
  { id: 8, category: "Social", color: "from-gold-dark to-gold-light", label: "Members Gathering" },
  { id: 9, category: "Events", color: "from-maroon-light to-maroon", label: "Youth Debate" },
];

function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = filter === "All" ? galleryItems : galleryItems.filter((i) => i.category === filter);
  const selectedItem = galleryItems.find((i) => i.id === selected);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 left-20 w-72 h-72 rounded-full bg-primary blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">Our Memories</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
            Photo <span className="text-gradient-gold">Gallery</span>
          </h1>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            A glimpse into the moments that define us — service, leadership, and celebration.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
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

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`group relative aspect-[4/3] rounded-2xl bg-gradient-to-br ${item.color} overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-xl font-bold text-secondary-foreground/80 text-center px-4">
                    {item.label}
                  </span>
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-semibold text-secondary-foreground">{item.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selected !== null && selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className={`relative w-full max-w-3xl aspect-video rounded-2xl bg-gradient-to-br ${selectedItem.color} shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="font-heading text-3xl font-bold text-secondary-foreground">{selectedItem.label}</span>
                <p className="text-sm text-secondary-foreground/70 mt-2">{selectedItem.category}</p>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-foreground/20 text-secondary-foreground hover:bg-foreground/40 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
