const connection = require("../config/db");
const fs = require("fs");
const path = require("path");
const stringSimilarity = require('string-similarity');

// Função para cadastrar um novo usuário
async function storeUsuarios(request, response) {
  const params = [
    request.body.nome,
    request.body.email,
    request.body.senha,
    request.body.nickname
  ];

  const query = "INSERT INTO usuarios(nome, email, senha, nickname) VALUES(?, ?, ?, ?)";

  connection.query(query, params, (err, results) => {
    if(results) {
      response.status(201).json({
        success: true,
        message:"Sucesso!",
        data: results
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problema!",
        sql: err
      });
    }
  });
};

// Função para listar os usuários (login)
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

// Função para listar quem o usuário está seguindo
async function listSeguindo(request, response) {
  const params = [
    request.body.UserId,
  ];

  const query = `SELECT * FROM user_follows WHERE follower_id = ?`;

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

// Função para armazenar quem o usuário está seguindo
async function storeSeguindo(request, response) {
  const params = [
    request.body.UserId,
    request.body.SeguindoId,
  ];
  const query = `INSERT INTO user_follows(follower_id, following_id) VALUES(?, ?)`;

  connection.query(query, params, (err, results) => {
    if(results) {
      response.status(201).json({
        success: true,
        message:"Sucesso!",
        data: results
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problema!",
        sql: err
      });
    }
  });
}

// Função para armazenar imagem
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

// Função para pesquisar usuários
async function listPesquisa(request, response) {
  const valorPesquisa = request.body.valorPesquisa.toLowerCase();

  const query = `SELECT id, Nome, Nickname FROM usuarios`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      response.status(500).json({
        success: false,
        message: "Erro no servidor",
        error: err
      });
    } else {
      const valorPesquisaLower = valorPesquisa.toLowerCase();

      const resultadosComPontuacao = results.map(user => {
        const nomeLower = user.Nome.toLowerCase();
        const nicknameLower = user.Nickname.toLowerCase();

        const similarityNome = stringSimilarity.compareTwoStrings(valorPesquisaLower, nomeLower);
        const similarityNickname = stringSimilarity.compareTwoStrings(valorPesquisaLower, nicknameLower);

        const maiorSimilaridade = Math.max(similarityNome, similarityNickname);

        return {
          ...user,
          similarity: maiorSimilaridade
        };
      });

      const threshold = 0.2;
      const resultadosFiltrados = resultadosComPontuacao.filter(user => user.similarity >= threshold);

      resultadosFiltrados.sort((a, b) => b.similarity - a.similarity);

      response.status(200).json({
        success: true,
        message: 'Sucesso!',
        data: resultadosFiltrados
      });
    }
  });
}

// Função para obter o perfil do usuário
async function getUserProfile(request, response) {
  const UserId = request.params.id;

  if (!UserId) {
    return response.status(400).json({
      success: false,
      message: "ID de usuário não fornecido."
    });
  }

  try {
    const userQuery = `SELECT id, Nome, Nickname, ImagemPerfil, Pontos FROM usuarios WHERE id = ?`;
    const userParams = [UserId];

    connection.query(userQuery, userParams, (err, userResults) => {
      if (err) {
        console.error('Erro ao consultar o usuário:', err);
        return response.status(500).json({
          success: false,
          message: "Erro ao obter informações do usuário.",
          error: err
        });
      }

      if (userResults.length === 0) {
        return response.status(404).json({
          success: false,
          message: "Usuário não encontrado."
        });
      }

      const user = userResults[0];

      const followersQuery = `SELECT COUNT(*) AS total_followers FROM user_follows WHERE following_id = ?`;
      const followingQuery = `SELECT COUNT(*) AS total_following FROM user_follows WHERE follower_id = ?`;

      connection.query(followersQuery, [UserId], (err, followersResults) => {
        if (err) {
          console.error('Erro ao obter seguidores:', err);
          return response.status(500).json({
            success: false,
            message: "Erro ao obter número de seguidores.",
            error: err
          });
        }

        connection.query(followingQuery, [UserId], (err, followingResults) => {
          if (err) {
            console.error('Erro ao obter seguindo:', err);
            return response.status(500).json({
              success: false,
              message: "Erro ao obter número de seguindo.",
              error: err
            });
          }

          const profileData = {
            id: user.id,
            nome: user.Nome,
            nickname: user.Nickname,
            imagemPerfil: user.ImagemPerfil,
            pontos: user.Pontos,
            totalSeguidores: followersResults[0].total_followers,
            totalSeguindo: followingResults[0].total_following
          };

          return response.status(200).json({
            success: true,
            message: "Perfil obtido com sucesso.",
            data: profileData
          });
        });
      });
    });
  } catch (error) {
    console.error('Erro inesperado:', error);
    return response.status(500).json({
      success: false,
      message: "Erro interno do servidor.",
      error: error.message
    });
  }
}

// Função para verificar se um usuário segue outro
async function verificaSegue(request, response) {
  const { followerId, followingId } = request.params;

  const query = `SELECT COUNT(*) AS count FROM user_follows WHERE follower_id = ? AND following_id = ?`;
  const params = [followerId, followingId];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Erro ao verificar se o usuário segue:', err);
      return response.status(500).json({
        success: false,
        message: "Erro ao verificar se o usuário segue.",
        error: err
      });
    }

    const segue = results[0].count > 0;
    return response.status(200).json({
      success: true,
      segue: segue
    });
  });
}

// Função para seguir um usuário
async function seguirUsuario(request, response) {
  const { followerId, followingId } = request.body;

  if (followerId === followingId) {
    return response.status(400).json({ success: false, message: "Você não pode seguir a si mesmo." });
  }

  const query = 'INSERT INTO user_follows (follower_id, following_id) VALUES (?, ?)';
  connection.query(query, [followerId, followingId], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return response.status(400).json({ success: false, message: "Você já segue este usuário." });
      }
      return response.status(500).json({ success: false, message: "Erro ao seguir o usuário.", error: err });
    }
    response.status(200).json({ success: true, message: "Usuário seguido com sucesso." });
  });
}

// Função para deixar de seguir um usuário
async function deixarDeSeguir(request, response) {
  const { followerId, followingId } = request.body;

  const query = 'DELETE FROM user_follows WHERE follower_id = ? AND following_id = ?';
  connection.query(query, [followerId, followingId], (err, results) => {
    if (err) {
      return response.status(500).json({ success: false, message: "Erro ao deixar de seguir o usuário.", error: err });
    }
    response.status(200).json({ success: true, message: "Você deixou de seguir o usuário." });
  });
}

module.exports = {
  storeUsuarios,
  listUsuarios,
  listSeguindo,
  storeSeguindo,
  storeImagem,
  listPesquisa,
  getUserProfile,
  verificaSegue,
  seguirUsuario,
  deixarDeSeguir
};
