import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Profileprop } from "@/components/Settings/types";

type PhotoPost = {
  _id?: string;
  id?: string;
  post?: string[];
  descAudio?: string;
  caption?: string;
  likesCount?: number;
  commentsCount?: number;
};

type GridItem = {
  id: string | number;
  postId: string | number;
  img: string;
  likes: number;
  comments: number;
  caption?: string;
  audio?: string;
};

const Profile = () => {
  const [searchParams] = useSearchParams();
  const viewedUsername = searchParams.get("user");
  const isPrivateParam = searchParams.get("private") === "1";
  const token = localStorage.getItem("RabtaLtoken");
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [profile, setProfile] = useState<Profileprop | null>(null);
  const [posts, setPosts] = useState<PhotoPost[]>([]);

  useEffect(() => {
    if (!token || viewedUsername || !backend_url) {
      return;
    }
    async function getBio() {
      try {
        const res = await fetch(`${backend_url}/bio`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          setProfile(data?.data?.userbio ?? null);
        } else {
          console.log(data?.message ?? "Unable to load profile details.");
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchPhotos() {
      try {
        const res = await fetch(`${backend_url}/photo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          setPosts(Array.isArray(data?.data?.photos) ? data.data.photos : []);
        } else {
          console.log(data?.message ?? "Unable to load posts.");
        }
      } catch (error) {
        console.error(error);
      }
    }
    getBio();
    fetchPhotos();
  }, [token, backend_url, viewedUsername]);

  const isCurrentUser = !viewedUsername;
  const isFollowing = false;
  const fallbackUser: Profileprop = {
    username: viewedUsername || "user",
    email: "",
    name: "",
    bio: "",
    url: "",
    introAudio: "",
    profilePhoto: "",
    private: isPrivateParam,
    followers: 0,
    following: 0,
    posts: 0,
  };
  const safeProfile = profile ?? fallbackUser;
  const viewedUser = {
    ...fallbackUser,
    ...safeProfile,
    username: viewedUsername || safeProfile.username || "user",
    isPrivate:
      typeof safeProfile.private === "boolean"
        ? safeProfile.private
        : isPrivateParam,
  };
  const followingCount =
    (safeProfile as { followings?: number }).followings ??
    safeProfile.following ??
    0;
  const normalizeAssetUrl = (url?: string) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    if (!backend_url) return url;
    const base = backend_url.replace(/\/+$/, "");
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${base}${path}`;
  };
  const profilePhotoSrc =
    normalizeAssetUrl(viewedUser.profilePhoto) ||
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop";
  const introAudioSrc = normalizeAssetUrl(viewedUser.introAudio);
  const gridItems: GridItem[] = posts
    .map((post, index) => {
      const postId = post._id ?? post.id;
      const img = post.post?.[0];
      if (!postId || !img) return null;
      return {
        id: postId,
        postId,
        img: normalizeAssetUrl(img),
        likes: post.likesCount ?? 0,
        comments: post.commentsCount ?? 0,
        caption: post.caption,
        audio: normalizeAssetUrl(post.descAudio),
      };
    })
    .filter((item): item is GridItem => item !== null);
  const postCount = gridItems.length ? gridItems.length : viewedUser.posts ?? 0;
  const profileUrl = viewedUser.url?.trim() || "";
  const profileHref = profileUrl
    ? /^https?:\/\//i.test(profileUrl)
      ? profileUrl
      : `https://${profileUrl}`
    : "";

  const isLocked = viewedUser.isPrivate && !isFollowing && !isCurrentUser;
  const followersLink = viewedUsername
    ? `/followers?user=${encodeURIComponent(
        viewedUser.username,
      )}&private=${viewedUser.isPrivate ? "1" : "0"}`
    : "/followers";
  const followingLink = viewedUsername
    ? `/following?user=${encodeURIComponent(
        viewedUser.username,
      )}&private=${viewedUser.isPrivate ? "1" : "0"}`
    : "/following";

  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      <div className="flex-1 flex flex-col gap-10 mt-4 sm:mt-0 font-['Space_Grotesk']">
        <div className="relative overflow-hidden rounded-3xl border border-[#E6EEF5] bg-gradient-to-br from-white via-[#F6FBFF] to-[#FFF4E1] shadow-lg p-6 md:p-8">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-16 -right-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
            <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
          </div>

          <div className="relative flex flex-col lg:flex-row gap-6 lg:items-center">
            <img
              src={profilePhotoSrc}
              alt={viewedUser.name || viewedUser.username}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border border-white/80 shadow-md shrink-0"
            />

            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#6B7280]">
                    Profile
                  </div>
                  <h2 className="text-2xl font-semibold text-[#0B2A43] mt-1">
                    {viewedUser.username}
                  </h2>
                </div>

                {isCurrentUser && (
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <Button
                      asChild
                      className="flex-1 md:flex-none px-6 rounded-full font-semibold bg-white text-[#1A1A1A] border border-[#E6EEF5] hover:bg-[#F6FBFF]"
                    >
                      <Link to="/settings">Edit profile</Link>
                    </Button>
                  </div>
                )}

                {!isCurrentUser && (
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {!viewedUser.isPrivate && (
                      <Button
                        className={`flex-1 md:flex-none px-6 rounded-full font-semibold transition-all ${
                          isFollowing
                            ? "bg-white text-[#1A1A1A] border border-[#E6EEF5] hover:bg-red-50 hover:text-red-600"
                            : "bg-[#1E4F7A] text-white hover:bg-[#143A5A]"
                        }`}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                    )}

                    {viewedUser.isPrivate && !isFollowing && (
                      <>
                        <Button
                          asChild
                          className="flex-1 md:flex-none px-6 rounded-full font-semibold bg-[#1E4F7A] text-white hover:bg-[#143A5A]"
                        >
                          <Link
                            to={`/send-request?user=${encodeURIComponent(
                              viewedUser.username,
                            )}`}
                          >
                            Request access
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="px-6 rounded-full font-semibold border-[#D6E2EC]"
                        >
                          <Link
                            to={`/send-request?user=${encodeURIComponent(
                              viewedUser.username,
                            )}`}
                          >
                            Request with note
                          </Link>
                        </Button>
                      </>
                    )}

                    {viewedUser.isPrivate && isFollowing && (
                      <Button className="bg-gray-100 text-[#1A1A1A] rounded-full">
                        Following
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      className="px-6 rounded-full font-semibold border-[#D6E2EC]"
                    >
                      Message
                    </Button>
                  </div>
                )}
              </div>

              {!isLocked && (
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#1A1A1A]">
                  <div className="flex gap-1.5">
                    <span className="font-bold">{postCount}</span>
                    <span className="text-gray-600">posts</span>
                  </div>
                  <Link
                    to={followersLink}
                    className="flex gap-1.5 cursor-pointer hover:underline"
                  >
                    <span className="font-bold">
                      {viewedUser.followers ?? 0}
                    </span>
                    <span className="text-gray-600">followers</span>
                  </Link>
                  <Link
                    to={followingLink}
                    className="flex gap-1.5 cursor-pointer hover:underline"
                  >
                    <span className="font-bold">{followingCount}</span>
                    <span className="text-gray-600">following</span>
                  </Link>
                </div>
              )}

              <div className="mt-4 text-sm text-[#0B2A43]">
                <span className="font-semibold block mb-1">
                  {viewedUser.name}
                </span>
                <p className="whitespace-pre-line mb-2">{viewedUser.bio}</p>
                {profileHref ? (
                  <a
                    href={profileHref}
                    className="text-[#1E4F7A] font-semibold hover:underline"
                  >
                    {viewedUser.url}
                  </a>
                ) : null}
              </div>

              {!isLocked && introAudioSrc && (
                <div className="mt-4 rounded-2xl border border-[#E6EEF5] bg-white/90 p-4 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="font-semibold text-[#1E4F7A]">
                      Intro audio
                    </span>
                  </div>
                  <audio controls src={introAudioSrc} className="w-full h-9" />
                  <p className="mt-2 text-xs text-[#4B6B88]">
                    Set from Settings {"->"} Intro audio
                  </p>
                </div>
              )}

              {isLocked && (
                <div className="mt-4 rounded-2xl border border-[#E6EEF5] bg-white/90 p-4 text-sm text-[#4B6B88]">
                  This account is private. Send a request to see posts,
                  followers, and more.
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-['Spline_Sans_Mono'] text-[#4B6B88]">
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Verified profile
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Active today
                </span>
              </div>
            </div>
          </div>
        </div>

        {!isLocked && (
          <div className="rounded-3xl border border-[#E6EEF5] bg-white/80 shadow-sm p-4 md:p-6">
            <div className="text-xs uppercase tracking-widest text-[#6B7280]">
              Posts
            </div>
            <h3 className="text-lg font-semibold text-[#0B2A43] mt-2">
              Recent uploads
            </h3>

            <div className="grid grid-cols-3 gap-1 sm:gap-4 mt-6">
              {gridItems.length === 0 ? (
                <div className="col-span-3 text-center text-sm text-[#4B6B88]">
                  No posts yet.
                </div>
              ) : (
                gridItems.map((post) => (
                  <Link
                    key={post.id}
                    to={`/post/${post.postId}`}
                    state={{
                      post: {
                        id: post.postId,
                        image: post.img,
                        caption: post.caption,
                        audio: post.audio,
                        likes: post.likes,
                        comments: post.comments,
                      },
                      author: {
                        username: viewedUser.username,
                        avatar: profilePhotoSrc,
                      },
                    }}
                    className="relative aspect-square group cursor-pointer bg-gray-100 overflow-hidden rounded-xl"
                  >
                    <img
                      src={post.img}
                      alt="Post"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6">
                      <div className="flex items-center gap-2 text-white font-bold text-lg">
                        <Heart className="w-6 h-6 fill-white" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white font-bold text-lg">
                        <MessageCircle className="w-6 h-6 fill-white" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
