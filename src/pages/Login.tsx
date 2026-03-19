import logo from "../assets/Untitled design (1).png";
import Image from "../assets/Gemini_Generated_Image_u640hmu640hmu640.png";
import Input from "../components/Input";
import Features from "@/components/login/Features";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
type LOGIN = {
  username: string;
  password: string;
};
const Login = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loginData, setLoginData] = useState<LOGIN>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleLoginButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    if (!backendUrl) {
      console.error("VITE_BACKEND_URL is not set");
      toast.error("Server URL not configured. Please try again later.");
      return;
    }
    setIsLoading(true);
    try {
      const resp = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await resp.json().catch(() => ({}));
      if (resp.ok) {
        toast.success(data?.message ?? "Login successful.");
        navigate("/home");
      } else {
        toast.error(data?.message ?? "Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to login right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6FBFF] flex items-center justify-center px-4 py-10 font-['Space_Grotesk']">
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-35"></div>
          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
        </div>

        <div className="relative bg-white/90 backdrop-blur rounded-3xl shadow-xl w-full flex flex-col md:flex-row overflow-hidden border border-[#E6EEF5]">
          {/* Left Image Section */}
          <div className="md:flex-1 h-72 md:h-auto relative">
            <img
              src={Image}
              alt="Family connected together"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A43]/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-xs uppercase tracking-widest text-white/70">
                Welcome back
              </div>
              <div className="text-xl font-semibold">Secure login</div>
              <div className="text-sm text-white/80 mt-1">
                Pick up right where you left off.
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="flex-1 p-8 md:p-10 flex flex-col gap-6">
            {/* Logo */}
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border border-[#E6EEF5] shadow-sm">
              <img
                src={logo}
                alt="Website logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center">
              <div className="text-xs uppercase tracking-widest text-[#6B7280]">
                Sign in
              </div>
              <h1 className="text-2xl font-semibold text-[#1E4F7A] mt-2">
                Login to Rabta
              </h1>
              <p className="text-sm text-[#4B6B88] mt-1">
                Access your account and stay connected.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4">
              <Input
                Label="Username"
                name="username"
                placeholder="Enter your username"
                type="text"
                value={loginData.username}
                handleChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
              <Input
                Label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={loginData.password}
                handleChange={(e) => {
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
              <div className="text-right text-sm">
                <a
                  href="/forgot-password"
                  className="text-[#1E4F7A] hover:underline cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-2 bg-[#F2A32C] text-white py-2.5 rounded-full hover:opacity-90 transition shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleLoginButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span className="sr-only">Logging in...</span>
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <Features />

            <p className="text-[#1E4F7A] text-center">
              Don't have an account?
              <a
                href="/signup"
                className="text-[#F2A32C] pl-1 underline cursor-pointer"
              >
                Signup
              </a>
            </p>
            <p className="text-[#1E4F7A] text-center">
              Need to verify your account?
              <a
                href="/verify-account"
                className="text-[#F2A32C] pl-1 underline cursor-pointer"
              >
                Verify account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
