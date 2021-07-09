const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const cors = require("cors");

router.get("/", itemController.items);

router.post("/checkout", cors(), itemController.item_checkout);

router.get("/item/:id", itemController.getItem);

module.exports = router;
