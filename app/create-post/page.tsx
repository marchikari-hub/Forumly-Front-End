"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useTheme } from "@/lib/useTheme";
import "./create-post.css";

type Tab = "text" | "media" | "link";
const MAX_IMAGE = 10 * 1024 * 1024;
const MAX_VIDEO = 50 * 1024 * 1024;

export default function CreatePostPage() {
  const router = useRouter();
  const theme = useTheme();
  const [community, setCommunity] = useState("");
  const [tab, setTab] = useState<Tab>("text");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const pickFile = (f: File | undefined) => {
    setFile(null);
    setPreview("");
    if (!f) return;
    const isImage = f.type.startsWith("image/");
    const isVideo = f.type.startsWith("video/");
    if (!isImage && !isVideo) return alert("Hanya file gambar atau video yang bisa diunggah.");
    if (f.size > (isImage ? MAX_IMAGE : MAX_VIDEO))
      return alert("Ukuran file terlalu besar. Maksimal " + (isImage ? "10 MB untuk gambar." : "50 MB untuk video."));
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!community) return alert("Tolong pilih komunitas terlebih dahulu!");
    if (tab === "link" && !/^https?:\/\/\S+$/i.test(link.trim()))
      return alert("Masukkan URL yang valid (diawali http:// atau https://).");
    if (tab === "media" && !file) return alert("Pilih gambar atau video terlebih dahulu.");

    const fd = new FormData();
    fd.set("community", community);
    fd.set("title", title.trim());
    fd.set("kind", tab);
    fd.set("content", tab === "link" ? link.trim() : tab === "text" ? body : "");
    if (tab === "media" && file) fd.set("file", file);

    setSaving(true);
    const res = await fetch("/api/posts", { method: "POST", body: fd });
    setSaving(false);
    if (!res.ok) return alert((await res.json()).error || "Gagal membuat post.");
    alert("Post berhasil dibuat di " + community + "!");
    router.push("/search?q=" + encodeURIComponent(title.trim()));
  };

  const tabs: [Tab, string][] = [["text", "Post"], ["media", "Images & Video"], ["link", "Link"]];

  return (
    <div className="fm-page" data-theme={theme}>
      <main className="cp-container">
        <h2>Create a post</h2>

        <div className="cp-select-wrapper">
          <select value={community} onChange={(e) => setCommunity(e.target.value)} required>
            <option value="" disabled>Choose a community</option>
            <option value="r/luckyme">r/luckyme</option>
            <option value="r/meme">r/meme</option>
            <option value="r/larpin">r/larpin</option>
          </select>
        </div>

        <div className="cp-card">
          <div className="cp-tabs">
            {tabs.map(([key, label]) => (
              <button key={key} type="button" className={`cp-tab-btn${tab === key ? " active" : ""}`} onClick={() => setTab(key)}>
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={submit}>
            <div className="cp-form-group">
              <input type="text" placeholder="Title" maxLength={300} required value={title} onChange={(e) => setTitle(e.target.value)} />
              <span className="cp-char-count">{title.length}/300</span>
            </div>

            <div className={`cp-tab-content${tab === "text" ? " active" : ""}`}>
              <textarea placeholder="Text" rows={8} value={body} onChange={(e) => setBody(e.target.value)} />
            </div>

            <div className={`cp-tab-content${tab === "media" ? " active" : ""}`}>
              <div className="cp-upload-box">
                <input type="file" accept="image/*,video/*" onChange={(e) => pickFile(e.target.files?.[0])} />
                <p>Drag and drop gambar atau video, atau <span>Upload</span></p>
                <div>
                  {preview && file?.type.startsWith("image/") && /* eslint-disable-next-line @next/next/no-img-element */ <img src={preview} alt="Preview" />}
                  {preview && file?.type.startsWith("video/") && <video muted preload="metadata" src={preview + "#t=0.1"} />}
                </div>
              </div>
            </div>

            <div className={`cp-tab-content${tab === "link" ? " active" : ""}`}>
              <input type="url" placeholder="URL (https://...)" value={link} onChange={(e) => setLink(e.target.value)} />
            </div>

            <div className="cp-form-footer">
              <button type="button" className="cp-cancel-btn" onClick={() => router.back()}>Cancel</button>
              <button type="submit" className="cp-submit-btn" disabled={saving}>Post</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
