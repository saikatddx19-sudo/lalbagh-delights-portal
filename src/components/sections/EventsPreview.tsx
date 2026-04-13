import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const events = [
  {
    title: "Community Clean-Up Drive",
    date: "May 15, 2026",
    location: "Lalbagh Botanical Garden",
    category: "Community Service",
  },
  {
    title: "Leadership Workshop 2026",
    date: "June 2, 2026",
    location: "LC Conference Hall",
    category: "Development",
  },
  {
    title: "Annual Charity Gala",
    date: "July 20, 2026",
    location: "Grand Ballroom, Bangalore",
    category: "Fundraiser",
  },
];

export default function EventsPreview() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            What's Happening
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Upcoming <span className="text-gradient-gold">Events</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.title}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="h-2 gradient-gold" />
              <div className="p-7">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">
                  {event.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl gradient-gold text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            View All Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
