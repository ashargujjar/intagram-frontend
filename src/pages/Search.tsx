import Nav from "@/components/Nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

// 🛑 STATIC MOCK DATA - Replace this with your backend API data later
const mockUsers = [
  {
    id: 1,
    name: "Ali Khan",
    username: "@alikhan99",
    avatar: "https://i.pravatar.cc/150?u=ali",
    isFollowing: false, // Not following yet
    isPrivate: true,
  },
  {
    id: 2,
    name: "Sara Ahmed",
    username: "@sara_designs",
    avatar: "https://i.pravatar.cc/150?u=sara",
    isFollowing: true, // Already following
    isPrivate: false,
  },
  {
    id: 3,
    name: "Zainab Malik",
    username: "@zainab.codes",
    avatar: "https://i.pravatar.cc/150?u=zainab",
    isFollowing: false,
    isPrivate: true,
  },
];

const Search = () => {
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

          <div className="flex flex-col gap-3">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-white/90 rounded-2xl border border-[#E6EEF5] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 hover:cursor-pointer">
                  <Link
                    to={`/profile?user=${encodeURIComponent(
                      user.username,
                    )}&private=${user.isPrivate ? "1" : "0"}`}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1A1A1A] leading-tight hover:underline">
                        {user.name}
                      </span>
                      <span className="text-sm text-[#6B7280]">
                        {user.username}
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2">
                  {!user.isPrivate && (
                    <Button
                      className={`px-6 rounded-full font-medium transition-all cursor-pointer ${
                        user.isFollowing
                          ? "bg-gray-100 text-[#1A1A1A] hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-transparent"
                          : "bg-[#1E4F7A] text-white hover:bg-[#143A5A]"
                      }`}
                    >
                      {user.isFollowing ? "Following" : "Follow"}
                    </Button>
                  )}

                  {user.isPrivate && !user.isFollowing && (
                    <Button
                      asChild
                      variant="outline"
                      className="border-gray-300 text-gray-600 rounded-full"
                    >
                      <Link
                        to={`/send-request?user=${encodeURIComponent(
                          user.username,
                        )}`}
                      >
                        Request access
                      </Link>
                    </Button>
                  )}

                  {user.isPrivate && user.isFollowing && (
                    <Button className="bg-gray-100 text-[#1A1A1A] rounded-full">
                      Following
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
