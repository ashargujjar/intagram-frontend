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
import { Mail, User } from "lucide-react";
import type { SettingsUser } from "./types";

type AccountInfoCardProps = {
  user: SettingsUser;
};

const AccountInfoCard = ({ user }: AccountInfoCardProps) => {
  return (
    <Card className="w-full shadow-lg border-[#E6EEF5] bg-white/90 backdrop-blur rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-[#E6EEF5] pb-4 bg-[#F6FBFF]">
        <CardTitle className="text-lg text-[#1E4F7A] flex items-center gap-2">
          <User className="w-5 h-5" /> Account Information
        </CardTitle>
        <CardDescription>
          Update your username and email address.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex flex-col gap-6">
        <div className="grid w-full gap-2">
          <Label htmlFor="username" className="text-[#1A1A1A] font-medium">
            Username
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="username"
              defaultValue={user.username}
              className="pl-10 bg-white focus-visible:ring-[#1E4F7A]"
            />
          </div>
        </div>

        <div className="grid w-full gap-2">
          <Label htmlFor="email" className="text-[#1A1A1A] font-medium">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="email"
              type="email"
              defaultValue={user.email}
              className="pl-10 bg-white focus-visible:ring-[#1E4F7A]"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-[#F6FBFF] border-t border-[#E6EEF5] p-4 flex justify-end">
        <Button className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white px-8 cursor-pointer">
          Update Account
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountInfoCard;
