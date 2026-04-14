import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/members", label: "Members" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.jpeg"
              alt="Leo Club of Lalbagh Delights"
              className="h-14 w-14 rounded-full object-cover shadow-md transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <p className="font-heading text-lg font-bold text-foreground leading-tight">
                Leo Club
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                Lalbagh Delights
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-primary font-semibold" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:text-primary hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="ml-4 px-5 py-2.5 text-sm font-semibold rounded-lg gradient-gold text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-5 py-2.5 text-sm font-semibold rounded-lg gradient-gold text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                Member Login
              </Link>
            )}
            <button
              onClick={() => setDark(!dark)}
              className="ml-2 p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </nav>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setDark(!dark)}
              className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-lg border-t border-border animate-fade-in-up">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-primary bg-accent" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="block px-4 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="block mt-3 px-4 py-3 text-sm font-semibold text-center rounded-lg gradient-gold text-primary-foreground shadow-md"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="block mt-3 px-4 py-3 text-sm font-semibold text-center rounded-lg gradient-gold text-primary-foreground shadow-md"
              >
                Member Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
