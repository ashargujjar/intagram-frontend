const Features = () => {
  const features: string[] = ["Safe access", "Verified users", "Fast login"];
  return (
    <div className="flex flex-wrap gap-2 text-xs font-['Spline_Sans_Mono'] text-[#4B6B88] justify-center">
      {features.map((x, i) => {
        return (
          <span
            key={i}
            className="rounded-full border border-[#D6E2EC] bg-white/80 px-3 py-1"
          >
            {x}
          </span>
        );
      })}
    </div>
  );
};

export default Features;
