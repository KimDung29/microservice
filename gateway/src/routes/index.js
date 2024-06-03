const express = require("express");

const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const productRoute = require("./productRoute");

const router = express.Router();

router.use("/api/users", userRoute);
router.use("/api/auth", authRoute);
router.use("/api/products", productRoute);

module.exports = router;
