"use client";

import React, { useState } from "react";
import { useForumContent, CommentItem } from "./ForumContent";

interface CommentSectionProps {
  postId: string;
  comments: CommentItem[];
  onReportComment: (comment: CommentItem) => void;
}

export default function CommentSection({
  postId,
  comments,
  onReportComment,
}: CommentSectionProps) {
  const {
    t,
    addComment,
    toggleLikeComment,
    toggleDislikeComment,
    addReplyToComment,
  } = useForumContent();

  const [newComment, setNewComment] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(postId, newComment);
    setNewComment("");
  };

  const handleAddReply = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    const draft = replyDrafts[commentId] ?? "";
    if (!draft.trim()) return;
    addReplyToComment(postId, commentId, draft);
    setReplyDrafts((prev) => ({ ...prev, [commentId]: "" }));
    setReplyingToId(null);
  };

  return (
    <div
      style={{
        marginTop: "14px",
        paddingTop: "12px",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <form
        onSubmit={handleAddComment}
        style={{ display: "flex", gap: "8px", marginBottom: "14px" }}
      >
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={t("Tulis komentar...", "Write a comment...")}
          className="search-input"
        />
        <button type="submit" className="btn btn-primary">
          {t("Kirim", "Send")}
        </button>
      </form>

      {comments.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {comments.map((comment) => {
            const isReplying = replyingToId === comment.id;
            const replyText = replyDrafts[comment.id] ?? "";

            return (
              <div
                key={comment.id}
                style={{
                  padding: "10px 12px",
                  borderRadius: "8px",
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text-main)",
                    marginBottom: "4px",
                  }}
                >
                  {comment.author}
                </div>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: "13px",
                    color: "var(--text-main)",
                    lineHeight: 1.45,
                  }}
                >
                  {comment.text}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <button
                    type="button"
                    className={`btn-action${comment.likedByMe ? " active" : ""}`}
                    style={{ padding: "4px 10px", fontSize: "12px" }}
                    onClick={() => toggleLikeComment(postId, comment.id)}
                  >
                    {t("Suka", "Like")} ({comment.likes})
                  </button>
                  <button
                    type="button"
                    className={`btn-action${
                      comment.dislikedByMe ? " active" : ""
                    }`}
                    style={{ padding: "4px 10px", fontSize: "12px" }}
                    onClick={() => toggleDislikeComment(postId, comment.id)}
                  >
                    {t("Tidak Suka", "Dislike")} ({comment.dislikes})
                  </button>
                  <button
                    type="button"
                    className={`btn-action${isReplying ? " active" : ""}`}
                    style={{ padding: "4px 10px", fontSize: "12px" }}
                    onClick={() =>
                      setReplyingToId((prev) =>
                        prev === comment.id ? null : comment.id
                      )
                    }
                  >
                    {t("Balas", "Reply")}
                  </button>
                  <button
                    type="button"
                    className="btn-action"
                    style={{ padding: "4px 10px", fontSize: "12px" }}
                    onClick={() => onReportComment(comment)}
                  >
                    {comment.reported
                      ? t("Dilaporkan", "Reported")
                      : t("Laporkan", "Report")}
                  </button>
                </div>

                {isReplying && (
                  <form
                    onSubmit={(e) => handleAddReply(e, comment.id)}
                    style={{ display: "flex", gap: "8px", marginTop: "10px" }}
                  >
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) =>
                        setReplyDrafts((prev) => ({
                          ...prev,
                          [comment.id]: e.target.value,
                        }))
                      }
                      placeholder={t(
                        `Balas ${comment.author}...`,
                        `Reply to ${comment.author}...`
                      )}
                      className="search-input"
                    />
                    <button type="submit" className="btn btn-primary">
                      {t("Balas", "Reply")}
                    </button>
                  </form>
                )}

                {comment.replies && comment.replies.length > 0 && (
                  <div
                    style={{
                      marginTop: "10px",
                      paddingLeft: "12px",
                      borderLeft: "2px solid var(--accent)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {comment.replies.map((r) => (
                      <div
                        key={r.id}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "6px",
                          backgroundColor: "var(--bg-card)",
                          fontSize: "12px",
                        }}
                      >
                        <strong style={{ color: "var(--text-main)" }}>
                          {r.author}
                        </strong>
                        <p
                          style={{
                            margin: "3px 0 0",
                            color: "var(--text-muted)",
                          }}
                        >
                          {r.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ margin: 0, fontSize: "12px", color: "var(--text-muted)" }}>
          {t("Belum ada komentar.", "No comments yet.")}
        </p>
      )}
    </div>
  );
}