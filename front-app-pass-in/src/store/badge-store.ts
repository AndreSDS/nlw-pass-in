import { AttendeeBadge } from "@/context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Badge = AttendeeBadge & {
  id: string;
};

type BadgeStore = {
  data: Badge | null;
  saveBadge: (data: Badge) => void;
  removeBadge: () => void;
};

export const useBadgeStore = create(
  persist<BadgeStore>(
    (set) => ({
      data: null,
      saveBadge: (data) => set({ data: data }),
      removeBadge: () => set({ data: null }),
    }),
    {
      name: "pass-in:badge",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
