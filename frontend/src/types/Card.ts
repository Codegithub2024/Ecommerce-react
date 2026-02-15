// types/cart.ts
import type { Product } from "./Product";

/**
 * Un article DANS le panier.
 * Ce n'est pas le produit lui-même, c'est une "ligne" du panier.
 */
export interface ICartItem {
  product: string | Product; // Peut être juste l'ID (au début) ou l'objet complet (après population)
  quantity: number;
  selectedVariant?: string; // Ex: "Bleu Nuit" si tu gères les couleurs ici
}

/**
 * Le Panier global
 */
export interface Cart {
  _id?: string;
  userId?: string | null; // Null si invité
  guestId?: string | null; // L'identifiant stocké dans le localStorage
  items: ICartItem[]; // La liste des articles
  totalPrice?: number; // Optionnel : souvent calculé à la volée côté front, ou renvoyé par le back
  createdAt: string;
  updatedAt: string;
}
