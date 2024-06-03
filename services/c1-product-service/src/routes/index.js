const express = require("express");
const {
    getList,
    getSingle,
    create,
    update,
    deleteItem,
} = require("../controller");

const router = express.Router();

router.get("/", getList);
router.get("/:id", getSingle);
router.post("/create", create);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteItem);

module.exports = router;
