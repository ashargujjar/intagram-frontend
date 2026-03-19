import { Sparkles, Plus } from "lucide-react";
import { Link } from "react-router-dom";
const Greeting = () => {
  return (
    <div className="w-full max-w-4xl mb-8">
      <div className="relative overflow-hidden rounded-3xl border border-[#E6EEF5] bg-gradient-to-br from-white via-[#F6FBFF] to-[#FFF4E1] shadow-lg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
          <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
        </div>
        <div className="relative p-6 md:p-8 font-['Space_Grotesk']">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#1E4F7A] border border-[#E6EEF5] shadow-sm">
                <Sparkles className="w-4 h-4" />
                Fresh feed
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2A43] mt-3">
                Welcome back to Rabta
              </h1>
              <p className="text-sm md:text-base text-[#4B6B88] mt-2 max-w-xl">
                Catch up on new posts, share an update, or explore what the
                community is building today.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/createPost"
                className="bg-[#1E4F7A] text-white px-4 py-2 rounded-full hover:bg-[#143A5A] transition shadow-md flex items-center gap-2"
              >
                Create post
                <Plus className="w-4 h-4" />
              </Link>
              <Link
                to="/explore"
                className="px-4 py-2 rounded-full border border-[#D6E2EC] text-[#1E4F7A] bg-white/70 hover:bg-white transition shadow-sm"
              >
                Explore
              </Link>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-['Spline_Sans_Mono'] text-[#4B6B88]">
            <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
              New creators
            </span>
            <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
              Trending builds
            </span>
            <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
              Fresh ideas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
