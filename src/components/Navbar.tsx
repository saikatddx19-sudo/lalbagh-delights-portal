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
            <span
  className={`font-semibold text-sm tracking-wide transition-colors duration-300
  dark:text-white text-black`}
>
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
                    : "text-yellow-400 dark:text-yellow-300 font-semibold hover:text-primary dark:hover:text-primary"
                }`}
              >
                {link.label}

                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-yellow-400 dark:bg-yellow-300 transition-all duration-300 ${
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
              className="md:hidden text-neutral-800 dark:text-black z-50"
            >
              {isOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
<div
  className={`md:hidden fixed top-16 left-0 right-0 z-40 
  bg-white dark:bg-neutral-900 
  border-t border-neutral-200 dark:border-neutral-800
  transition-all duration-300 ease-in-out
  ${
    isOpen
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-3 pointer-events-none"
  }`}
>
  <div className="px-6 py-6 space-y-5">

    {navLinks.map((link) => (
      <Link
        key={link.to}
        to={link.to}
        onClick={() => setIsOpen(false)}
        className={`block text-base font-medium transition
        ${
          isActive(link.to)
            ? "text-yellow-500"
            : "text-neutral-800 dark:text-neutral-300 hover:text-yellow-500"
        }`}
      >
        {link.label}
      </Link>
    ))}

    {/* CTA */}
    <Link
      to="/login"
      className="block text-center py-2 rounded-full 
      bg-yellow-500 text-black font-semibold 
      hover:bg-yellow-400 transition"
    >
      Login
    </Link>

  </div>
</div>
    </>
  );
}