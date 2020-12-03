const express = require("express");
const router = express.Router();
const controller = require("../controllers/receitasController.js");

router.get("/", controller.getAllReceitas);
router.get("/:id", controller.getReceitaById);
router.post("/", controller.postReceita);
router.delete("/:id", controller.deleteReceita);
router.delete("/", controller.deleteReceitaFaturado);
router.put("/:id", controller.putReceita);

module.exports = router;
