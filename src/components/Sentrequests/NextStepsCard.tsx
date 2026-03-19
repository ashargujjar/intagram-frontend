import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type NextStepsCardProps = {
  primaryHref?: string;
  secondaryHref?: string;
};

const NextStepsCard = ({
  primaryHref = "/send-request",
  secondaryHref = "/friend-requests",
}: NextStepsCardProps) => {
  return (
    <div className="rounded-2xl border border-[#E6EEF5] bg-white/90 shadow-sm p-5">
      <div className="text-xs font-['Spline_Sans_Mono'] uppercase tracking-widest text-[#6B7280]">
        Next steps
      </div>
      <h3 className="text-lg font-semibold text-[#1E4F7A] mt-1">
        Keep connections moving
      </h3>
      <p className="text-xs text-[#4B6B88] mt-2">
        Send a new request or review incoming requests from your profile.
      </p>
      <div className="mt-4 flex flex-col gap-2">
        <Button
          asChild
          className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white rounded-full"
        >
          <Link to={primaryHref}>Send new request</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link to={secondaryHref}>View friend requests</Link>
        </Button>
      </div>
    </div>
  );
};

export default NextStepsCard;
