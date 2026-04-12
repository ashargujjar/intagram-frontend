import { Button } from "@/components/ui/button";

type ProfileSummaryCardProps = {
  summary?: string;
  isLoading?: boolean;
  onSummarize?: () => void;
};

const ProfileSummaryCard = ({
  summary,
  isLoading = false,
  onSummarize,
}: ProfileSummaryCardProps) => {
  const hasSummary = Boolean(summary && summary.trim().length > 0);
  return (
    <div className="mt-4 rounded-2xl border border-[#E6EEF5] bg-white/90 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#0B2A43]">
            Profile summary
          </p>
          <p className="text-xs text-[#4B6B88]">
            A short summary of this profile will appear here.
          </p>
        </div>
        <Button
          type="button"
          onClick={onSummarize}
          disabled={!onSummarize || isLoading}
          className="h-8 rounded-full px-4 text-xs font-semibold bg-[#1E4F7A] text-white hover:bg-[#143A5A] disabled:opacity-60"
        >
          {isLoading ? "Summarizing..." : "Summarize"}
        </Button>
      </div>

      <div className="mt-3 rounded-xl border border-dashed border-[#1E4F7A]/30 bg-[#F9FBFF] p-3">
        {hasSummary ? (
          <p className="text-sm text-[#1A1A1A]">{summary}</p>
        ) : (
          <p className="text-sm text-[#4B6B88]">
            Summary placeholder. Add your summarization logic later.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileSummaryCard;
