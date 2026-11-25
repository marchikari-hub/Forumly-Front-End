"use client";

import Link from "next/link";
import { useFotoProfil } from "../../lib/fotoprofile";

export default function FotoProfilMini() {
  const { foto } = useFotoProfil();

  return (
    <Link href="/profile" title="Profil" style={{ display: "flex", flexShrink: 0 }}>
      {foto ? (
        <img
          src={foto}
          alt="Foto profil"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #00a8ff",
          }}
        />
      ) : (
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#00a8ff",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          G
        </div>
      )}
    </Link>
  );
}