import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

// 🛑 STATIC MOCK DATA
const mockUser = {
  name: "Ashar",
  username: "@ashar.dev",
  bio: "MERN Stack Developer 💻 | CUST '26 🎓 | Building ShipSmart 🚀",
  link: "github.com/ashar",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
  followers: 84,
  following: 84,
  posts: 9,
  isPrivate: true,
  introAudioUrl:
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  introAudioDuration: "0:10",
};

// 🛑 MOCK POSTS GRID DATA
const mockPosts = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop",
    likes: 120,
    comments: 14,
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&auto=format&fit=crop",
    likes: 89,
    comments: 5,
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
    likes: 302,
    comments: 42,
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=400&auto=format&fit=crop",
    likes: 45,
    comments: 2,
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop",
    likes: 210,
    comments: 18,
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop",
    likes: 77,
    comments: 1,
  },
];

const Profile = () => {
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
              src={viewedUser.avatar}
              alt={viewedUser.name}
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
                    <span className="font-bold">{viewedUser.posts}</span>
                    <span className="text-gray-600">posts</span>
                  </div>
                  <Link
                    to={followersLink}
                    className="flex gap-1.5 cursor-pointer hover:underline"
                  >
                    <span className="font-bold">{viewedUser.followers}</span>
                    <span className="text-gray-600">followers</span>
                  </Link>
                  <Link
                    to={followingLink}
                    className="flex gap-1.5 cursor-pointer hover:underline"
                  >
                    <span className="font-bold">{viewedUser.following}</span>
                    <span className="text-gray-600">following</span>
                  </Link>
                </div>
              )}

              <div className="mt-4 text-sm text-[#0B2A43]">
                <span className="font-semibold block mb-1">
                  {viewedUser.name}
                </span>
                <p className="whitespace-pre-line mb-2">{viewedUser.bio}</p>
                <a
                  href={`https://${viewedUser.link}`}
                  className="text-[#1E4F7A] font-semibold hover:underline"
                >
                  {viewedUser.link}
                </a>
              </div>

              {!isLocked && viewedUser.introAudioUrl && (
                <div className="mt-4 rounded-2xl border border-[#E6EEF5] bg-white/90 p-4 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="font-semibold text-[#1E4F7A]">
                      Intro audio
                    </span>
                    <span>{viewedUser.introAudioDuration}</span>
                  </div>
                  <audio
                    controls
                    src={viewedUser.introAudioUrl}
                    className="w-full h-9"
                  />
                  <p className="mt-2 text-xs text-[#4B6B88]">
                    Set from Settings → Intro audio
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
              {mockPosts.map((post) => (
                <div
                  key={post.id}
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
