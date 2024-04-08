import { View, Image, StatusBar, Alert } from "react-native";
import { Link } from "expo-router";

import { colors } from "@/styles/colors";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useUser } from "@/context/userContext";

export default function Home() {
  const { user, setUser } = useUser();

  function handleTicketCode() {
    if (!user.ticketCode.trim()) {
      return Alert.alert("Ingresso", "Informe o código do ingresso!");
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
          <Input.Icon
            name="ticket-confirmation-outline"
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Codigo do ingresso..."
            onChangeText={(val) => setUser({ ...user, ticketCode: val })}
          />
        </Input>

        <Button title="Acessar credencial" onPress={handleTicketCode} />
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
