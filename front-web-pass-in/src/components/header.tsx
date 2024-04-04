import logo from "../assets/logo-icon.svg";
import { NavLink } from "./nav-link";

const NavItems = [
  { text: "Eventos", href: "/eventos" },
  { text: "Participantes", href: "/participantes" },
];

export const Header = () => {
  return (
    <header>
      <div className="flex gap-5 items-center py-2">
        <img src={logo} alt="logo" />

        <nav className="flex items-center gap-5">
          {NavItems.map((item) => (
            <NavLink key={item.text} href={item.href}>
              {item.text}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
