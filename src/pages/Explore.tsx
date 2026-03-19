import Nav from "@/components/Nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Heart, MessageCircle } from "lucide-react";

// 🛑 STATIC MOCK DATA for Explore Grid
const mockExplorePosts = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=400&auto=format&fit=crop",
    likes: "1.2k",
    comments: 88,
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1618788372246-79faff05330e?q=80&w=400&auto=format&fit=crop",
    likes: 902,
    comments: 45,
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400&auto=format&fit=crop",
    likes: "2.5k",
    comments: 150,
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=400&auto=format&fit=crop",
    likes: 670,
    comments: 22,
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=400&auto=format&fit=crop",
    likes: "3.1k",
    comments: 210,
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop",
    likes: 880,
    comments: 56,
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=400&auto=format&fit=crop",
    likes: "1.1k",
    comments: 73,
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop",
    likes: 950,
    comments: 60,
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=400&auto=format&fit=crop",
    likes: "4k",
    comments: 312,
  },
  {
    id: 10,
    img: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=400&auto=format&fit=crop",
    likes: 720,
    comments: 39,
  },
  {
    id: 11,
    img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=400&auto=format&fit=crop",
    likes: "1.8k",
    comments: 95,
  },
  {
    id: 12,
    img: "https://images.unsplash.com/photo-1603302576837-37561b2fe188?q=80&w=400&auto=format&fit=crop",
    likes: "2.9k",
    comments: 188,
  },
];

const Explore = () => {
  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      <div className="flex-1 flex flex-col mt-4 sm:mt-0 gap-8 font-['Space_Grotesk']">
        <div className="w-full max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-[#E6EEF5] bg-gradient-to-br from-white via-[#F6FBFF] to-[#FFF4E1] shadow-lg">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
            </div>
            <div className="relative p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#6B7280]">
                    Discover
                  </div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2A43] mt-2">
                    Explore trending posts
                  </h1>
                  <p className="text-sm text-[#4B6B88] mt-2 max-w-xl">
                    Find creators, tags, and fresh ideas across the community.
                  </p>
                </div>
                <div className="relative w-full md:max-w-sm">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search posts, tags, or places..."
                    className="pl-12 py-5 text-base rounded-full bg-white shadow-sm border-gray-100 focus-visible:ring-[#1E4F7A]"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-['Spline_Sans_Mono'] text-[#4B6B88]">
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Trending
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Developers
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Design
                </span>
                <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
                  Community
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-3xl">
          <div className="rounded-2xl border border-[#E6EEF5] bg-white/90 shadow-sm p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-[#0B2A43]">
                Want to follow a private profile?
              </div>
              <div className="text-xs text-[#4B6B88]">
                Send a request with a short note.
              </div>
            </div>
            <Button
              asChild
              className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white rounded-full"
            >
              <a href="/send-request">Send request</a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-2 pb-10">
          {mockExplorePosts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square group cursor-pointer overflow-hidden rounded-md bg-gray-100 border border-gray-100 shadow-sm"
            >
              <img
                src={post.img}
                alt="Explore Post"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 sm:gap-6 px-2">
                <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-sm sm:text-base md:text-lg">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-white" />
                  <span>{post.likes}</span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-sm sm:text-base md:text-lg">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-white" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
