import { useFoll_wer_wing } from "@/components/hooks/fol-wer-wing";
import Nav from "@/components/Nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

const Followers = () => {
  const [searchParams] = useSearchParams();
  const viewedUsername = searchParams.get("user");
  const isPrivateParam = searchParams.get("private") === "1";
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("RabtaLtoken");
  const { username } = useParams();
  const targetId = username || viewedUsername || "me";
  const response = useFoll_wer_wing(targetId, backend_url);
  const [localFollowers, setLocalFollowers] = useState(response.followers);
  const [actionBusy, setActionBusy] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLocalFollowers(response.followers);
  }, [response.followers]);

  const data = localFollowers ?? response.followers;
  const isCurrentUser =
    data?.currUser?._id && username
      ? String(data.currUser._id) === String(username)
      : !viewedUsername;
  const isFollowingTarget = Array.isArray(
    data?.currUser?.followed,
  )
    ? data!.currUser.followed!.includes(String(username))
    : false;
  const isLocked = isPrivateParam && !isCurrentUser && !isFollowingTarget;
  const viewedLabel = viewedUsername || "you";
  const profileLink = viewedUsername
    ? `/profile?user=${encodeURIComponent(viewedUsername)}&private=${
        isPrivateParam ? "1" : "0"
      }`
    : "/profile";
  const followingLink = username
    ? viewedUsername
      ? `/following/${encodeURIComponent(username)}?user=${encodeURIComponent(
          viewedUsername,
        )}&private=${isPrivateParam ? "1" : "0"}`
      : `/following/${encodeURIComponent(username)}`
    : viewedUsername
      ? `/following?user=${encodeURIComponent(viewedUsername)}&private=${
          isPrivateParam ? "1" : "0"
        }`
      : "/following";

  const handleFollowToggle = async (
    follower: NonNullable<typeof data>["profiles"][number],
  ) => {
    if (!backend_url || !token) return;
    const followerId = String(follower.userId?._id ?? "");
    if (!followerId || actionBusy[followerId]) return;
    const followerUsername = follower.userId?.username;
    if (!followerUsername) return;
    const isFollowingBack = Array.isArray(data?.currUser?.followed)
      ? data!.currUser.followed!.includes(String(followerId))
      : false;
    const method = isFollowingBack ? "DELETE" : "POST";
    setActionBusy((prev) => ({ ...prev, [followerId]: true }));
    try {
      const res = await fetch(
        `${backend_url}/follow/${encodeURIComponent(followerUsername)}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const payload = await res.json();
      if (res.ok) {
        const relation = payload?.data?.relation;
        const nextIsFollowing = Boolean(relation?.isFollowing);
        setLocalFollowers((prev) => {
          if (!prev) return prev;
          const prevFollowed = Array.isArray(prev.currUser?.followed)
            ? prev.currUser!.followed!
            : [];
          const nextFollowed = nextIsFollowing
            ? Array.from(new Set([...prevFollowed, followerId]))
            : prevFollowed.filter((id) => String(id) !== followerId);
          return {
            ...prev,
            currUser: prev.currUser
              ? { ...prev.currUser, followed: nextFollowed }
              : prev.currUser,
          };
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setActionBusy((prev) => {
        const next = { ...prev };
        delete next[followerId];
        return next;
      });
    }
  };

  const handleRemoveFollower = async (
    follower: NonNullable<typeof data>["profiles"][number],
  ) => {
    if (!backend_url || !token) return;
    const followerId = String(follower.userId?._id ?? "");
    if (!followerId || actionBusy[followerId]) return;
    setActionBusy((prev) => ({ ...prev, [followerId]: true }));
    try {
      const res = await fetch(`${backend_url}/followers/${followerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setLocalFollowers((prev) => {
          if (!prev) return prev;
          const nextProfiles = prev.profiles.filter((item) => {
            const id = item.userId?._id ?? "";
            return String(id) !== followerId;
          });
          return { ...prev, profiles: nextProfiles };
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setActionBusy((prev) => {
        const next = { ...prev };
        delete next[followerId];
        return next;
      });
    }
  };

  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      <div className="flex-1 mt-4 sm:mt-0 font-['Space_Grotesk']">
        <div className="w-full max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-[#E6EEF5] bg-gradient-to-br from-white via-[#F6FBFF] to-[#FFF4E1] shadow-lg p-6 md:p-8">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
            </div>
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-[#6B7280]">
                Connections
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2A43] mt-2">
                Followers
              </h1>
              <p className="text-sm text-[#4B6B88] mt-2 max-w-xl">
                People who follow {viewedLabel}.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link
                  to={profileLink}
                  className="text-sm font-semibold text-[#1E4F7A] hover:underline"
                >
                  Back to profile
                </Link>
                <span className="text-xs text-[#9CA3AF]">|</span>
                <Link
                  to={followingLink}
                  className="text-sm font-semibold text-[#1E4F7A] hover:underline"
                >
                  View following
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-['Spline_Sans_Mono'] text-[#4B6B88]">
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Showing: {data?.profiles?.length ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isLocked ? (
          <div className="mt-8 rounded-2xl border border-[#E6EEF5] bg-white/90 p-4 text-sm text-[#4B6B88] max-w-3xl">
            This account is private. Send a request to see followers.
          </div>
        ) : (
          <div className="w-full max-w-3xl mt-8 flex flex-col gap-3">
            {response.loading && (
              <div className="rounded-2xl border border-[#E6EEF5] bg-white/95 shadow-sm p-4 text-sm text-[#4B6B88]">
                Loading followers...
              </div>
            )}
            {!response.loading && data?.profiles?.length === 0 && (
                <div className="rounded-2xl border border-[#E6EEF5] bg-white/95 shadow-sm p-4 text-sm text-[#4B6B88]">
                  No followers yet.
                </div>
              )}
            {data?.profiles?.map((follower) => {
              const followerId = follower.userId?._id;
              const followerUsername = follower.userId?.username;
              const profileHref = followerUsername
                ? `/profile?user=${encodeURIComponent(
                    followerUsername,
                  )}&private=${follower.private ? "1" : "0"}`
                : "/profile";
              const isFollowingBack = Array.isArray(
                data?.currUser?.followed,
              )
                ? data!.currUser.followed!.includes(String(followerId))
                : false;
              const isBusy = actionBusy[String(followerId)];
              const avatarSrc = follower.profilePhoto
                ? follower.profilePhoto.startsWith("http")
                  ? follower.profilePhoto
                  : backend_url
                    ? `${backend_url}${
                        follower.profilePhoto.startsWith("/") ? "" : "/"
                      }${follower.profilePhoto}`
                    : follower.profilePhoto
                : "";

              return (
                <div
                  key={followerId}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-[#E6EEF5] bg-white/95 shadow-sm p-4"
                >
                  <Link
                    to={profileHref}
                    className="flex items-center gap-3 hover:opacity-90"
                  >
                    <Avatar
                      size="lg"
                      className="border border-gray-100 shadow-sm"
                    >
                      <AvatarImage
                        src={avatarSrc}
                        alt={follower.name || follower.userId?.username}
                      />
                      <AvatarFallback>
                        {(follower.name || follower.userId?.username || "?")
                          .substring(0, 1)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-[#0B2A43]">
                        {follower.name}
                      </div>
                      <div className="text-sm text-[#6B7280]">
                        {follower.userId.username}
                      </div>
                    </div>
                  </Link>

                  <div>
                    <Button
                      onClick={() => handleFollowToggle(follower)}
                      disabled={isBusy}
                      className={`px-4 h-9 rounded-full font-semibold transition-all disabled:opacity-60 ${
                        isFollowingBack
                          ? "bg-gray-100 text-[#1A1A1A] hover:bg-red-50 hover:text-red-600"
                          : "bg-[#1E4F7A] text-white hover:bg-[#143A5A]"
                      }`}
                    >
                      {isFollowingBack ? "Following" : "Follow Back"}
                    </Button>

                    {isFollowingBack && (
                      <Button
                        variant="outline"
                        onClick={() => handleRemoveFollower(follower)}
                        disabled={isBusy}
                        className="px-4 h-9 rounded-full border-gray-300 text-gray-600 disabled:opacity-60"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Followers;
