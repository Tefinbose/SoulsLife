"use client";

import { motion } from "motion/react";

/**
 * Scroll-triggered fade + slide-up animation using native whileInView.
 * Fires smoothly as the user scrolls into each section on both mobile and desktop.
 *
 * Props:
 *  - delay      (number)  – stagger delay in seconds (default 0)
 *  - duration   (number)  – animation duration in seconds (default 0.5)
 *  - distance   (number)  – how many px the element travels upward (default 22)
 *  - once       (boolean) – only animate once (default true)
 *  - className  (string)  – forwarded to the wrapping div
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
  distance = 22,
  once = true,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.1, margin: "0px 0px -30px 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container – wraps a list and animates each direct child
 * with an incremental delay as the list scrolls into view.
 */
export function StaggerList({
  children,
  stagger = 0.08,
  baseDelay = 0,
  distance = 20,
  once = true,
  className = "",
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
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
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.08, margin: "0px 0px -25px 0px" }}
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
  duration = 0.55,
  once = true,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount: 0.1, margin: "0px 0px -30px 0px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
