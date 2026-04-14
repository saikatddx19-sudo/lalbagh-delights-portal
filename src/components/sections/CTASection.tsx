import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-primary blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6">
          Ready to Make a <span className="text-gradient-gold">Difference</span>?
        </h2>
        <p className="text-lg text-secondary-foreground/70 mb-10 leading-relaxed">
          Join Leo Club of Lalbagh Delights and become part of a global movement
          of young leaders dedicated to service and community impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl gradient-gold text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105">
            Join Now <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border-2 border-primary/40 text-secondary-foreground hover:bg-primary/10 transition-all">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
