import { useState } from "react";
import {
  Image,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { QRCode } from "@/components/qrcode";
import { ModalComponent } from "./modal";
import { Badge, useBadgeStore } from "@/store/badge-store";
import { MotiView } from "moti";

export function Credential() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { data, saveBadge } = useBadgeStore();
  const { name, email, checkInUrl, avatar } = data || ({} as Badge);

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
      const badgeData: Badge = {
        ...(data as Badge),
        avatar: result.assets[0].uri,
      };

      saveBadge(badgeData);
    }
  }

  function handleModal() {
    setExpanded(!expanded);
  }

  const { height } = useWindowDimensions();

  return (
    <MotiView
      from={{
        opacity: 0,
        translateY: -height,
        rotateX: "30deg",
        rotateY: "30deg",
        rotateZ: "50deg",
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        rotateX: "0deg",
        rotateY: "0deg",
        rotateZ: "0deg",
      }}
      transition={{
        type: "spring",
        damping: 20,
        rotateZ: {
          damping: 15,
          mass: 3,
        },
      }}
      className="w-full self-stretch items-center"
    >
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
    </MotiView>
  );
}
