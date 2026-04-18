import Nav from "@/components/Nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type PostType = {
  _id: string;
  post: string[];
  descAudio: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  userId?:
    | string
    | {
        _id?: string;
        username?: string;
        profilePhoto?: string;
      };
};

const Explore = () => {
  const [post, setPost] = useState<PostType[]>([]);
  const [loading, isLoading] = useState<boolean>(false);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const normalizeAssetUrl = (url?: string) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    if (!backend_url) return url;
    const base = backend_url.replace(/\/+$/, "");
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${base}${path}`;
  };
  useEffect(() => {
    const token = localStorage.getItem("RabtaLtoken");
    const fetchPost = async () => {
      isLoading(true);
      const res = await fetch(`${backend_url}/all/post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const data = await res.json();

      if (res.ok) {
        setPost(data.data);
        console.log(data.data);
      }
      isLoading(false);
    };
    fetchPost();
  }, []);
  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      <div className="flex-1 flex flex-col mt-4 sm:mt-0 gap-8 font-['Space_Grotesk']">
        <div className="w-full max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-[#E6EEF5] bg-gradient-to-br from-white via-[#F6FBFF] to-[#FFF4E1] shadow-lg">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
            </div>
            <div className="relative p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#6B7280]">
                    Discover
                  </div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2A43] mt-2">
                    Explore trending posts
                  </h1>
                  <p className="text-sm text-[#4B6B88] mt-2 max-w-xl">
                    Find creators, tags, and fresh ideas across the community.
                  </p>
                </div>
                <div className="relative w-full md:max-w-sm">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search posts, tags, or places..."
                    className="pl-12 py-5 text-base rounded-full bg-white shadow-sm border-gray-100 focus-visible:ring-[#1E4F7A]"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-['Spline_Sans_Mono'] text-[#4B6B88]">
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Trending
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Developers
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Design
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Community
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-3xl">
          <div className="rounded-2xl border border-[#E6EEF5] bg-white/90 shadow-sm p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-[#0B2A43]">
                Want to follow a private profile?
              </div>
              <div className="text-xs text-[#4B6B88]">
                Send a request with a short note.
              </div>
            </div>
            <Button
              asChild
              className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white rounded-full"
            >
              <a href="/send-request">Send request</a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-2 pb-10">
          {loading ? (
            <p>Fetching Posts ...</p>
          ) : post?.length > 0 ? (
            post.map((post) => {
              const postId = String(post._id);
              const rawPostImage = post.post?.[0];
              const imgUrl = normalizeAssetUrl(rawPostImage);
              const author =
                post.userId && typeof post.userId === "object"
                  ? post.userId
                  : null;
              const authorUsername = author?.username ?? "";
              const postState = {
                post: {
                  id: postId,
                  image: rawPostImage,
                  caption: post.caption,
                  audio: post.descAudio,
                  likes: post.likesCount,
                  comments: post.commentsCount,
                },
                author: {
                  username: authorUsername,
                  avatar: author?.profilePhoto ?? "",
                },
              };
              return (
                <Link
                  key={post._id}
                  to={postId ? `/post/${postId}` : "/addComment"}
                  state={postState}
                  className="relative aspect-square group cursor-pointer overflow-hidden rounded-md bg-gray-100 border border-gray-100 shadow-sm"
                >
                  <img
                    src={imgUrl}
                    alt="Explore Post"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 sm:gap-6 px-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-sm sm:text-base md:text-lg">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-white" />
                      <span>{post.likesCount}</span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-sm sm:text-base md:text-lg">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-white" />
                      <span>{post.commentsCount}</span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p>No Post to see in feed now See latter</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
