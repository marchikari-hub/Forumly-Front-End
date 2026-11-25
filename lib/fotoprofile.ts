"use client";

import { useCallback, useEffect, useState } from "react";

const KUNCI = "forumly-foto-profil";
const KEJADIAN = "forumly-foto-profil-berubah";

function perkecil(dataUrl: string, maks = 400): Promise<string> {
  return new Promise((selesai) => {
    const gambar = new Image();
    gambar.onload = () => {
      const skala = Math.min(1, maks / Math.max(gambar.width, gambar.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(gambar.width * skala);
      canvas.height = Math.round(gambar.height * skala);
      canvas.getContext("2d")?.drawImage(gambar, 0, 0, canvas.width, canvas.height);
      selesai(canvas.toDataURL("image/jpeg", 0.85));
    };
    gambar.onerror = () => selesai(dataUrl);
    gambar.src = dataUrl;
  });
}

export function useFotoProfil() {
  const [foto, setFoto] = useState("");

  useEffect(() => {
    const baca = () => setFoto(localStorage.getItem(KUNCI) ?? "");
    baca();
    window.addEventListener(KEJADIAN, baca);
    window.addEventListener("storage", baca);
    return () => {
      window.removeEventListener(KEJADIAN, baca);
      window.removeEventListener("storage", baca);
    };
  }, []);

  const simpanFoto = useCallback(async (dataUrl: string) => {
    const kecil = await perkecil(dataUrl);
    try {
      localStorage.setItem(KUNCI, kecil);
    } catch {
      return;
    }
    window.dispatchEvent(new Event(KEJADIAN));
  }, []);

  return { foto, simpanFoto };
}