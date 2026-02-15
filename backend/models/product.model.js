const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom du produit est requis"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true, // Indexé pour des recherches rapides par URL
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    categories: [
      {
        type: String, // Ex: "Salon", "Tables", "Bois"
        index: true,
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    // Spécifique pour le mobilier
    specifications: {
      material: { type: String }, // Ex: "Chêne massif"
      color: { type: String },
      weight: { type: Number }, // En kg (utile pour la livraison)
    },
    isActive: {
      type: Boolean,
      default: true, // Permet de masquer un produit sans le supprimer
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  },
);

module.exports = mongoose.model("Product", productSchema);
