import { View, Image, StatusBar, Alert } from "react-native";
import { Link, Redirect } from "expo-router";

import { colors } from "@/styles/colors";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import axios from "axios";
import {
  useGetAttendeeBadge,
  useRegisterAttendeeToEvent,
} from "@/hooks/useGetAttendees";
import { useRef } from "react";
import { queryClient } from "@/lib/useQuery";
import { Attendee, AttendeeBadge, AttendeeInfo } from "@/server/api";
import { Badge, useBadgeStore } from "@/store/badge-store";

export default function Register() {
  const attendeeInfo = useRef<AttendeeInfo>({
    name: "",
    email: "",
  });
  const { attendeeId, registerError, registerFetching } =
    useRegisterAttendeeToEvent(attendeeInfo.current);
  const { badgeFetching } = useGetAttendeeBadge(
    attendeeId?.attendeeId.toString() || ""
  );
  const { data, saveBadge } = useBadgeStore();

  function handleChange(field: string, val: string) {
    attendeeInfo.current = {
      ...attendeeInfo.current,
      [field]: val,
    };
  }

  async function handleRegister() {
    if (
      !attendeeInfo.current.name.trim() ||
      !attendeeInfo.current.email.trim()
    ) {
      return Alert.alert("Inscrição", "Preencha todos os campos!");
    }

    try {
      const { attendeeId } = await queryClient.fetchQuery<Attendee>({
        queryKey: ["attendee"],
      });

      if (attendeeId) {
        const { badge } = await queryClient.fetchQuery<{
          badge: AttendeeBadge;
        }>({
          queryKey: ["attendeeBadge"],
        });

        const badgeData: Badge = {
          id: attendeeId,
          ...badge,
        };
        saveBadge(badgeData);
      }
    } catch {
      if (registerError) {
        if (axios.isAxiosError(registerError)) {
          const { response } = registerError;
          console.error(response?.data.message);
          return Alert.alert("Participante", `Erro: ${response?.data.message}`);
        }

        console.error(registerError.message);
        return Alert.alert("Participante", `Erro: ${registerError.message}`);
      }
    }
  }

  if (data) {
    return <Redirect href="/ticket" />;
  }

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
          <Input.Icon name="account-circle-outline" color={colors.green[200]} />
          <Input.Field
            placeholder="Nome completo"
            onChangeText={(val) => handleChange("name", val)}
          />
        </Input>

        <Input>
          <Input.Icon name="email-outline" color={colors.green[200]} />
          <Input.Field
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(val) => handleChange("email", val)}
          />
        </Input>

        <Button
          title="Realizar inscrição"
          onPress={handleRegister}
          disabled={registerFetching || badgeFetching}
          isLoading={registerFetching || badgeFetching}
        />
        <Link
          href="/"
          className="text-gray-100 text-base text-center mt-8 font-bold"
        >
          Ja possui ingresso?
        </Link>
      </View>
    </View>
  );
}
