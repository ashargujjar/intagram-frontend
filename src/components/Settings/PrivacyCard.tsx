import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
import type { Profileprop } from "./types";

type PrivacyCardProps = {
  user: Profileprop;
  onToggle: (nextValue: boolean) => void;
  isLoading?: boolean;
};

const PrivacyCard = ({
  user,
  onToggle,
  isLoading = false,
}: PrivacyCardProps) => {
  const nextValue = !user.private;
  return (
    <Card className="w-full shadow-lg border-[#E6EEF5] bg-white/90 backdrop-blur rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-[#E6EEF5] pb-4 bg-[#F6FBFF]">
        <CardTitle className="text-lg text-[#1E4F7A] flex items-center gap-2">
          <Shield className="w-5 h-5" /> Privacy
        </CardTitle>
        <CardDescription>Manage who can see your content.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-[#1A1A1A]">Private Account</span>
          <span className="text-sm text-gray-500 max-w-[250px] sm:max-w-md">
            When your account is private, only people you approve can see your
            photos.
          </span>
        </div>

        <button
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4F7A] focus-visible:ring-offset-2 ${
            user.private ? "bg-[#1E4F7A]" : "bg-gray-200"
          }`}
          role="switch"
          aria-checked={user.private}
          aria-disabled={isLoading}
          disabled={isLoading}
          onClick={() => onToggle(nextValue)}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              user.private ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </CardContent>
      <CardFooter className="bg-[#F6FBFF] border-t border-[#E6EEF5] p-4 flex">
        <a
          href="/friend-requests"
          className="text-sm font-semibold text-[#1E4F7A] hover:underline"
        >
          View friend requests
        </a>
      </CardFooter>
    </Card>
  );
};

export default PrivacyCard;
