import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 50);
    });

    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
    });
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "shrink" : ""}`}>
      <div>Leo Club</div>

      <ul>
        <li className="nav-item">Home</li>
        <li className="nav-item">About</li>
        <li className="nav-item">Events</li>
        <li className="nav-item">Members</li>
        <li className="nav-item">Gallery</li>
        <li className="nav-item">Contact</li>
      </ul>

      <button
        className="cta"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translate(0,0)";
        }}
      >
        Dashboard
      </button>
    </nav>
  );
}