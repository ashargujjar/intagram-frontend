import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link as LinkIcon, PencilLine } from "lucide-react";
import type { SettingsUser } from "./types";

type ProfileDetailsCardProps = {
  user: SettingsUser;
};

const ProfileDetailsCard = ({ user }: ProfileDetailsCardProps) => {
  return (
    <Card className="w-full shadow-lg border-[#E6EEF5] bg-white/90 backdrop-blur rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-[#E6EEF5] pb-4 bg-[#F6FBFF]">
        <CardTitle className="text-lg text-[#1E4F7A] flex items-center gap-2">
          <PencilLine className="w-5 h-5" /> Profile Details
        </CardTitle>
        <CardDescription>
          Update the details shown on your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex flex-col gap-6">
        <div className="grid w-full gap-2">
          <Label htmlFor="display-name" className="text-[#1A1A1A] font-medium">
            Display Name
          </Label>
          <Input
            id="display-name"
            defaultValue={user.name}
            className="bg-white focus-visible:ring-[#1E4F7A]"
          />
        </div>

        <div className="grid w-full gap-2">
          <Label htmlFor="bio" className="text-[#1A1A1A] font-medium">
            Bio
          </Label>
          <Textarea
            id="bio"
            defaultValue={user.bio}
            className="min-h-[110px] resize-none bg-white focus-visible:ring-[#1E4F7A]"
          />
        </div>

        <div className="grid w-full gap-2">
          <Label htmlFor="profile-link" className="text-[#1A1A1A] font-medium">
            Website / Link
          </Label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="profile-link"
              defaultValue={user.link}
              className="pl-10 bg-white focus-visible:ring-[#1E4F7A]"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-[#F6FBFF] border-t border-[#E6EEF5] p-4 flex justify-end">
        <Button className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white px-8 cursor-pointer">
          Update Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileDetailsCard;
