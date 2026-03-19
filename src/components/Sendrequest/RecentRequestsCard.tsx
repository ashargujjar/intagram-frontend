import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Ban,
  CheckCircle2,
  Clock3,
  MessageSquareText,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { RequestHistoryItem, RequestStatus } from "./types";

const statusMeta: Record<
  RequestStatus,
  { label: string; icon: typeof Clock3; className: string }
> = {
  pending: {
    label: "Pending",
    icon: Clock3,
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  approved: {
    label: "Accepted",
    icon: CheckCircle2,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  declined: {
    label: "Declined",
    icon: XCircle,
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
  canceled: {
    label: "Canceled",
    icon: Ban,
    className: "border-slate-200 bg-slate-50 text-slate-600",
  },
};

type RecentRequestsCardProps = {
  items: RequestHistoryItem[];
  viewAllHref?: string;
};

const RecentRequestsCard = ({
  items,
  viewAllHref = "/sent-requests",
}: RecentRequestsCardProps) => {
  return (
    <div className="rounded-2xl border border-[#E6EEF5] bg-white/90 shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-['Spline_Sans_Mono'] uppercase tracking-widest text-[#6B7280]">
            History
          </div>
          <h3 className="text-lg font-semibold text-[#1E4F7A] mt-1">
            Recent requests
          </h3>
        </div>
        <Button
          asChild
          variant="ghost"
          size="xs"
          className="text-[#1E4F7A] hover:text-[#143A5A]"
        >
          <Link to={viewAllHref}>View all</Link>
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {items.map((item) => {
          const meta = statusMeta[item.status];
          const StatusIcon = meta.icon;
          const initials = item.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          const isPending = item.status === "pending";
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#1E4F7A] text-white text-sm font-semibold flex items-center justify-center">
                    {initials}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.handle}
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {item.time}
                    </div>
                  </div>
                </div>
                <div
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium ${meta.className}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {meta.label}
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-600">{item.note}</div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="xs">
                  <MessageSquareText className="w-3 h-3" />
                  Message
                </Button>
                {isPending ? (
                  <Button variant="ghost" size="xs">
                    <Ban className="w-3 h-3" />
                    Cancel
                  </Button>
                ) : (
                  <Button variant="ghost" size="xs">
                    <ArrowUpRight className="w-3 h-3" />
                    View profile
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentRequestsCard;
