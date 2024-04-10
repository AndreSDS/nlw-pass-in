import { create } from "zustand";

export type AttendeeBadge = {
  name: string;
  email: string;
  event: string;
  checkInUrl: string;
};

export type Attendee = {
  avatar: string;
  name: string;
  email: string;
  attendeeId: string;
};

interface AttendeeStore {
  attendee: Attendee;
  badge: AttendeeBadge;
  setUser: (attendee: Attendee) => void;
  setBadge: (badge: AttendeeBadge) => void;
}

const useAttendee = create<AttendeeStore>()((set) => ({
  attendee: {
    avatar: "",
    name: "",
    email: "",
    attendeeId: "",
  },
  badge: {
    name: "",
    email: "",
    event: "",
    checkInUrl: "",
  },
  setUser: (attendee) => set({ attendee }),
  setBadge: (badge) => set({ badge }),
}));

export { useAttendee };
