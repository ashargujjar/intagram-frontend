import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPasswordReset = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      const msg = "Please fill out both password fields.";
      setMessage(msg);
      toast.error(msg);
      return;
    }

    if (newPassword !== confirmPassword) {
      const msg = "Passwords do not match.";
      setMessage(msg);
      toast.error(msg);
      return;
    }
    const token = localStorage.getItem("resetToken");
    if (!token) {
      const msg = "Reset token not found. Please verify OTP again.";
      setMessage(msg);
      toast.error(msg);
      return;
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) {
      const msg = "Backend URL is not configured.";
      setMessage(msg);
      toast.error(msg);
      return;
    }

    try {
      setIsLoading(true);
      const resp = await fetch(`${backendUrl}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword, token }),
      });
      const data = await resp.json();
      if (resp.ok) {
        const msg = data?.message ?? "Password reset successfully.";
        setMessage(msg);
        toast.success(msg);
        localStorage.removeItem("resetToken");
        navigate("/login");
      } else {
        const msg = data?.message || "Password reset failed.";
        setMessage(msg);
        toast.error(msg);
      }
    } catch (err) {
      console.log(err);
      const msg = "Failed to reset password. Please try again later.";
      setMessage(msg);
      toast.error(msg);
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

        <div className="relative bg-white/90 backdrop-blur rounded-3xl shadow-xl overflow-hidden border border-[#E6EEF5]">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-2 bg-gradient-to-b from-[#1E4F7A] to-[#143A5A] text-white p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white/80">
                  Password recovery
                </div>
                <h1 className="text-2xl font-semibold mt-4">Reset password</h1>
                <p className="text-sm text-white/80 mt-3 leading-relaxed">
                  Create a new password for your account.
                </p>
              </div>

              <div className="mt-8 space-y-3 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/25" />
                  Enter your new password below
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/25" />
                  Your password will be updated securely
                </div>
              </div>
            </div>

            <div className="md:col-span-3 p-8 flex flex-col gap-8">
              <div>
                <div className="text-xs font-['Spline_Sans_Mono'] uppercase tracking-widest text-[#6B7280]">
                  Step 3
                </div>
                <h2 className="text-lg font-semibold text-[#1E4F7A] mt-1">
                  Reset your password
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-sm text-gray-600">New password</label>
                  <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#1E4F7A]"
                    placeholder="Enter a new password"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">
                    Confirm password
                  </label>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#1E4F7A]"
                    placeholder="Re-enter the new password"
                  />
                </div>

                {message && (
                  <p className="text-sm text-center text-[#1E4F7A]">
                    {message}
                  </p>
                )}

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleResetPassword}
                  className="bg-[#1E4F7A] text-white py-2.5 rounded-full hover:bg-[#143A5A] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <span className="loading loading-spinner loading-sm"></span>
                      Resetting...
                    </span>
                  ) : (
                    "Reset password"
                  )}
                </button>

                <div className="flex justify-between text-sm text-gray-500">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="underline cursor-pointer"
                  >
                    Request new OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="underline cursor-pointer"
                  >
                    Back to login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordReset;
