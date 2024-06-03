const express = require("express");
const { create, update, existenceCheck } = require("../controller");

const router = express.Router();

router.post("/", existenceCheck);
router.post("/create", create);
router.put("/update", update);

module.exports = router;
