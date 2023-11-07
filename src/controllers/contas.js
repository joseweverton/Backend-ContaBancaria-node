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

const saldo = (req, res) => {
    const {numero_conta, senha} = req.query

    if (!numero_conta || !senha) {return res.status(400).json({ mensagem: `Número da conta e senha são obrigatórios` })}

    const conta = dadosBancarios.contas.find((item) => {
        return item.numero === Number(numero_conta)
    })

    if(!conta) {return res.status(404).json({mensagem: `Conta bancária não encontada!`})}

    if(senha !== conta.usuario.senha) {return res.status(400).json({mensagem: `Senha incorreta, operação não pode ser concluída`})}

    return res.json({saldo: conta.saldo})
}

const extrato = (req, res) => {
    const {numero_conta, senha} = req.query

    if(!numero_conta) {return res.status(400).json({mensagem: `Numero da conta obrigatório`})}
    if(!senha) {return res.status(400).json({mensagem: `Numero da senha obrigatório`})}

    const conta = dadosBancarios.contas.find((item) => {
        return item.numero === Number(numero_conta)
    })

    if(!conta) {
        return res.status(404).json({mensagem: `Numero de conta não encontrado`})
    }

    if(senha !== conta.usuario.senha) {return res.status(400).json({mensagem: `Senha incorreta, operação não pode ser concluída`})}

    const extratoConta = {
        depositos: [],
        saques: [],
        transferenciasEnviadas: [],
        transferenciasRecebidas: []
    };

    extratoConta.depositos = dadosBancarios.depositos
        .filter((deposito) => deposito.numero_conta === numero_conta);

    extratoConta.saques = dadosBancarios.saques
        .filter((saque) => saque.numero_conta === numero_conta);

    extratoConta.transferenciasEnviadas = dadosBancarios.transferencias
        .filter((transferencia) => transferencia.numero_conta_origem === numero_conta);

    extratoConta.transferenciasRecebidas = dadosBancarios.transferencias
        .filter((transferencia) => transferencia.numero_conta_destino === numero_conta);

    return res.json(extratoConta);
}
module.exports = {
    listarContas,
    criarConta,
    atualizarDadosUsuario,
    excluirConta, 
    saldo,
    extrato    
}