import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { Loading } from "./loading";
import { cn } from "@/utils/cn";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  className?: string;
};

export function Button({
  title,
  isLoading = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        "w-full h-14 bg-orange-500 items-center justify-center rounded-lg",
        className
      )}
      disabled={isLoading}
      activeOpacity={0.7}
      {...rest}
    >
      {isLoading ? (
        <Loading bgColor="" color="text-green-500" isLoading />
      ) : (
        <Text className="text-green text-base font-boold uppercase">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
