// Importa a conexão com o banco de dados
const connection = require("../config/db");

// Importa o módulo dotenv para carregar as variáveis de ambiente
const dotenv = require("dotenv").config();

// Função para cadastrar um novo usuário
async function storeUsuarios(request, response) {
  // Cria um array com os parâmetros do corpo da requisição
  const params = Array(
    // Nome do usuário
    request.body.nome,
    // Email do usuário
    request.body.email,
    // Senha do usuário
    request.body.senha,
    // Nickname do usuário
    request.body.nickname
  );
  
  // Imprime os parâmetros no console
  console.log(params);
  
  // Query SQL para inserir um novo usuário no banco de dados
  const query = "INSERT INTO usuarios(nome, email, senha, nickname) VALUES(?, ?, ?, ?)";
  
  // Executa a query SQL com os parâmetros
  connection.query(query, params, (err, results) => {
    // Verifica se a query foi bem-sucedida
    if(results) {
      // Retorna uma resposta com status 201 (Created) e um objeto JSON com informações de sucesso
      response
        .status(201)
        .json({
          success: true,
          message:"Sucesso!",
          data: results
        })
    } else {
      // Retorna uma resposta com status 400 (Bad Request) e um objeto JSON com informações de erro
      response
        .status(400)
        .json({
          success: false,
          message: "Ops, deu problema!",
          sql: err
        })
    }
  })
}

// Função para listar os usuários
async function listUsuarios(request, response) {
  // Cria um array com os parâmetros do corpo da requisição
  const params = Array(
    // Email do usuário
    request.body.email,
    // Senha do usuário
    request.body.senha
  )
  
  // Imprime os parâmetros no console
  console.log(params)
  
  // Query SQL para selecionar os usuários com base no email e senha
  const query = `SELECT nome, email, senha FROM usuarios WHERE email = ? AND senha = ?`;
  
  // Executa a query SQL com os parâmetros
  connection.query(query, params, (err, results) => {
    // Verifica se a query foi bem-sucedida
    if(results) {
      // Retorna uma resposta com status 201 (Created) e um objeto JSON com informações de sucesso
      response
        .status(201)
        .json({
          success: true,
          message:"Sucesso!",
          data: results
        })
    } else {
      // Retorna uma resposta com status 400 (Bad Request) e um objeto JSON com informações de erro
      response
        .status(400)
        .json({
          success: false,
          message: "Ops, deu problema!",
          sql: err
        })
    }
  })
}

// Exporta as funções para serem utilizadas em outros arquivos
module.exports = {
  storeUsuarios, listUsuarios
}