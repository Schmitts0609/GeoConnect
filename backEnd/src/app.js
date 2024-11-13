const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fileupload = require('express-fileupload');
const cors = require("cors");

const usuariosRouter = require("./routes/usuariosRouter");

const app = express();


app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use("/api", usuariosRouter);
app.use('/uploads', express.static(path.join(__dirname, "uploads")))

module.exports = app;