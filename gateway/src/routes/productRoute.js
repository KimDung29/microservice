const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const checkRole = require("../middlewares/checkRole");
const { upload } = require("../middlewares/upload-middleware");
const {
    getList,
    getSingle,
    create,
    update,
    deleteItem,
} = require("../controller/productController");

router.get("/", getList);
router.get("/:id", getSingle);
router.post(
    "/create",
    authenticateToken,
    checkRole,
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "images", maxCount: 10 },
    ]),
    create
);
// router.put("/update/:id", authenticateToken, checkRole, update);
// router.delete("/delete/:id", authenticateToken, checkRole, deleteItem);

module.exports = router;
