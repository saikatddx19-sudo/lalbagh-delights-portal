import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Leo Club of Lalbagh Delights" },
      { name: "description", content: "Discover upcoming and past events organized by Leo Club of Lalbagh Delights." },
      { property: "og:title", content: "Events — Leo Club of Lalbagh Delights" },
      { property: "og:description", content: "Discover upcoming events and activities." },
    ],
  }),
  component: EventsPage,
});

const upcomingEvents = [
  { title: "Community Clean-Up Drive", date: "May 15, 2026", time: "8:00 AM", location: "Lalbagh Botanical Garden", category: "Community Service", spots: 30, desc: "Join us for a morning of environmental service at the beautiful Lalbagh Garden." },
  { title: "Leadership Workshop 2026", date: "June 2, 2026", time: "10:00 AM", location: "LC Conference Hall", category: "Development", spots: 50, desc: "An intensive workshop on communication, teamwork, and project management skills." },
  { title: "Annual Charity Gala", date: "July 20, 2026", time: "6:00 PM", location: "Grand Ballroom, Bangalore", category: "Fundraiser", spots: 100, desc: "Our flagship fundraising event featuring dinner, entertainment, and auction." },
  { title: "Blood Donation Camp", date: "August 5, 2026", time: "9:00 AM", location: "City Hospital", category: "Health", spots: 40, desc: "Save lives by participating in our annual blood donation camp." },
];

const pastEvents = [
  { title: "Tree Plantation Drive", date: "March 10, 2026", category: "Environment", attendees: 45 },
  { title: "Youth Debate Championship", date: "February 22, 2026", category: "Education", attendees: 60 },
  { title: "Winter Clothing Drive", date: "January 15, 2026", category: "Charity", attendees: 35 },
];

function EventsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">Get Involved</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
            Our <span className="text-gradient-gold">Events</span>
          </h1>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            From community service to leadership development — there's always something happening.
          </p>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-12">
            Upcoming <span className="text-gradient-gold">Events</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="h-2 gradient-gold" />
                <div className="p-8">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">
                    {event.category}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{event.desc}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{event.spots} spots</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full py-3 text-sm font-semibold rounded-xl gradient-gold text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-12">
            Past <span className="text-gradient-gold">Events</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div key={event.title} className="p-6 rounded-2xl bg-card border border-border">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-3">
                  {event.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{event.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{event.date}</span>
                  <span>{event.attendees} attended</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
