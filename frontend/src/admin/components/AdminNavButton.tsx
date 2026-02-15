import { NavLink } from "react-router-dom";

export default function AdminNavButton({
  link,
}: {
  link: { name: string; href: string };
}) {
  return (
    <NavLink
      to={`${link.href}`}
      className={({ isActive }) =>
        `px-4 py-1 text-xs font-semibold rounded-full leading-6 ${isActive ? " bg-gray-100 text-gray-900" : "text-gray-500"}`
      }
    >
      {link.name}
    </NavLink>
  );
}
