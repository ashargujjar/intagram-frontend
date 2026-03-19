import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type TopoverviewProps = {
  title: string;
  subtitle: string;
  searchPlaceholder?: string;
  ctaLabel: string;
  ctaHref: string;
};

const Topoverview = ({
  title,
  subtitle,
  searchPlaceholder = "Search name or handle",
  ctaLabel,
  ctaHref,
}: TopoverviewProps) => {
  return (
    <div className="rounded-2xl border border-[#E6EEF5] bg-white/90 shadow-sm p-4 md:p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <div className="text-sm font-semibold text-[#0B2A43]">{title}</div>
        <div className="text-xs text-[#4B6B88]">{subtitle}</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
        <div className="relative w-full sm:w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-9 bg-white focus-visible:ring-[#1E4F7A]"
          />
        </div>
        <Button
          asChild
          className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white rounded-full"
        >
          <Link to={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Topoverview;
