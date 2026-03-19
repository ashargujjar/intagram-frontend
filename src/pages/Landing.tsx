import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import logo from "../assets/Untitled design (1).png";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified and secure",
    description:
      "Email verification and account safety built in from the first step.",
  },
  {
    icon: MessageSquare,
    title: "Simple customer chat",
    description: "Start conversations instantly and keep your updates clear.",
  },
  {
    icon: Sparkles,
    title: "Clean, calm design",
    description: "Focus on what matters with a minimal and elegant interface.",
  },
];

const steps = [
  {
    label: "01",
    title: "Create your account",
    description: "Join Rabta in seconds with a simple signup.",
  },
  {
    label: "02",
    title: "Verify your email",
    description: "Confirm your account and unlock all features.",
  },
  {
    label: "03",
    title: "Start sharing",
    description: "Post, chat, and connect with your community.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F6FBFF] text-[#0B2A43]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
          <div className="absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
          <div className="absolute inset-0 bg-[linear-gradient(120deg,_transparent_45%,_rgba(30,79,122,0.08)_50%,_transparent_55%)]"></div>
        </div>

        <header className="relative z-10 max-w-6xl mx-auto px-4 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Rabta logo"
              className="w-11 h-11 rounded-full object-cover shadow-sm"
            />
            <div className="font-['Space_Grotesk'] text-xl font-semibold">
              Rabta
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#4B6B88]">
            <a href="#features" className="hover:text-[#1E4F7A] transition">
              Features
            </a>
            <a href="#steps" className="hover:text-[#1E4F7A] transition">
              How it works
            </a>
            <a href="#cta" className="hover:text-[#1E4F7A] transition">
              Get started
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-sm rounded-full border border-[#D6E2EC] text-[#1E4F7A] bg-white/70 hover:bg-white transition shadow-sm"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm rounded-full bg-[#1E4F7A] text-white hover:bg-[#143A5A] transition shadow-md"
            >
              Create account
            </Link>
          </div>
        </header>

        <main className="relative z-10 max-w-6xl mx-auto px-4 pb-16 pt-10 font-['Space_Grotesk']">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#1E4F7A] border border-[#E6EEF5] shadow-sm font-['Spline_Sans_Mono']">
                <Sparkles className="w-4 h-4" />
                Customer-first landing
              </div>

              <h1 className="text-3xl md:text-5xl font-semibold leading-tight mt-4">
                A beautiful first impression before login and signup.
              </h1>
              <p className="text-base md:text-lg text-[#4B6B88] mt-4 max-w-xl">
                Rabta helps your customers connect, verify, and start sharing in
                a calm, trustworthy space. Everything they need, right from the
                first page.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  to="/signup"
                  className="bg-[#F2A32C] text-white px-5 py-2.5 rounded-full hover:opacity-90 transition shadow-md flex items-center gap-2"
                >
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-full border border-[#D6E2EC] text-[#1E4F7A] bg-white/70 hover:bg-white transition shadow-sm"
                >
                  I already have an account
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl bg-white/80 border border-[#E6EEF5] px-4 py-3 shadow-sm">
                  <div className="text-lg font-semibold">Fast</div>
                  <div className="text-xs text-[#4B6B88] uppercase tracking-widest">
                    Signup flow
                  </div>
                </div>
                <div className="rounded-2xl bg-white/80 border border-[#E6EEF5] px-4 py-3 shadow-sm">
                  <div className="text-lg font-semibold">Secure</div>
                  <div className="text-xs text-[#4B6B88] uppercase tracking-widest">
                    Verified access
                  </div>
                </div>
                <div className="rounded-2xl bg-white/80 border border-[#E6EEF5] px-4 py-3 shadow-sm">
                  <div className="text-lg font-semibold">Friendly</div>
                  <div className="text-xs text-[#4B6B88] uppercase tracking-widest">
                    Customer ready
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-150">
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-2xl bg-[#F2A32C]/20 blur-2xl"></div>
              <div className="relative rounded-3xl border border-[#E6EEF5] bg-white shadow-xl p-6">
                <div className="flex items-center justify-between border-b border-dashed border-[#E6EEF5] pb-4">
                  <div>
                    <div className="text-xs text-[#6B7280] uppercase tracking-widest">
                      Welcome
                    </div>
                    <div className="text-lg font-semibold">Your first steps</div>
                  </div>
                  <div className="text-xs text-[#1E4F7A] font-semibold bg-[#F6FBFF] px-3 py-1 rounded-full border border-[#E6EEF5]">
                    Ready
                  </div>
                </div>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1E4F7A] mt-0.5" />
                    <div>
                      <div className="font-semibold">Create your profile</div>
                      <div className="text-[#4B6B88]">
                        Add a name and photo to look trusted.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1E4F7A] mt-0.5" />
                    <div>
                      <div className="font-semibold">Verify your email</div>
                      <div className="text-[#4B6B88]">
                        Get your token and unlock full access.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1E4F7A] mt-0.5" />
                    <div>
                      <div className="font-semibold">Start connecting</div>
                      <div className="text-[#4B6B88]">
                        Post updates and chat with confidence.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-[#E6EEF5] bg-[#F6FBFF] p-4 text-xs text-[#4B6B88] font-['Spline_Sans_Mono']">
                  Tip: Customers who verify within 5 minutes get a smoother
                  onboarding experience.
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="mt-16">
            <div className="text-sm text-[#4B6B88] uppercase tracking-widest">
              Features
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mt-2">
              Everything a customer needs, right away.
            </h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#E6EEF5] bg-white shadow-sm p-5"
                >
                  <div className="h-10 w-10 rounded-full bg-[#F6FBFF] border border-[#E6EEF5] flex items-center justify-center text-[#1E4F7A]">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4">{item.title}</h3>
                  <p className="text-sm text-[#4B6B88] mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="steps" className="mt-16">
            <div className="text-sm text-[#4B6B88] uppercase tracking-widest">
              How it works
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mt-2">
              Simple steps to get started.
            </h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step) => (
                <div
                  key={step.label}
                  className="rounded-2xl border border-[#E6EEF5] bg-white/80 shadow-sm p-5"
                >
                  <div className="text-xs font-['Spline_Sans_Mono'] text-[#1E4F7A] border border-[#E6EEF5] inline-flex rounded-full px-3 py-1 bg-white">
                    {step.label}
                  </div>
                  <h3 className="text-lg font-semibold mt-4">{step.title}</h3>
                  <p className="text-sm text-[#4B6B88] mt-2">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="cta"
            className="mt-16 rounded-3xl bg-gradient-to-r from-[#1E4F7A] to-[#143A5A] text-white p-8 md:p-10 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/70">
                  Ready to begin
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold mt-2">
                  Create your account and welcome your customers today.
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/signup"
                  className="bg-[#F2A32C] text-white px-5 py-2.5 rounded-full hover:opacity-90 transition shadow-md"
                >
                  Sign up free
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-full border border-white/40 text-white hover:bg-white/10 transition"
                >
                  Login
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Landing;
