import { colors } from "@/styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { View, TextInput, TextInputProps } from "react-native";

function Input({ children }: { children: ReactNode }) {
  return (
    <View className="w-full h-14 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg">
      {children}
    </View>
  );
}

function Icon({
  name,
  color,
}: {
  name: keyof (typeof MaterialCommunityIcons)["glyphMap"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons name={name} size={24} color={color} />
  );
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={colors.gray[200]}
      className="flex-1 text-white text-base font-regular outline-none border-none ring-0"
      {...rest}
    />
  );
}

Input.Field = Field;
Input.Icon = Icon;

export { Input };
