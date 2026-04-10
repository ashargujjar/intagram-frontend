import Nav from "@/components/Nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
// import jwt_decode from "jwt-decode";
type SearchUserItem = {
  id: string;
  username: string;
  name?: string;
  profilePhoto?: string;
  private?: boolean;
  followers?: number;
  followings?: number;
  posts?: number;
};
type TokenUser = {
  id: string;
  username: string;
  email: string;
};

const Search = () => {
  const token = localStorage.getItem("RabtaLtoken");

  const [username, setUsername] = useState<string>("");
  const [users, setFoundUsers] = useState<SearchUserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currUser, setCurUser] = useState<TokenUser>();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      setCurUser(decoded);
      console.log(decoded);
    }
    const term = username.trim();
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
          console.log(list);
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
  }, [username, backend_url, token]);

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
  const hasQuery = username.trim().length > 0;

  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      {/* Sidebar Navigation */}
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col mt-4 sm:mt-0 font-['Space_Grotesk']">
        <div className="w-full max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-[#E6EEF5] bg-gradient-to-br from-white via-[#F6FBFF] to-[#FFF4E1] shadow-lg p-6 md:p-8">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
            </div>
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-[#6B7280]">
                Search
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2A43] mt-2">
                Find people on Rabta
              </h1>
              <p className="text-sm text-[#4B6B88] mt-2 max-w-xl">
                Look up creators, friends, and collaborators.
              </p>

              <div className="relative w-full max-w-2xl mt-5">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Search for users..."
                  className="pl-12 py-5 text-base rounded-full bg-white shadow-sm border-gray-100 focus-visible:ring-[#1E4F7A]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl mt-8">
          <h3 className="text-xs font-['Spline_Sans_Mono'] text-[#6B7280] mb-4 uppercase tracking-wider">
            Suggested Users
          </h3>
          {loading && <p className="text-sm text-[#4B6B88]">Searching...</p>}
          {!loading && error && <p className="text-sm text-red-600">{error}</p>}
          {!loading && !error && users.length > 0 ? (
            <div className="flex flex-col gap-3">
              {users.map((user) => {
                const displayUsername = user.username.startsWith("@")
                  ? user.username
                  : `@${user.username}`;
                const isPrivate = Boolean(user.private);
                const avatarSrc =
                  normalizeAssetUrl(user.profilePhoto) || defaultAvatar;
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-white/90 rounded-2xl border border-[#E6EEF5] shadow-sm hover:shadow-md transition-shadow"
                  >
                    {currUser?.username === user.username ? (
                      <div className="flex items-center gap-4 hover:cursor-pointer">
                        <Link to="/profile" className="flex items-center gap-4">
                          <img
                            src={avatarSrc}
                            alt={user.name || displayUsername}
                            className="w-12 h-12 rounded-full object-cover border border-gray-200"
                          />
                          <div className="flex flex-col">
                            <span className="font-bold text-[#1A1A1A] leading-tight hover:underline">
                              {user.name || displayUsername}
                            </span>
                            <span className="text-sm text-[#6B7280]">
                              {displayUsername}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 hover:cursor-pointer">
                        <Link
                          to={`/profile?user=${encodeURIComponent(
                            user.username,
                          )}&private=${isPrivate ? "1" : "0"}`}
                          className="flex items-center gap-4"
                        >
                          <img
                            src={avatarSrc}
                            alt={user.name || displayUsername}
                            className="w-12 h-12 rounded-full object-cover border border-gray-200"
                          />
                          <div className="flex flex-col">
                            <span className="font-bold text-[#1A1A1A] leading-tight hover:underline">
                              {user.name || displayUsername}
                            </span>
                            <span className="text-sm text-[#6B7280]">
                              {displayUsername}
                            </span>
                          </div>
                        </Link>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {currUser?.username === user.username ? (
                        <Link to="/profile">
                          <Button className="px-6 rounded-full font-medium transition-all cursor-pointer bg-[#1E4F7A] text-white hover:bg-[#143A5A]">
                            Profile
                          </Button>
                        </Link>
                      ) : (
                        <Button className="px-6 rounded-full font-medium transition-all cursor-pointer bg-[#1E4F7A] text-white hover:bg-[#143A5A]">
                          Follow
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
          {!loading && !error && hasQuery && users.length === 0 && (
            <p className="text-sm text-[#4B6B88]">No users found.</p>
          )}
          {!loading && !error && !hasQuery && (
            <p className="text-sm text-[#4B6B88]">
              Start typing to search for users.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
