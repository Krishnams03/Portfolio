"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full border border-slate-200/70 bg-white/80 dark:border-white/10 dark:bg-slate-900/80" />
    );
  }

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200/70 bg-white/80 text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:hover:border-white/30"
    >
      <span
        aria-hidden
        className="transition duration-300 group-hover:rotate-180"
      >
        {isDark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
          >
            <path d="M21.42 15.22A9 9 0 0 1 8.78 2.58 9 9 0 1 0 21.42 15.22Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
          >
            <path d="M12 4a1 1 0 0 1 1 1v1.1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm7-1a1 1 0 0 1 1 1v1.1a1 1 0 1 1-2 0V14a1 1 0 0 1 1-1ZM5 13a1 1 0 0 1 1 1v1.1a1 1 0 1 1-2 0V14a1 1 0 0 1 1-1Zm11.07-6.07a1 1 0 0 1 1.41 0l.78.78a1 1 0 0 1-1.42 1.42l-.77-.79a1 1 0 0 1 0-1.41Zm-9.9 9.9a1 1 0 0 1 1.41 0l.79.78a1 1 0 0 1-1.42 1.42l-.78-.78a1 1 0 0 1 0-1.42Zm0-9.9.78-.78a1 1 0 0 1 1.42 1.42l-.79.77A1 1 0 0 1 6.17 6.93Zm9.9 9.9.77-.78a1 1 0 0 1 1.42 1.42l-.78.78a1 1 0 0 1-1.41-1.42ZM12 18a1 1 0 0 1 1 1v1.1a1 1 0 1 1-2 0V19a1 1 0 0 1 1-1Z" />
          </svg>
        )}
      </span>
    </button>
  );
}
