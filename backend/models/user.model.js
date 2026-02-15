const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Veuillez entrer une adresse email valide"],
    },
    password: {
      type: String,
      required: true,
      select: false, // Sécurité : ne renvoie pas le mot de passe par défaut lors des requêtes
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // Pour sauvegarder l'adresse et éviter de la retaper
    address: {
      street: String,
      city: String,
      zipCode: String,
      country: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
