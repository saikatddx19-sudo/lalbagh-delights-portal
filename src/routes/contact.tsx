import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Leo Club of Lalbagh Delights" },
      { name: "description", content: "Get in touch with Leo Club of Lalbagh Delights. We'd love to hear from you." },
      { property: "og:title", content: "Contact — Leo Club of Lalbagh Delights" },
      { property: "og:description", content: "Get in touch with us." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">Reach Out</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
            Contact <span className="text-gradient-gold">Us</span>
          </h1>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            Have questions or want to get involved? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Get in <span className="text-gradient-gold">Touch</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you want to join, partner, or simply learn more about our work,
                  don't hesitate to reach out.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: "Lalbagh, Bangalore, Karnataka, India" },
                  { icon: Mail, label: "Email", value: "info@lclalbagh.org" },
                  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg gradient-gold shrink-0">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-sm text-muted-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-12 rounded-2xl bg-card border border-border">
                  <CheckCircle className="h-16 w-16 text-primary mb-6" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                    className="px-6 py-2.5 text-sm font-semibold rounded-lg gradient-gold text-primary-foreground shadow-md hover:shadow-lg transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl bg-card border border-border space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-sm font-semibold rounded-xl gradient-gold text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
