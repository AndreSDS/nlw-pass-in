import { useState } from "react";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

type ModalProps = {
  isOpen: boolean;
  handleModal: () => void;
};

export function ModalComponent({ isOpen, handleModal }: ModalProps) {
  return (
    <Modal visible={handleOpen(isOpen)} statusBarTranslucent animationType="fade">
      <View className="flex-1 bg-green-500 items-center justify-center">
        <TouchableOpacity activeOpacity={0.7} onPress={handleModal}>
          <QRCode value={"testes"} size={300} />

          <Text className="font-body text-orange-500 text-sm mt-10 text-center">
            Fechar QRCode
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

function handleOpen(isOpen: boolean) {
  return isOpen;
}

function handleClose(isOpen: boolean) {
  return !isOpen;
}
