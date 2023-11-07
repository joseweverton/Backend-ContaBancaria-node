const dadosBancarios = require("../database")

const listarContas = (req, res) => {
    return res.status(200).json(dadosBancarios.contas)
}

module.exports = {
    listarContas  
}