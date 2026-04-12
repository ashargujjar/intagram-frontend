import { useEffect, useState } from "react";
type profile = {
  _id: string;
  name: string;
  profilePhoto?: string;
  private: boolean;
  followdBy: string[];
  followed: string[];
  userId: {
    _id: string;
    username: string;
  };
};
type curUser = {
  _id: string;
  followed?: string[];
};
type RespType = { currUser: curUser; profiles: profile[] };
export function useFoll_wer_wing(
  username: string,
  backend_url: string,
  mode: "followers" | "followings" = "followers",
) {
  const [followers, setFollowers] = useState<RespType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("RabtaLtoken");

    async function fetchFollowers() {
      if (!backend_url || !token || !username) return;

      setLoading(true);
      try {
        const res = await fetch(`${backend_url}/${mode}/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setFollowers(data.data);
        }
      } catch {
        setFollowers(null);
      } finally {
        setLoading(false);
      }
    }

    fetchFollowers();
  }, [username, backend_url, mode]);

  // ✅ CORRECT PLACE
  return {
    followers,
    loading,
  };
}
