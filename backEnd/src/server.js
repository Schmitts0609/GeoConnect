const express = require('express')
const cors = require('cors')
require('dotenv').config()
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "GeoConnect",
            version: "1.0.0",
            description: "Gerenciamento da plataforma",
        },
        servers: [{ url: "http://localhost:3000"}],
    },
    apis: [` ${__dirname}/routes/*.js`], //caminho para as rotas
};

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

const usuariosRouter = require('./routes/usuariosRouter')
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use (express.json())
app .use(cors())
app.use('/api', usuariosRouter)

app.listen(port, () => console.log(`Run on port ${port}!`));    
