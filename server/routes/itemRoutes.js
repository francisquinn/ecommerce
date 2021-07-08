const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.items);

router.post("/checkout", itemController.item_checkout);

router.get("/item/:id", itemController.getItem);

module.exports = router;
