import Nav from "@/components/Nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { FaSearch } from "react-icons/fa";
import { Send, Phone, Video, MoreHorizontal, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

type SearchUserItem = {
  id: string;
  username: string;
  name?: string;
  profilePhoto?: string;
  private?: boolean;
};

type TokenUser = {
  id: string;
  username: string;
  email: string;
};

type ChatMessage = {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
};

type ChatPreview = SearchUserItem & {
  lastMessage?: string;
  time?: string;
  unread?: number;
};

const recentChats: ChatPreview[] = [
  {
    id: "mock-1",
    username: "sarah.m",
    name: "Sarah Milo",
    profilePhoto:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop",
    lastMessage: "Got the draft, looks great.",
    time: "2:45 PM",
    unread: 2,
  },
  {
    id: "mock-2",
    username: "rafay.dev",
    name: "Rafay Khan",
    profilePhoto:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200&auto=format&fit=crop",
    lastMessage: "Lets hop on a call later?",
    time: "1:12 PM",
  },
  {
    id: "mock-3",
    username: "aanya.ali",
    name: "Aanya Ali",
    profilePhoto:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&auto=format&fit=crop",
    lastMessage: "Sent you the file on email.",
    time: "11:03 AM",
  },
];

const mockMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "them",
    text: "Hey! Are you free to review the layout today?",
    time: "09:41 AM",
  },
  {
    id: 2,
    sender: "me",
    text: "Yes, I can review it after lunch.",
    time: "09:42 AM",
  },
  {
    id: 3,
    sender: "them",
    text: "Perfect. I will send the final screens in 10.",
    time: "09:43 AM",
  },
  {
    id: 4,
    sender: "me",
    text: "Sounds good. Thanks!",
    time: "09:44 AM",
  },
];

