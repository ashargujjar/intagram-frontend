import type { RequestStatus } from "./types";

type RequestActivityCardProps = {
  statusCounts: Record<RequestStatus, number>;
  approvedPercent: number;
};

const RequestActivityCard = ({
  statusCounts,
  approvedPercent,
}: RequestActivityCardProps) => {
  return (
    <div className="rounded-2xl border border-[#E6EEF5] bg-white/90 shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-['Spline_Sans_Mono'] uppercase tracking-widest text-[#6B7280]">
            Overview
          </div>
          <h3 className="text-lg font-semibold text-[#1E4F7A] mt-1">
            Request activity
          </h3>
        </div>
        <div className="text-xs text-[#4B6B88]">Last 30 days</div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <div className="text-[11px] text-slate-500 uppercase tracking-wide">
            Pending
          </div>
          <div className="text-2xl font-semibold text-slate-900">
            {statusCounts.pending}
          </div>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
          <div className="text-[11px] text-emerald-700 uppercase tracking-wide">
            Accepted
          </div>
          <div className="text-2xl font-semibold text-emerald-800">
            {statusCounts.approved}
          </div>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
          <div className="text-[11px] text-rose-700 uppercase tracking-wide">
            Declined
          </div>
          <div className="text-2xl font-semibold text-rose-800">
            {statusCounts.declined}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <div className="text-[11px] text-slate-500 uppercase tracking-wide">
            Canceled
          </div>
          <div className="text-2xl font-semibold text-slate-900">
            {statusCounts.canceled}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-[#1E4F7A]"
            style={{ width: `${approvedPercent}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-[#4B6B88]">
          {approvedPercent}% accepted so far
        </div>
      </div>
    </div>
  );
};

export default RequestActivityCard;
