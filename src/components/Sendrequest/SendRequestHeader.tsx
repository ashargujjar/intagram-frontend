const SendRequestHeader = () => {
  return (
    <div className="w-full max-w-6xl">
      <div className="relative overflow-hidden rounded-3xl border border-[#E6EEF5] bg-gradient-to-br from-white via-[#F6FBFF] to-[#FFF4E1] shadow-lg p-6 md:p-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
          <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
        </div>
        <div className="relative">
          <div className="text-xs uppercase tracking-widest text-[#6B7280]">
            Private profiles
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2A43] mt-2">
            Send a follow request
          </h1>
          <p className="text-sm text-[#4B6B88] mt-2 max-w-xl">
            Add a short note so the user knows who you are.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-['Spline_Sans_Mono'] text-[#4B6B88]">
            <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
              Optional note
            </span>
            <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
              Secure request
            </span>
            <span className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1">
              Private account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendRequestHeader;
