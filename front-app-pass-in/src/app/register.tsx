import { View, Image, StatusBar, Alert } from "react-native";
import { Link, router } from "expo-router";

import { colors } from "@/styles/colors";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useUser } from "@/context/userContext";

export default function Register() {
  const { user, setUser } = useUser();

  const isDisabled = !user.name.trim() || !user.email.trim();

  function handleRegister() {
    if (!user.name.trim() || !user.email.trim()) {
      return Alert.alert("Inscrição", "Preencha todos os campos!");
    }

    router.push("/ticket");
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
          disabled={isDisabled}
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
