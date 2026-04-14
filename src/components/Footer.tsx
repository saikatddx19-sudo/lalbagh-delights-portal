import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo.jpeg" alt="Leo Club" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <h3 className="font-heading text-lg font-bold">Leo Club</h3>
                <p className="text-sm opacity-80">Lalbagh Delights</p>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Leadership, Experience, Opportunity. Empowering young leaders to make a lasting impact in our community.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/about", label: "About Us" },
                { to: "/events", label: "Events" },
                { to: "/gallery", label: "Gallery" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-primary">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm opacity-70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>Lalbagh, Bangalore, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm opacity-70">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>info@lclalbagh.org</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm opacity-70">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-primary">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-50">© {new Date().getFullYear()} Leo Club of Lalbagh Delights. All rights reserved.</p>
          <p className="text-xs opacity-50">Leadership · Experience · Opportunity</p>
        </div>
      </div>
    </footer>
  );
}
