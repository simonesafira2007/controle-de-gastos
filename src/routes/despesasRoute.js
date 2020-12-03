const express = require("express");
const router = express.Router();
const controller = require("../controllers/despesasController.js");

router.get("/", controller.getAllDespesas);
router.get("/:id", controller.getDespesaById);
router.post("/", controller.postDespesa);
router.delete("/:id", controller.deleteDespesa);
router.delete("/", controller.deleteDespesaFaturado);
router.put("/:id", controller.putDespesa);

module.exports = router;
