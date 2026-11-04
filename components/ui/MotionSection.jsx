"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

/**
 * Robust scroll-triggered fade+slide-up animation.
 * Optimized for mobile touchscreens, tablet, and desktop viewports.
 *
 * Props:
 *  - delay      (number)  – stagger delay in seconds (default 0)
 *  - duration   (number)  – animation duration in seconds (default 0.55)
 *  - distance   (number)  – how many px the element travels upward (default 24)
 *  - once       (boolean) – only animate once (default true)
 *  - className  (string)  – forwarded to the wrapping div
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.55,
  distance = 24,
  once = true,
  className = "",
}) {
  const ref = useRef(null);
  // amount: 0.05 triggers as soon as 5% of the element enters view
  // margin: "0px 0px -15px 0px" gives smooth bottom trigger without clipping top on mobile
  const inView = useInView(ref, { once, amount: 0.05, margin: "0px 0px -15px 0px" });
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (inView) {
      setHasAppeared(true);
      return;
    }
    // Safety check on mount: If element is already in or above viewport, show immediately
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < (window.innerHeight || 800)) {
        setHasAppeared(true);
        return;
      }
    }
    // Mobile resilience timeout: never leave content invisible if observer is delayed or skipped
    const timer = setTimeout(() => {
      setHasAppeared(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [inView]);

  const active = inView || hasAppeared;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container – wraps a list and animates each direct child
 * with an incremental delay. Mobile-safe and performant.
 */
export function StaggerList({
  children,
  stagger = 0.08,
  baseDelay = 0,
  distance = 20,
  once = true,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.05, margin: "0px 0px -15px 0px" });
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (inView) {
      setHasAppeared(true);
      return;
    }
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < (window.innerHeight || 800)) {
        setHasAppeared(true);
        return;
      }
    }
    const timer = setTimeout(() => {
      setHasAppeared(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [inView]);

  const active = inView || hasAppeared;

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: baseDelay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={active ? "show" : "hidden"}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>}
    </motion.div>
  );
}

/**
 * Simple fade-in (no Y translation) – useful for overlays, images, dividers.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.05, margin: "0px 0px -15px 0px" });
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (inView) {
      setHasAppeared(true);
      return;
    }
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < (window.innerHeight || 800)) {
        setHasAppeared(true);
        return;
      }
    }
    const timer = setTimeout(() => {
      setHasAppeared(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [inView]);

  const active = inView || hasAppeared;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
