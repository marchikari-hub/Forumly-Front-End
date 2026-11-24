"use client";

import React, { useState } from "react";
import { useForumContent, ForumPost, CommentItem } from "./ForumContent";
import CommentSection from "./CommentSection";

interface GenrePostCardProps {
  post: ForumPost;
  onReportPost: (post: ForumPost) => void;
  onReportComment: (post: ForumPost, comment: CommentItem) => void;
}

export default function GenrePostCard({
  post,
  onReportPost,
  onReportComment,
}: GenrePostCardProps) {
  const { t, getPostText, toggleLikePost, toggleDislikePost } =
    useForumContent();
  const [openComment, setOpenComment] = useState(false);

  const text = getPostText(post);

  return (
    <article className="post-card">
      <div className="post-header">
        <span className="post-author">{post.author}</span> - {text.time}{" "}
        {t("dalam", "in")}{" "}
        <span style={{ color: "var(--accent)" }}>{text.genre}</span>
      </div>

      <h3 className="post-title">{text.title}</h3>
      <p className="post-excerpt">{text.excerpt}</p>

      {post.imageUrl && (
        <div style={{ marginTop: "12px" }}>
          <img
            src={post.imageUrl}
            alt={text.title}
            style={{
              width: "100%",
              maxHeight: "360px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      {post.videoUrl && (
        <div style={{ marginTop: "12px" }}>
          <video
            src={post.videoUrl}
            controls
            style={{
              width: "100%",
              maxHeight: "360px",
              borderRadius: "8px",
              backgroundColor: "#000",
            }}
          />
        </div>
      )}

      <div className="post-actions">
        <button
          type="button"
          className={`btn-action${post.likedByMe ? " active" : ""}`}
          onClick={() => toggleLikePost(post.id)}
        >
          {t("Suka", "Like")} ({post.likes})
        </button>
        <button
          type="button"
          className={`btn-action${post.dislikedByMe ? " active" : ""}`}
          onClick={() => toggleDislikePost(post.id)}
        >
          {t("Tidak Suka", "Dislike")} ({post.dislikes})
        </button>
        <button
          type="button"
          className={`btn-action${openComment ? " active" : ""}`}
          onClick={() => setOpenComment((prev) => !prev)}
        >
          {t("Komentar", "Comments")} ({post.comments.length})
        </button>
        <button
          type="button"
          className="btn-action"
          onClick={() => onReportPost(post)}
        >
          {post.reported
            ? t("Dilaporkan", "Reported")
            : t("Laporkan", "Report")}
        </button>
      </div>

      {openComment && (
        <CommentSection
          postId={post.id}
          comments={post.comments}
          onReportComment={(comment) => onReportComment(post, comment)}
        />
      )}
    </article>
  );
}