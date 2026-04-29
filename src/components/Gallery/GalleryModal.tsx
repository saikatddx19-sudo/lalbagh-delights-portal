import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryItem } from "./galleryData";

type Props = {
  item: GalleryItem | null;
  onClose: () => void;
};

export default function GalleryModal({ item, onClose }: Props) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-[70vh] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-flex rounded-full gradient-gold px-3 py-1 text-xs font-semibold text-primary-foreground mb-3">
                {item.category}
              </span>
              <h3 className="font-heading text-3xl font-bold text-secondary-foreground">
                {item.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors inline-flex items-center justify-center"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}