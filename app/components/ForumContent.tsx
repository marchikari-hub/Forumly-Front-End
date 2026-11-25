"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  Lang,
  ForumPost,
  CommunityItem,
  INITIAL_POSTS,
  INITIAL_COMMUNITIES,
  getLocalizedPost,
} from "../data/forumData";

export type {
  Lang,
  CommentReply,
  CommentItem,
  PollOption,
  ForumPost,
  GenreTopic,
  CommunityItem,
} from "../data/forumData";
export { GENRE_TOPICS } from "../data/forumData";

interface ForumContentValue {
  lang: Lang;
  setLang: (nextLang: Lang) => void;
  t: (idText: string, enText: string) => string;
  posts: ForumPost[];
  getPostText: (post: ForumPost) => ReturnType<typeof getLocalizedPost>;
  toggleLikePost: (postId: string) => void;
  toggleDislikePost: (postId: string) => void;
  submitReport: (payload: {
    postId: string;
    reason: string;
    detail?: string;
  }) => void;
  addComment: (postId: string, text: string) => void;
  toggleLikeComment: (postId: string, commentId: string) => void;
  toggleDislikeComment: (postId: string, commentId: string) => void;
  addReplyToComment: (postId: string, commentId: string, text: string) => void;
  submitCommentReport: (payload: {
    postId: string;
    commentId: string;
    reason: string;
    detail?: string;
  }) => void;
  communities: CommunityItem[];
  toggleJoinCommunity: (communityId: string) => void;
  createCommunity: (payload: {
    name: string;
    description: string;
    category?: string;
  }) => void;
}

const ForumContentStore = createContext<ForumContentValue | undefined>(
  undefined
);

const STORAGE_KEY_LANG = "forumly_lang_v1";

export function ForumContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>("id");
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_POSTS);
  const [communities, setCommunities] =
    useState<CommunityItem[]>(INITIAL_COMMUNITIES);
  const [reportNotice, setReportNotice] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    if (saved === "en" || saved === "id") {
      setLangState(saved);
      document.documentElement.setAttribute("lang", saved);
      document.documentElement.setAttribute("data-lang", saved);
    }
  }, []);

  useEffect(() => {
    if (!reportNotice) return;
    const timer = setTimeout(() => setReportNotice(null), 2600);
    return () => clearTimeout(timer);
  }, [reportNotice]);

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

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const alreadyLiked = Boolean(post.likedByMe);
        const alreadyDisliked = Boolean(post.dislikedByMe);
        return {
          ...post,
          likedByMe: !alreadyLiked,
          dislikedByMe: false,
          likes: alreadyLiked ? Math.max(0, post.likes - 1) : post.likes + 1,
          dislikes: alreadyDisliked
            ? Math.max(0, post.dislikes - 1)
            : post.dislikes,
        };
      })
    );
  };

  const toggleDislikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const alreadyDisliked = Boolean(post.dislikedByMe);
        const alreadyLiked = Boolean(post.likedByMe);
        return {
          ...post,
          dislikedByMe: !alreadyDisliked,
          likedByMe: false,
          dislikes: alreadyDisliked
            ? Math.max(0, post.dislikes - 1)
            : post.dislikes + 1,
          likes: alreadyLiked ? Math.max(0, post.likes - 1) : post.likes,
        };
      })
    );
  };

  const submitReport = ({
    postId,
  }: {
    postId: string;
    reason: string;
    detail?: string;
  }) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, reported: true } : post
      )
    );
    setReportNotice(
      lang === "id"
        ? "Laporan berhasil dikirim untuk ditinjau."
        : "Report submitted for review."
    );
  };

  const addComment = (postId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c-${Date.now()}`,
              author: t("Anda", "You"),
              text: trimmed,
              likes: 0,
              dislikes: 0,
              replies: [],
            },
          ],
        };
      })
    );
  };

  const toggleLikeComment = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((c) => {
            if (c.id !== commentId) return c;
            const liked = Boolean(c.likedByMe);
            const disliked = Boolean(c.dislikedByMe);
            return {
              ...c,
              likedByMe: !liked,
              dislikedByMe: false,
              likes: liked ? Math.max(0, c.likes - 1) : c.likes + 1,
              dislikes: disliked ? Math.max(0, c.dislikes - 1) : c.dislikes,
            };
          }),
        };
      })
    );
  };

  const toggleDislikeComment = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((c) => {
            if (c.id !== commentId) return c;
            const disliked = Boolean(c.dislikedByMe);
            const liked = Boolean(c.likedByMe);
            return {
              ...c,
              dislikedByMe: !disliked,
              likedByMe: false,
              dislikes: disliked ? Math.max(0, c.dislikes - 1) : c.dislikes + 1,
              likes: liked ? Math.max(0, c.likes - 1) : c.likes,
            };
          }),
        };
      })
    );
  };

  const addReplyToComment = (
    postId: string,
    commentId: string,
    text: string
  ) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((c) => {
            if (c.id !== commentId) return c;
            return {
              ...c,
              replies: [
                ...(c.replies ?? []),
                {
                  id: `r-${Date.now()}`,
                  author: t("Anda", "You"),
                  text: trimmed,
                  likes: 0,
                },
              ],
            };
          }),
        };
      })
    );
  };

  const submitCommentReport = ({
    postId,
    commentId,
  }: {
    postId: string;
    commentId: string;
    reason: string;
    detail?: string;
  }) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((c) =>
            c.id === commentId ? { ...c, reported: true } : c
          ),
        };
      })
    );
    setReportNotice(
      lang === "id"
        ? "Laporan komentar berhasil dikirim."
        : "Comment report submitted."
    );
  };

  const toggleJoinCommunity = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((item) => {
        if (item.id !== communityId) return item;
        const nextJoined = !Boolean(item.joined);
        return {
          ...item,
          joined: nextJoined,
          members: nextJoined
            ? item.members + 1
            : Math.max(0, item.members - 1),
        };
      })
    );
  };

  const createCommunity = ({
    name,
    description,
    category,
  }: {
    name: string;
    description: string;
    category?: string;
  }) => {
    const cleanName = name.trim();
    const cleanDesc = description.trim();
    if (!cleanName || !cleanDesc) return;

    const slugBase = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const newItem: CommunityItem = {
      id: `comm-${Date.now()}`,
      slug: `${slugBase || "komunitas"}-${Date.now().toString().slice(-4)}`,
      nameId: cleanName,
      nameEn: cleanName,
      descId: cleanDesc,
      descEn: cleanDesc,
      categoryId: category?.trim() || "Umum",
      categoryEn: category?.trim() || "General",
      members: 1,
      joined: true,
    };

    setCommunities((prev) => [newItem, ...prev]);
    setReportNotice(
      lang === "id"
        ? "Komunitas baru berhasil dibuat."
        : "New community created."
    );
  };

  return (
    <ForumContentStore.Provider
      value={{
        lang,
        setLang,
        t,
        posts,
        getPostText,
        toggleLikePost,
        toggleDislikePost,
        submitReport,
        addComment,
        toggleLikeComment,
        toggleDislikeComment,
        addReplyToComment,
        submitCommentReport,
        communities,
        toggleJoinCommunity,
        createCommunity,
      }}
    >
      {children}
      {reportNotice && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "var(--bg-card)",
            color: "var(--text-main)",
            border: "1px solid var(--accent)",
            borderRadius: "10px",
            padding: "10px 16px",
            fontSize: "13px",
            fontWeight: 600,
            zIndex: 1100,
          }}
        >
          {reportNotice}
        </div>
      )}
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