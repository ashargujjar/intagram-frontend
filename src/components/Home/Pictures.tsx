import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const mockPosts = [
  {
    id: 1,
    user: {
      name: "Zainab Malik",
      username: "@zainab.codes",
      avatar: "https://i.pravatar.cc/150?u=zainab",
    },
    postImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    caption:
      "Setup complete! Finally ready to deploy ShipSmart 🚀 #mernstack #coding #rabta",
    likesCount: "1.2k",
    commentsCount: 14,
    audioNote: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    audioDuration: "0:08",
  },
  {
    id: 2,
    user: {
      name: "Sara Ahmed",
      username: "@sara_designs",
      avatar: "https://i.pravatar.cc/150?u=sara",
    },
    postImage:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop",
    caption: "Testing some new design palettes for the MERN logistics app.",
    likesCount: 890,
    commentsCount: 5,
    audioNote: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    audioDuration: "0:10",
  },
];
const Pictures = () => {
  return (
    <div className="w-full max-w-xl flex flex-col gap-6">
      {mockPosts.map((post) => (
        <Card
          key={post.id}
          className="w-full shadow-sm border border-gray-100 bg-white rounded-xl overflow-hidden"
        >
          {/* --- POST HEADER (Top profile logo, username, more options) --- */}
          <div className="flex items-center justify-between p-4 border-b border-gray-50">
            <div className="flex items-center gap-3 hover:cursor-pointer">
              {/* Shadcn Avatar */}
              <Avatar className="w-10 h-10 border border-gray-100 shadow-sm">
                <AvatarImage
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-brand/10 text-brand font-bold">
                  {post.user.name.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-bold text-[#1A1A1A] leading-tight hover:underline">
                  {post.user.name}
                </span>
                <span className="text-sm text-[#6B7280]">
                  {post.user.username}
                </span>
              </div>
            </div>
            {/* Static 'More options' icon */}
            <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer hover:text-brand transition-colors" />
          </div>

          {/* --- MAIN POST IMAGE --- */}
          <div className="w-full aspect-[4/5] bg-gray-50 overflow-hidden">
            <img
              src={post.postImage}
              alt="Post content"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* --- POST BOTTOM (Actions, counts, description) --- */}
          <div className="flex flex-col p-4 gap-3">
            {/* Action Icons: Likes, Comments, Share Logo */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                {/* These will have onClick logic later */}
                <Heart className="w-7 h-7 text-[#1A1A1A] cursor-pointer hover:text-[#F2A32C] hover:scale-110 transition-all duration-200" />
                <Link to="/addComment">
                  <MessageCircle className="w-7 h-7 text-[#1A1A1A] cursor-pointer hover:text-brand hover:scale-110 transition-all duration-200" />
                </Link>
                <Send className="w-7 h-7 text-[#1A1A1A] cursor-pointer hover:text-brand-dark hover:scale-110 transition-all duration-200" />
              </div>
            </div>

            {/* Likes count */}
            <div className="text-base font-bold text-[#1A1A1A]">
              {post.likesCount}{" "}
              <span className="font-medium text-gray-600">likes</span>
            </div>

            {/* IMAGE DESCRIPTION (Caption) */}
            <div className="text-base text-[#1A1A1A] leading-relaxed">
              <span className="font-bold mr-2 hover:underline cursor-pointer">
                {post.user.username}
              </span>
              {/* The actual caption description */}
              {post.caption}
            </div>

            {/* Audio Note (dummy) */}
            {post.audioNote && (
              <div className="rounded-xl border border-gray-200 bg-[#F6FBFF] p-3 shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-semibold text-[#1E4F7A]">
                    Voice note
                  </span>
                  <span>{post.audioDuration}</span>
                </div>
                <audio controls src={post.audioNote} className="w-full h-9" />
              </div>
            )}

            {/* Static 'View comments' link */}
            <Link to="/addComment">
              <div className="text-sm text-gray-500 hover:text-brand cursor-pointer mt-1">
                View all {post.commentsCount} comments
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Pictures;
