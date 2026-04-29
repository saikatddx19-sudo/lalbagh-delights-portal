export type GalleryItem = {
  id: number;
  title: string;
  category: "Events" | "Community" | "Leadership" | "Social";
  image: string;
};

export const categories = ["All", "Events", "Community", "Leadership", "Social"];

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Community Clean-Up 2025",
    category: "Events",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Leadership Summit",
    category: "Leadership",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Tree Plantation Drive",
    category: "Community",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Annual Gala Night",
    category: "Social",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Blood Donation Camp",
    category: "Events",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Food Distribution",
    category: "Community",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Workshop Series",
    category: "Leadership",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Members Gathering",
    category: "Social",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Youth Debate",
    category: "Events",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
  },
];