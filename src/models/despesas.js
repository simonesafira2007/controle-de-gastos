const mongoose = require("mongoose");

const despesasSchema = new mongoose.Schema(
  {
    user_id: { type: Number },
    nome: { type: String },
    descricao: { type: String },
    valor: { type: Number },
    faturado: { type: Boolean },
    dataInclusao: { type: String },
    tipo: { type: String },
    origem: { type: String },
  },
  {
    versionKey: false,
  }
);

const despesas = mongoose.model("despesas", despesasSchema);

module.exports = despesas;
