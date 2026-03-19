import Nav from "@/components/Nav";
import Topoverview from "@/components/Sentrequests/Topoverview";
import SentRequestsHeader from "@/components/Sentrequests/SentRequestsHeader";
import RequestHistoryCard from "@/components/Sentrequests/RequestHistoryCard";
import RequestBreakdownCard from "@/components/Sentrequests/RequestBreakdownCard";
import NextStepsCard from "@/components/Sentrequests/NextStepsCard";
import type {
  RequestStatus,
  SentRequestItem,
} from "@/components/Sentrequests/types";

const mockSentRequests: SentRequestItem[] = [
  {
    id: "req-01",
    name: "Amira Khan",
    handle: "@amirak",
    status: "pending",
    time: "12 mins ago",
    note: "Met at ProductPak meetup.",
  },
  {
    id: "req-02",
    name: "Rafael Ortiz",
    handle: "@rafael.codes",
    status: "approved",
    time: "Yesterday",
    note: "Shared a talk on TypeScript.",
  },
  {
    id: "req-03",
    name: "Nadia Ali",
    handle: "@nadia.designs",
    status: "declined",
    time: "3 days ago",
    note: "Loved the branding work!",
  },
  {
    id: "req-04",
    name: "Sami Noor",
    handle: "@samin",
    status: "canceled",
    time: "1 week ago",
    note: "Sent by mistake.",
  },
  {
    id: "req-05",
    name: "Priya Desai",
    handle: "@priyad",
    status: "approved",
    time: "1 week ago",
    note: "Collaborated on open-source.",
  },
  {
    id: "req-06",
    name: "Hamza Yousaf",
    handle: "@hamzay",
    status: "pending",
    time: "2 weeks ago",
    note: "Mutual friend from DevFest.",
  },
  {
    id: "req-07",
    name: "Julia Park",
    handle: "@juliap",
    status: "declined",
    time: "3 weeks ago",
    note: "Asked to connect after workshop.",
  },
  {
    id: "req-08",
    name: "Omar Rizvi",
    handle: "@omarr",
    status: "approved",
    time: "1 month ago",
    note: "Connected via design review.",
  },
];

type SentRequestsProps = {
  requests?: SentRequestItem[];
};

const SentRequests = ({ requests = mockSentRequests }: SentRequestsProps) => {
  const statusCounts = requests.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {
      pending: 0,
      approved: 0,
      declined: 0,
      canceled: 0,
    } as Record<RequestStatus, number>,
  );
  const totalRequests = requests.length;
  const approvedPercent = totalRequests
    ? Math.round((statusCounts.approved / totalRequests) * 100)
    : 0;

  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      <div className="flex-1 mt-4 sm:mt-0 font-['Space_Grotesk']">
        <SentRequestsHeader
          totalRequests={totalRequests}
          pendingCount={statusCounts.pending}
          approvedCount={statusCounts.approved}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-6">
            <Topoverview
              title="All sent requests"
              subtitle="Track the status of every follow request you have sent."
              ctaLabel="New request"
              ctaHref="/send-request"
            />

            <RequestHistoryCard requests={requests} />
          </div>

          <aside className="flex flex-col gap-6">
            <RequestBreakdownCard
              statusCounts={statusCounts}
              approvedPercent={approvedPercent}
            />
            <NextStepsCard />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SentRequests;
