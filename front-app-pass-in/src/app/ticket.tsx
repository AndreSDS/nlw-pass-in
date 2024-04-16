import {
  StatusBar,
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  Share,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Credential } from "@/components/credential";
import { useBadgeStore } from "@/store/badge-store";
import { Redirect } from "expo-router";
import { MotiView } from "moti";

export default function Ticket() {
  const { data, removeBadge } = useBadgeStore();

  if (!data) {
    return <Redirect href="/" />;
  }

  async function handleSharedTicket() {
    try {
      await Share.share({
        message: `Eu vou participar do evento ${data?.checkInUrl}!`,
      });
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Compartilhar",
        "Não foi possível compartilhar a credencial."
      );
    }
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential />

        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 10,
          }}
          transition={{
            loop: true,
            type: "timing",
            duration: 700,
          }}
        >
          <FontAwesome
            name="angle-double-down"
            size={24}
            color={colors.gray[300]}
            className="self-center my-6"
          />
        </MotiView>

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que voce vai participar do {data.event}!
        </Text>

        <Button title="Compartilhar" onPress={handleSharedTicket} />

        <Pressable
          onPress={removeBadge}
          style={{ opacity: 0.7 }}
          className="mt-6"
        >
          <Text className="text-base text-white font-bold text-center">
            Remover Ingresso
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
