import Nav from "@/components/Nav";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, MoreHorizontal, Send, Mic, Square } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatTime, useAudioRecorder } from "@/lib/useAudioRecorder";

type PostDetailState = {
  post?: {
    id?: string | number;
    image?: string;
    caption?: string;
    audio?: string;
    likes?: number;
    comments?: number;
  };
  author?: {
    username?: string;
    avatar?: string;
  };
};

type CommentType = {
  postId: string;
  text?: string;
  audio?: string;
};
type ServerReply = {
  _id?: string;
  userId?: string;
  text?: string;
  createdAt?: string;
};

type ServerComment = {
  _id?: string;
  userId?:
    | string
    | {
        _id?: string;
        username?: string;
        profilePhoto?: string;
      };
  text?: string;
  audio?: string;
  replies?: ServerReply[];
  createdAt?: string;
  commentData?: {
    _id?: string;
    userId?:
      | string
      | {
          _id?: string;
          username?: string;
          profilePhoto?: string;
        };
    text?: string;
    audio?: string;
    replies?: ServerReply[];
    createdAt?: string;
  };
};

const PostDetail = () => {
  const { postId } = useParams();
  const location = useLocation();
  const state = (location.state as PostDetailState | null) ?? null;
  const resolvedPostId = state?.post?.id ?? postId;
  const resolvedPostIdString = resolvedPostId ? String(resolvedPostId) : "";
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string | undefined;
  const [comment, setComment] = useState<CommentType>({
    postId: resolvedPostIdString,
    text: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isPostDeleted, setIsPostDeleted] = useState(false);
  const [serverComments, setServerComments] = useState<ServerComment[]>([]);
  const [commentsCount, setCommentsCount] = useState<number | null>(null);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const {
    maxDuration: maxAudioSeconds,
    isRecording,
    recordedSeconds,
    previewUrl: audioPreviewUrl,
    recordedBlob,
    error: audioError,
    activeSeconds,
    progress,
    startRecording,
    stopRecording,
    clearRecording,
    createFile,
  } = useAudioRecorder({ maxSeconds: 15 });

  useEffect(() => {
    if (!resolvedPostIdString) return;
    setComment((prev) =>
      prev.postId === resolvedPostIdString
        ? prev
        : { ...prev, postId: resolvedPostIdString },
    );
  }, [resolvedPostIdString]);

  useEffect(() => {
    const token = localStorage.getItem("RabtaLtoken");
    if (!token || !backendUrl || !resolvedPostIdString) return;
    let isActive = true;
    const loadComments = async () => {
      setIsFetchingComments(true);
      try {
        const res = await fetch(`${backendUrl}/photo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });
        const data = await res.json();
        if (!isActive) return;
        if (res.ok) {
          const photos = Array.isArray(data?.data?.photos)
            ? data.data.photos
            : [];
          const post = photos.find(
            (item: { _id?: string; id?: string }) =>
              String(item?._id ?? item?.id ?? "") === resolvedPostIdString,
          );
          if (Array.isArray(post?.comments)) {
            setServerComments(post.comments);
            setCommentsCount(
              typeof post?.commentsCount === "number"
                ? post.commentsCount
                : post.comments.length,
            );
          }
        } else {
          console.log(data?.message ?? "Unable to load comments.");
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isActive) {
          setIsFetchingComments(false);
        }
      }
    };
    loadComments();
    return () => {
      isActive = false;
    };
  }, [backendUrl, resolvedPostIdString]);

  const formatRelativeTime = (iso?: string) => {
    if (!iso) return "";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    const diffMs = Date.now() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    if (diffSeconds < 60) return "just now";
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  async function handleCommentPost() {
    if (loading) return;
    const trimmedText = comment.text?.trim() ?? "";
    if (!resolvedPostIdString) {
      toast.error("Post not found.");
      return;
    }
    if (!trimmedText && !recordedBlob) {
      toast.error("Add a comment or record audio first.");
      return;
    }
    const token = localStorage.getItem("RabtaLtoken");
    if (!token) {
      toast.error("Please login to comment.");
      return;
    }
    if (!backendUrl) {
      toast.error("Backend URL is not configured.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("postId", resolvedPostIdString);
      if (trimmedText) {
        formData.append("text", trimmedText);
      }
      if (recordedBlob) {
        const audioFile = createFile("comment-audio");
        if (audioFile) {
          formData.append("audio", audioFile);
        }
      }
      const res = await fetch(`${backendUrl}/comment`, {
        method: "POST",
        body: formData,

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data?.message ?? "Comment uploaded successfully");
        const nextPost = data?.data;
        if (Array.isArray(nextPost?.comments)) {
          setServerComments(nextPost.comments);
          setCommentsCount(
            typeof nextPost?.commentsCount === "number"
              ? nextPost.commentsCount
              : nextPost.comments.length,
          );
        } else {
          const optimisticComment: ServerComment = {
            _id: `local-${Date.now()}`,
            text: trimmedText,
            audio: "",
            createdAt: new Date().toISOString(),
            replies: [],
          };
          setServerComments((prev) => [...prev, optimisticComment]);
          setCommentsCount((prev) => (typeof prev === "number" ? prev + 1 : 1));
        }
        setComment((prev) => ({ ...prev, text: "" }));
        clearRecording();
      } else {
        toast.error(data?.message ?? "Error uploading comment");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const normalizeAssetUrl = (url?: string) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    if (/^data:|^blob:/i.test(url)) return url;
    if (!backendUrl) return url;
    const base = backendUrl.replace(/\/+$/, "");
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${base}${path}`;
  };

  const formatLikes = (value?: number) => {
    if (typeof value !== "number") return "";

    return `${value}`;
  };

  const authorUsername = state?.author?.username
    ? state.author.username.startsWith("@")
      ? state.author.username
      : `@${state.author.username}`
    : "@user";
  const authorAvatar = normalizeAssetUrl(state?.author?.avatar);
  const imageSrc = normalizeAssetUrl(state?.post?.image);
  const imageAlt = resolvedPostId ? `Post ${resolvedPostId}` : "Post content";
  const caption = state?.post?.caption || "";
  const likesLabel =
    typeof state?.post?.likes === "number" ? formatLikes(state.post.likes) : "";
  const audioSrc = normalizeAssetUrl(state?.post?.audio);
  const commentsToRender = serverComments;

  const getCommentText = (commentItem: ServerComment) =>
    commentItem.text ?? commentItem.commentData?.text ?? "";
  const getCommentAudio = (commentItem: ServerComment) =>
    commentItem.audio ?? commentItem.commentData?.audio ?? "";
  const getCommentCreatedAt = (commentItem: ServerComment) =>
    commentItem.createdAt ?? commentItem.commentData?.createdAt ?? "";
  const getCommentUser = (commentItem: ServerComment) =>
    commentItem.userId ?? commentItem.commentData?.userId;
  const getCommentUsername = (
    user?:
      | string
      | {
          _id?: string;
          username?: string;
          profilePhoto?: string;
        },
  ) => {
    if (!user) return "@user";
    if (typeof user === "string") {
      return `@user${user.slice(-4)}`;
    }
    if (!user.username) return "@user";
    return user.username.startsWith("@") ? user.username : `@${user.username}`;
  };
  const getCommentAvatar = (
    user?:
      | string
      | {
          _id?: string;
          username?: string;
          profilePhoto?: string;
        },
  ) => {
    if (user && typeof user === "object" && user.profilePhoto) {
      return normalizeAssetUrl(user.profilePhoto);
    }
    return authorAvatar;
  };
  const authorFallback =
    authorUsername && authorUsername !== "@user"
      ? authorUsername.replace("@", "").charAt(0).toUpperCase()
      : "U";

  const handleDeletePost = () => {
    setIsPostDeleted(true);
    toast.info("Post removed (frontend only).");
  };

  const handleDeleteComment = (commentId: string) => {
    setServerComments((prev) =>
      prev.filter((item, idx) => {
        const id = item._id ?? item.commentData?._id ?? `comment-${idx}`;
        return id !== commentId;
      }),
    );
    setCommentsCount((prev) =>
      typeof prev === "number" ? Math.max(prev - 1, 0) : prev,
    );
  };

  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      {/* 1. SIDEBAR NAVIGATION */}
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 flex justify-center mt-4 sm:mt-0">
        <Card className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-md border-gray-100 rounded-xl overflow-hidden lg:max-h-[750px]">
          {/* ==========================================
              LEFT SIDE: Header, Image, Likes, Caption 
              ========================================== */}
          <div className="flex flex-col w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar className="w-9 h-9 border border-gray-100 shadow-sm">
                  <AvatarImage src={authorAvatar} alt={authorUsername} />
                  <AvatarFallback className="bg-[#1E4F7A] text-white font-bold">
                    {authorFallback}
                  </AvatarFallback>
                </Avatar>
                <span className="font-bold text-[#1A1A1A] hover:underline">
                  {authorUsername}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDeletePost}
                  disabled={isPostDeleted}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPostDeleted ? "Deleted" : "Delete"}
                </button>
                <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer hover:text-[#1E4F7A]" />
              </div>
            </div>

            <div className="w-full aspect-square bg-black flex items-center justify-center overflow-hidden">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-xs text-gray-400">No image available</div>
              )}
            </div>

            <div className="flex flex-col p-4 bg-white shrink-0">
              <div className="flex items-center gap-4 mb-3">
                <Heart className="w-7 h-7 text-[#1A1A1A] cursor-pointer hover:text-[#F2A32C] hover:scale-110 transition-all duration-200" />
                <Send className="w-7 h-7 text-[#1A1A1A] cursor-pointer hover:text-[#1E4F7A] hover:scale-110 transition-all duration-200" />
              </div>
              {likesLabel ? (
                <div className="text-base font-bold text-[#1A1A1A] mb-2">
                  {likesLabel}{" "}
                  <span className="font-medium text-gray-600">likes</span>
                </div>
              ) : null}
              {caption ? (
                <div className="text-sm text-[#1A1A1A] leading-relaxed">
                  <span className="font-bold mr-2 cursor-pointer hover:underline">
                    {authorUsername}
                  </span>
                  {caption}
                </div>
              ) : null}

              {/* Story note (audio) */}
              {audioSrc ? (
                <div className="mt-4 rounded-xl border border-gray-200 bg-[#F6FBFF] p-3 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="font-semibold text-[#1E4F7A]">
                      Story note
                    </span>
                  </div>
                  <audio controls src={audioSrc} className="w-full h-9" />
                </div>
              ) : null}
            </div>
          </div>

          {/* ==========================================
              RIGHT SIDE: Comments List & Input 
              ========================================== */}
          <div className="flex flex-col w-full lg:w-1/2 bg-white h-[500px] lg:h-auto">
            <div className="hidden lg:flex items-center p-4 border-b border-gray-100">
              <h3 className="font-bold text-[#1A1A1A] text-lg">
                Comments
                {typeof commentsCount === "number" ? ` (${commentsCount})` : ""}
              </h3>
            </div>

            {/* Scrollable Comments Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
              {isFetchingComments ? (
                <div className="text-sm text-gray-500">Loading comments...</div>
              ) : commentsToRender.length === 0 ? (
                <div className="text-sm text-gray-500">
                  No comments yet. Be the first to add one!
                </div>
              ) : (
                commentsToRender.map((commentItem, index) => {
                  const commentId =
                    commentItem._id ??
                    commentItem.commentData?._id ??
                    `comment-${index}`;
                  const commentText = getCommentText(commentItem);
                  const commentAudioRaw = getCommentAudio(commentItem);
                  const commentAudio = normalizeAssetUrl(commentAudioRaw);
                  const createdAt = getCommentCreatedAt(commentItem);
                  const commentTime = formatRelativeTime(createdAt);
                  const user = getCommentUser(commentItem);
                  const handle = getCommentUsername(user);
                  const avatar = getCommentAvatar(user);
                  return (
                    <div
                      key={commentId}
                      className="flex gap-3 items-start group"
                    >
                      <Avatar className="w-8 h-8 shrink-0 mt-1">
                        <AvatarImage src={avatar} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col w-full">
                        <div className="text-sm text-[#1A1A1A]">
                          <span className="font-bold mr-2 hover:underline cursor-pointer">
                            {handle}
                          </span>
                          {commentText ? (
                            <span>{commentText}</span>
                          ) : commentAudio ? (
                            <span className="text-gray-500 italic">
                              Voice comment
                            </span>
                          ) : null}
                        </div>

                        {commentAudio && (
                          <div className="mt-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                              <span className="font-semibold text-[#1E4F7A]">
                                Voice comment
                              </span>
                            </div>
                            <audio
                              controls
                              src={commentAudio}
                              className="w-full h-9"
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 font-medium mb-1">
                          {commentTime ? <span>{commentTime}</span> : null}
                          <button className="hover:text-[#1E4F7A] transition-colors cursor-pointer font-bold">
                            Reply
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteComment(commentId)}
                            className="text-red-500 hover:text-red-600 font-bold cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <Heart className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-[#F2A32C] shrink-0 mt-1" />
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Input Area to Write a Comment/Reply */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8 border border-gray-200 shadow-sm hidden sm:block">
                  <AvatarImage src={authorAvatar} />
                </Avatar>
                <Input
                  type="text"
                  placeholder="Add a comment or reply..."
                  className="flex-1 bg-white border-gray-200 focus-visible:ring-[#1E4F7A] rounded-full px-4"
                  value={comment.text ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setComment((prev) => ({
                      ...prev,
                      text: e.target.value,
                    }));
                  }}
                />
                <Button
                  className="bg-transparent text-[#1E4F7A] hover:bg-transparent hover:text-[#F2A32C] font-bold px-2 shadow-none cursor-pointer"
                  onClick={handleCommentPost}
                  disabled={loading}
                >
                  {loading ? <p>posting...</p> : <p>Post</p>}
                </Button>
              </div>

              {/* Voice Comment Option */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs text-gray-500 font-medium">
                  Voice comment (max 15 seconds)
                </span>
                {audioError ? (
                  <span className="text-xs text-red-500">{audioError}</span>
                ) : null}
                <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#1E4F7A] text-xs font-semibold hover:bg-[#F6FBFF] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={startRecording}
                      type="button"
                      disabled={isRecording || loading}
                    >
                    <Mic className="w-4 h-4" />
                    {audioPreviewUrl ? "Re-record" : "Record"}
                  </button>
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-100 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={stopRecording}
                      type="button"
                      disabled={!isRecording}
                    >
                    <Square className="w-4 h-4" />
                    Stop
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-24 h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-[#1E4F7A] transition-all"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                  {formatTime(activeSeconds)} / {formatTime(maxAudioSeconds)}
                </div>
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E4F7A] text-white text-xs font-semibold hover:bg-[#143A5A] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      type="button"
                      onClick={handleCommentPost}
                      disabled={loading || !recordedBlob}
                    >
                  Post audio
                </button>
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-100 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      type="button"
                      onClick={clearRecording}
                      disabled={!audioPreviewUrl && !recordedBlob}
                    >
                  Cancel audio
                </button>
              </div>
              {audioPreviewUrl ? (
                <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="font-semibold text-[#1E4F7A]">
                      Preview voice comment
                    </span>
                    {recordedSeconds ? (
                      <span>{formatTime(recordedSeconds)}</span>
                    ) : null}
                  </div>
                  <audio
                    controls
                    src={audioPreviewUrl}
                    className="w-full h-9"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostDetail;
