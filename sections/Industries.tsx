"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import IndustryCard from "@/components/IndustryCard";
import { industries } from "@/lib/industries";

// Matches the standard section gutter (mx-auto max-w-7xl px-6) so the
// scroll rail's first/last card lines up with the heading above it.
// Computed as an inline style rather than a Tailwind arbitrary value so
// the browser's native calc()/max() handles the nesting.
const railGutter = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

export default function Industries() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const rail = railRef.current;
    if (!rail) return;
    setCanScrollLeft(rail.scrollLeft > 8);
    setCanScrollRight(
      rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 8,
    );
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const distance = (card?.offsetWidth ?? 320) + 24;
    rail.scrollBy({ left: distance * direction, behavior: "smooth" });
  };

  return (
    <section
      id="industries"
      className="scroll-mt-header relative overflow-hidden bg-navy-deep py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dot-grid opacity-[0.15] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_bottom_right,black,transparent_65%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <span className="eyebrow text-teal">Where We Work</span>
          <h2 className="mt-3 font-display text-display-md font-semibold tracking-tight text-white">
            Industries We Serve
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/65">
            Every industry sells differently. Our systems are built around
            how yours actually works.
          </p>
        </div>

        <div className="hidden flex-none gap-3 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll industries left"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-teal hover:text-teal disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label="Scroll industries right"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-teal hover:text-teal disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </motion.div>

      <div className="relative mt-12">
        <div
          ref={railRef}
          onScroll={updateScrollState}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{ paddingLeft: railGutter, paddingRight: railGutter }}
        >
          {industries.map((industry, index) => (
            <div
              key={industry.slug}
              data-card
              className="w-[280px] flex-none snap-start sm:w-[320px]"
            >
              <IndustryCard index={index} {...industry} />
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-navy-deep to-transparent transition-opacity duration-300 sm:w-24 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-navy-deep to-transparent transition-opacity duration-300 sm:w-24 ${canScrollRight ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </section>
  );
}
