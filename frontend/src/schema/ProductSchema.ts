import { z } from "zod";

// On définit le schéma Zod basé sur ton interface
export const productSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  slug: z.string().min(3, "Le slug est requis"),
  description: z.string().min(10, "La description est obligatoire"),
  price: z.coerce
    .number()
    .positive("Le prix doit être supérieur à zéro")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toFixed(2)), {
      message: "Le prix doit avoir au maximum 2 chiffres après la virgule",
    }),
  stock: z.coerce
    .number()
    .int()
    .nonnegative("Le stock ne peut pas être négatif"),
  categories: z.array(z.string()).min(1, "Au moins une catégorie est requise"),
  isActive: z.boolean().default(true),
  // Pour les images, on valide le tableau d'objets
  images: z.array(
    z.object({
      url: z.string().url("L'URL de l'image est invalide"),
      alt: z.string().optional(),
      isPrimary: z.boolean().default(false),
    }),
  ),
  specifications: z.object({
    material: z.string(),
    color: z.string(),
    weight: z.coerce.number(),
  }),
});

export type ProductFormData = z.infer<typeof productSchema>;
