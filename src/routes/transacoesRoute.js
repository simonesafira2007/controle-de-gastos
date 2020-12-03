const express = require("express");
const router = express.Router();
const controller = require("../controllers/transacoesController.js");

router.get("/:id", controller.getTransacoesById);

module.exports = router;
