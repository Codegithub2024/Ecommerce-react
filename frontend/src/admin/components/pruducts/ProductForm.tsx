import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import {
  productSchema,
  type ProductFormData,
} from "../../../schema/ProductSchema";
import type { Product, ProductImage } from "../../../types/Product";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import InputWrapper from "../InputWrapper";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (product: ProductFormData) => void;
  isLoading: boolean;
  error?: string;
}

const AVAILABLE_CATEGORIES = [
  { id: "1", name: "Fauteuil" },
  { id: "2", name: "Jardin" },
  { id: "3", name: "Salle à manger" },
  { id: "4", name: "Salon" },
  { id: "5", name: "Chambre" },
  { id: "6", name: "Chaise" },
  { id: "7", name: "Table" },
  { id: "8", name: "Lit" },
  { id: "9", name: "Séjour" },
  { id: "10", name: "Détente" },
];

export default function ProductForm({
  initialData,
  onSubmit,
  isLoading,
  error,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      description: "",
      price: 0,
      stock: 0,
      isActive: true,
      categories: [],
      images: [],
    },
  });

  const currentImages = watch("images") || [];
  const productName = watch("name");
  const [categories, setCategories] = useState<string[] | null>([]);

  useEffect(() => {
    if (productName) {
      const slug = productName
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      setValue("slug", slug);
    }
  }, [productName, setValue]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      setCategories([...categories!, selectedCategory]);
      setValue("categories", [...categories!, selectedCategory], {
        shouldValidate: true,
      });
    }
  };
  console.log(categories);

  const showWidget = (isPrimary: boolean) => {
    // @ts-ignore (Cloudinary est global sur window)
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: "ecommerce",
        sources: ["local", "url", "camera"],
        multiple: false,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Image téléchargée :", result.info.secure_url);
          const newImage: ProductImage = {
            url: result.info.secure_url,
            isPrimary: isPrimary,
            alt: productName || "Image produit",
          };
          setValue("images", [...currentImages, newImage], {
            shouldValidate: true,
          });
        }
      },
    );
    widget.open();
  };

  const deleteCategory = (category: string) => {
    const newCategories = categories?.filter((cat) => cat !== category);
    setValue("categories", newCategories!, { shouldValidate: true });
    console.log("categories:   ", newCategories);
    setCategories(newCategories!);
  };

  const removeFromImages = () => {
    const newImages: ProductImage[] = currentImages.filter(
      (img) => img.isPrimary !== true,
    );
    setValue("images", newImages, { shouldValidate: true });
    console.log("images:   ", newImages);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mx-auto max-w-7xl px-4 mb-6"
    >
      <div className="flex justify-between items-end">
        <h3 className="text-3xl font-serif font-semibold tracking-tight leading-tight">
          Ajouter un produit
        </h3>
        <Button
          variant="secondary"
          loading={isLoading}
          type="submit"
          class="py-4 px-6"
          text={initialData ? "Mettre à jour" : "Ajouter l'article"}
        />
      </div>
      <hr className="border-black/50" />
      <div className="flex flex-col-reverse md:flex-row justify-baseline items-start gap-6 mt-2 mb-6">
        <InputWrapper label="Images de référence">
          <div className="flex flex-col rounded-2xl self-start bg-neutral-200 divide-y divide-neutral-200 shadow-card-sm overflow-hidden">
            <div className="aspect-video relative w-full bg-white">
              <div className="absolute z-50 top-0 left-0 right-0 p-2 flex justify-between items-center">
                <div className="min-h-6 inline-flex justify-center items-center rounded-full bg-white px-3 py-1 shadow-card-sm">
                  <p className="text-sm tracking-tight leading-none font-semibold text-neutral-800 text-balance">
                    Image principale
                  </p>
                </div>
                {currentImages[0]?.url && (
                  <button
                    type="button"
                    onClick={removeFromImages}
                    className="min-h-6 hover:bg-neutral-200 cursor-pointer transition-all duration-200 inline-flex justify-center items-center rounded-full bg-white px-3 py-1 shadow-card-sm"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
              <div className="bg-img bg-top-left bg-size-[20px_20px] opacity-20 flex justify-center items-center absolute inset-0"></div>
              <div className="relative z-10 w-full h-full">
                {currentImages[0]?.url ? (
                  <img
                    src={currentImages[0].url}
                    alt="Image principale"
                    className="w-full h-fit object-contain"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => showWidget(true)}
                    className="absolute z-50 gap-1 inset-0 flex justify-center items-center cursor-pointer text-neutral-500"
                  >
                    <p className="text-base tracking-tight text-pretty leading-none font-semibold">
                      Clickez pour ajouter une image
                    </p>
                    <Plus size={24} />
                  </button>
                )}
              </div>
            </div>
            <div className="grid-cols-3 grid divide-x divide-neutral-200">
              <div className="aspect-square bg-white"></div>
              <div className="aspect-square bg-white"></div>
              <div className="aspect-square bg-white"></div>
            </div>
          </div>
          {errors.images && <ErrorMessage message={errors.images.message} />}
        </InputWrapper>
        <div className="flex flex-col gap-4 flex-1">
          <InputWrapper htmlFor="name" label="Nom de l'article">
            <input
              id="name"
              className="input"
              type="text"
              {...register("name")}
              placeholder="Nom du produit"
              required
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </InputWrapper>
          <InputWrapper htmlFor="description" label="Description de l'article">
            <textarea
              className="area"
              rows={10}
              id="description"
              {...register("description")}
              placeholder="Ecrivez une description détaillée du produit ici..."
              required
            />
            {errors.description && (
              <ErrorMessage message={errors.description.message} />
            )}
          </InputWrapper>
          <InputWrapper htmlFor="categories" label="Categories">
            <div className="p-1 bg-neutral-100 rounded-[18px] grid gap-2 pb-2">
              <select
                id="categories"
                onChange={handleCategoryChange}
                className="input"
              >
                <option value="">-- Catégories --</option>
                {AVAILABLE_CATEGORIES.map((cat) => (
                  <>
                    {!categories?.includes(cat.name) && (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    )}
                  </>
                ))}
              </select>
              {
                // @ts-ignore (categories peut etre null)
                categories?.length > 0 ? (
                  <div className="flex flex-wrap gap-0.5 px-2">
                    {categories?.map((category, index) => (
                      <span
                        onClick={() => deleteCategory(category)}
                        key={index}
                        className="text-sm bg-white flex justify-center group relative items-center cursor-pointer leading-none border border-neutral-200 p-1 px-2 rounded-full"
                      >
                        {category}
                        <button className="absolute text-black bg-white/50 backdrop-brightness-75 cursor-pointer backdrop-blur-xs inset-0 opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 flex rounded-full justify-center items-center">
                          <X size={16} className="stroke-2" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500 px-2">
                    Aucune catégorie selectionnée
                  </p>
                )
              }
            </div>
            {errors.categories && (
              <ErrorMessage message={errors.categories.message} />
            )}
          </InputWrapper>
          <div className="flex gap-2">
            <InputWrapper htmlFor="price" label="Prix">
              <input
                className="input"
                id="price"
                type="number"
                {...register("price")}
                placeholder="Prix"
                required
              />
              {errors.price && <ErrorMessage message={errors.price.message} />}
            </InputWrapper>
            <InputWrapper htmlFor="stock" label="Stock disponible">
              <input
                className="input"
                id="stock"
                type="number"
                {...register("stock")}
                placeholder="Nombre d'articles"
                required
              />
              {errors.stock && <ErrorMessage message={errors.stock.message} />}
            </InputWrapper>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("isActive")} id="isActive" />
            <label htmlFor="isActive">Produit actif</label>
          </div>
          <div className="flex gap-2">
            <InputWrapper htmlFor="weight" label="Poids">
              <input
                className="input"
                id="weight"
                type="number"
                {...register("stock")}
                placeholder="Nombre d'articles"
                required
              />
              {errors.specifications?.weight && (
                <ErrorMessage message={errors.specifications?.weight.message} />
              )}
            </InputWrapper>
            <InputWrapper htmlFor="weight" label="Poids">
              <input
                className="input"
                id="weight"
                type="color"
                {...register("stock")}
                placeholder="Nombre d'articles"
                required
              />
              {errors.specifications?.weight && (
                <ErrorMessage message={errors.specifications?.weight.message} />
              )}
            </InputWrapper>
            <InputWrapper htmlFor="weight" label="Poids">
              <input
                className="input"
                id="weight"
                type="number"
                {...register("stock")}
                placeholder="Nombre d'articles"
                required
              />
              {errors.specifications?.weight && (
                <ErrorMessage message={errors.specifications?.weight.message} />
              )}
            </InputWrapper>
          </div>
          {error ? <ErrorMessage message={error} /> : null}
        </div>
      </div>
    </form>
  );
}
