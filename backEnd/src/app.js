const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');

const usuariosRouter = require('./routes/usuariosRouter');

const app = express();

console.log('Executando o app.js');

app.set('port', process.env.PORT || 3000);

app.use(cors());

// Adicionar logs para verificar os caminhos
console.log('__dirname:', __dirname);
console.log('Caminho para frontEnd:', path.join(__dirname, '..', '..', 'frontEnd'));

// Servir arquivos estáticos da pasta 'frontEnd'
app.use(express.static(path.join(__dirname, '..', '..', 'frontEnd')));

// Habilitar o parsing de JSON
app.use(express.json());

// Rotas da API
app.use('/api', usuariosRouter);

// Servir arquivos estáticos de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;
