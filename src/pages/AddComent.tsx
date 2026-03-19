import Nav from "@/components/Nav";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, MoreHorizontal, Send, Mic, Square } from "lucide-react";

// 🛑 STATIC MOCK DATA
const mockPost = {
  author: {
    name: "Ashar",
    username: "@ashar.dev",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
  },
  image:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
  caption:
    "Late night coding sessions working on the ShipSmart database schema. Almost ready for the final presentation! 🚀💻 #MERN #CUST",
  likes: "2.4k",
  time: "2 hours ago",
};

// Updated Mock Data to include Nested Replies
const mockComments = [
  {
    id: 1,
    username: "@zainab.codes",
    avatar: "https://i.pravatar.cc/150?u=zainab",
    text: "This is looking incredibly clean! Great job.",
    time: "1h",
    likes: 12,
    hasReplies: true,
    isExpanded: true, // Visually mocking the OPEN state
    replies: [
      {
        id: 101,
        username: "@ashar.dev",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
        text: "Thank you! Still tweaking the UI a bit before deployment.",
        time: "45m",
        likes: 2,
      },
      {
        id: 102,
        username: "@zainab.codes",
        avatar: "https://i.pravatar.cc/150?u=zainab",
        text: "Let me know if you need help with the frontend components!",
        time: "40m",
        likes: 1,
      },
    ],
  },
  {
    id: 2,
    username: "@ali_khan",
    avatar: "https://i.pravatar.cc/150?u=ali",
    text: "Did you end up using MongoDB or Postgres for the logistics tracking?",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    audioDuration: "0:12",
    time: "45m",
    likes: 3,
    hasReplies: true,
    isExpanded: false, // Visually mocking the CLOSED state
    replyCount: 4,
  },
  {
    id: 3,
    username: "@sara_designs",
    avatar: "https://i.pravatar.cc/150?u=sara",
    text: "Love the UI layout! This color palette is great.",
    time: "30m",
    likes: 8,
    hasReplies: false,
  },
];

