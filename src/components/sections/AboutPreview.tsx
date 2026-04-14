import { Link } from "react-router-dom";
import { Heart, Users, Target, ArrowRight } from "lucide-react";

const values = [
  { icon: Heart, title: "Service", desc: "Dedicated to serving our community with passion and purpose." },
  { icon: Users, title: "Leadership", desc: "Developing the next generation of compassionate, capable leaders." },
  { icon: Target, title: "Impact", desc: "Creating meaningful, lasting change in the lives we touch." },
];

export default function AboutPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Who We Are</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Building Tomorrow's <span className="text-gradient-gold">Leaders</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Leo Club of Lalbagh Delights is part of Lions Clubs International —
            the world's largest service organization, empowering youth since its founding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="mb-5 inline-flex items-center justify-center h-14 w-14 rounded-xl gradient-gold shadow-md group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            Learn more about us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
