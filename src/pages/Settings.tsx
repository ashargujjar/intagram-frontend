import Nav from "@/components/Nav";
import SettingsHeader from "@/components/Settings/SettingsHeader";
import ProfilePhotoCard from "@/components/Settings/ProfilePhotoCard";
import AccountInfoCard from "@/components/Settings/AccountInfoCard";
import ProfileDetailsCard from "@/components/Settings/ProfileDetailsCard";
import SecurityCard from "@/components/Settings/SecurityCard";
import PrivacyCard from "@/components/Settings/PrivacyCard";
import IntroAudioCard from "@/components/Settings/IntroAudioCard";
import React, { useEffect, useState } from "react";
import type { Profileprop } from "@/components/Settings/types";
import { toast } from "react-toastify";

const Settings = () => {
  const token = localStorage.getItem("RabtaLtoken");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [isPrivacyUpdating, setIsPrivacyUpdating] = useState(false);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [isIntroSaving, setIsIntroSaving] = useState(false);
  const [isIntroRemoving, setIsIntroRemoving] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [bio, setBio] = useState<Profileprop>({
    email: "",
    username: "",
    bio: "",
    followers: 0,
    following: 0,
    introAudio: "",
    name: "",
    private: false,
    profilePhoto: "",
    url: "",
  });
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    async function getBio() {
      if (!token) {
        return;
      }
      try {
        const res = await fetch(`${backend_url}/bio`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          setBio(data?.data?.userbio);
        } else {
          toast.error(data?.message ?? "Unable to load profile details.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Unable to load profile details.");
      }
    }
    getBio();
  }, [token]);
  useEffect(() => {
    if (!selectedPhoto) {
      setPhotoPreview(null);
      return;
    }
    const url = URL.createObjectURL(selectedPhoto);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedPhoto]);
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target; // ← Destructure first
    setBio((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handlePhotoSelect(file: File | null) {
    setSelectedPhoto(file);
  }
  // remove profile
  async function RemoveProfile() {
    if (!token) {
      toast.error("Please login to update your profile.");
      return;
    }
    setIsUpdating(true);
    try {
      const res = await fetch(`${backend_url}/profilePhoto`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        const updated = data?.data?.userbio;
        if (updated) {
          setBio((prev) => ({
            ...prev,
            ...updated,
          }));
        }
        setSelectedPhoto(null);
        setPhotoPreview(null);
        toast.success(data.message || "profile photho deleted succesfully");
      } else {
        toast.error(
          data.message || "something went wrong removing profile photo",
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("error removing the profile");
    } finally {
      setIsUpdating(false);
    }
  }
  async function handleProfileDetailsclick() {
    if (!token) {
      toast.error("Please login to update your profile.");
      return;
    }
    setIsUpdating(true);
    try {
      const res = await fetch(`${backend_url}/bio`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: bio.name || "",
          bio: bio.bio || "",
          url: bio.url || "",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const updated = data?.data?.userbio;
        if (updated) {
          setBio((prev) => ({
            ...prev,
            ...updated,
          }));
        }
        toast.success(data?.message ?? "Profile updated successfully.");
      } else {
        toast.error(data?.message ?? "Failed to update profile.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  }
  async function handleUpdatePassword() {
    if (!token) {
      toast.error("Please login to update your password.");
      return;
    }
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }
    setIsPasswordUpdating(true);
    try {
      const res = await fetch(`${backend_url}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data?.message ?? "Password updated successfully.");
        setPasswordForm({ currentPassword: "", newPassword: "" });
      } else {
        toast.error(data?.message ?? "Failed to update password.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update password.");
    } finally {
      setIsPasswordUpdating(false);
    }
  }
  async function handlePrivacyToggle(nextValue: boolean) {
    if (!token) {
      toast.error("Please login to update privacy settings.");
      return;
    }
    setIsPrivacyUpdating(true);
    try {
      const res = await fetch(`${backend_url}/bio`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ private: nextValue }),
      });
      const data = await res.json();
      if (res.ok) {
        const updated = data?.data?.userbio;
        if (updated) {
          setBio((prev) => ({
            ...prev,
            ...updated,
          }));
        } else {
          setBio((prev) => ({
            ...prev,
            private: nextValue,
          }));
        }
        toast.success(data?.message ?? "Privacy updated successfully.");
      } else {
        toast.error(data?.message ?? "Failed to update privacy.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update privacy.");
    } finally {
      setIsPrivacyUpdating(false);
    }
  }
  async function handleUploadPhoto() {
    if (!token) {
      toast.error("Please login to update your profile photo.");
      return;
    }
    if (!selectedPhoto) {
      toast.error("Please choose an image first.");
      return;
    }
    setIsPhotoUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedPhoto);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/profile/photo`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      const data = await res.json();
      if (res.ok) {
        const updated = data?.data?.userbio;
        if (updated) {
          setBio((prev) => ({
            ...prev,
            ...updated,
          }));
        }
        setSelectedPhoto(null);
        toast.success(data?.message ?? "Profile photo updated successfully.");
      } else {
        toast.error(data?.message ?? "Failed to upload profile photo.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload profile photo.");
    } finally {
      setIsPhotoUploading(false);
    }
  }
  async function handleIntroAudioSave(file: File) {
    if (!token) {
      toast.error("Please login to update your intro audio.");
      return false;
    }
    setIsIntroSaving(true);
    try {
      const formData = new FormData();
      formData.append("audio", file);
      const res = await fetch(`${backend_url}/profile/intro-audio`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        const updated = data?.data?.userbio;
        if (updated) {
          setBio((prev) => ({
            ...prev,
            ...updated,
          }));
        }
        toast.success(data?.message ?? "Intro audio saved.");
        return true;
      }
      toast.error(data?.message ?? "Failed to save intro audio.");
      return false;
    } catch (error) {
      console.log(error);
      toast.error("Failed to save intro audio.");
      return false;
    } finally {
      setIsIntroSaving(false);
    }
  }
  async function handleIntroAudioRemove() {
    if (!token) {
      toast.error("Please login to update your intro audio.");
      return false;
    }
    setIsIntroRemoving(true);
    try {
      const res = await fetch(`${backend_url}/profile/intro-audio`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        const updated = data?.data?.userbio;
        if (updated) {
          setBio((prev) => ({
            ...prev,
            ...updated,
          }));
        } else {
          setBio((prev) => ({
            ...prev,
            introAudio: "",
          }));
        }
        toast.success(data?.message ?? "Intro audio removed.");
        return true;
      }
      toast.error(data?.message ?? "Failed to remove intro audio.");
      return false;
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove intro audio.");
      return false;
    } finally {
      setIsIntroRemoving(false);
    }
  }
  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      <div className="flex-1 mt-4 sm:mt-0">
        <div className="w-full max-w-4xl flex flex-col gap-6 font-['Space_Grotesk']">
          <SettingsHeader />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ProfilePhotoCard
              user={bio}
              previewUrl={photoPreview}
              selectedFileName={selectedPhoto?.name}
              isUploading={isPhotoUploading}
              onSelectFile={handlePhotoSelect}
              onUpload={handleUploadPhoto}
              onRemove={RemoveProfile}
              isLoading={isUpdating}
            />
            <AccountInfoCard user={bio} />
            <ProfileDetailsCard
              user={bio}
              handleChange={handleChange}
              handleClick={handleProfileDetailsclick}
              isLoading={isUpdating}
            />
            <SecurityCard
              currentPassword={passwordForm.currentPassword}
              newPassword={passwordForm.newPassword}
              onChange={handlePasswordChange}
              onUpdate={handleUpdatePassword}
              isLoading={isPasswordUpdating}
            />
            <PrivacyCard
              user={bio}
              onToggle={handlePrivacyToggle}
              isLoading={isPrivacyUpdating}
            />
            <IntroAudioCard
              user={bio}
              isSaving={isIntroSaving}
              isRemoving={isIntroRemoving}
              onSave={handleIntroAudioSave}
              onRemove={handleIntroAudioRemove}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
