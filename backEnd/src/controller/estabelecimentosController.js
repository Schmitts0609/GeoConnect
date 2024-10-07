const connection = require("../config/db");
const dotenv = require("dotenv").config();

async function storeEstabelecimentos(request, response) {
    const params = Array(
        request.body.nome,
        request.body.nickname,
        request.body.email,
        request.body.senha,
        request.body.cnpj
    );
    
    console.log(params)
    const query = "INSERT INTO estabelecimentos(nome, nickname, email, senha, cnpj) VALUES(?, ?, ?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if(results) {
            response
                .status(201)
                .json({
                    success: true,
                    message:"Sucesso!",
                    data: results
                })
        }   else {
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

module.exports = {
    storeEstabelecimentos
}