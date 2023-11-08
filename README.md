# 💻 Backend-ContaBancaria-node

<h2>ℹ️ Sobre o Projeto</h2>
<ul>
  <li>Esta é uma RESTful API para um Banco Digital que permite simular a gestão de contas bancárias e transações relacionadas.</li>
  <li>A aplicação possui validações, verificações e autenticação de campos e senha.</li>
  <li>A API é sincrona, os dados são persistido em memória.</li>
</ul>


<h2>🛠️ Tecnologias Utilizadas</h2>

<ul>
  <li>Node.JS</li>
  <li>NPM (Node Package Manager)</li>
  <li>Express</li>
  <li>Insomnia</li>
</ul>

<h2>🚀 Funcionalidades</h2>

<ul>
  <li>:white_check_mark: <strong>Criar conta bancária:</strong> Cria uma nova conta bancária para um usuário.</li>
  <li>:white_check_mark: <strong>Listar contas bancárias:</strong> Retorna uma lista de todas as contas bancárias cadastradas.</li>
  <li>:white_check_mark: <strong>Atualizar os dados do usuário da conta bancária:</strong> Permite atualizar as informações do titular da conta.</li>
  <li>:white_check_mark: <strong>Excluir uma conta bancária:</strong> Remove uma conta bancária específica do sistema.</li>
  <li>:white_check_mark: <strong>Depositar em uma conta bancária:</strong> Realiza um depósito em uma conta bancária específica.</li>
  <li>:white_check_mark: <strong>Sacar de uma conta bancária:</strong> Permite sacar dinheiro de uma conta bancária específica.</li>
  <li>:white_check_mark: <strong>Transferir valores entre contas bancárias:</strong> Transfere valores entre duas contas bancárias.</li>
  <li>:white_check_mark: <strong>Consultar saldo da conta bancária:</strong> Retorna o saldo atual de uma conta bancária específica.</li>
  <li>:white_check_mark: <strong>Emitir extrato bancário:</strong> Gera um extrato com as transações de uma conta bancária específica.</li>
  <li></li>
  
</ul>

<h2>📚 Habilidades Adquiridas</h2>

<ul>
  <li>Desenvolvimento de API RESTful.</li>
  <li>Utilização de Express com Node.js.</li>
  <li>Testes de Unidade e Integração.</li>
  <li>Manuseio de Erros e Exceções.</li>
  <li>Boas Práticas de Código e Organização do Projeto.</li>
</ul>

<h2>🛠 Rotas</h2>

   <ul>
     <li>GET /contas - Lista todas as contas.</li>
     <li>POST /contas - Criar uma nova conta.</li>
     <li>PUT /contas/:numeroConta/usuario - Atualiza dados do usuário.</li>
     <li>DELETE /contas/:numeroConta - Exclui um conta (Pelo ID)</li>
     <li>GET /contas/saldo - Consulta saldo atual</li>
     <li>GET /contas/extrato - Consulta todas as operação financeiras</li>
     <li>POST /transacoes/depositar - Permite depositar valor na conta</li>
     <li>POST /transacoes/sacar - Permite sacar valor caso conta possua saldo</li>
     <li>POST /transacoes/transferir - Permite transferir valor caso conta possua saldo</li>
   </ul>
   
