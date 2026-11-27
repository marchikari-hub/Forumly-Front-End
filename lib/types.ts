export type Notif = {
  id: number;
  type: "notification" | "messages";
  icon: string;
  actor: string;
  message: string;
  community: string | null;
  snippet: string;
  time: string;
  unread: boolean;
  postTitle: string | null;
};

export type Item = {
  id: number;
  category: "posts" | "community" | "comments";
  community: string;
  meta: string;
  title: string;
  content: string;
  kind: string;
  hasMedia: boolean;
  mediaType: string | null;
  mediaName: string | null;
  likes: number;
  dislikes: number;
  commentCount: number;
  liked: boolean;
  disliked: boolean;
  joined: boolean;
};

export type Comment = { id: number; author: string; text: string; mine: boolean };

export type UserHit = { username: string; posts: number; comments: number };

export type CommentHit = { id: number; author: string; text: string; postId: number; postTitle: string };