const Chat = () => {
  const token = localStorage.getItem("RabtaLtoken");
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setFoundUsers] = useState<SearchUserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currUser, setCurUser] = useState<TokenUser>();
  const [activeUser, setActiveUser] = useState<SearchUserItem | null>(null);

  useEffect(() => {
    if (!token) return;
    try {
      const decoded: any = jwtDecode(token);
      setCurUser(decoded);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    const term = searchTerm.trim();
    if (!backend_url || !token) {
      setFoundUsers([]);
      setError("");
      return;
    }
    if (!term) {
      setFoundUsers([]);
      setError("");
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${backend_url}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username: term }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (!res.ok) {
          setFoundUsers([]);
          setError(
            typeof data?.message === "string"
              ? data.message
              : "Unable to search users.",
          );
        } else {
          const list = Array.isArray(data?.data?.users) ? data.data.users : [];
          setFoundUsers(list);
        }
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setError("Unable to search users.");
          setFoundUsers([]);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchTerm, backend_url, token]);

  const normalizeAssetUrl = (url?: string) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    if (!backend_url) return url;
    const base = backend_url.replace(/\/+$/, "");
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${base}${path}`;
  };

  const defaultAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop";

  const hasQuery = searchTerm.trim().length > 0;

  const visibleUsers = useMemo(() => {
    if (!currUser?.username) return users;
    return users.filter((user) => user.username !== currUser.username);
  }, [users, currUser]);

  const displayList: ChatPreview[] = hasQuery ? visibleUsers : recentChats;

  const activeUsername = activeUser
    ? activeUser.username.startsWith("@")
      ? activeUser.username
      : `@${activeUser.username}`
    : "";

  const activeDisplayName = activeUser
    ? activeUser.name || activeUsername
    : "Select a chat";

  const activeSecondary = activeUser
    ? activeUsername
    : "Search and pick a user to start";

  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      <div className="flex-1 flex flex-col mt-4 sm:mt-0 font-['Space_Grotesk']">
        <div className="w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-[#E6EEF5] bg-gradient-to-br from-white via-[#F6FBFF] to-[#FFF4E1] shadow-lg p-6 md:p-8">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
            </div>
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-[#6B7280]">
                Messages
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2A43] mt-2">
                Your chats and conversations
              </h1>
              <p className="text-sm text-[#4B6B88] mt-2 max-w-xl">
                Search for people and open a new chat instantly.
              </p>

              <div className="relative w-full max-w-2xl mt-5">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchTerm(e.target.value);
                  }}
                  placeholder="Search for users to chat..."
                  className="pl-12 py-5 text-base rounded-full bg-white shadow-sm border-gray-100 focus-visible:ring-[#1E4F7A]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <div className="rounded-2xl border border-[#E6EEF5] bg-white/90 shadow-sm p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-[#6B7280]">
                {hasQuery ? "Search Results" : "Recent Chats"}
              </div>
              <span className="text-[11px] text-[#6B7280]">
                {hasQuery
                  ? `${displayList.length} found`
                  : `${recentChats.length} active`}
              </span>
            </div>

            {loading && (
              <p className="text-sm text-[#4B6B88]">Searching...</p>
            )}
            {!loading && error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {!loading && !error && displayList.length > 0 && (
              <div className="flex flex-col gap-2">
                {displayList.map((user) => {
                  const displayUsername = user.username.startsWith("@")
                    ? user.username
                    : `@${user.username}`;
                  const avatarSrc =
                    normalizeAssetUrl(user.profilePhoto) || defaultAvatar;
                  const isActive = activeUser?.id === user.id;
                  const previewText =
                    user.lastMessage || "Tap to start a conversation";
                  const previewTime = user.time || "";
                  const unread = user.unread || 0;

                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => setActiveUser(user)}
                      className={`group w-full flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all ${
                        isActive
                          ? "border-[#1E4F7A] bg-[#F6FBFF]"
                          : "border-transparent hover:bg-[#F6FBFF]"
                      }`}
                    >
                      <Avatar className="w-10 h-10 border border-gray-200">
                        <AvatarImage src={avatarSrc} alt={displayUsername} />
                        <AvatarFallback>
                          {user.name
                            ? user.name.slice(0, 1).toUpperCase()
                            : displayUsername.slice(1, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-[#0B2A43] truncate">
                            {user.name || displayUsername}
                          </span>
                          <span className="text-[11px] text-[#6B7280]">
                            {previewTime}
                          </span>
                        </div>
                        <div className="text-xs text-[#6B7280] truncate">
                          {previewText}
                        </div>
                      </div>
                      {unread > 0 && (
                        <span className="min-w-[22px] h-[22px] rounded-full bg-[#F2A32C] text-white text-[11px] flex items-center justify-center font-semibold">
                          {unread}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {!loading && !error && displayList.length === 0 && hasQuery && (
              <p className="text-sm text-[#4B6B88]">No users found.</p>
            )}

            {!loading && !error && displayList.length === 0 && !hasQuery && (
              <p className="text-sm text-[#4B6B88]">
                Search for a user to start a chat.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-[#E6EEF5] bg-white/90 shadow-sm flex flex-col min-h-[520px]">
            <div className="flex items-center justify-between gap-4 border-b border-[#E6EEF5] p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-11 h-11 border border-gray-200">
                  {activeUser ? (
                    <AvatarImage
                      src={
                        normalizeAssetUrl(activeUser.profilePhoto) ||
                        defaultAvatar
                      }
                      alt={activeDisplayName}
                    />
                  ) : null}
                  <AvatarFallback>
                    {activeUser
                      ? activeDisplayName.slice(0, 1).toUpperCase()
                      : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="font-semibold text-[#0B2A43] truncate">
                    {activeDisplayName}
                  </div>
                  <div className="text-xs text-[#6B7280] truncate">
                    {activeSecondary}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="w-9 h-9 rounded-full border border-[#E6EEF5] text-[#1E4F7A] flex items-center justify-center hover:bg-[#F6FBFF] transition"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="w-9 h-9 rounded-full border border-[#E6EEF5] text-[#1E4F7A] flex items-center justify-center hover:bg-[#F6FBFF] transition"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-5 bg-[#F6FBFF]/40 overflow-y-auto">
              {activeUser ? (
                <div className="flex flex-col gap-4">
                  {mockMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="max-w-[75%]">
                        <div
                          className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
                            msg.sender === "me"
                              ? "bg-[#1E4F7A] text-white rounded-br-none"
                              : "bg-white text-[#0B2A43] border border-[#E6EEF5] rounded-bl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div
                          className={`mt-1 text-[10px] text-[#6B7280] ${
                            msg.sender === "me" ? "text-right" : "text-left"
                          }`}
                        >
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-14 h-14 rounded-full bg-white border border-[#E6EEF5] flex items-center justify-center text-[#1E4F7A] shadow-sm">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#0B2A43]">
                    No chat selected
                  </h3>
                  <p className="text-sm text-[#4B6B88] mt-2">
                    Use the search bar above to find someone and start chatting.
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#E6EEF5]">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2"
              >
                <Input
                  type="text"
                  disabled={!activeUser}
                  placeholder={
                    activeUser
                      ? `Message ${activeDisplayName}`
                      : "Select a user to start chatting"
                  }
                  className="flex-1 rounded-full border-gray-200 focus-visible:ring-[#1E4F7A] bg-white"
                />
                <Button
                  type="button"
                  disabled={!activeUser}
                  className="w-11 h-11 rounded-full bg-[#1E4F7A] hover:bg-[#F2A32C] text-white p-0 shrink-0 shadow-sm transition-colors disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
