const dadosBancarios = require("../database")
let identificadorConta = 1
let saldoInicial = 0

const listarContas = (req, res) => {
    return res.status(200).json(dadosBancarios.contas)
}

const criarConta = (req, res) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body

    const contaExistente = dadosBancarios.contas.find((item) => {
        return item.usuario.cpf === cpf || item.usuario.email === email
    })
  
    if(contaExistente) {return res.status(400).json({mensagem: `Já existe uma conta com o cpf ou e-mail informado!`})}
    
    const novoCliente = {
        numero: identificadorConta,
        saldo: saldoInicial,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha,
        }     
    }
    dadosBancarios.contas.push(novoCliente)
    identificadorConta++

    return res.status(201).send()
}

module.exports = {
    listarContas,
    criarConta  
}