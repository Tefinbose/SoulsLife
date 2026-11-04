"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

/**
 * Mapping GSAP / common easing strings to cubic-bezier arrays for Framer Motion
 */
const EASE_MAP = {
  "power1.out": [0.25, 1, 0.5, 1],
  "power2.out": [0.25, 1, 0.5, 1],
  "power3.out": [0.22, 1, 0.36, 1],
  "power4.out": [0.16, 1, 0.3, 1],
  "expo.out": [0.19, 1, 0.22, 1],
  "circ.out": [0, 0.55, 0.45, 1],
  linear: "linear",
  easeIn: "easeIn",
  easeOut: "easeOut",
  easeInOut: "easeInOut",
};

/**
 * FadeContent component
 *
 * Implements smooth scroll-triggered reveal with "mist", blur, or fade effects,
 * supporting staggered entrance for child elements.
 *
 * Props:
 *  - effect       ('mist' | 'fade' | 'blur' | 'slide') - visual reveal style (default 'mist')
 *  - duration     (number) - animation duration in seconds (default 1.8)
 *  - ease         (string | number[]) - easing curve (default 'power2.out')
 *  - stagger      (number) - delay between consecutive children in seconds (default 0.1)
 *  - threshold    (number) - viewport intersection threshold 0 to 1 (default 0.1)
 *  - initialBlur  (number) - px blur for mist/blur effect (default 12)
 *  - distance     (number) - px translation on Y axis (default 18)
 *  - delay        (number) - base start delay in seconds (default 0)
 *  - once         (boolean) - only trigger once on scroll (default true)
 *  - className    (string) - classes forwarded to container
 *  - style        (object) - inline styles
 */
export default function FadeContent({
  children,
  effect = "mist",
  duration = 1.8,
  ease = "power2.out",
  stagger = 0.1,
  threshold = 0.1,
  initialBlur = 12,
  distance = 18,
  delay = 0,
  once = true,
  className = "",
  style = {},
  as: Tag = "div",
  childWrapperClassName = "",
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once,
    amount: threshold,
    margin: "0px 0px -15px 0px",
  });
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasAppeared(true);
      return;
    }
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < (window.innerHeight || 800)) {
        setHasAppeared(true);
        return;
      }
    }
    const timer = setTimeout(() => {
      setHasAppeared(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isInView]);

  const active = isInView || hasAppeared;

  const parsedEase = typeof ease === "string" ? (EASE_MAP[ease] || "easeOut") : ease;

  // Determine initial and animate variant values based on effect preset
  const getInitial = () => {
    switch (effect) {
      case "mist":
        return {
          opacity: 0,
          filter: `blur(${initialBlur}px)`,
          y: distance,
        };
      case "blur":
        return {
          opacity: 0,
          filter: `blur(${initialBlur}px)`,
          y: 0,
        };
      case "slide":
        return {
          opacity: 0,
          y: distance * 1.5,
          filter: "blur(0px)",
        };
      case "fade":
      default:
        return {
          opacity: 0,
          filter: "blur(0px)",
          y: 0,
        };
    }
  };

  const getTarget = () => {
    return {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    };
  };

  const initialVariant = getInitial();
  const targetVariant = getTarget();

  const childList = React.Children.toArray(children);
  const isMulti = childList.length > 1 && stagger > 0;

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={style}
    >
      {isMulti ? (
        childList.map((child, index) => (
          <motion.div
            key={child?.key ?? index}
            initial={initialVariant}
            animate={active ? targetVariant : initialVariant}
            transition={{
              duration,
              delay: delay + index * stagger,
              ease: parsedEase,
            }}
            className={childWrapperClassName}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={initialVariant}
          animate={active ? targetVariant : initialVariant}
          transition={{
            duration,
            delay,
            ease: parsedEase,
          }}
          className={childWrapperClassName}
        >
          {children}
        </motion.div>
      )}
    </Tag>
  );
}
