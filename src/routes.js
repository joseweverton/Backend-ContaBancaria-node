const express = require("express")
const { autenticacaoSenha } = require("./middleware/autenticacao")
const { listarContas, criarConta, atualizarDadosUsuario, excluirConta } = require("./controllers/contas")
const { validarCampos } = require("./middleware/validacao")

const rotas = express()

rotas.get("/contas", autenticacaoSenha, listarContas)
rotas.post("/contas", validarCampos, criarConta )
rotas.put("/contas/:numeroConta/usuario", validarCampos, atualizarDadosUsuario)
rotas.delete("/contas/:numeroConta", excluirConta)

module.exports = rotas