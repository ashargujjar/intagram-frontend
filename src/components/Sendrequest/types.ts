export type RequestStatus = "pending" | "approved" | "declined" | "canceled";

export type RequestHistoryItem = {
  id: string;
  name: string;
  handle: string;
  status: RequestStatus;
  time: string;
  note: string;
};
