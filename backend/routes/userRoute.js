const express = require("express");
const userRoute = express.Router();
const { createUsers, showUsers } = require("../controllers/userController");

route.post("/users/create", createUsers);

// module.exports = userRoute;
