import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import type { SettingsUser } from "./types";

type ProfilePhotoCardProps = {
  user: SettingsUser;
};

const ProfilePhotoCard = ({ user }: ProfilePhotoCardProps) => {
  return (
    <Card className="w-full shadow-lg border-[#E6EEF5] bg-white/90 backdrop-blur rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-[#E6EEF5] pb-4 bg-[#F6FBFF]">
        <CardTitle className="text-lg text-[#1E4F7A] flex items-center gap-2">
          <Camera className="w-5 h-5" /> Profile Photo
        </CardTitle>
        <CardDescription>Update your profile picture.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex items-center gap-6">
        <Avatar className="w-20 h-20 border border-gray-200 shadow-sm">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <Button className="bg-white border border-[#1E4F7A] text-[#1E4F7A] hover:bg-[#F6FBFF] transition-colors cursor-pointer w-max">
            Choose Image
          </Button>
          <span className="text-xs text-gray-400">
            JPG, GIF or PNG. Max size of 2MB.
          </span>
        </div>
      </CardContent>
      <CardFooter className="bg-[#F6FBFF] border-t border-[#E6EEF5] p-4 flex justify-end">
        <Button className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white px-8 cursor-pointer">
          Upload Photo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfilePhotoCard;
