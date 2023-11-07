const express = require("express")
const { autenticacaoSenha } = require("./middleware/autenticacao")
const { listarContas } = require("./controllers/contas")

const rotas = express()

rotas.get("/contas", autenticacaoSenha, listarContas)

module.exports = rotas