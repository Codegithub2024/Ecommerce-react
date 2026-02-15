const express = require("express");
const connectDB = require("./config/db");
const productRoute = require("./routes/productRoute");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use("/api", productRoute);

const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server started at port ", PORT);
  });
});
