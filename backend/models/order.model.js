const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Informations Client (Mixte User/Guest)
    customer: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      email: { type: String, required: true }, // Obligatoire pour envoyer la facture
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String },
    },

    // Adresse de livraison
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    // SNAPSHOT des produits (On copie les données, on ne fait pas juste une référence)
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true }, // Le prix AU MOMENT de l'achat
        quantity: { type: Number, required: true },
      },
    ],

    // Gestion financière
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: "EUR" },

    // Infos Stripe
    paymentInfo: {
      stripeSessionId: { type: String }, // L'ID de session Stripe
      paymentIntentId: { type: String }, // L'ID de transaction réelle
      status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
      },
    },

    // Statut logistique
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
