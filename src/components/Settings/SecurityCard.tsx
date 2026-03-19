import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

const SecurityCard = () => {
  return (
    <Card className="w-full shadow-lg border-[#E6EEF5] bg-white/90 backdrop-blur rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-[#E6EEF5] pb-4 bg-[#F6FBFF]">
        <CardTitle className="text-lg text-[#1E4F7A] flex items-center gap-2">
          <Lock className="w-5 h-5" /> Security
        </CardTitle>
        <CardDescription>
          Ensure your account is using a long, random password to stay secure.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex flex-col gap-6">
        <div className="grid w-full gap-2">
          <Label htmlFor="current-password" className="text-[#1A1A1A] font-medium">
            Current Password
          </Label>
          <Input
            id="current-password"
            type="password"
            placeholder="Enter current password"
            className="bg-white focus-visible:ring-[#1E4F7A]"
          />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="new-password" className="text-[#1A1A1A] font-medium">
            New Password
          </Label>
          <Input
            id="new-password"
            type="password"
            placeholder="Create new password"
            className="bg-white focus-visible:ring-[#1E4F7A]"
          />
        </div>
      </CardContent>
      <CardFooter className="bg-[#F6FBFF] border-t border-[#E6EEF5] p-4 flex justify-end">
        <Button className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white px-8 cursor-pointer">
          Update Password
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SecurityCard;
