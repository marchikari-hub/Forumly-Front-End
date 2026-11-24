"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Lang,
  ForumPost,
  INITIAL_POSTS,
  getLocalizedPost,
} from "../data/forumData";

export type {
  Lang,
  CommentReply,
  CommentItem,
  PollOption,
  ForumPost,
  GenreTopic,
} from "../data/forumData";
export { GENRE_TOPICS } from "../data/forumData";

interface ForumContentValue {
  lang: Lang;
  setLang: (nextLang: Lang) => void;
  t: (idText: string, enText: string) => string;
  posts: ForumPost[];
  getPostText: (post: ForumPost) => ReturnType<typeof getLocalizedPost>;
}

const ForumContentStore = createContext<ForumContentValue | undefined>(undefined);

const STORAGE_KEY_LANG = "forumly_lang_v1";

export function ForumContentProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");
  const [posts] = useState<ForumPost[]>(INITIAL_POSTS);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    if (saved === "en" || saved === "id") {
      setLangState(saved);
      document.documentElement.setAttribute("lang", saved);
      document.documentElement.setAttribute("data-lang", saved);
    }
  }, []);

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    localStorage.setItem(STORAGE_KEY_LANG, nextLang);
    document.documentElement.setAttribute("lang", nextLang);
    document.documentElement.setAttribute("data-lang", nextLang);
  };

  const t = useCallback(
    (idText: string, enText: string) => (lang === "id" ? idText : enText),
    [lang]
  );

  const getPostText = useCallback(
    (post: ForumPost) => getLocalizedPost(post, lang),
    [lang]
  );

  return (
    <ForumContentStore.Provider value={{ lang, setLang, t, posts, getPostText }}>
      {children}
    </ForumContentStore.Provider>
  );
}

export function useForumContent() {
  const ctx = useContext(ForumContentStore);
  if (!ctx) {
    throw new Error("useForumContent must be used inside ForumContentProvider");
  }
  return ctx;
}