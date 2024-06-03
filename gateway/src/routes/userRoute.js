const express = require("express");
const {
    getList,
    getSingle,
    create,
    update,
    deleteItem,
} = require("../controller/userController");
const router = express.Router();

router.get("/", getList);
// router.get("/:id", getSingle);
// router.post("/create", create);
// router.put("/update/:id", update);
// router.put("/delete/:id", deleteItem);

module.exports = router;
