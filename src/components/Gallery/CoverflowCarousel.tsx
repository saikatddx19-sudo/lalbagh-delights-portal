import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "./galleryData";

type Props = {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
};

export default function CoverflowCarousel({ items, onSelect }: Props) {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % items.length);
  const prev = () => setActive((prev) => (prev - 1 + items.length) % items.length);

  const getOffset = (index: number) => {
    let offset = index - active;
    if (offset > items.length / 2) offset -= items.length;
    if (offset < -items.length / 2) offset += items.length;
    return offset;
  };

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
          Featured Moments
        </p>

        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-12">
          Coverflow <span className="text-gradient-gold">Carousel</span>
        </h2>

        <div className="relative h-[330px] sm:h-[390px] flex items-center justify-center perspective-[1200px]">
          {items.map((item, index) => {
            const offset = getOffset(index);
            const isActive = offset === 0;

            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => (isActive ? onSelect(item) : setActive(index))}
                className="absolute rounded-[2rem] overflow-hidden shadow-2xl bg-card border border-border"
                animate={{
                  x: offset * 145,
                  scale: isActive ? 1 : 0.72,
                  rotateY: offset * -38,
                  opacity: Math.abs(offset) > 3 ? 0 : isActive ? 1 : 0.55,
                  zIndex: 20 - Math.abs(offset),
                }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
                style={{
                  width: isActive ? "min(560px, 82vw)" : "170px",
                  height: isActive ? "310px" : "250px",
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                  <span className="inline-flex rounded-full gradient-gold px-3 py-1 text-xs font-semibold text-primary-foreground mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-secondary-foreground">
                    {item.title}
                  </h3>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="h-11 w-11 rounded-full bg-muted hover:bg-accent text-foreground transition-colors inline-flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={next}
            className="h-11 w-11 rounded-full gradient-gold text-primary-foreground shadow-md transition-transform hover:scale-105 inline-flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}