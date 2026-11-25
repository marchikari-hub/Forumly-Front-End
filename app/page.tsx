"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useForumContent,
  ForumPost,
  CommentItem,
} from "./components/ForumContent";
import CommentSection from "./components/CommentSection";
import ReportModal from "./components/ReportModal";

interface ReportingCommentState {
  post: ForumPost;
  comment: CommentItem;
}

export default function HomePage() {
  const {
    t,
    posts,
    getPostText,
    toggleLikePost,
    toggleDislikePost,
    submitReport,
    submitCommentReport,
  } = useForumContent();

  const [searchQuery, setSearchQuery] = useState("");
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [reportingPost, setReportingPost] = useState<ForumPost | null>(null);
  const [reportingComment, setReportingComment] =
    useState<ReportingCommentState | null>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredPosts = normalizedQuery
    ? posts.filter((post) => {
        const text = getPostText(post);
        return (
          text.title.toLowerCase().includes(normalizedQuery) ||
          text.excerpt.toLowerCase().includes(normalizedQuery) ||
          text.genre.toLowerCase().includes(normalizedQuery) ||
          post.author.toLowerCase().includes(normalizedQuery)
        );
      })
    : posts;

  const toggleCommentPanel = (postId: string) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="search-bar-container"
        style={{ display: "flex", gap: "8px", marginBottom: "20px" }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t(
            "Cari diskusi, pertanyaan, atau topik...",
            "Search discussions, questions, or topics..."
          )}
          className="search-input"
        />
        <button type="submit" className="btn btn-primary">
          {t("Cari", "Search")}
        </button>
      </form>

      <h2 className="feed-title">
        {t("Diskusi Terbaru", "Latest Discussions")}
      </h2>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => {
          const text = getPostText(post);
          const isCommentOpen = Boolean(openComments[post.id]);

          return (
            <article key={post.id} className="post-card">
              <div className="post-header">
                <span className="post-author">{post.author}</span> - {text.time}{" "}
                {t("dalam", "in")}{" "}
                <Link
                  href={`/explore/${post.genreSlug}`}
                  style={{ color: "var(--accent)", textDecoration: "none" }}
                >
                  {text.genre}
                </Link>
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
                  className={`btn-action${isCommentOpen ? " active" : ""}`}
                  onClick={() => toggleCommentPanel(post.id)}
                >
                  {t("Komentar", "Comments")} ({post.comments.length})
                </button>
                <button
                  type="button"
                  className="btn-action"
                  onClick={() => setReportingPost(post)}
                >
                  {post.reported
                    ? t("Dilaporkan", "Reported")
                    : t("Laporkan", "Report")}
                </button>
              </div>

              {isCommentOpen && (
                <CommentSection
                  postId={post.id}
                  comments={post.comments}
                  onReportComment={(comment) =>
                    setReportingComment({ post, comment })
                  }
                />
              )}
            </article>
          );
        })
      ) : (
        <div className="post-card">
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            {t(
              "Tidak ada diskusi yang cocok dengan pencarian.",
              "No discussions match your search."
            )}
          </p>
        </div>
      )}

      <ReportModal
        isOpen={Boolean(reportingPost || reportingComment)}
        targetLabel={
          reportingComment
            ? `${t("Komentar oleh", "Comment by")} ${
                reportingComment.comment.author
              }: "${reportingComment.comment.text}"`
            : reportingPost
            ? `${t("Postingan oleh", "Post by")} ${reportingPost.author}: "${
                getPostText(reportingPost).title
              }"`
            : ""
        }
        onClose={() => {
          setReportingPost(null);
          setReportingComment(null);
        }}
        onConfirm={(reason, detail) => {
          if (reportingComment) {
            submitCommentReport({
              postId: reportingComment.post.id,
              commentId: reportingComment.comment.id,
              reason,
              detail,
            });
            setReportingComment(null);
            return;
          }
          if (reportingPost) {
            submitReport({ postId: reportingPost.id, reason, detail });
            setReportingPost(null);
          }
        }}
      />
    </div>
  );
}