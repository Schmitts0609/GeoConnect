// Seleciona o botão de cadastro de usuário
let buttonCadastroUsuario = document.getElementById("enviar-cadastro-usuario");

// Adiciona um evento de clique ao botão de cadastro de usuário
buttonCadastroUsuario.onclick = async function() {
  try {
    // Seleciona os valores dos inputs de cadastro de usuário
    let nome = document.getElementById("input-nome-cadastro-usuario").value;
    let email = document.getElementById("input-email-cadastro-usuario").value;
    let nascimento = document.getElementById("input-nascimento-cadastro-usuario").value;
    let senha = document.getElementById("input-senha-cadastro-usuario").value;
    let nickname = document.getElementById("input-nickname-cadastro-usuario").value;

    // Cria um objeto com os dados do usuário
    let dadosUsuario = {nome, email, nascimento, senha, nickname};  
    
    // Faz uma requisição POST para a API para cadastrar o usuário
    const response = await fetch('http://localhost:3000/api/store/usuarios', {
      method: 'POST',
      headers: {'Content-type': 'application/json;charset=UTF-8'},
      body: JSON.stringify(dadosUsuario)
    });

    // Converte a resposta em JSON
    let content = await response.json();

    // Verifica se o cadastro foi bem-sucedido
    if(content.success) {
      // Mostra uma mensagem de sucesso e redireciona para a página de login
      alert("Usuário cadastrado");
      window.location.href = "../login/login.html";
    } else {
      // Mostra uma mensagem de erro
      alert("Erro ao cadastrar usuário");
    }
  } catch (error) {
    // Mostra um erro no console e uma mensagem de erro para o usuário
    console.error('Error:', error);
    alert('Erro ao conectar com a base');
  }
};
