"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
  className?: string;
  children: ReactNode;
}

type SpotlightStyle = CSSProperties & {
  "--spotlight-x"?: string;
  "--spotlight-y"?: string;
};

export function SpotlightCard({ className = "", children }: SpotlightCardProps) {
  const ref = useRef<HTMLElement | null>(null);

  const updateSpotlight = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    node.style.setProperty("--spotlight-x", `${x}px`);
    node.style.setProperty("--spotlight-y", `${y}px`);
    const tiltX = ((y - bounds.height / 2) / bounds.height) * -8;
    const tiltY = ((x - bounds.width / 2) / bounds.width) * 8;
    node.style.setProperty("--tilt-x", `${tiltX}deg`);
    node.style.setProperty("--tilt-y", `${tiltY}deg`);
    node.style.setProperty("--lift", "-6px");
  }, []);

  const resetSpotlight = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--spotlight-x", "50%");
    node.style.setProperty("--spotlight-y", "50%");
    node.style.setProperty("--tilt-x", "0deg");
    node.style.setProperty("--tilt-y", "0deg");
    node.style.setProperty("--lift", "0px");
  }, []);

  return (
    <motion.div
      ref={(element) => {
        ref.current = element;
      }}
      onPointerEnter={updateSpotlight}
      onPointerMove={updateSpotlight}
      onPointerLeave={resetSpotlight}
      className={`spotlight-card ${className}`}
      style={{
        "--spotlight-x": "50%",
        "--spotlight-y": "50%",
        "--tilt-x": "0deg",
        "--tilt-y": "0deg",
        "--lift": "0px",
      } as SpotlightStyle}
    >
      {children}
    </motion.div>
  );
}
