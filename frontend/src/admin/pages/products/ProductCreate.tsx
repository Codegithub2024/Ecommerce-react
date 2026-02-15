import { useState } from "react";
import type { Product, ProductImage } from "../../../types/Product";
import ProductForm from "../../components/pruducts/ProductForm";
import type { ProductFormData } from "../../../schema/ProductSchema";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductApi";

export default function ProductCreate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);
      const product: Product = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        categories: data.categories,
        images: data.images as ProductImage[],
        isActive: data.isActive,
        specifications: {},
      };
      console.log(product);
      const req = await ProductService.create(product);
      console.log(req);
      setLoading(false);
      navigate("/admin/products/list");
      setLoading(false);
    } catch (error) {
      console.error("❌ Error :", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 bg-white pt-6">
      <ProductForm
        onSubmit={handleSubmit}
        isLoading={loading}
        error={error || undefined}
      />
    </div>
  );
}
