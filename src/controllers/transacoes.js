const dadosBancarios = require("../database")

function validarConta(numero_conta) {
    const conta = dadosBancarios.contas.find((item) => {
        return item.numero === Number(numero_conta)
    });

    return conta;
}
const depositar = (req, res) => {
    const {numero_conta, valor} = req.body

    if(!numero_conta || !valor){return res.status(400).json({mensagem: `O número da conta e o valor são obrigatórios!`})}
    if(valor <= 0 ){return res.status(400).json({mensagem: `Não é permitido deposito com valor negativo ou igual a 0`})}

    const conta = validarConta(numero_conta);

    if(!conta) {
        return res.status(404).json({mensagem: `Numero de conta não encontrado`})
    }

    conta.saldo += valor 

    const registroDeposito = {
        data: new Date(), 
        numero_conta,
        valor 
    }

    dadosBancarios.depositos.push(registroDeposito)
    return res.status(204).send()
}
const sacar = (req, res) => {
    const {numero_conta, valor, senha} = req.body

    if (!numero_conta) {return res.status(400).json({mensagem: `A canta deve ser informada`})}
    if (!valor) {return res.status(400).json({mensagem: `O valor deve ser informado`})}
    if (!senha) {return res.status(400).json({mensagem: `A senha deve ser informada`})}
    if(valor <= 0 ){return res.status(400).json({mensagem: `O valor não pode ser menor que zero!`})}

    const conta = dadosBancarios.contas.find((item) => {
        return item.numero === Number(numero_conta)
    })

    if(!conta) {
        return res.status(404).json({mensagem: `Numero de conta não encontrado`})
    }

    if(senha !== conta.usuario.senha) {return res.status(400).json({mensagem: `Senha incorreta, operação não pode ser concluída`})}
    
    const valorSaque = Number(valor);
    const saldoConta = Number(conta.saldo);

    if (valorSaque > saldoConta) {
        return res.status(400).json({ mensagem: `Não existe saldo suficiente para saque do valor informado` });
    }

    conta.saldo -= valor 

    const registroDeSaque = {
        data: new Date(), 
        numero_conta,
        valor 
    }

    dadosBancarios.saques.push(registroDeSaque)
    return res.status(204).send()    
}
const transferir = (req, res) => {
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body

    if(!numero_conta_origem) {return res.status(400).json({mensagem: `Numero da conta de origem obrigatório`})}
    if(!numero_conta_destino) {return res.status(400).json({mensagem: `Numero da conta de destino obrigatório`})}
    if(!valor) {return res.status(400).json({mensagem: `O Valor deve ser informado`})}
    if(valor <= 0 ){return res.status(400).json({mensagem: `O valor não pode ser menor que zero!`})}
    if(!senha) {return res.status(400).json({mensagem: `O Numero da senha deve ser informado`})}

    const contaOrigem = dadosBancarios.contas.find((item) => {
        return item.numero === Number(numero_conta_origem)
    })

    if(!contaOrigem) {
        return res.status(404).json({mensagem: `Numero de conta não encontrado`})
    }

    if(senha !== contaOrigem.usuario.senha) {return res.status(400).json({mensagem: `Senha da conta de origem incorreta, operação não pode ser concluída`})}

    const contaDestino = dadosBancarios.contas.find((item) => {
        return item.numero === Number(numero_conta_destino)
    })

    if(!contaDestino) {
        return res.status(404).json({mensagem: `Numero de conta não encontrado`})
    }

    const valorTransferencia = Number(valor);
    const saldoConta = Number(contaOrigem.saldo);

    if (valorTransferencia > saldoConta) {
        return res.status(400).json({ mensagem: `Saldo insuficiente!`});
    }

    contaOrigem.saldo -= valor
    contaDestino.saldo += valor

    const registroDeTransferencia = {
        data: new Date(), 
        numero_conta_origem,
        numero_conta_destino,
        valor 
    }

    dadosBancarios.transferencias.push(registroDeTransferencia)
    return res.status(204).send()
}
module.exports = {
    depositar,
    sacar,
    transferir,
}