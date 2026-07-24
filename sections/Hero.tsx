"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroFallback from "@/components/HeroFallback";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const useStaticBackground = prefersReducedMotion || isMobile;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        className="scroll-mt-header relative flex min-h-screen items-center overflow-hidden bg-white pt-20"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-8">
          <motion.div
            className="relative z-10 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.span
              variants={itemVariants}
              className="eyebrow justify-center text-teal lg:justify-start"
            >
              Technology &amp; Growth Partner
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="mt-5 font-display text-display-hero font-semibold text-navy"
            >
              Where Technology
              <br />
              Meets Growth<span className="text-teal">.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-2xl text-lg text-navy/70 sm:text-xl lg:mx-0"
            >
              Briza Solutions is a full-spectrum technology and growth
              partner — building the web, mobile, AI, and cloud systems that
              turn ambitious businesses into market leaders.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <a
                href="#get-started"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-teal px-8 py-4 text-center font-semibold text-white shadow-card transition-transform hover:scale-[1.03] hover:bg-teal/90 sm:w-auto"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#book-a-call"
                className="w-full rounded-2xl border-2 border-navy px-8 py-4 text-center font-semibold text-navy transition-colors hover:bg-navy hover:text-white sm:w-auto"
              >
                Book a Consultation
              </a>
            </motion.div>
          </motion.div>

          <div className="relative h-72 w-full sm:h-96 lg:h-[32rem]">
            {useStaticBackground ? <HeroFallback /> : <HeroScene />}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
