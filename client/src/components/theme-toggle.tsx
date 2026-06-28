import { useState, useEffect } from "react";

type Theme = "dark" | "light" | "system";

function getStoredTheme(): Theme {
  return "dark"; // Light mode completely disabled
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "system");
  root.classList.add("dark");
}

export function FloatingThemeToggle() {
  // Theme toggle has been disabled to enforce dark mode.
  return null;
}

/** Inline theme toggle — for embedding in navbars/headers */
export function ThemeToggle() {
  // Theme toggle has been disabled to enforce dark mode.
  return null;
}
