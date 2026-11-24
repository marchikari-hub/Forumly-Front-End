"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useForumContent,
  ForumPost,
  CommentItem,
  GENRE_TOPICS,
} from "../../components/ForumContent";
import GenrePostCard from "../../components/GenrePostCard";
import ReportModal from "../../components/ReportModal";

interface PageProps {
  params: { genre: string };
}

interface ReportingCommentState {
  post: ForumPost;
  comment: CommentItem;
}

export default function ExploreGenrePage({ params }: PageProps) {
  const { genre } = params;
  const {
    t,
    posts,
    getPostText,
    submitReport,
    submitCommentReport,
  } = useForumContent();

  const [reportingPost, setReportingPost] = useState<ForumPost | null>(null);
  const [reportingComment, setReportingComment] =
    useState<ReportingCommentState | null>(null);

  const normalizedSlug = decodeURIComponent(genre).toLowerCase();
  const topic = GENRE_TOPICS.find((item) => item.slug === normalizedSlug);
  const genreName = topic
    ? t(topic.nameId, topic.nameEn)
    : normalizedSlug.charAt(0).toUpperCase() + normalizedSlug.slice(1);

  const matchingPosts = posts.filter(
    (post) => post.genreSlug.toLowerCase() === normalizedSlug
  );

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Link href="/explore" className="explore-btn" style={{ fontSize: "12px" }}>
          ← {t("Kembali ke Explore", "Back to Explore")}
        </Link>
      </div>

      <h2 className="feed-title">
        {t("Topik", "Genre")}: {genreName}
      </h2>

      {matchingPosts.length > 0 ? (
        matchingPosts.map((post) => (
          <GenrePostCard
            key={post.id}
            post={post}
            onReportPost={(target) => setReportingPost(target)}
            onReportComment={(targetPost, targetComment) =>
              setReportingComment({ post: targetPost, comment: targetComment })
            }
          />
        ))
      ) : (
        <div className="post-card">
          <div className="post-header">
            <span className="post-author">
              {t("Komunitas", "Community")} {genreName}
            </span>{" "}
            - {t("Diskusi Unggulan", "Featured Discussion")}
          </div>
          <h3 className="post-title">
            {t(
              `Topik pembahasan seputar ${genreName} dan perkembangannya saat ini.`,
              `Discussion topics around ${genreName} and current developments.`
            )}
          </h3>
          <p className="post-excerpt">
            {t(
              "Belum ada diskusi aktif pada kategori ini. Jadilah yang pertama memulai topik baru!",
              "No active discussions in this category yet. Be the first to start a new topic!"
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