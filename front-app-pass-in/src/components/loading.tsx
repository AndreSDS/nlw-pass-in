import { ActivityIndicator } from "react-native";

type LoadingProps = {
  isLoading?: boolean;
  bgColor: string;
  color: string;
};

export function Loading({ bgColor, color, isLoading = false }: LoadingProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <ActivityIndicator
      className={`${bgColor} flex-1 items-center justify-center ${color}`}
    />
  );
}
