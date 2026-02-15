const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    // Si l'utilisateur est connecté
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // Si c'est un invité (UUID généré par le front)
    guestId: {
      type: String,
      index: true,
      default: null,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        // Si tu as des variantes (ex: couleur du tissu)
        selectedVariant: { type: String },
      },
    ],
    // Configuration du TTL (Time To Live)
    createdAt: { type: Date, default: Date.now, expires: "7d" }, // Le panier s'auto-détruit après 7 jours d'inactivité
  },
  {
    timestamps: true,
  },
);

// Validation : un panier doit avoir soit un userId, soit un guestId
cartSchema.pre("save", function (next) {
  if (!this.userId && !this.guestId) {
    next(new Error("Le panier doit appartenir à un utilisateur ou un invité."));
  } else {
    next();
  }
});

module.exports = mongoose.model("Cart", cartSchema);
