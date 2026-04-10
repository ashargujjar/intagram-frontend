import Nav from "@/components/Nav";
import SendRequestHeader from "@/components/Sendrequest/SendRequestHeader";
import RecentRequestsCard from "@/components/Sendrequest/RecentRequestsCard";
import type { RequestHistoryItem } from "@/components/Sendrequest/types";

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
  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      <div className="flex-1 mt-4 sm:mt-0 font-['Space_Grotesk']">
        <SendRequestHeader />

        <div className="mt-8">
          <RecentRequestsCard items={mockHistoryItems} />
        </div>
      </div>
    </div>
  );
};

export default SendRequest;
