const despesas = require("../models/despesas");
const receitas = require("../models/receitas");

const getTransacoesById = async (req, res) => {
  const id = req.params.id;
  let resultadoDespesas = 0;
  let resultadoReceitas = 0;

  await receitas.find({ user_id: id }, "valor", function (err, receitas) {
    console.log(receitas);
    resultadoReceitas = receitas.reduce((acumulador, receita) => {
      return acumulador + receita.valor;
    }, 0);
    console.log(resultadoReceitas);
    if (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  console.log(resultadoReceitas);
  await despesas.find({ user_id: id }, "valor", function (err, despesas) {
    resultadoDespesas = despesas.reduce((acumulador, receita) => {
      return acumulador + receita.valor;
    }, 0);

    if (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  console.log(resultadoDespesas);

  const resultadoFinal = resultadoReceitas - resultadoDespesas;

  if (resultadoReceitas > resultadoDespesas) {
    return res.status(200).send({
      receita: resultadoReceitas,
      despesa: resultadoDespesas,
      message: "Lucro",
      valor: resultadoFinal,
    });
  } else if (resultadoDespesas > resultadoReceitas) {
    return res.status(200).send({
      receita: resultadoReceitas,
      despesa: resultadoDespesas,
      message: "Prejuízo (Vermelho)",
      valor: resultadoFinal,
    });
  } else {
    return res.status(200).send({
      receita: resultadoReceitas,
      despesa: resultadoDespesas,
      message: " Não teve lucro nem prejuízo",
      valor: resultadoFinal,
    });
  }
};

module.exports = {
  getTransacoesById,
};
