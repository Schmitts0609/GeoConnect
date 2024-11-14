// Importa a conexão com o banco de dados
const { log } = require("console");
const connection = require("../config/db");

// Importa o módulo dotenv para carregar as variáveis de ambiente
const dotenv = require("dotenv").config();
const fs = require("fs");
const path = require("path");
const stringSimilarity = require('string-similarity');


const uploadPath = path.join(__dirname, "..", "uploads");

// Irá criar a pasta uploads se ela já não existir
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Caminhos para as subpastas curriculos e img_perfil
const postagemPath = path.join(uploadPath, "ImagemPostagem");
const imagemPerfilPath = path.join(uploadPath, "ImagemPerfil");

// Irá criar a pasta curriculos se ela já não existir
if (!fs.existsSync(postagemPath)) {
  fs.mkdirSync(postagemPath);
}

// Irá criar a pasta img_perfil se ela já não existir
if (!fs.existsSync(imagemPerfilPath)) {
  fs.mkdirSync(imagemPerfilPath);
}



// Função para cadastrar um novo usuário
async function storeUsuarios(request, response) {
  // Cria um array com os parâmetros do corpo da requisição
  const params = Array(
    request.body.nome,
    request.body.email,
    request.body.senha,
    request.body.nickname
  );
  
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
  console.log("Chamou a função");

  console.log('request.body:', request.body);
  console.log('request.file:', request.file);

  if (!request.file) {
    return response.status(400).json({
      success: false,
      message: "Nenhum arquivo foi enviado."
    });
  }

  const arquivo = request.file;
  console.log('Arquivo recebido:', arquivo);

  const arquivoNome = arquivo.filename;

  const params = [arquivoNome];
  const query = `INSERT INTO postagens(NomeImagem) VALUES (?)`;

  connection.query(query, params, (err, results) => {
    if (err) {
      return response.status(500).json({
        success: false,
        message: "Erro ao inserir no banco de dados.",
        error: err
      });
    }

    response.status(200).json({
      success: true,
      message: "Arquivo enviado com sucesso.",
      fileName: arquivoNome
    });
  });
}


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

async function listPesquisa(request, response) {
  const valorPesquisa = request.body.valorPesquisa.toLowerCase();

  // Obtenha todos os usuários ou aqueles que correspondem aproximadamente
  const query = `SELECT Nome, Nickname FROM usuarios`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      response.status(500).json({
        success: false,
        message: "Erro no servidor",
        error: err
      });
    } else {
      // Calcular a similaridade entre o termo de pesquisa e cada resultado
      const valorPesquisaLower = valorPesquisa.toLowerCase();

      // Mapear os resultados para incluir a pontuação de similaridade
      const resultadosComPontuacao = results.map(user => {
        const nomeLower = user.Nome.toLowerCase();
        const nicknameLower = user.Nickname.toLowerCase();

        // Calcular a similaridade com o Nome e o Nickname
        const similarityNome = stringSimilarity.compareTwoStrings(valorPesquisaLower, nomeLower);
        const similarityNickname = stringSimilarity.compareTwoStrings(valorPesquisaLower, nicknameLower);

        // Escolher a maior similaridade entre Nome e Nickname
        const maiorSimilaridade = Math.max(similarityNome, similarityNickname);

        // Retornar o usuário com a pontuação de similaridade
        return {
          ...user,
          similarity: maiorSimilaridade
        };
      });

      // Filtrar os resultados com base em um threshold de similaridade (opcional)
      const threshold = 0.2; // Ajuste conforme necessário
      const resultadosFiltrados = resultadosComPontuacao.filter(user => user.similarity >= threshold);

      // Ordenar os resultados pela pontuação de similaridade em ordem decrescente
      resultadosFiltrados.sort((a, b) => b.similarity - a.similarity);

      response.status(200).json({
        success: true,
        message: 'Sucesso!',
        data: resultadosFiltrados
      });
    }
  });
}


//Exporta as funções para serem utilizadas em outros arquivos
module.exports = {
  storeUsuarios, listUsuarios, listSeguindo, storeSeguindo, storeImagem, listPesquisa
}