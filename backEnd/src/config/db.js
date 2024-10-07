// Importa o módulo mysql2 para realizar a conexão com o banco de dados MySQL
const mysql = require('mysql2');

// Importa o módulo dotenv para carregar as variáveis de ambiente do arquivo .env
const dotenv = require('dotenv').config();

// Cria uma conexão com o banco de dados MySQL utilizando as variáveis de ambiente
const connection = mysql.createConnection({
  // Endereço do servidor MySQL
  host: process.env.DB_HOST,
  
  // Nome do usuário para autenticação no banco de dados
  user: process.env.DB_USER,
  
  // Senha do usuário para autenticação no banco de dados
  password: process.env.DB_PASSWORD,
  
  // Nome do banco de dados a ser utilizado
  database: process.env.DB_DATABASE
});

// Estabelece a conexão com o banco de dados
connection.connect(function(err) {
  // Verifica se ocorreu algum erro durante a conexão
  if (err) {
    // Se ocorreu um erro, lança o erro para ser tratado
    throw err;
  } else {
    // Se a conexão foi bem-sucedida, imprime uma mensagem de sucesso no console
    console.log("MySql conectado!");
  }
});

// Exporta a conexão com o banco de dados para ser utilizada em outros arquivos
module.exports = connection;