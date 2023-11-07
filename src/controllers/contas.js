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

const atualizarDadosUsuario = (req, res) => {
    const { numeroConta } = req.params
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body

    if (isNaN(numeroConta)){
        return res.status(400).json({mensagem: `O nomero da conta informado não é um número válido`})
    }

    const cliente = dadosBancarios.contas.find((item) => {
        return item.numero === Number(numeroConta)
    })

    if(!cliente) {
        return res.status(404).json({mensagem: `Numero de conta não encontrado`})
    }

    if(cpf && cpf !== cliente.usuario.cpf) {
        const validaCpf = dadosBancarios.contas.find((item) => {
            return item.usuario.cpf === cpf
        })
    
        if(validaCpf) {return res.status(400).json({mensagem: `Já existe uma conta com o cpf ou e-mail informado!`})}
    }
    if(email && email !== cliente.usuario.email) {
        const validaEmail = dadosBancarios.contas.find((item) => {
            return item.usuario.email === email
        })

        if(validaEmail) {return res.status(400).json({mensagem: `Já existe uma conta com o cpf ou e-mail informado!`})}
    }

    cliente.usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    }
    
    return res.status(204).send();
}

const excluirConta = (req, res) => {
    const {numeroConta} = req.params

    if (isNaN(numeroConta)) {
        return res.status(400).json({mensagem: `Número da conta não encontrado`})
    }

    const indiceNumeroConta = dadosBancarios.contas.findIndex((item) => {
        return item.numero === Number(numeroConta)
    })

    if (indiceNumeroConta < 0) {
        return res.status(400).json({mensagem: `Conta não encontrada`})
    }

    const contaParaExcluir = dadosBancarios.contas[indiceNumeroConta];

    if (contaParaExcluir.saldo > 0) {
        return res.status(400).json({ mensagem: `A conta só pode ser removida se o saldo for zero!` });
    }

    const excluirContaBancaria = dadosBancarios.contas.splice(indiceNumeroConta, 1)[0]

    return res.status(200).send()
}

module.exports = {
    listarContas,
    criarConta,
    atualizarDadosUsuario,
    excluirConta 
}