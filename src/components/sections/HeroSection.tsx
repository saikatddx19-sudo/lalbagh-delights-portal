import { Link } from "@tanstack/react-router";
import { ArrowRight, Users, Calendar, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Logo */}
        <div className="mb-8 animate-fade-in-up">
          <img
            src="/images/logo.jpeg"
            alt="Leo Club of Lalbagh Delights"
            className="mx-auto h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover shadow-2xl ring-4 ring-primary/30 animate-float"
          />
        </div>

        {/* Title */}
        <div className="animate-fade-in-up delay-100" style={{ opacity: 0 }}>
          <p className="text-primary font-medium text-sm sm:text-base tracking-widest uppercase mb-4">
            Welcome to
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-secondary-foreground mb-4 leading-tight">
            Leo Club of
            <br />
            <span className="text-gradient-gold">Lalbagh Delights</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-secondary-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Empowering young leaders to serve with compassion, lead with vision,
            and build a better tomorrow for our community.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200" style={{ opacity: 0 }}>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl gradient-gold text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Discover Our Story
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border-2 border-primary/40 text-secondary-foreground hover:bg-primary/10 transition-all"
          >
            Upcoming Events
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up delay-300" style={{ opacity: 0 }}>
          {[
            { icon: Users, value: "50+", label: "Active Members" },
            { icon: Calendar, value: "30+", label: "Events" },
            { icon: Award, value: "5+", label: "Awards" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl sm:text-3xl font-bold text-secondary-foreground">{value}</p>
              <p className="text-xs sm:text-sm text-secondary-foreground/60">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
            fill="var(--color-background)"
          />
        </svg>
      </div>
    </section>
  );
}
