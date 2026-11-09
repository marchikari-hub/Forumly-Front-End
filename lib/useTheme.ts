"use client";
import { useEffect, useState } from "react";

// Sama seperti versi HTML: baca tema dari localStorage
export function useTheme(): string | undefined {
  const [theme, setTheme] = useState<string | undefined>();
  useEffect(() => {
    try {
      if (localStorage.getItem("theme") === "dark") setTheme("dark");
    } catch {}
  }, []);
  return theme;
}
