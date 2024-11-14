const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require("cors");

const usuariosRouter = require("./routes/usuariosRouter");

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());

// Remova ou comente o express.json(), pois não é necessário para o upload de arquivos
// app.use(express.json());

// Defina a rota para servir arquivos estáticos (imagens, uploads, etc.)
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// Use o router para as rotas da API
app.use("/api", usuariosRouter);

// Se precisar do express.json() para outras rotas, adicione-o **após** as rotas que lidam com uploads
// app.use(express.json());

module.exports = app;
