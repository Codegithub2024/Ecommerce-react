// types/order.ts

/**
 * Adresse de livraison (Réutilisable)
 */
export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

/**
 * Informations sur le client (Mixte Invité / Inscrit)
 */
export interface CustomerDetails {
  userId?: string | null;
  email: string; // Crucial pour les invités
  firstName: string;
  lastName: string;
  phone?: string;
}

/**
 * Un article DANS une commande (Snapshot)
 * C'est ici qu'on COPIE les infos vitales.
 */
export interface OrderItem {
  productId: string; // On garde l'ID pour le SAV ou les liens
  name: string; // Copié : Si le nom change, la facture reste correcte
  price: number; // Copié : Le prix payé à l'instant T
  quantity: number;
  image: string; // Copié : L'image principale du produit à ce moment-là
}

/**
 * La Commande Complète
 */
export interface Order {
  _id: string;
  orderNumber: string; // Ex: "ORD-2024-8492"

  customer: CustomerDetails;
  shippingAddress: Address;

  items: OrderItem[]; // Note bien : ce sont des OrderItems, pas des Products !

  // Infos financières
  totalAmount: number;
  currency: string;

  // Infos Stripe & Statut
  paymentInfo: {
    stripeSessionId?: string;
    status: "pending" | "paid" | "failed" | "refunded";
  };

  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";

  createdAt: string;
  updatedAt: string;
}
