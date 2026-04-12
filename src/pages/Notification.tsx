import Nav from "@/components/Nav";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type NotificationItem = {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  message?: string;
  read?: boolean;
  createdAt?: string;
  fromUser?: {
    id?: string;
    username?: string;
    name?: string;
    profilePhoto?: string;
  };
  postId?: string;
  postImage?: string;
};

const Notifications = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("RabtaLtoken");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!backend_url || !token) return;
    const loadNotifications = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${backend_url}/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          const list = Array.isArray(data?.data?.notifications)
            ? data.data.notifications
            : [];
          setNotifications(list);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadNotifications();
  }, [backend_url, token]);

  const normalizeAssetUrl = (url?: string) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    if (!backend_url) return url;
    const base = backend_url.replace(/\/+$/, "");
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${base}${path}`;
  };

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

  const defaultAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop";

  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      <div className="flex-1 flex flex-col mt-4 sm:mt-0 font-['Space_Grotesk']">
        <div className="w-full max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-[#E6EEF5] bg-gradient-to-br from-white via-[#F6FBFF] to-[#FFF4E1] shadow-lg p-6 md:p-8">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
            </div>
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-[#6B7280]">
                Notifications
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2A43] mt-2">
                Stay updated
              </h1>
              <p className="text-sm text-[#4B6B88] mt-2 max-w-xl">
                See likes, comments, and new followers in one place.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-['Spline_Sans_Mono'] text-[#4B6B88]">
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Unread
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Mentions
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Following
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl mt-8">
          <div className="flex flex-col gap-2">
            {loading && (
              <div className="text-sm text-[#4B6B88]">
                Loading notifications...
              </div>
            )}
            {!loading && notifications.length === 0 && (
              <div className="text-sm text-[#4B6B88]">
                No notifications yet.
              </div>
            )}
            {!loading &&
              notifications.map((notif) => {
                const user = notif.fromUser;
                const username = user?.username ?? "user";
                const displayUsername = username.startsWith("@")
                  ? username
                  : `@${username}`;
                const avatarSrc =
                  normalizeAssetUrl(user?.profilePhoto) || defaultAvatar;
                const timeLabel = formatRelativeTime(notif.createdAt);
                const isUnread = !notif.read;
                const postImage = normalizeAssetUrl(notif.postImage);
                const profileLink = user?.username
                  ? `/profile?user=${encodeURIComponent(user.username)}`
                  : "/profile";

                return (
                  <div
                    key={notif.id}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-colors border border-[#E6EEF5] ${
                      isUnread
                        ? "bg-[#1E4F7A]/5"
                        : "bg-white/90 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-4 cursor-pointer w-full">
                      <Avatar className="w-11 h-11 border border-gray-100 shadow-sm shrink-0 mt-0.5">
                        <AvatarImage src={avatarSrc} />
                        <AvatarFallback>
                          {displayUsername.substring(1, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col flex-1 pr-4">
                        <div className="text-sm md:text-base text-[#1A1A1A] leading-snug">
                          <Link
                            to={profileLink}
                            className="font-bold hover:underline mr-1"
                          >
                            {displayUsername}
                          </Link>

                          {notif.type === "like" && (
                            <span>liked your photo.</span>
                          )}
                          {notif.type === "comment" && (
                            <span>
                              {notif.message
                                ? notif.message
                                : "commented on your post."}
                            </span>
                          )}
                          {notif.type === "follow" && (
                            <span>started following you.</span>
                          )}
                          {notif.type === "mention" && (
                            <span>mentioned you.</span>
                          )}

                          {timeLabel && (
                            <span className="text-gray-400 text-xs sm:text-sm ml-2">
                              {timeLabel}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {(notif.type === "like" || notif.type === "comment") &&
                        postImage && (
                          <div className="w-12 h-12 overflow-hidden rounded-md cursor-pointer hover:opacity-80 transition-opacity">
                            <img
                              src={postImage}
                              alt="Post thumbnail"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                      {notif.type === "follow" && (
                        <Button className="px-4 sm:px-6 h-9 rounded-full font-semibold transition-all bg-[#1E4F7A] text-white hover:bg-[#143A5A]">
                          Follow Back
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
