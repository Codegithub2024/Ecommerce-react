import AdminNavButton from "./AdminNavButton";

export default function AdminNavigation() {
  const navLinks = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      name: "Products",
      href: "/admin/products/list",
    },
  ];
  return (
    <header className="flex justify-center bg-neutral-100">
      <nav className="flex gap-2 py-2">
        <div className="rounded-full p-1 flex bg-white border border-black/10">
          {navLinks.map((link, index) => (
            <AdminNavButton key={index} link={link} />
          ))}
        </div>
      </nav>
    </header>
  );
}
