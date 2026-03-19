import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyToken = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      const msg = "Token not found in the URL. Please request a new token.";
      setMessage(msg);
      toast.error(msg);
    }
  }, [token]);

  const handleVerifyToken = async () => {
    if (!token) {
      const msg = "Token not found. Please request a new token.";
      setMessage(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    if (!backendUrl) {
      const msg = "Backend URL is not configured.";
      setMessage(msg);
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    try {
      const resp = await fetch(`${backendUrl}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await resp.json();

      if (resp.ok) {
        const msg = data?.message ?? "Account verified successfully.";
        setMessage(msg);
        toast.success(msg);
        navigate("/login");
      } else {
        const msg = data?.message || "Verification failed.";
        setMessage(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = "We could not verify the token. Please try again later.";
      console.log(err);
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
          <div className="absolute -top-16 -right-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
        </div>

        <div className="relative bg-white/90 backdrop-blur rounded-3xl shadow-xl overflow-hidden border border-[#E6EEF5]">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-2 bg-gradient-to-b from-[#1E4F7A] to-[#143A5A] text-white p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white/80">
                  Account Security
                </div>
                <h1 className="text-2xl font-semibold mt-4">
                  Verify your account
                </h1>
                <p className="text-sm text-white/80 mt-3 leading-relaxed">
                  We extracted the token from the URL for you. If it&apos;s
                  missing, request a new token from the previous screen.
                </p>
              </div>
              <div className="mt-8 space-y-3 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/25"></span>
                  Token is extracted from URL
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/25"></span>
                  Token expires after a short time
                </div>
              </div>
            </div>
            <div className="md:col-span-3 p-8 flex flex-col gap-8">
              <div>
                <div className="text-xs font-['Spline_Sans_Mono'] uppercase tracking-widest text-[#6B7280]">
                  Step 2
                </div>
                <h2 className="text-lg font-semibold text-[#1E4F7A] mt-1">
                  Verify your token
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                  <div className="text-sm text-gray-600">Token</div>
                  <div className="mt-2 text-lg font-medium text-[#1E4F7A] break-all">
                    {token ?? "(not found)"}
                  </div>
                </div>

                {message && (
                  <p className="text-sm text-center text-[#1E4F7A]">
                    {message}
                  </p>
                )}

                <button
                  type="button"
                  disabled={!token || isLoading}
                  onClick={handleVerifyToken}
                  className="bg-[#1E4F7A] text-white py-2.5 rounded-full hover:bg-[#143A5A] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent"></span>
                      Verifying...
                    </span>
                  ) : (
                    "Verify token"
                  )}
                </button>

                <div className="flex justify-between text-sm text-gray-500">
                  <button
                    type="button"
                    onClick={() => navigate("/verify-account")}
                    className="underline cursor-pointer"
                  >
                    Request new token
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

export default VerifyToken;
