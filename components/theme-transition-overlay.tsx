"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ThemeMode = "light" | "dark";
type OverlayPalette = { base: string; glow: string; blend: "screen" | "multiply" };

function buildBackdrop(theme: ThemeMode): OverlayPalette {
  if (theme === "dark") {
    return {
      base: "radial-gradient(circle at 50% 30%, rgba(6, 11, 36, 0.95), rgba(2, 6, 23, 0.85))",
      glow:
        "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4), transparent 60%)," +
        " radial-gradient(circle at 70% 65%, rgba(139, 92, 246, 0.35), transparent 70%)",
      blend: "screen" as const,
    };
  }

  return {
    base: "radial-gradient(circle at 50% 70%, rgba(255, 255, 255, 0.9), rgba(244, 246, 255, 0.9))",
    glow:
      "radial-gradient(circle at 30% 35%, rgba(254, 243, 199, 0.7), transparent 55%)," +
      " radial-gradient(circle at 75% 25%, rgba(129, 212, 250, 0.55), transparent 70%)",
    blend: "multiply" as const,
  };
}

export function ThemeTransitionOverlay() {
  const { resolvedTheme } = useTheme();
  const mountedTheme = (resolvedTheme as ThemeMode | undefined) ?? undefined;
  const previousTheme = useRef<ThemeMode | undefined>(mountedTheme);
  const [activeTheme, setActiveTheme] = useState<ThemeMode | null>(null);

  useEffect(() => {
    if (!mountedTheme) {
      return undefined;
    }

    if (!previousTheme.current) {
      previousTheme.current = mountedTheme;
      return undefined;
    }

    if (mountedTheme === previousTheme.current) {
      return undefined;
    }

    previousTheme.current = mountedTheme;
    const frame = window.requestAnimationFrame(() => setActiveTheme(mountedTheme));
    return () => window.cancelAnimationFrame(frame);
  }, [mountedTheme]);

  useEffect(() => {
    if (!activeTheme) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setActiveTheme(null), 850);
    return () => window.clearTimeout(timeout);
  }, [activeTheme]);

  const themePalette = activeTheme ? buildBackdrop(activeTheme) : null;

  return (
    <AnimatePresence>
      {activeTheme && themePalette ? (
        <motion.div
          aria-hidden
          key={activeTheme}
          className="pointer-events-none fixed inset-0 z-[999] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: themePalette.base,
              backdropFilter: "blur(40px)",
            }}
          />
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 0.95, 0], scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: themePalette.glow,
              filter: "blur(35px)",
              mixBlendMode: themePalette.blend,
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
