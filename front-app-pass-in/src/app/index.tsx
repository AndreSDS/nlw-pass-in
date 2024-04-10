import { useEffect, useRef } from "react";
import { View, Image, StatusBar, Alert, AppState } from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager, onAppStateChange, queryClient } from "@/lib/useQuery";
import { colors } from "@/styles/colors";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useGetAttendeeBadge } from "@/hooks/useGetAttendees";
import { AttendeeBadge } from "@/server/api";

export default function Home() {
  const attendeeId = useRef<string>("");
  const { badgeError, badgeFetching } = useGetAttendeeBadge(attendeeId.current);

  const handleChange = (val: string) => (attendeeId.current = val);

  async function handleTicketCode() {
    if (!attendeeId.current.trim()) {
      return Alert.alert("Ingresso", "Informe o código do ingresso!");
    }

    try {
      await queryClient.fetchQuery<AttendeeBadge>({
        queryKey: ["attendeeBadge"],
      });

      router.push("/ticket");
    } catch {
      if (badgeError) {
        if (axios.isAxiosError(badgeError)) {
          const { response } = badgeError;
          console.error(response?.data.message);
          return Alert.alert("Ingresso", `Erro: ${response?.data.message}`);
        }

        console.error(badgeError.message);
        return Alert.alert("Ingresso", `Erro: ${badgeError.message}`);
      }
    }
  }

  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
      });
    });
  }, [NetInfo, onAppStateChange]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

      <Image
        source={require("@/assets/logo.png")}
        resizeMode="contain"
        style={{ height: 64 }}
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <Input.Icon
            name="ticket-confirmation-outline"
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Codigo do ingresso..."
            onChangeText={handleChange}
          />
        </Input>

        <Button
          disabled={badgeFetching}
          isLoading={badgeFetching}
          title="Acessar credencial"
          onPress={handleTicketCode}
        />
        <Link
          href="/register"
          className="text-gray-100 text-base text-center mt-8 font-bold"
        >
          Criar credencial
        </Link>
      </View>
    </View>
  );
}
