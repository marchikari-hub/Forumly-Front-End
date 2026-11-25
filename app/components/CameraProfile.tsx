"use client";

import { useEffect, useRef, useState } from "react";

type CameraProfileProps = {
  onCapture: (dataUrl: string) => void;
  onClose: () => void;
};

export default function CameraProfile({ onCapture, onClose }: CameraProfileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setError("Kamera tidak bisa diakses. Pastikan izin kamera sudah diizinkan.");
      }
    }

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  function takePhoto() {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);

    onCapture(canvas.toDataURL("image/jpeg"));
    onClose();
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 16,
          maxWidth: 520,
          width: "90%",
        }}
      >
        {error ? (
          <p>{error}</p>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: "100%", borderRadius: 12 }}
          />
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          {!error && <button onClick={takePhoto}>Jepret</button>}
          <button onClick={onClose}>Batal</button>
        </div>
      </div>
    </div>
  );
}