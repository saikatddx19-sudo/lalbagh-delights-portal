export type GalleryCategory = "Events" | "Community" | "Leadership" | "Social";

export type GalleryItem = {
  id: number;
  title: string;
  category: GalleryCategory;
  image: string;
};

export const categories = ["All", "Events", "Community", "Leadership", "Social"] as const;

export const galleryItems: GalleryItem[] = [
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
  {
    id: 7,
    title: "Youth Leadership Workshop",
    category: "Leadership",
    image: "https://placehold.co/900x700/5a1f1f/f5d06f?text=Youth+Leadership",
  },
  {
    id: 8,
    title: "Environmental Awareness Campaign",
    category: "Events",
    image: "https://placehold.co/900x650/7a2e2e/f5d06f?text=Environmental+Awareness",
  },
  {
    id: 9,
    title: "Volunteer Appreciation Event",
    category: "Community",
    image: "https://placehold.co/900x700/8a6b1f/ffffff?text=Volunteer+Appreciation",
  },
  {
    id: 10,
    title: "Annual Fundraising Gala",
    category: "Social",
    image: "https://placehold.co/900x600/7a2e2e/ffffff?text=Annual+Fundraising",
  },
  {
  id: 11,
  title: "Youth Volunteer Fair",
  category: "Events",
  image: "https://placehold.co/900x720/7a2e2e/f5d06f?text=Youth+Volunteer+Fair",
},
{
  id: 12,
  title: "Neighborhood Block Party",
  category: "Community",
  image: "https://placehold.co/900x760/8a6b1f/ffffff?text=Block+Party",
},
{
  id: 13,
  title: "Public Speaking Workshop",
  category: "Leadership",
  image: "https://placehold.co/900x680/5a1f1f/f5d06f?text=Public+Speaking",
},
{
  id: 14,
  title: "Members Gathering",
  category: "Social",
  image: "https://placehold.co/900x700/7a2e2e/ffffff?text=Members+Gathering",
},
{
  id: 15,
  title: "Youth Volunteer Fair",
  category: "Events",
  image: "https://placehold.co/900x720/7a2e2e/f5d06f?text=Youth+Volunteer+Fair",
},
{
  id: 16,
  title: "Neighborhood Block Party",
  category: "Community",
  image: "https://placehold.co/900x760/8a6b1f/ffffff?text=Block+Party",
},
{
  id: 17,
  title: "Public Speaking Workshop",
  category: "Leadership",
  image: "https://placehold.co/900x680/5a1f1f/f5d06f?text=Public+Speaking",
},
{
  id: 18,
  title: "Members Gathering",
  category: "Social",
  image: "https://placehold.co/900x700/7a2e2e/ffffff?text=Members+Gathering",
},
{
  id: 19,
  title: "Youth Volunteer Fair",
  category: "Events",
  image: "https://placehold.co/900x720/7a2e2e/f5d06f?text=Youth+Volunteer+Fair",
},
{
  id: 20,
  title: "Neighborhood Block Party",
  category: "Community",
  image: "https://placehold.co/900x760/8a6b1f/ffffff?text=Block+Party",
},
{
  id: 21,
  title: "Public Speaking Workshop",
  category: "Leadership",
  image: "https://placehold.co/900x680/5a1f1f/f5d06f?text=Public+Speaking",
},
{
  id: 22,
  title: "Members Gathering",
  category: "Social",
  image: "https://placehold.co/900x700/7a2e2e/ffffff?text=Members+Gathering",
},
{
  id: 23,
  title: "Youth Volunteer Fair",
  category: "Events",
  image: "https://placehold.co/900x720/7a2e2e/f5d06f?text=Youth+Volunteer+Fair",
},
{
  id: 24,
  title: "Neighborhood Block Party",
  category: "Community",
  image: "https://placehold.co/900x760/8a6b1f/ffffff?text=Block+Party",
},
{
  id: 25,
  title: "Public Speaking Workshop",
  category: "Leadership",
  image: "https://placehold.co/900x680/5a1f1f/f5d06f?text=Public+Speaking",
},
{
  id: 26,
  title: "Members Gathering",
  category: "Social",
  image: "https://placehold.co/900x700/7a2e2e/ffffff?text=Members+Gathering",
},
{
  id: 27,
  title: "Youth Volunteer Fair",
  category: "Events",
  image: "https://placehold.co/900x720/7a2e2e/f5d06f?text=Youth+Volunteer+Fair",
},
{
  id: 28,
  title: "Neighborhood Block Party",
  category: "Community",
  image: "https://placehold.co/900x760/8a6b1f/ffffff?text=Block+Party",
},
{
  id: 29,
  title: "Public Speaking Workshop",
  category: "Leadership",
  image: "https://placehold.co/900x680/5a1f1f/f5d06f?text=Public+Speaking",
},
{
  id: 30,
  title: "Members Gathering",
  category: "Social",
  image: "https://placehold.co/900x700/7a2e2e/ffffff?text=Members+Gathering",
},
];