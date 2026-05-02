// CenterLoader.tsx
import { Loader2 } from "lucide-react";

export default function CenterLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-white/20"></div>

          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-500 animate-spin"></div>

          <Loader2 className="absolute inset-0 m-auto w-8 h-8 text-white animate-spin" />
        </div>

        {/* Text */}
        <p className="text-white text-lg font-semibold tracking-wide animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
