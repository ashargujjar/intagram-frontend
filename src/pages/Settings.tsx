import Nav from "@/components/Nav";
import SettingsHeader from "@/components/Settings/SettingsHeader";
import ProfilePhotoCard from "@/components/Settings/ProfilePhotoCard";
import AccountInfoCard from "@/components/Settings/AccountInfoCard";
import ProfileDetailsCard from "@/components/Settings/ProfileDetailsCard";
import SecurityCard from "@/components/Settings/SecurityCard";
import PrivacyCard from "@/components/Settings/PrivacyCard";
import IntroAudioCard from "@/components/Settings/IntroAudioCard";

const Settings = () => {
  const mockUser = {
    name: "Ashar",
    username: "ashar.dev",
    email: "ashar@example.com",
    bio: "MERN Stack Developer ðŸ’» | CUST '26 ðŸŽ“ | Building ShipSmart ðŸš€",
    link: "github.com/ashar",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    isPrivate: false,
  };

  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      <div className="flex-1 mt-4 sm:mt-0">
        <div className="w-full max-w-4xl flex flex-col gap-6 font-['Space_Grotesk']">
          <SettingsHeader user={mockUser} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ProfilePhotoCard user={mockUser} />
            <AccountInfoCard user={mockUser} />
            <ProfileDetailsCard user={mockUser} />
            <SecurityCard />
            <PrivacyCard user={mockUser} />
            <IntroAudioCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
