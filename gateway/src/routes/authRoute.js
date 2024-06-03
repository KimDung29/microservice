const express = require("express");

const {
    register,
    login,
    logout,
    token,
    verifyToken,
} = require("../controller/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/token", token);
router.get("/verifyToken", verifyToken);

module.exports = router;
