import { useState } from "react";
import {
  Image,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { QRCode } from "@/components/qrcode";
import { ModalComponent } from "./modal";
import { queryClient } from "@/lib/useQuery";
import { AttendeeBadge } from "@/server/api";

type CredentialBadge = {
  badge: AttendeeBadge;
};

export function Credential() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const { badge } = queryClient.getQueryData([
    "attendeeBadge",
  ]) as CredentialBadge;

  const { name, email, checkInUrl } = badge;

  async function handleSelectAvatar() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.assets) {
      queryClient.setQueryData(
        ["attendeeBadge"],
        (badgeResult: CredentialBadge) => {
          return {
            badge: {
              ...badgeResult.badge,
              avatar: result.assets[0].uri,
            },
          };
        }
      );

      setAvatar(result.assets[0].uri);
    }
  }

  function handleModal() {
    setExpanded(!expanded);
  }

  return (
    <View className="w-full self-stretch items-center">
      <Image
        source={require("@/assets/ticket/band.png")}
        className="w-24 h-52 z-10"
        resizeMode="contain"
      />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={require("@/assets/ticket/header.png")}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
          resizeMode="contain"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">Unite Summit</Text>
            <Text className="text-zinc-50 text-sm font-bold">2024</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleSelectAvatar}
          className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
        >
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              className="w-36 h-36 rounded-full"
            />
          ) : (
            <Feather name="camera" size={32} color={colors.green[400]} />
          )}
        </TouchableOpacity>

        <Text className="mt-4 font-bold text-2xl text-zinc-50">{name}</Text>
        <Text className="font-regular text-base text-zinc-300 mb-3">
          {email}
        </Text>

        <TouchableOpacity
          onPress={handleModal}
          activeOpacity={0.7}
          className="items-center gap-4"
        >
          <QRCode value={checkInUrl} size={120} />

          <Text className="font-body text-orange-500 text-sm">
            Ampliar QRCode
          </Text>
        </TouchableOpacity>
      </View>

      <ModalComponent isOpen={expanded} handleModal={handleModal} />
    </View>
  );
}
