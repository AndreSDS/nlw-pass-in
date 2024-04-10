import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  onlineManager,
  focusManager,
} from "@tanstack/react-query";
import { NotifyOnChangeProps } from "@tanstack/query-core";
import { AppStateStatus, Platform } from "react-native";

const queryClient = new QueryClient();

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export {
  onlineManager,
  focusManager,
  queryClient,
  NotifyOnChangeProps,
  useQuery,
  useMutation,
  useQueryClient,
  QueryClientProvider,
  onAppStateChange,
};
