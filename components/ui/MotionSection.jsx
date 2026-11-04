"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * Wraps children in a scroll-triggered fade+slide-up animation.
 *
 * Props:
 *  - delay      (number)  – stagger delay in seconds (default 0)
 *  - duration   (number)  – animation duration in seconds (default 0.65)
 *  - distance   (number)  – how many px the element travels upward (default 28)
 *  - once       (boolean) – only animate once (default true)
 *  - className  (string)  – forwarded to the wrapping div
 *  - as         (string)  – HTML tag to render (default "div")
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.65,
  distance = 28,
  once = true,
  className = "",
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container – wraps a list and animates each direct child
 * with an incremental delay.
 *
 * Props:
 *  - stagger    (number) – delay between each child (default 0.08)
 *  - baseDelay  (number) – initial delay before the first child (default 0)
 *  - distance   (number) – px to travel (default 24)
 *  - className  (string)
 */
export function StaggerList({
  children,
  stagger = 0.08,
  baseDelay = 0,
  distance = 24,
  once = true,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });

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
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {/* Wrap every direct React child in a motion.div variant item */}
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
 * Simple fade-in (no Y movement) – useful for overlays, images, dividers.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  once = true,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

