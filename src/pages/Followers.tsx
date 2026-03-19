import Nav from "@/components/Nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";

const mockUser = {
  name: "Ashar",
  username: "@ashar.dev",
  isPrivate: true,
  followers: 84,
  following: 84,
};

const mockFollowers = [
  {
    id: 1,
    name: "Zainab Malik",
    username: "@zainab.codes",
    avatar: "https://i.pravatar.cc/150?u=zainab",
    isFollowingBack: false,
  },
  {
    id: 2,
    name: "Ali Khan",
    username: "@ali_khan",
    avatar: "https://i.pravatar.cc/150?u=ali",
    isFollowingBack: true,
  },
  {
    id: 3,
    name: "Sara Ahmed",
    username: "@sara_designs",
    avatar: "https://i.pravatar.cc/150?u=sara",
    isFollowingBack: false,
  },
  {
    id: 4,
    name: "Dev Hassan",
    username: "@dev_hassan",
    avatar: "https://i.pravatar.cc/150?u=hassan",
    isFollowingBack: true,
  },
];

const Followers = () => {
  const [searchParams] = useSearchParams();
  const viewedUsername = searchParams.get("user");
  const isPrivateParam = searchParams.get("private") === "1";
  const isCurrentUser = !viewedUsername;
  const isFollowing = false;
  const viewedUser = {
    ...mockUser,
    username: viewedUsername || mockUser.username,
    isPrivate: isPrivateParam || mockUser.isPrivate,
  };
  const isLocked = viewedUser.isPrivate && !isFollowing && !isCurrentUser;
  const profileLink = viewedUsername
    ? `/profile?user=${encodeURIComponent(
        viewedUser.username,
      )}&private=${viewedUser.isPrivate ? "1" : "0"}`
    : "/profile";
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
                People who follow {viewedUser.username}.
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
                  Total: {viewedUser.followers}
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Showing: {mockFollowers.length}
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Follow backs
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
            {mockFollowers.map((follower) => (
              <div
                key={follower.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-[#E6EEF5] bg-white/95 shadow-sm p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar size="lg" className="border border-gray-100 shadow-sm">
                    <AvatarImage
                      src={follower.avatar}
                      alt={follower.name}
                    />
                    <AvatarFallback>
                      {follower.name.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-[#0B2A43]">
                      {follower.name}
                    </div>
                    <div className="text-sm text-[#6B7280]">
                      {follower.username}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    className={`px-4 h-9 rounded-full font-semibold transition-all ${
                      follower.isFollowingBack
                        ? "bg-gray-100 text-[#1A1A1A] hover:bg-red-50 hover:text-red-600 border border-transparent"
                        : "bg-[#1E4F7A] text-white hover:bg-[#143A5A]"
                    }`}
                  >
                    {follower.isFollowingBack ? "Following" : "Follow Back"}
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 h-9 rounded-full border-gray-300 text-gray-600"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Followers;
