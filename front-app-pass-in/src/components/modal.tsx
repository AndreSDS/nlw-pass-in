import { useUser } from "@/context/userContext";
import { useState } from "react";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

export function ModalComponent() {
  const {
    user: { avatar },
  } = useUser();
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Modal visible={expanded} statusBarTranslucent animationType="fade">
      <View className="flex-1 bg-green-500 items-center justify-center">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setExpanded(!expanded)}
        >
          <QRCode value={"testes"} size={300} />

          <Text className="font-body text-orange-500 text-sm mt-10 text-center">
            Fechar QRCode
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
