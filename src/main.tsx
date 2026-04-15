import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import "../index.css";

// Smooth scroll (Lenis)
import Lenis from "lenis";

const lenis = new Lenis({
  duration: 0.7,
  smoothWheel: true,
   smoothTouch: false,
  wheelMultiplier: 1.2
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
