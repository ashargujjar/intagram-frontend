import { useState } from "react";
import { Mail, ShieldCheck, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSendOtp = async () => {
    if (!email || !username) {
      setMessage("Please provide both email and username.");
      return;
    }

    let otp: string | null = null;
    if (backendUrl) {
      try {
        const resp = await fetch(`${backendUrl}/send-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, username }),
        });
        const data = await resp.json();
        if (resp.ok) {
          otp = data?.otp;
          setMessage("OTP sent to your email.");
        } else {
          setMessage(data?.message || "Failed to send OTP.");
        }
      } catch (err) {
        setMessage("Failed to send OTP. Please try again later.");
      }
    }

    const query = otp ? `?otp=${encodeURIComponent(otp)}` : "";
    navigate(`/forgot-password/verify${query}`);
  };

  return (
    <div className="min-h-screen bg-[#F6FBFF] flex items-center justify-center px-4 py-10 font-['Space_Grotesk']">
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-35"></div>
          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
        </div>

        <div className="relative bg-white/90 backdrop-blur rounded-3xl shadow-xl overflow-hidden border border-[#E6EEF5]">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-2 bg-gradient-to-b from-[#1E4F7A] to-[#143A5A] text-white p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white/80">
                  Password recovery
                </div>
                <h1 className="text-2xl font-semibold mt-4">
                  Forgot your password?
                </h1>
                <p className="text-sm text-white/80 mt-3 leading-relaxed">
                  Enter your email and username to receive an OTP. Then verify
                  it on the next screen.
                </p>
              </div>

              <div className="mt-8 space-y-3 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-white/90" />
                  OTP will arrive in your inbox
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white/90" />
                  Secure account recovery
                </div>
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-white/90" />
                  OTP expires after a short time
                </div>
              </div>
            </div>

            <div className="md:col-span-3 p-8 flex flex-col gap-8">
              <div>
                <div className="text-xs font-['Spline_Sans_Mono'] uppercase tracking-widest text-[#6B7280]">
                  Step 1
                </div>
                <h2 className="text-lg font-semibold text-[#1E4F7A] mt-1">
                  Send OTP
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                <Input
                  Label="Email"
                  name="email"
                  placeholder="Enter your registered email"
                  type="email"
                  value={email}
                  handleChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  Label="Username"
                  name="username"
                  placeholder="Enter your username"
                  type="text"
                  value={username}
                  handleChange={(e) => setUsername(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="bg-[#1E4F7A] text-white py-2.5 rounded-full hover:bg-[#143A5A] transition shadow-md cursor-pointer"
                >
                  Send OTP
                </button>

                {message && (
                  <p className="text-sm text-center text-[#1E4F7A]">
                    {message}
                  </p>
                )}

                <p className="text-sm text-gray-500 text-center">
                  Remembered your password?
                  <a
                    href="/login"
                    className="text-[#1E4F7A] pl-1 underline cursor-pointer"
                  >
                    Back to login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
