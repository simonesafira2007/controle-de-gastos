const receitas = require("../models/receitas");

const getAllReceitas = (req, res) => {
  console.log(req.url);
  receitas.find(function (err, receitas) {
    if (err) {
      res.status(500).send({ message: err.message });
    }

    res.status(200).send(receitas);
  });
};

const getReceitaById = (req, res) => {
  const id = req.params.id;
  console.log(req);

  receitas.find({ user_id: id }, function (err, receitas) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send(receitas);
  });
};

const postReceita = (req, res) => {
  console.log(req.body);

  let receita = new receitas(req.body);

  receita.save(function (err) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(201).send(receita.toJSON());
  });
};

const deleteReceita = (req, res) => {
  const id = req.params.id;
 

  receitas.find({ user_id :id }, function (err, receita) {
    if (receita.length > 0) {
      receitas.deleteMany({ user_id :id }, function (err) {
        if (err) {
          res.status(500).send({
            message: err.message,
            status: "FAIL",
          });
        }
        res.status(200).send({
          message: "Receita removida com sucesso",
          status: "SUCCESS",
        });
      });
    } else {
      res.status(200).send({
        message: "Não há receita a ser removida",
        status: "EMPTY",
      });
    }
  });
};

const deleteReceitaFaturado = (req, res) => {
  receitas.deleteMany({ faturado: false }, function (err) {
    if (err) {
      return res.status(500).send({
        message: err.message,
        status: "FAIL",
      });
    }

    return res.status(200).send({
      message: "Receita removida com sucesso",
      status: "SUCCESS",
    });
  });
};

const putReceita = (req, res) => {
  const id = req.params.id;

  receitas.update({ id }, { $set: req.body }, function (err) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res
      .status(200)
      .send({ message: "Registro de receita alterado com sucesso" });
  });
};

module.exports = {
  getAllReceitas,
  getReceitaById,
  postReceita,
  deleteReceita,
  deleteReceitaFaturado,
  putReceita,
};
