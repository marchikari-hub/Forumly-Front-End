"use client";

import { useState, FormEvent } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Gagal login.");
        setLoading(false);
        return;
      }
      // Only allow same-site relative redirects.
      const next = new URLSearchParams(window.location.search).get("next");
      window.location.href = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
    } catch {
      setError("Tidak bisa terhubung ke server.");
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <form onSubmit={onSubmit} className="post-card" style={{ width: "100%", maxWidth: 400, padding: 28 }}>
        <h1 style={{ color: "var(--accent)", fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Forumly</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>Masuk untuk melanjutkan diskusi.</p>

        {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

        <label htmlFor="username" className="form-label">Username</label>
        <input
          id="username" className="form-control mb-3" autoComplete="username" autoFocus
          value={username} onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="form-label">Password</label>
        <input
          id="password" type="password" className="form-control mb-4" autoComplete="current-password"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
