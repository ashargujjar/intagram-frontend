export interface Profileprop {
  username: string;
  email: string;
  name?: string;
  bio?: string;
  url?: string;
  introAudio?: string;
  profilePhoto?: string;
  private?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
  followings?: number;
  followed?: string[];
  requested?: string[];
  followdBy?: string[];
}
