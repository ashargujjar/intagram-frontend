import Nav from "@/components/Nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquareText, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type FollowRequestItem = {
  id: string;
  username: string;
  name?: string;
  profilePhoto?: string;
};

const FriendRequests = () => {
  const token = localStorage.getItem("RabtaLtoken");
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [requests, setRequests] = useState<FollowRequestItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !backend_url) {
      return;
    }
    const loadRequests = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backend_url}/follow/requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          const list = Array.isArray(data?.data?.requests)
            ? data.data.requests
            : [];
          setRequests(list);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, [token, backend_url]);

  const handleAction = async (id: string, action: "confirm" | "reject") => {
    if (!token || !backend_url) {
      return;
    }
    try {
      const res = await fetch(
        `${backend_url}/follow/requests/${id}/${action}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.ok) {
        setRequests((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const defaultAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop";
  const normalizeAssetUrl = (url?: string) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    if (!backend_url) return url;
    const base = backend_url.replace(/\/+$/, "");
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${base}${path}`;
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
                Private account
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2A43] mt-2">
                Friend requests
              </h1>
              <p className="text-sm text-[#4B6B88] mt-2 max-w-xl">
                Review requests and decide who can see your profile and posts.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-['Spline_Sans_Mono'] text-[#4B6B88]">
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Requests: {requests.length}
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Secure access
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Follow approvals
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-3xl mt-8 flex flex-col gap-4">
          {loading && (
            <div className="text-sm text-[#4B6B88]">Loading requests...</div>
          )}
          {!loading && requests.length === 0 && (
            <div className="text-sm text-[#4B6B88]">No requests yet.</div>
          )}
          {!loading &&
            requests.map((request) => (
              <div
                key={request.id}
                className="rounded-2xl border border-[#E6EEF5] bg-white/90 shadow-sm p-4 md:p-5"
              >
                <Link to={`/profile?user=${request.username}`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 border border-gray-200 shadow-sm">
                        <AvatarImage
                          src={
                            normalizeAssetUrl(request.profilePhoto) ||
                            defaultAvatar
                          }
                        />
                        <AvatarFallback>
                          {request.username?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-[#0B2A43]">
                          {request.name || request.username}
                        </div>
                        <div className="text-sm text-[#6B7280]">
                          @{request.username}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white px-5 rounded-full cursor-pointer"
                        onClick={() => handleAction(request.id, "confirm")}
                      >
                        <UserCheck className="w-4 h-4 mr-2" />
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-300 text-gray-600 rounded-full"
                        onClick={() => handleAction(request.id, "reject")}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>{" "}
                </Link>

                <div className="mt-4 rounded-xl border border-[#E6EEF5] bg-[#F6FBFF] p-3 text-sm text-[#4B6B88] flex items-start gap-2">
                  <MessageSquareText className="w-4 h-4 mt-0.5 text-[#1E4F7A]" />
                  <span>Wants to follow you.</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
