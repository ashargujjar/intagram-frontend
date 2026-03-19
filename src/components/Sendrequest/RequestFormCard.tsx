import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquareText, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

type RequestFormCardProps = {
  requestedUser: string;
};

const RequestFormCard = ({ requestedUser }: RequestFormCardProps) => {
  return (
    <div className="rounded-2xl border border-[#E6EEF5] bg-white/90 shadow-sm p-6 flex flex-col gap-6">
      <div>
        <div className="text-xs font-['Spline_Sans_Mono'] uppercase tracking-widest text-[#6B7280]">
          Step 1
        </div>
        <h2 className="text-lg font-semibold text-[#1E4F7A] mt-1">
          Recipient
        </h2>
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="request-username" className="text-[#1A1A1A] font-medium">
          Username
        </Label>
        <div className="relative">
          <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="request-username"
            placeholder="@username"
            defaultValue={requestedUser}
            className="pl-10 bg-white focus-visible:ring-[#1E4F7A]"
          />
        </div>
      </div>

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
        <Button className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white px-6 rounded-full">
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
