import { create } from "zustand";
export type AttendeeItem = {
  attendeeName: string;
  pageIndex: number;
  eventId: string;
};

interface AttendeesStore {
  attendeeItem: AttendeeItem;
  setAttendeeItem: (attendeeItem: AttendeeItem) => void;
}

const url = new URL(window.location.toString());
const search = url.searchParams.get("search") || "";
const page = url.searchParams.get("page");
const pageIndex = page ? Number(page) : 0;

export const useAttendeesStore = create<AttendeesStore>()((set) => ({
  attendeeItem: {
    attendeeName: search,
    pageIndex: pageIndex,
    eventId: "bcf25cd0-c2ed-4a6c-8712-baf095a45dcb",
  },
  setAttendeeItem: (attendeeItem) => set({ attendeeItem }),
}));
