export type EventType = {
  id: string;
  type: "Seminar" | "Workshop" | "Party";
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  address: string;
  description: string;
  registeredUsersCount: number;
};
