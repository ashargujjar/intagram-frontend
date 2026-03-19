import { useState } from "react";
import logo from "../assets/Untitled design (1).png";
import Image from "../assets/Gemini_Generated_Image_u640hmu640hmu640.png";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const interestsOptions = [
  "Technology",
  "Sports",
  "Music",
  "Art",
  "Travel",
  "Science",
  "Gaming",
  "Food",
  "Fashion",
  "Fitness",
];
interface IUser {
  username: string;
  email: string;
  password: string;
  intrest: string[];
}
// signup prop
const Signup = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState<IUser>({
    email: "",
    intrest: [],
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setUser((prev) => {
      if (prev.intrest.includes(interest)) {
        return {
          ...prev,
          intrest: prev.intrest.filter((i) => i !== interest),
        };
      } else if (prev.intrest.length < 5) {
        return {
          ...prev,
          intrest: [...prev.intrest, interest],
        };
      }
      return prev;
    });
  };
  const navigate = useNavigate();
  const isSelected = (interest: string) => user.intrest.includes(interest);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name as keyof IUser]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
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
      const res = await fetch(`${backendUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success(data?.message ?? "Signup successful. Please log in.");
        navigate("/login");
      } else {
        toast.error(data?.message ?? "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("Unable to sign up right now. Please try again.");
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
          <div className="md:w-1/2 h-64 md:h-auto relative">
            <img
              src={Image}
              alt="Family connected together"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A43]/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-xs uppercase tracking-widest text-white/70">
                Get started
              </div>
              <div className="text-xl font-semibold">Join Rabta</div>
              <div className="text-sm text-white/80 mt-1">
                Create your space and connect instantly.
              </div>
            </div>
          </div>

          <div className="md:w-1/2 p-6 md:p-10 flex flex-col gap-5 md:gap-7">
            <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden border-2 border-[#F2A32C]/30 bg-white">
              <img
                src={logo}
                alt="Website logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center">
              <div className="text-xs uppercase tracking-widest text-[#6B7280]">
                Create account
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#1E4F7A] mt-2">
                Signup to Rabta
              </h1>
              <p className="text-sm text-[#4B6B88] mt-1">
                A calm, verified place to share and connect.
              </p>
            </div>

            <form
              className="flex flex-col gap-4 md:gap-5"
              onSubmit={handleSubmit}
            >
              <Input
                Label="Username"
                name="username"
                placeholder="Enter your username"
                type="text"
                value={user.username}
                handleChange={handleChange}
              />
              <Input
                Label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={user.email}
                handleChange={handleChange}
              />
              <Input
                Label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={user.password}
                handleChange={handleChange}
              />

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Interests (up to 5)
                </label>

                {user.intrest.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {user.intrest.map((interest) => (
                      <span
                        key={interest}
                        className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F2A32C] text-white text-sm font-medium"
                      >
                        {interest}
                        <button
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className="ml-1.5 text-white hover:text-white/80 focus:outline-none cursor-pointer"
                        >
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {interestsOptions.map((interest) => {
                    const selected = isSelected(interest);
                    const disabled = !selected && user.intrest.length >= 5;

                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        disabled={disabled}
                        className={`
                          px-3.5 py-1.5 text-sm rounded-full border transition-all duration-200
                          ${
                            selected
                              ? "bg-[#F2A32C]/20 border-[#F2A32C] text-[#F2A32C] font-medium"
                              : disabled
                                ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                                : "bg-white border-gray-300 text-gray-700 hover:border-[#F2A32C] hover:text-[#F2A32C] hover:bg-[#F2A32C]/10"
                          }
                        `}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-gray-500 mt-1.5 font-['Spline_Sans_Mono']">
                  Selected: {user.intrest.length} / 5
                </p>
              </div>

              <button
                type="submit"
                className="mt-2 bg-[#F2A32C] text-white py-3 rounded-full font-medium hover:opacity-90 transition shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span className="sr-only">Creating account...</span>
                  </span>
                ) : (
                  "Signup"
                )}
              </button>
            </form>

            <p className="text-[#1E4F7A] text-center text-sm mt-1">
              Already have an account?
              <a
                href="/login"
                className="text-[#F2A32C] pl-1.5 underline hover:opacity-80 cursor-pointer"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
