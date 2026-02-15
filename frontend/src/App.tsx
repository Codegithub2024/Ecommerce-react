import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Inscription from "./pages/Inscription";
import Dashboard from "./admin/pages/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./admin/components/layout/AdminLayout";
import CartProvider from "./context/cartContext";
import ProductList from "./admin/pages/products/ProductList";
import ProductCreate from "./admin/pages/products/ProductCreate";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/inscription" element={<Inscription />} />
            </Route>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products/list" element={<ProductList />} />
              <Route path="/admin/products/create" element={<ProductCreate />} />
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}
