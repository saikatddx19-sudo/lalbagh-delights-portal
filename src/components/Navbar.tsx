import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";

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
  const [atTop, setAtTop] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      setAtTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // theme load
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  // toggle theme
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");

    const isDark = root.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDarkMode(isDark);
  };

  const isActive = (path: string) => location.pathname === path;

  // magnetic button
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const reset = () => (el.style.transform = "translate(0,0)");

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <div
          className={`transition-all duration-500 flex items-center justify-between 
          w-[92%] max-w-6xl px-6 py-3 rounded-full border

          ${scrolled ? "scale-95 shadow-lg" : ""}

          ${
            atTop
              ? "bg-transparent border-transparent"
              : "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-neutral-200 dark:border-neutral-800"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.jpeg" className="h-9 w-9 rounded-full" />
            <span className="font-semibold text-sm text-neutral-800 dark:text-white">
              Lalbagh Delights
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium transition group ${
                  isActive(link.to)
                    ? "text-primary"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-primary"
                }`}
              >
                {link.label}

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

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-14 h-7 flex items-center rounded-full p-1 bg-neutral-200 dark:bg-neutral-700 transition"
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center 
                bg-white dark:bg-black shadow-md transition-all duration-300
                ${darkMode ? "translate-x-7" : ""}`}
              >
                {darkMode ? (
                  <Moon size={12} className="text-blue-400" />
                ) : (
                  <Sun size={12} className="text-yellow-500" />
                )}
              </span>
            </button>

            {/* CTA */}
<Link
  ref={ctaRef}
  to="/login"
  className="hidden md:block relative px-6 py-2.5 rounded-full text-sm font-semibold text-white dark:text-white
  bg-gradient-to-br from-red-800 to-red-600
  shadow-[0_8px_20px_rgba(0,0,0,0.25)] 
  transition-all duration-300 
  hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)] 
  hover:-translate-y-1 
  active:translate-y-[1px] 
  overflow-hidden group"
>
  {/* shine effect */}
  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 
  bg-gradient-to-r from-transparent via-white/30 to-transparent 
  translate-x-[-100%] group-hover:translate-x-[100%]" />

  {/* text */}
  <span className="relative z-10">Login</span>
</Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-neutral-800 dark:text-white"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed top-20 left-1/2 -translate-x-1/2 w-[90%] 
        bg-white dark:bg-neutral-900 border rounded-2xl p-6 shadow-xl
        transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-neutral-700 dark:text-neutral-300"
          >
            {link.label}
          </Link>
        ))}

        <Link
          to="/login"
          className="block mt-4 text-center py-2 bg-primary text-white rounded-full"
        >
          Login
        </Link>
      </div>
    </>
  );
}