import { ComponentProps } from "react";
import { cn } from "../utils/cn";

interface IconButtonProps extends ComponentProps<"button"> {
  className?: string;
}

export const IconButton = ({ className, ...props }: IconButtonProps) => {
  const isDisabeld = props.disabled
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer";
  return (
    <button
      className={cn(
        "bg-white/10 border border-white/10 rounded-md p-1.5",
        className,
        isDisabeld
      )}
      {...props}
    />
  );
};
