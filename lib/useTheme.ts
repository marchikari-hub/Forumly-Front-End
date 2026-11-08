"use client";
import { useEffect, useState } from "react";

export function useTheme(): string | undefined {
  const [theme, setTheme] = useState<string | undefined>();
  useEffect(() => {
    try {
      if (localStorage.getItem("theme") === "dark") setTheme("dark");
    } catch {}
  }, []);
  return theme;
}