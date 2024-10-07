// Importa o módulo Express para criar o servidor
const express = require('express');

// Importa o módulo dotenv para carregar as variáveis de ambiente
const dotenv = require('dotenv').config();

// Importa os routers de usuários e estabelecimentos
const usuariosRouter = require("./routes/usuariosRouter");
const estabelecimentosRouter = require("./routes/estabelecimentosRouter")

// Importa o módulo CORS para habilitar a comunicação entre diferentes origens
const cors = require("cors");

// Cria uma instância do servidor Express
const app = express();

// Define a porta do servidor, utilizando a variável de ambiente PORT ou 3005 como padrão
app.set('port', process.env.PORT || 3005);

// Habilita o suporte a JSON no servidor
app.use(express.json());

// Habilita o CORS no servidor
app.use(cors());

// Define as rotas para os usuários e estabelecimentos
app.use("/api", usuariosRouter);
app.use("/api", estabelecimentosRouter)

// Exporta o servidor para ser utilizado em outros arquivos
module.exports = app;