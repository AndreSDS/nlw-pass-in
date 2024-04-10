import "@/styles/global.css";
import { Slot } from "expo-router";
import { queryClient, QueryClientProvider } from "@/lib/useQuery";
import {
  useFonts,
  RobotoMono_400Regular,
  RobotoMono_500Medium,
  RobotoMono_700Bold,
} from "@expo-google-fonts/roboto-mono";
import { Loading } from "@/components/loading";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading bgColor="bg-green-500" color="text-orange-200" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}
