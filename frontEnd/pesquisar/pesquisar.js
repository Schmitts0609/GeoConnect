// Seleciona o botão de cadastro de usuário
let buttonSubmit = document.getElementById("submit_pesquisa");

// Adiciona um evento de clique ao botão de cadastro de usuário
buttonSubmit.onclick = async function() {
  try {
    // Seleciona os valores dos inputs de cadastro de usuário
    let valorPesquisa = document.getElementById("barra-pesquisa").value;

    // Faz uma requisição POST para a API para cadastrar o usuário
    const response = await fetch('http://localhost:3000/api/list/pesquisa', {
      method: 'POST',
      headers: {'Content-type': 'application/json;charset=UTF-8'},
      body: JSON.stringify({ valorPesquisa })
    });

    // Converte a resposta em JSON
    let content = await response.json();
    console.log(content);
    } catch (error) {
    // Mostra um erro no console e uma mensagem de erro para o usuário
    console.error('Error:', error);
    alert('Erro ao conectar com a base');
  }
};