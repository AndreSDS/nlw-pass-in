import { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<"a"> {
  children: string;
}

export const NavLink = ({ children, ...rest }: NavLinkProps) => {
  return (
    <a
      {...rest}
      className="font-medium text-sm text-zinc-300"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
