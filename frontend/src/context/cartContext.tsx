import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

type CartContextType = {
  oldCount: number;
  cartCount: number;
  addToCart: () => void;
  removeFromCart: () => void;
  updateType: "add" | "remove";
  loading: boolean;
  resetLoading: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);
  const [oldCount, setOldCount] = useState(0);
  const [updateType, setUpdateType] = useState<"add" | "remove">("add");
  const [loading, setLoading] = useState(false);

  // Utilisation de useCallback pour stabiliser les fonctions
  const addToCart = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setUpdateType("add");
    setOldCount(cartCount);
    setCartCount((prev) => prev + 1);
  }, [loading, cartCount]);

  const removeFromCart = useCallback(() => {
    if (loading || cartCount <= 0) return;
    setLoading(true);
    setUpdateType("remove");
    setOldCount(cartCount);
    setCartCount((prev) => prev - 1);
  }, [loading, cartCount]);

  const resetLoading = useCallback(() => {
    setLoading(false);
  }, []);

  // useMemo évite de re-render tous les composants inutilement
  const value = useMemo(
    () => ({
      cartCount,
      oldCount,
      addToCart,
      removeFromCart,
      updateType,
      loading,
      resetLoading,
    }),
    [
      cartCount,
      oldCount,
      addToCart,
      removeFromCart,
      updateType,
      loading,
      resetLoading,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
