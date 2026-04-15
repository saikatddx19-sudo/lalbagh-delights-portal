import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/members", label: "Members" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className={`pointer-events-auto transition-all duration-500 ${
          scrolled
            ? "scale-95 backdrop-blur-xl bg-background/70 shadow-xl"
            : "backdrop-blur-lg bg-background/50"
        } border border-white/10 rounded-full px-6 py-3 flex items-center justify-between w-[95%] max-w-6xl`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/images/logo.jpeg"
            className="h-10 w-10 rounded-full transition-transform group-hover:scale-110"
          />
          <span className="font-semibold text-sm">Lalbagh Delights</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-sm font-medium transition-all duration-300 ${
                isActive(link.to)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}

              {/* underline animation */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300 ${
                  isActive(link.to)
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="relative px-5 py-2 rounded-full bg-primary text-white text-sm overflow-hidden group"
          >
            <span className="relative z-10">Login</span>

            {/* glow effect */}
            <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-30 blur-xl transition" />
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 w-[90%] bg-background/90 backdrop-blur-xl border rounded-2xl p-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block text-sm text-muted-foreground hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/login"
            className="block text-center mt-4 px-4 py-2 bg-primary text-white rounded-full"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
