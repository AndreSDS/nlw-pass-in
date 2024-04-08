import { useState } from "react";
import {
  Image,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useUser } from "@/context/userContext";
import { colors } from "@/styles/colors";
import { QRCode } from "@/components/qrcode";
import { ModalComponent } from "./modal";

type CredentialProps = {
  onChangeAvatar?: () => void;
};

export function Credential({ onChangeAvatar }: CredentialProps) {
  const { user } = useUser();
  const [expanded, setExpanded] = useState<boolean>(false);

  console.log({ uri: user.avatar });

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
            <Text className="text-zinc-50 text-sm font-bold">Unite Sumit</Text>
            <Text className="text-zinc-50 text-sm font-bold">2022</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {user.avatar ? (
          <TouchableOpacity activeOpacity={0.9} onPress={onChangeAvatar}>
            <Image
              source={{ uri: user.avatar }}
              className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onChangeAvatar}
            className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
          >
            <Feather name="camera" size={32} color={colors.green[400]} />
          </TouchableOpacity>
        )}

        <Text className="mt-4 font-bold text-2xl text-zinc-50">
          Andre Souza
        </Text>
        <Text className="font-regular text-base text-zinc-300 mb-3">
          andre_smiths@outlook.com
        </Text>

        <QRCode value="teste asdasdasd" size={120} />

        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          activeOpacity={0.7}
          className="items-center mt-4"
        >
          <Text className="font-body text-orange-500 text-sm">
            Ampliar QRCode
          </Text>
        </TouchableOpacity>
      </View>

      <ModalComponent />
    </View>
  );
}
