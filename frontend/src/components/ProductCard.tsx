import type { Product } from "../types/Product";
import { useCart } from "../context/cartContext";
import Button from "./Button";
import { Plus } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, removeFromCart } = useCart();

  const handleCart = (type: "add" | "remove") => {
    if (type === "remove") {
      removeFromCart();
    }
    if (type === "add") {
      addToCart();
    }
  };

  return (
    <div className="elements flex flex-col gap-2 transition-all duration-200 bg-white pb-2 relative">
      <div className="aspect-square relative max-w-full overflow-hidden p-3 border-b-2 border-dashed border-neutral-200">
        {product.images[0].url && (
          <img
            src={product.images[0].url}
            alt=""
            className="w-full h-full object-contain"
          />
        )}
        <div className="absolute bottom-2 right-2">
          <Button
            onClick={() => handleCart("add")}
            type="button"
            variant="white"
            class="size-9"
          >
            <Plus size={18} />
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3 flex-1 bg-none px-2">
        <div className="flex flex-col flex-1 mb-4">
          <p className="first-letter:capitalize text-base line-clamp-1 leading-tight tracking-tight">
            {product.name}
          </p>
          <p className="text-xl text-red-500 font-bold">{product.price}$</p>
          <div className="flex gap-1 items-center">
            {product.categories.map((category, index) => (
              <span
                key={index}
                className="rounded-full first-letter:capitalize leading-none border border-black/10 bg-gray-100 text-gray-800 text-[10px] font-medium px-2 py-0.5"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
