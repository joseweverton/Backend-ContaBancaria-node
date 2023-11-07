const express = require("express")
const { autenticacaoSenha } = require("./middleware/autenticacao")
const { listarContas, criarConta } = require("./controllers/contas")
const { validarCampos } = require("./middleware/validacao")

const rotas = express()

rotas.get("/contas", autenticacaoSenha, listarContas)
rotas.post("/contas", validarCampos, criarConta )

module.exports = rotas