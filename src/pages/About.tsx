import { Heart, Users, Target, Globe, BookOpen, Award } from "lucide-react";

const pillars = [
  { icon: Heart, title: "Service", desc: "We believe in selfless service to our community, creating programs that uplift and support those in need." },
  { icon: Users, title: "Leadership", desc: "We foster leadership skills through hands-on experiences, mentorship, and real-world project management." },
  { icon: Target, title: "Experience", desc: "Every member gains invaluable experience through organizing events, managing teams, and public speaking." },
  { icon: Globe, title: "Global Network", desc: "Part of Lions Clubs International, connecting with over 200,000 Leo members worldwide." },
  { icon: BookOpen, title: "Education", desc: "We promote education and lifelong learning through workshops, seminars, and scholarship programs." },
  { icon: Award, title: "Recognition", desc: "Outstanding contributions are recognized through awards, certificates, and leadership opportunities." },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">About Us</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
            Our <span className="text-gradient-gold">Story</span>
          </h1>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Leo Club of Lalbagh Delights is a youth-driven service organization affiliated
            with Lions Clubs International, committed to developing young leaders who create
            lasting positive change.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-10 rounded-2xl bg-card border border-border">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                Our <span className="text-gradient-gold">Mission</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To empower young individuals with the skills, experience, and opportunities
                to become compassionate leaders who serve their communities and inspire positive
                change throughout the world.
              </p>
            </div>
            <div className="p-10 rounded-2xl bg-card border border-border">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                Our <span className="text-gradient-gold">Vision</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A world where every young person has the opportunity to lead, serve, and grow
                — building bridges across communities and cultures to create a more just and
                compassionate society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">What Drives Us</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Our <span className="text-gradient-gold">Pillars</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                <div className="mb-5 inline-flex items-center justify-center h-14 w-14 rounded-xl gradient-gold shadow-md group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
