const express = require("express");
const { register, login, token, verifyToken } = require("../controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/token", token);
router.post("/verifyToken", verifyToken);

module.exports = router;
