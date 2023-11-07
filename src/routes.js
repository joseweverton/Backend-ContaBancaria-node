const express = require("express")
const { autenticacaoSenha } = require("./middleware/autenticacao")
const { listarContas, criarConta, atualizarDadosUsuario, excluirConta, saldo, extrato } = require("./controllers/contas")
const { validarCampos } = require("./middleware/validacao")
const { depositar, sacar, transferir } = require("./controllers/transacoes")

const rotas = express()

rotas.get("/contas", autenticacaoSenha, listarContas)
rotas.post("/contas", validarCampos, criarConta )
rotas.put("/contas/:numeroConta/usuario", validarCampos, atualizarDadosUsuario)
rotas.delete("/contas/:numeroConta", excluirConta)
rotas.get("/contas/saldo", saldo)
rotas.get("/contas/extrato", extrato)

//transações
rotas.post("/transacoes/depositar", depositar)
rotas.post("/transacoes/sacar", sacar)
rotas.post("/transacoes/transferir", transferir)

module.exports = rotas