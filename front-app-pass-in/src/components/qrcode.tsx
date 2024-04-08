import { colors } from "@/styles/colors";
import { View } from "react-native";
import QRCodeSvg from "react-native-qrcode-svg";

type QRCodeProps = {
  value: string;
  size: number;
};

export function QRCode({ value, size }: QRCodeProps) {
  return (
    <QRCodeSvg
      value={value}
      size={size}
      color={colors.white}
      backgroundColor="transparent"
    />
  );
}
