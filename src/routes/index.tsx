import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/sections/HeroSection";
import AboutPreview from "@/components/sections/AboutPreview";
import EventsPreview from "@/components/sections/EventsPreview";
import LeadershipSection from "@/components/sections/LeadershipSection";
import CTASection from "@/components/sections/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leo Club of Lalbagh Delights — Leadership, Experience, Opportunity" },
      { name: "description", content: "Official portal of Leo Club of Lalbagh Delights. Empowering young leaders through service, community, and leadership." },
      { property: "og:title", content: "Leo Club of Lalbagh Delights" },
      { property: "og:description", content: "Empowering young leaders through service, community, and leadership." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <EventsPreview />
      <LeadershipSection />
      <CTASection />
    </>
  );
}