const PostDetail = () => {
  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      {/* 1. SIDEBAR NAVIGATION */}
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 flex justify-center mt-4 sm:mt-0">
        <Card className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-md border-gray-100 rounded-xl overflow-hidden lg:max-h-[750px]">
          {/* ==========================================
              LEFT SIDE: Header, Image, Likes, Caption 
              ========================================== */}
          <div className="flex flex-col w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar className="w-9 h-9 border border-gray-100 shadow-sm">
                  <AvatarImage
                    src={mockPost.author.avatar}
                    alt={mockPost.author.username}
                  />
                  <AvatarFallback className="bg-[#1E4F7A] text-white font-bold">
                    A
                  </AvatarFallback>
                </Avatar>
                <span className="font-bold text-[#1A1A1A] hover:underline">
                  {mockPost.author.username}
                </span>
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer hover:text-[#1E4F7A]" />
            </div>

            <div className="w-full aspect-square bg-black flex items-center justify-center overflow-hidden">
              <img
                src={mockPost.image}
                alt="Post content"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col p-4 bg-white shrink-0">
              <div className="flex items-center gap-4 mb-3">
                <Heart className="w-7 h-7 text-[#1A1A1A] cursor-pointer hover:text-[#F2A32C] hover:scale-110 transition-all duration-200" />
                <Send className="w-7 h-7 text-[#1A1A1A] cursor-pointer hover:text-[#1E4F7A] hover:scale-110 transition-all duration-200" />
              </div>
              <div className="text-base font-bold text-[#1A1A1A] mb-2">
                {mockPost.likes}{" "}
                <span className="font-medium text-gray-600">likes</span>
              </div>
              <div className="text-sm text-[#1A1A1A] leading-relaxed">
                <span className="font-bold mr-2 cursor-pointer hover:underline">
                  {mockPost.author.username}
                </span>
                {mockPost.caption}
              </div>
              <div className="text-xs text-gray-400 mt-2 uppercase tracking-wide">
                {mockPost.time}
              </div>

              {/* Story note (audio) */}
              <div className="mt-4 rounded-xl border border-gray-200 bg-[#F6FBFF] p-3 shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-semibold text-[#1E4F7A]">
                    Story note
                  </span>
                  <span>0:09</span>
                </div>
                <audio
                  controls
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
                  className="w-full h-9"
                />
              </div>
            </div>
          </div>

          {/* ==========================================
              RIGHT SIDE: Comments List & Input 
              ========================================== */}
          <div className="flex flex-col w-full lg:w-1/2 bg-white h-[500px] lg:h-auto">
            <div className="hidden lg:flex items-center p-4 border-b border-gray-100">
              <h3 className="font-bold text-[#1A1A1A] text-lg">Comments</h3>
            </div>

            {/* Scrollable Comments Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
              {mockComments.map((comment) => (
                <div key={comment.id} className="flex gap-3 items-start group">
                  <Avatar className="w-8 h-8 shrink-0 mt-1">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col w-full">
                    {/* Parent Comment Text */}
                    <div className="text-sm text-[#1A1A1A]">
                      <span className="font-bold mr-2 hover:underline cursor-pointer">
                        {comment.username}
                      </span>
                      {comment.text}
                    </div>

                    {comment.audioUrl && (
                      <div className="mt-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span className="font-semibold text-[#1E4F7A]">
                            Voice comment
                          </span>
                          <span>{comment.audioDuration}</span>
                        </div>
                        <audio
                          controls
                          src={comment.audioUrl}
                          className="w-full h-9"
                        />
                      </div>
                    )}

                    {/* Parent Comment Actions */}
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 font-medium mb-1">
                      <span>{comment.time}</span>
                      <span>{comment.likes} likes</span>
                      <button className="hover:text-[#1E4F7A] transition-colors cursor-pointer font-bold">
                        Reply
                      </button>
                    </div>

                    {/* --- NESTED REPLIES UI LOGIC --- */}

                    {/* State 1: Collapsed (Has replies, but not expanded) */}
                    {comment.hasReplies && !comment.isExpanded && (
                      <div className="mt-2 flex items-center gap-3 cursor-pointer group/btn w-max">
                        {/* The little horizontal dash */}
                        <div className="w-8 h-[1px] bg-gray-400 group-hover/btn:bg-[#1E4F7A] transition-colors"></div>
                        <span className="text-xs font-bold text-gray-500 group-hover/btn:text-[#1E4F7A] transition-colors">
                          View replies ({comment.replyCount})
                        </span>
                      </div>
                    )}

                    {/* State 2: Expanded (Showing the straight vertical line and nested comments) */}
                    {comment.hasReplies && comment.isExpanded && (
                      <div className="mt-3 flex flex-col gap-4 border-l-2 border-gray-100 pl-4 ml-2">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="flex gap-3 items-start"
                          >
                            {/* Smaller Avatar for replies */}
                            <Avatar className="w-6 h-6 shrink-0 mt-0.5">
                              <AvatarImage src={reply.avatar} />
                            </Avatar>
                            <div className="flex flex-col w-full">
                              <div className="text-sm text-[#1A1A1A]">
                                <span className="font-bold mr-2 hover:underline cursor-pointer">
                                  {reply.username}
                                </span>
                                {reply.text}
                              </div>
                              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 font-medium">
                                <span>{reply.time}</span>
                                <span>{reply.likes} likes</span>
                                <button className="hover:text-[#1E4F7A] transition-colors cursor-pointer font-bold">
                                  Reply
                                </button>
                              </div>
                            </div>
                            <Heart className="w-3 h-3 text-gray-400 cursor-pointer hover:text-[#F2A32C] shrink-0 mt-1" />
                          </div>
                        ))}

                        {/* Hide Replies Button */}
                        <div className="mt-1 flex items-center gap-3 cursor-pointer group/btn w-max">
                          <div className="w-8 h-[1px] bg-gray-400 group-hover/btn:bg-[#1E4F7A] transition-colors"></div>
                          <span className="text-xs font-bold text-gray-500 group-hover/btn:text-[#1E4F7A] transition-colors">
                            Hide replies
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tiny like button for the parent comment */}
                  <Heart className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-[#F2A32C] shrink-0 mt-1" />
                </div>
              ))}
            </div>

            {/* Bottom Input Area to Write a Comment/Reply */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8 border border-gray-200 shadow-sm hidden sm:block">
                  <AvatarImage src={mockPost.author.avatar} />
                </Avatar>
                <Input
                  type="text"
                  placeholder="Add a comment or reply..."
                  className="flex-1 bg-white border-gray-200 focus-visible:ring-[#1E4F7A] rounded-full px-4"
                />
                <Button className="bg-transparent text-[#1E4F7A] hover:bg-transparent hover:text-[#F2A32C] font-bold px-2 shadow-none cursor-pointer">
                  Post
                </Button>
              </div>

              {/* Voice Comment Option (UI only) */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs text-gray-500 font-medium">
                  Voice comment (max 15 seconds)
                </span>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#1E4F7A] text-xs font-semibold hover:bg-[#F6FBFF] transition">
                    <Mic className="w-4 h-4" />
                    Record
                  </button>
                  <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-100 transition">
                    <Square className="w-4 h-4" />
                    Stop
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-24 h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full w-1/3 bg-[#1E4F7A]" />
                  </div>
                  0:03 / 0:15
                </div>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E4F7A] text-white text-xs font-semibold hover:bg-[#143A5A] transition">
                  Post audio
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-100 transition">
                  Cancel audio
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostDetail;
