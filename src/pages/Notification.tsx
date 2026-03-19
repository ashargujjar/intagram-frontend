import Nav from "@/components/Nav";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// 🛑 STATIC MOCK DATA
const mockNotifications = [
  {
    id: 1,
    type: "like",
    user: {
      name: "Zainab Malik",
      username: "@zainab.codes",
      avatar: "https://i.pravatar.cc/150?u=zainab",
    },
    postImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=200&auto=format&fit=crop",
    time: "2h",
    isUnread: true,
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "Ali Khan",
      username: "@ali_khan",
      avatar: "https://i.pravatar.cc/150?u=ali",
    },
    text: "When is the ShipSmart app officially deploying? Can't wait!",
    postImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=200&auto=format&fit=crop",
    time: "4h",
    isUnread: true,
  },
  {
    id: 3,
    type: "follow",
    user: {
      name: "Sara Ahmed",
      username: "@sara_designs",
      avatar: "https://i.pravatar.cc/150?u=sara",
    },
    isFollowingBack: false,
    time: "1d",
    isUnread: false,
  },
  {
    id: 4,
    type: "like",
    user: {
      name: "Dev Hassan",
      username: "@dev_hassan",
      avatar: "https://i.pravatar.cc/150?u=hassan",
    },
    postImage:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=200&auto=format&fit=crop",
    time: "2d",
    isUnread: false,
  },
  {
    id: 5,
    type: "follow",
    user: {
      name: "Tech Guru",
      username: "@tech_guru",
      avatar: "https://i.pravatar.cc/150?u=guru",
    },
    isFollowingBack: true,
    time: "3d",
    isUnread: false,
  },
];

const Notifications = () => {
  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      {/* 1. SIDEBAR NAVIGATION */}
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      {/* 2. MAIN CONTENT (Notifications List) */}
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
            {mockNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-center justify-between p-4 rounded-2xl transition-colors border border-[#E6EEF5] ${
                  notif.isUnread
                    ? "bg-[#1E4F7A]/5"
                    : "bg-white/90 hover:bg-white"
                }`}
              >
                <div className="flex items-start gap-4 cursor-pointer w-full">
                  <Avatar className="w-11 h-11 border border-gray-100 shadow-sm shrink-0 mt-0.5">
                    <AvatarImage src={notif.user.avatar} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col flex-1 pr-4">
                    <div className="text-sm md:text-base text-[#1A1A1A] leading-snug">
                      <span className="font-bold hover:underline mr-1">
                        {notif.user.username}
                      </span>

                      {notif.type === "like" && <span>liked your photo.</span>}
                      {notif.type === "comment" && (
                        <span>
                          commented on your post:{" "}
                          <span className="text-gray-600">"{notif.text}"</span>
                        </span>
                      )}
                      {notif.type === "follow" && (
                        <span>started following you.</span>
                      )}

                      <span className="text-gray-400 text-xs sm:text-sm ml-2">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {(notif.type === "like" || notif.type === "comment") && (
                    <div className="w-12 h-12 overflow-hidden rounded-md cursor-pointer hover:opacity-80 transition-opacity">
                      <img
                        src={notif.postImage}
                        alt="Post thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {notif.type === "follow" && (
                    <Button
                      className={`px-4 sm:px-6 h-9 rounded-full font-semibold transition-all ${
                        notif.isFollowingBack
                          ? "bg-gray-100 text-[#1A1A1A] hover:bg-red-50 hover:text-red-600 border border-transparent"
                          : "bg-[#1E4F7A] text-white hover:bg-[#143A5A]"
                      }`}
                    >
                      {notif.isFollowingBack ? "Following" : "Follow Back"}
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

export default Notifications;
