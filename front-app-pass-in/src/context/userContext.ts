import { create } from "zustand";

export type User = {
  avatar: string;
  name: string;
  email: string;
  ticketCode: string;
};

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

const useUser = create<UserStore>()((set) => ({
  user: {
    avatar: "",
    name: "",
    email: "",
    ticketCode: "",
  },
  setUser: (user) => set({ user }),
}));

export { useUser };
