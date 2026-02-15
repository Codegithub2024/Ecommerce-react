import apiClient from "../../api/ClientApi";
import { type Product } from "../../types/Product"; // Ton interface

// Définition de la réponse API typique (si ton API renvoie { success: true, data: ... })
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const ProductService = {
  // Récupérer tous les produits
  getAll: async (): Promise<Product[]> => {
    const response =
      await apiClient.get<ApiResponse<Product[]>>("/products/all");
    return response.data.data; // On extrait juste le tableau de produits
  },

  // Récupérer un seul produit
  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<ApiResponse<Product>>(
      `/products/${id}`,
    );
    return response.data.data;
  },

  // Créer un produit (on utilise Omit pour exclure _id, createdAt, etc.)
  create: async (
    productData: Omit<Product, "_id" | "createdAt" | "updatedAt">,
  ): Promise<Product | ApiResponse<string>> => {
    return apiClient
      .post<ApiResponse<Product>>("/products/add", productData)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return error.message;
      });
  },

  // Mettre à jour
  update: async (
    id: string,
    productData: Partial<Product>,
  ): Promise<Product> => {
    const response = await apiClient.put<ApiResponse<Product>>(
      `/products/${id}/update`,
      productData,
    );
    return response.data.data;
  },

  // Supprimer
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}/delete`);
  },
};

export default ProductService;
