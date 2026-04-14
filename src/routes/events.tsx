import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Users, Loader2, CheckCircle, AlertCircle, IndianRupee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import type { Tables } from "@/integrations/supabase/types";

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

type Event = Tables<"events">;

function EventsPage() {
  const { user, isAuthenticated } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [registeredEventIds, setRegisteredEventIds] = useState<Set<string>>(new Set());
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [registrationCounts, setRegistrationCounts] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (data) setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  // Fetch user's registrations
  useEffect(() => {
    if (!user) return;
    supabase
      .from("event_registrations")
      .select("event_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (data) {
          setRegisteredEventIds(new Set(data.map((r) => r.event_id)));
        }
      });
  }, [user]);

  // Fetch registration counts for all events
  useEffect(() => {
    if (events.length === 0) return;
    const fetchCounts = async () => {
      const counts: Record<string, number> = {};
      for (const event of events) {
        const { count } = await supabase
          .from("event_registrations")
          .select("*", { count: "exact", head: true })
          .eq("event_id", event.id);
        counts[event.id] = count || 0;
      }
      setRegistrationCounts(counts);
    };
    fetchCounts();
  }, [events]);

  const handleRegister = async (eventId: string) => {
    if (!user) return;
    setRegisteringId(eventId);
    setToast(null);

    const { error } = await supabase.from("event_registrations").insert({
      event_id: eventId,
      user_id: user.id,
    });

    if (error) {
      setToast({ type: "error", message: error.message.includes("duplicate") ? "You are already registered for this event." : error.message });
    } else {
      setRegisteredEventIds((prev) => new Set([...prev, eventId]));
      setRegistrationCounts((prev) => ({ ...prev, [eventId]: (prev[eventId] || 0) + 1 }));
      setToast({ type: "success", message: "Successfully registered for the event!" });
    }
    setRegisteringId(null);
    setTimeout(() => setToast(null), 4000);
  };

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.event_date) >= now && e.status !== "cancelled" && e.status !== "completed");
  const past = events.filter((e) => new Date(e.event_date) < now || e.status === "completed");

  return (
    <div className="pt-20">
      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-4 z-50 animate-fade-in-up">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border text-sm font-medium ${
            toast.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400"
              : "bg-destructive/10 border-destructive/20 text-destructive"
          }`}>
            {toast.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {toast.message}
          </div>
        </div>
      )}

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

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcoming.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isRegistered={registeredEventIds.has(event.id)}
                  isRegistering={registeringId === event.id}
                  registrationCount={registrationCounts[event.id] || 0}
                  isAuthenticated={isAuthenticated}
                  onRegister={() => handleRegister(event.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">No upcoming events</h3>
              <p className="text-sm text-muted-foreground">Check back soon for new events!</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {past.length > 0 && (
        <section className="py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-12">
              Past <span className="text-gradient-gold">Events</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {past.map((event) => (
                <div key={event.id} className="p-6 rounded-2xl bg-card border border-border">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-3">
                    {event.status === "completed" ? "Completed" : "Past"}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{event.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{new Date(event.event_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function EventCard({
  event,
  isRegistered,
  isRegistering,
  registrationCount,
  isAuthenticated,
  onRegister,
}: {
  event: Event;
  isRegistered: boolean;
  isRegistering: boolean;
  registrationCount: number;
  isAuthenticated: boolean;
  onRegister: () => void;
}) {
  const spotsLeft = event.max_participants ? event.max_participants - registrationCount : null;
  const isFull = spotsLeft !== null && spotsLeft <= 0;

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
      <div className="h-2 gradient-gold" />
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-8">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">
          {event.status === "ongoing" ? "Happening Now" : "Upcoming"}
        </span>
        <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        {event.description && (
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">{event.description}</p>
        )}
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{new Date(event.event_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{new Date(event.event_date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{spotsLeft !== null ? `${spotsLeft} spots left` : `${registrationCount} registered`}</span>
          </div>
        </div>

        {/* Fee */}
        {event.registration_fee && Number(event.registration_fee) > 0 && (
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <IndianRupee className="h-4 w-4 text-primary" />
            <span>₹{Number(event.registration_fee).toLocaleString("en-IN")}</span>
          </div>
        )}

        {/* Register Button */}
        <div className="mt-6">
          {isRegistered ? (
            <div className="w-full py-3 text-sm font-semibold rounded-xl text-center bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20 flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Registered
            </div>
          ) : isAuthenticated ? (
            <button
              onClick={onRegister}
              disabled={isRegistering || isFull}
              className="w-full py-3 text-sm font-semibold rounded-xl gradient-gold text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isRegistering ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isFull ? (
                "Event Full"
              ) : (
                "Register Now"
              )}
            </button>
          ) : (
            <Link
              to="/login"
              className="block w-full py-3 text-sm font-semibold rounded-xl text-center border-2 border-primary text-primary hover:bg-primary/10 transition-colors"
            >
              Login to Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
