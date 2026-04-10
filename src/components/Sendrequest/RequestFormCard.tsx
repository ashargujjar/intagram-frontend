import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";

type RequestFormCardProps = {
  requestedUser: string;
  suggestions?: Array<{
    id: string;
    name: string;
    username: string;
    avatar?: string;
  }>;
};

const normalizeUsername = (value: string) =>
  value.trim().replace(/^@/, "").toLowerCase();

const RequestFormCard = ({
  requestedUser,
  suggestions = [],
}: RequestFormCardProps) => {
  const normalizedRequested = normalizeUsername(requestedUser);
  const selectedUser = useMemo(() => {
    if (!normalizedRequested) return null;
    const match =
      suggestions.find(
        (user) => normalizeUsername(user.username) === normalizedRequested,
      ) ?? null;
    if (match) return match;
    const raw = requestedUser.trim().replace(/^@/, "");
    return {
      id: `requested-${normalizedRequested}`,
      name: raw || "User",
      username: normalizedRequested || raw,
      avatar: "",
    };
  }, [normalizedRequested, requestedUser, suggestions]);
  const hasRecipient = Boolean(selectedUser);

  return (
    <div className="rounded-2xl border border-[#E6EEF5] bg-white/90 shadow-sm p-6 flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-[#1E4F7A]">Recipient</h2>
      </div>

      {selectedUser ? (
        <div className="flex items-center gap-3 rounded-xl border border-[#E6EEF5] bg-[#F6FBFF] p-3">
          <Avatar className="h-9 w-9 border border-white/80">
            <AvatarImage src={selectedUser.avatar} />
            <AvatarFallback className="bg-[#1E4F7A] text-white text-xs font-semibold">
              {selectedUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#1A1A1A]">
              {selectedUser.name}
            </span>
            <span className="text-xs text-gray-500">
              @{selectedUser.username}
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[#E6EEF5] bg-[#FDF7F2] px-3 py-2 text-sm text-[#7A4A1E]">
          No recipient selected. Open this page from a user profile.
        </div>
      )}

      <div className="pt-2 border-t border-dashed border-gray-200">
        <div className="text-xs font-['Spline_Sans_Mono'] uppercase tracking-widest text-[#6B7280]">
          Step 2
        </div>
        <h2 className="text-lg font-semibold text-[#1E4F7A] mt-1">
          Optional note
        </h2>
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="request-note" className="text-[#1A1A1A] font-medium">
          Message
        </Label>
        <Textarea
          id="request-note"
          placeholder="Hi! We met at the meetup. Would love to connect."
          className="min-h-[120px] resize-none bg-white focus-visible:ring-[#1E4F7A]"
        />
        <div className="flex items-center gap-2 text-xs text-[#4B6B88]">
          <MessageSquareText className="w-4 h-4" />
          Keep it short and friendly.
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white px-6 rounded-full"
          disabled={!hasRecipient}
        >
          Send request
        </Button>
        <Button
          variant="outline"
          className="border-gray-300 text-gray-600 rounded-full"
        >
          Cancel
        </Button>
        <Button asChild variant="ghost" className="rounded-full">
          <Link to="/friend-requests">View friend requests</Link>
        </Button>
      </div>
    </div>
  );
};

export default RequestFormCard;
