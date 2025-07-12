// components/ParallaxHero.jsx

import { useEffect, useRef } from "react";

import Button from "../ui/Button";

const ParallaxHero = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    const handleScroll = () => {
      const offset = window.scrollY * 0.15;
      el.style.transform = `translateY(${offset}px)`;
    };

    // Respect prefers‑reduced‑motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative lg:h-[70vh] flex items-center justify-center text-white overflow-hidden">
      {/* ⭐ parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('/imgs/stars.jpg')] bg-cover bg-center will-change-transform"
      />

      {/* overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />

      {/* foreground content */}
      <div className="relative z-10 text-center space-y-6 px-4">
        <h1 className="lg:text-4xl text-2xl md:text-6xl font-extrabold">
          Nova&nbsp;Dashboard
        </h1>
        <p className="max-w-xl mx-auto text-lg opacity-90">
          The modular, extensible admin suite for modern SaaS.
        </p>
        <Button variant="primary" className="btn-lg">
          Try&nbsp;Live&nbsp;Demo
        </Button>
      </div>
    </section>
  );
};
export default ParallaxHero;
