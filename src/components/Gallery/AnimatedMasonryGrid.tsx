import { motion, AnimatePresence } from "framer-motion";
import type { GalleryItem } from "./galleryData";

type Props = {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
};

export default function AnimatedMasonryGrid({ items, onSelect }: Props) {
  return (
    <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.button
            layout
            key={item.id}
            type="button"
            onClick={() => onSelect(item)}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            className="group relative mb-6 block w-full overflow-hidden rounded-3xl bg-card shadow-md hover:shadow-2xl transition-shadow border border-border"
          >
            <img
              src={item.image}
              alt={item.title}
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                index % 3 === 0 ? "h-80" : index % 3 === 1 ? "h-64" : "h-96"
              }`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent opacity-90" />

            <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
              <span className="inline-flex rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-foreground mb-2">
                {item.category}
              </span>
              <h3 className="font-heading text-xl font-bold text-secondary-foreground">
                {item.title}
              </h3>
            </div>
          </motion.button>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}