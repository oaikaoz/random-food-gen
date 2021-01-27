const express = require("express");
var router = express.Router();
const foodController = require("../controllers/foodControlles");

router.get("/", foodController.index);
router.get("/:id", foodController.show);

router.post("/", foodController.insert);
router.put("/:id", foodController.update);
router.delete("/:id", foodController.destroy);
module.exports = router;
