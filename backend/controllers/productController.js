const Product = require("../models/product.model");

// const products = [
//   {
//     name: "Table Extensible Scandinave 'Nordic'",
//     slug: "table-extensible-scandinave-nordic-chene",
//     description: "Table en chêne massif avec rallonge papillon intégrée.",
//     price: 549.0,
//     stock: 8,
//     categories: ["Salle à manger", "Tables"],
//     images: [
//       {
//         url: "https://placehold.co/600x400/e2e2e2/333?text=Table+Main",
//         isPrimary: true,
//       },
//       {
//         url: "https://placehold.co/600x400/e2e2e2/333?text=Table+Detail",
//         isPrimary: false,
//       },
//     ],
//     specifications: {
//       material: "Chêne massif",
//       color: "Chêne clair",
//       weight: 42,
//       dimensions: { length: 180, width: 90, height: 75 },
//     },
//   },
//   {
//     name: "Fauteuil Velours 'Copenhague'",
//     slug: "fauteuil-velours-copenhague-vert",
//     description:
//       "Un confort absolu avec une assise profonde et un velours soyeux.",
//     price: 229.0,
//     stock: 20,
//     categories: ["Salon", "Assises", "Velours"],
//     images: [
//       {
//         url: "https://placehold.co/600x400/1a472a/fff?text=Fauteuil+Vert",
//         isPrimary: true,
//       },
//     ],
//     specifications: {
//       material: "Velours et pieds métal noir",
//       color: "Vert Sapin",
//       weight: 12,
//       dimensions: { length: 80, width: 75, height: 85 },
//     },
//   },
// ];

async function addProduct(req, res) {
  try {
    console.log(req.body);

    const product = await Product.insertOne(req.body);
    res.status(201).json({ message: "Product created", data: product });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(409)
        .json({ message: "Product already exists", error: error.message });
    }
    console.error("Unexpected Error :", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
}

async function selectAllProducts(req, res) {
  try {
    await Product.find()
      .then((all) => {
        res.status(200).json({ message: "Products found", data: all });
      })
      .catch((error) => {
        console.error("❌ Error :", error);
        res.status(500).json({
          message: "Erreur lors de la selection du produit",
          error: error.message || "Internal Server Error",
        });
      });
  } catch (error) {
    console.error("❌ Error :", error);
  }
}

async function deleteProduct(req, res) {
  try {
    await Product.deleteOne({ _id: req.params.id })
      .then((product) => {
        res.status(200).json({ message: "Products found", data: product });
      })
      .catch((error) => {
        console.error("❌ Error :", error);
        res.status(500).json({
          message: "Erreur lors de la selection du produit",
          error: error.message || "Internal Server Error",
        });
      });
  } catch (error) {
    console.error("❌ Error :", error);
  }
}

module.exports = { addProduct, selectAllProducts, deleteProduct };
