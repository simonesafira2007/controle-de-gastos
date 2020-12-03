const despesas = require("../models/despesas");

const getAllDespesas = (req, res) => {
  console.log(req.url);

  despesas.find(function (err, despesas) {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    return res.status(200).send(despesas);
  });
};

const getDespesaById = (req, res) => {
  const id = req.params.id;

  despesas.find({ user_id: id }, function (err, despesas) {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    return res.status(200).send(despesas);
  });
};

const postDespesa = (req, res) => {
  console.log(req.body);

  let despesa = new despesas(req.body);

  despesa.save(function (err) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(201).send(despesa.toJSON());
  });
};

const deleteDespesa = (req, res) => {
  const id = req.params.id;

  despesas.find({ id }, function (err, despesa) {
    if (despesa.length > 0) {
      despesas.deleteMany({ id }, function (err) {
        if (err) {
          return res.status(500).send({
            message: err.message,
            status: "FAIL",
          });
        }
        return res.status(200).send({
          message: "Despesa removida com sucesso",
          status: "SUCCESS",
        });
      });
    } else {
      return res.status(200).send({
        message: "Não há despesa a ser removida",
        status: "EMPTY",
      });
    }
  });
};

const deleteDespesaFaturado = (req, res) => {
  despesas.deleteMany({ faturado: false }, function (err) {
    if (err) {
      return res.status(500).send({
        message: err.message,
        status: "FAIL",
      });
    }

    return res.status(200).send({
      message: "Despesa removida com sucesso",
      status: "SUCCESS",
    });
  });
};

const putDespesa = (req, res) => {
  const id = req.params.id;

  despesas.update({ id }, { $set: req.body }, function (err) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res
      .status(200)
      .send({ message: "Registro de despesa alterado com sucesso" });
  });
};

module.exports = {
  getAllDespesas,
  getDespesaById,
  postDespesa,
  deleteDespesa,
  deleteDespesaFaturado,
  putDespesa,
};
