// Importa a conexão com o banco de dados
const connection = require("../config/db");

// Importa o módulo dotenv para carregar as variáveis de ambiente
const dotenv = require("dotenv").config();

const fs = require("fs");
const path = require("path");

const uploadPath = path.join(__dirname, '..', 'uploads');

if(!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
} 


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
  
  const params = [
      request.body.email,
      request.body.senha
  ];
  
  console.log("Query Parameters:", params);

  const query = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;
  
  connection.query(query, params, (err, results) => {
      if (err) {
          response.status(400).json({
              success: false,
              message: "Ops, deu problema!",
              sql: err
          });
      } else {
          response.status(200).json({
              success: true,
              message: "Sucesso!",
              data: results
          });
      }
  });
}

async function listSeguindo(request, response) {
  const params = [
    request.body.UserId,
  ];

  const query = `SELECT * FROM seguindo WHERE UserId = ?`;

  connection.query(query, params, (err, results) => {
    if (err) {
        response.status(400).json({
            success: false,
            message: "Ops, deu problema!",
            sql: err
        });
    } else {
        response.status(200).json({
            success: true,
            message: "Sucesso!",
            data: results
        });
    }
  });
}

async function storeSeguindo(request, response) {
  const params = [
    request.body.UserId,
    request.body.SeguindoId,
  ];
  const query = `INSERT INTO seguindo(UserId, SeguindoId) VALUES(1, 24)`;

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

 async function storeImagem(request, response) {
 console.log(request.files)
 if (!request.files) {
     return response.status(400).json({
         success: false,
         message: "No files were uploaded."
     });
 }



 const arquivo = request.files.inputImagem; // Make sure this matches the frontend

 const arquivoNome = Date.now() + path.extname(arquivo.name);

 arquivo.mv(path.join(uploadPath, arquivoNome), (erro) => {
     if (erro) {
         return response.status(500).json({
                 success: false,
                 message: "Error while moving the file",
             error: erro
         });
     }
     console.log(arquivoNome, arquivo);
     const params = [arquivoNome];
     const query = `INSERT INTO postagens(imagemNome) VALUES (?)`;
      
     connection.query(query, params, (err, results) => {
         if (err) {
             return response.status(500).json({
                 success: false,
                 message: "Error while inserting into database",
                 error: err
             });
         }
          
         response.status(200).json({
             success: true,
             message: "File uploaded successfully",
             fileName: arquivoNome
         });
     });
 });
}
//Exporta as funções para serem utilizadas em outros arquivos
module.exports = {
  storeUsuarios, listUsuarios, listSeguindo, storeSeguindo, storeImagem
}