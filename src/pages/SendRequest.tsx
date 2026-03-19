import Nav from "@/components/Nav";
import SendRequestHeader from "@/components/Sendrequest/SendRequestHeader";
import RequestFormCard from "@/components/Sendrequest/RequestFormCard";
import RequestActivityCard from "@/components/Sendrequest/RequestActivityCard";
import RecentRequestsCard from "@/components/Sendrequest/RecentRequestsCard";
import type {
  RequestHistoryItem,
  RequestStatus,
} from "@/components/Sendrequest/types";
import { useSearchParams } from "react-router-dom";

const mockHistoryItems: RequestHistoryItem[] = [
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
];

const SendRequest = () => {
  const [searchParams] = useSearchParams();
  const requestedUser = searchParams.get("user") || "";

  const statusCounts = mockHistoryItems.reduce(
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
  const totalRequests = mockHistoryItems.length;
  const approvedPercent = totalRequests
    ? Math.round((statusCounts.approved / totalRequests) * 100)
    : 0;

  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      <div className="flex-1 mt-4 sm:mt-0 font-['Space_Grotesk']">
        <SendRequestHeader />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-6">
            <RequestFormCard requestedUser={requestedUser} />
          </div>

          <aside className="flex flex-col gap-6">
            <RequestActivityCard
              statusCounts={statusCounts}
              approvedPercent={approvedPercent}
            />
            <RecentRequestsCard items={mockHistoryItems} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SendRequest;
