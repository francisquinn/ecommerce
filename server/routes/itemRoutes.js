const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.items);
//router.get("/checkout", itemController.item_checkout);
router.get("/:id", itemController.single_item);


module.exports = router;
