import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type HomePost = {
  _id?: string;
  userId: string;
  post: string[];
  descAudio: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  likedBy?: string[];
  isLiked?: boolean;
  user?: {
    id?: string;
    username?: string;
    name?: string;
    profilePhoto?: string;
  };
};

type LikeState = {
  isLiked: boolean;
  loading: boolean;
  likesCount: number;
};

const defaultAvatar =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop";

const Pictures = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("RabtaLtoken");
  const [posts, setPosts] = useState<HomePost[]>([]);
  const [loading, setLoading] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [likeState, setLikeState] = useState<Record<string, LikeState>>({});

  useEffect(() => {
    if (!backend_url || !token) return;
    const loadPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${backend_url}/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          const list = Array.isArray(data?.data) ? data.data : [];
          setPosts(list);
          setEmptyMessage(data?.message || "");
          const nextLikeState: Record<string, LikeState> = {};
          list.forEach((post: HomePost) => {
            const postId = post._id ? String(post._id) : "";
            if (!postId) return;
            nextLikeState[postId] = {
              isLiked: Boolean(post.isLiked),
              loading: false,
              likesCount:
                typeof post.likesCount === "number" ? post.likesCount : 0,
            };
          });
          setLikeState(nextLikeState);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [backend_url, token]);

  const normalizeAssetUrl = (url?: string) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    if (!backend_url) return url;
    const base = backend_url.replace(/\/+$/, "");
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${base}${path}`;
  };

  const getPostId = (post: HomePost) => (post._id ? String(post._id) : "");

  const getLikeMeta = (post: HomePost): LikeState => {
    const postId = getPostId(post);
    if (postId && likeState[postId]) {
      return likeState[postId];
    }
    return {
      isLiked: Boolean(post.isLiked),
      loading: false,
      likesCount: typeof post.likesCount === "number" ? post.likesCount : 0,
    };
  };

  const handleToggleLike = async (post: HomePost) => {
    const postId = getPostId(post);
    if (!postId) return;
    if (!backend_url) return;
    const authToken = localStorage.getItem("RabtaLtoken");
    if (!authToken) return;
    const current = getLikeMeta(post);
    if (current.loading) return;

    setLikeState((prev) => ({
      ...prev,
      [postId]: { ...current, loading: true },
    }));

    try {
      const endpoint = current.isLiked ? "dislike" : "like";
      const res = await fetch(`${backend_url}/${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      if (res.ok) {
        const nextLikes =
          typeof data?.data?.likesCount === "number"
            ? data.data.likesCount
            : Math.max(0, current.likesCount + (current.isLiked ? -1 : 1));
        setLikeState((prev) => ({
          ...prev,
          [postId]: {
            isLiked: !current.isLiked,
            likesCount: nextLikes,
            loading: false,
          },
        }));
      } else {
        setLikeState((prev) => ({
          ...prev,
          [postId]: { ...current, loading: false },
        }));
      }
    } catch (error) {
      console.log(error);
      setLikeState((prev) => ({
        ...prev,
        [postId]: { ...current, loading: false },
      }));
    }
  };

  return (
    <div className="w-full max-w-lg flex flex-col gap-6">
      {loading && (
        <div className="text-sm text-[#4B6B88]">Loading posts...</div>
      )}
      {!loading && posts.length === 0 && emptyMessage && (
        <div className="text-sm text-[#4B6B88]">{emptyMessage}</div>
      )}
      {posts.map((post) => {
        const usernameRaw = post.user?.username ?? "";
        const displayUsername = usernameRaw
          ? usernameRaw.startsWith("@")
            ? usernameRaw
            : `@${usernameRaw}`
          : "@user";
        const displayName = post.user?.name || displayUsername;
        const avatarSrc =
          normalizeAssetUrl(post.user?.profilePhoto) || defaultAvatar;
        const rawPostImage = post.post?.[0] ?? "";
        const rawAvatar = post.user?.profilePhoto ?? "";
        const postImage = normalizeAssetUrl(rawPostImage);
        const audioSrc = normalizeAssetUrl(post.descAudio);
        const postId = getPostId(post);
        const likeMeta = getLikeMeta(post);
        const commentsLink = postId ? `/post/${postId}` : "/addComment";
        const postState = {
          post: {
            id: postId,
            image: rawPostImage,
            caption: post.caption,
            audio: post.descAudio,
            likes: likeMeta.likesCount,
            comments: post.commentsCount,
          },
          author: {
            username: post.user?.username ?? "",
            avatar: rawAvatar,
          },
        };

        return (
          <Card
            key={post._id ?? `${post.userId}-${postImage}`}
            className="w-full shadow-sm border border-gray-100 bg-white rounded-2xl overflow-hidden"
          >
            {/* --- POST HEADER (Top profile logo, username, more options) --- */}
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-3 hover:cursor-pointer">
                {/* Shadcn Avatar */}
                <Avatar className="w-10 h-10 border border-gray-100 shadow-sm">
                  <AvatarImage
                    src={avatarSrc}
                    alt={displayName}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-brand/10 text-brand font-bold">
                    {displayName.replace("@", "").substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-bold text-[#1A1A1A] leading-tight hover:underline">
                    {displayName}
                  </span>
                  <span className="text-sm text-[#6B7280]">
                    {displayUsername}
                  </span>
                </div>
              </div>
              {/* Static 'More options' icon */}
              <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer hover:text-brand transition-colors" />
            </div>

            {/* --- MAIN POST IMAGE --- */}
            <div className="w-full h-64 sm:h-72 md:h-80 bg-gray-50 overflow-hidden">
              <img
                src={postImage}
                alt="Post content"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* --- POST BOTTOM (Actions, counts, description) --- */}
            <div className="flex flex-col p-4 gap-3">
              {/* Action Icons: Likes, Comments, Share Logo */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <Heart
                    onClick={() => handleToggleLike(post)}
                    role="button"
                    aria-pressed={likeMeta.isLiked}
                    className={`w-7 h-7 transition-all duration-200 ${
                      likeMeta.loading
                        ? "opacity-60 cursor-not-allowed"
                        : "cursor-pointer"
                    } ${
                      likeMeta.isLiked
                        ? "text-[#F2A32C] fill-[#F2A32C]"
                        : "text-[#1A1A1A] hover:text-[#F2A32C] hover:scale-110"
                    }`}
                  />
                  <Link to={commentsLink} state={postState}>
                    <MessageCircle className="w-7 h-7 text-[#1A1A1A] cursor-pointer hover:text-brand hover:scale-110 transition-all duration-200" />
                  </Link>
                  <Send className="w-7 h-7 text-[#1A1A1A] cursor-pointer hover:text-brand-dark hover:scale-110 transition-all duration-200" />
                </div>
              </div>

            {/* Likes count */}
            <div className="text-base font-bold text-[#1A1A1A]">
              {likeMeta.likesCount}{" "}
              <span className="font-medium text-gray-600">likes</span>
            </div>

              {/* IMAGE DESCRIPTION (Caption) */}
              <div className="text-base text-[#1A1A1A] leading-relaxed">
                <span className="font-bold mr-2 hover:underline cursor-pointer">
                  {displayUsername}
                </span>
                {/* The actual caption description */}
                {post.caption}
              </div>

              {/* Audio Note */}
              {post.descAudio && (
                <div className="rounded-xl border border-gray-200 bg-[#F6FBFF] p-3 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="font-semibold text-[#1E4F7A]">
                      Voice note
                    </span>
                  </div>
                  <audio controls src={audioSrc} className="w-full h-9" />
                </div>
              )}

            {/* Static 'View comments' link */}
            <Link to={commentsLink} state={postState}>
              <div className="text-sm text-gray-500 hover:text-brand cursor-pointer mt-1">
                View all {post.commentsCount} comments
              </div>
            </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Pictures;
