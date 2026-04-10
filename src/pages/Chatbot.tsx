import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

// 1. Define the exact shape of a Message
interface Message {
  id: number;
  sender: "bot" | "user"; // Strictly limits the sender to these two strings
  text: string;
  time: string;
}

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  // 2. Apply the Message interface to your state array
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hi there! Welcome to ShipSmart. How can I help you with your logistics today?",
      time: "10:00 AM",
    },
  ]);

  // 3. Type the ref so TypeScript knows it will be attached to a <div>
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // 4. Type the FormEvent so e.preventDefault() doesn't throw a TS error
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: inputValue,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "I am a static mock bot for now! Wire me up to an Express API to make me smart. 🚀",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* --- FLOATING CHAT WINDOW --- */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white shadow-2xl border-gray-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in-20 duration-300">
          <div className="bg-[#1E4F7A] p-4 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold leading-tight">ShipSmart Assistant</h3>
                <span className="text-xs text-white/70">Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-[#F2A32C] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <Avatar className="w-8 h-8 shrink-0 border border-gray-200 shadow-sm">
                  {msg.sender === "bot" ? (
                    <AvatarFallback className="bg-[#1E4F7A] text-white">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-gray-200 text-[#1A1A1A]">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="flex flex-col gap-1">
                  <div
                    className={`p-3 rounded-2xl text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "bg-[#1E4F7A] text-white rounded-tr-none"
                        : "bg-white text-[#1A1A1A] border border-gray-100 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span
                    className={`text-[10px] text-gray-400 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border-gray-200 focus-visible:ring-[#1E4F7A] bg-gray-50"
              />
              <Button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#1E4F7A] hover:bg-[#F2A32C] text-white p-0 shrink-0 shadow-sm transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </Button>
            </form>
          </div>
        </Card>
      )}

      {/* --- FLOATING ACTION BUTTON (FAB) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1E4F7A] hover:bg-[#F2A32C] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

export default FloatingChat;
