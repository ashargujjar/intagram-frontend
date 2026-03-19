export type RequestStatus = "pending" | "approved" | "declined" | "canceled";

export type SentRequestItem = {
  id: string;
  name: string;
  handle: string;
  status: RequestStatus;
  time: string;
  note: string;
};
