import { useEffect, useState } from "react";
import type { Product } from "../../../types/Product";
import { NavLink } from "react-router-dom";
import { Pen, Plus, Trash2 } from "lucide-react";
import Button from "../../../components/Button";
import ProductService from "../../services/ProductApi";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const allProducts = await ProductService.getAll();
      setProducts(allProducts);
    };
    fetchAndSetProducts();
  }, []);

  const deleteProductById = async (id: string) => {
    const res = await ProductService.delete(id);
    setProducts(products.filter((product) => product._id !== id));
    console.log(res);
  };

  return (
    <main className="flex flex-col bg-white flex-1 w-full px-3">
      <section className="max-w-7xl w-full mx-auto py-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-neutral-900 leading-none tracking-tight">Articles</h1>
          <NavLink to="/admin/products/create">
            <Button variant="secondary" text="Nouvel article">
              <Plus size={16} />
            </Button>
          </NavLink>
        </div>
        <div className="w-full overflow-x-auto relative overflow-hidden">
          {loading && (
            <div className="h-20 flex justify-center items-center">
              <p className="animate-pulse">Chargement des articles...</p>
            </div>
          )}
          {products.length > 0 ? (
            <table className="table-auto w-full text-sm">
              <thead className="font-semibold sticky top-0 left-0">
                <tr className="text-left px-4 py-2 capitalize text-neutral-900">
                  <th className="pl-4 py-3 bg-neutral-100 first:rounded-l-full last:rounded-r-full rounded-2xl">
                    Images
                  </th>
                  <th className="pl-4 py-3 bg-neutral-100 min-w-32">name</th>
                  <th className="pl-4 py-3 bg-neutral-100 min-w-56">description</th>
                  <th className="pl-4 py-3 bg-neutral-100">Categories</th>
                  <th className="pl-4 py-3 bg-neutral-100">Prix</th>
                  <th className="pl-4 py-3 bg-neutral-100">Stock</th>
                  <th className="pl-4 py-3 bg-neutral-100 first:rounded-l-full last:rounded-r-full pr-4">actions</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b text-neutral-700 border-black/10 align-top last:border-none"
                    >
                      <td className="pl-4 py-2">
                        <img
                          className="aspect-square w-16 bg-white rounded-lg border border-black/10 object-contain"
                          src={product.images[0].url}
                          alt={product.images[0].alt}
                        />
                      </td>
                      <td className="pl-4 py-2">
                        <p className="line-clamp-3">{product.name}</p>
                      </td>
                      <td className="pl-4 py-2 hyphens-auto overflow-hidden">
                        <p className="line-clamp-3">{product.description}</p>
                      </td>
                      <td className="pl-4 py-2 flex flex-wrap gap-1">
                        {product.categories.map((category, index) => (
                          <span
                            key={index}
                            className="text-xs flex-wrap w-fit rounded-full px-2 py-0.5 font-medium text-neutral-600 leading-none tracking-tight bg-neutral-100 border border-black/10"
                          >
                            {category}
                          </span>
                        ))}
                      </td>
                      <td className="pl-4 py-2">
                        <b className="text-red-500">{product.price}$</b>
                      </td>
                      <td className="pl-4 py-2">{product.stock}</td>
                      <td className="pl-4 py-2 pr-4">
                        <div className="flex gap-0.5">
                          <button className="size-8 flex justify-center items-center cursor-pointer rounded-full hover:bg-neutral-200 text-black">
                            <Pen size={16} />
                          </button>
                          <button
                            onClick={() => deleteProductById(product._id)}
                            className="size-8 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-200 text-black"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            !loading &&
            products.length === 0 && (
              <div className="h-20 flex justify-center items-center">
                <p>Aucun produit trouvé</p>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
