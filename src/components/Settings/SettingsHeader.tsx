import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { SettingsUser } from "./types";

type SettingsHeaderProps = {
  user: SettingsUser;
};

const SettingsHeader = ({ user }: SettingsHeaderProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#E6EEF5] bg-gradient-to-br from-white via-[#F6FBFF] to-[#FFF4E1] shadow-lg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
        <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
      </div>
      <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center">
        <Avatar className="w-20 h-20 border border-white/80 shadow-md">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="text-xs uppercase tracking-widest text-[#4B6B88]">
            Account overview
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2A43] mt-1">
            Settings
          </h1>
          <p className="text-sm md:text-base text-[#4B6B88] mt-2 max-w-xl">
            Manage your profile, security, and privacy preferences in one place.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-['Spline_Sans_Mono']">
            <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1 text-[#1E4F7A]">
              Status: Verified
            </span>
            <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1 text-[#1E4F7A]">
              Plan: Customer
            </span>
            <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1 text-[#1E4F7A]">
              Security: Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;
