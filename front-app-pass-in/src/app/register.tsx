import { View, Image, StatusBar, Alert } from "react-native";
import { Link, router } from "expo-router";

import { colors } from "@/styles/colors";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useUser } from "@/context/userContext";
import { api, registerToEvent } from "@/server/api";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const isDisabled = !user.name.trim() || !user.email.trim();

  async function handleRegister() {
    if (!user.name.trim() || !user.email.trim()) {
      return Alert.alert("Inscrição", "Preencha todos os campos!");
    }

    const userInfo = {
      name: user.name,
      email: user.email,
    };

    try {
      setLoading(true);
      const { attendeeId } = await registerToEvent(userInfo);

      if (!!attendeeId) {
        setUser({
          ...user,
          ticketCode: String(attendeeId),
        });

        Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
          {
            text: "OK",
            onPress: () => router.push("/ticket"),
          },
        ]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (axios.isAxiosError(error)) {
        const { response } = error;
        return Alert.alert("Inscrição", `Message: ${response?.data.message}`);
      }

      Alert.alert("Inscrição", "Erro ao realizar inscrição!");
    }
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
            onChangeText={(val) => setUser({ ...user, name: val })}
          />
        </Input>

        <Input>
          <Input.Icon name="email-outline" color={colors.green[200]} />
          <Input.Field
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(val) => setUser({ ...user, email: val })}
          />
        </Input>

        <Button
          title="Realizar inscrição"
          onPress={handleRegister}
          disabled={isDisabled || loading}
          isLoading={loading}
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
