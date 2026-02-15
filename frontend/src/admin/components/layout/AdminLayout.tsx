import { Outlet } from "react-router-dom";
import AdminNavigation from "../AdminNavigation";

export default function AdminLayout() {
  return (
    <div className="flex w-full flex-col min-h-screen">
      <AdminNavigation />
      <Outlet />
    </div>
  );
}
