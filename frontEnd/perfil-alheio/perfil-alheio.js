// Função para obter parâmetros da URL
  function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const queries = queryString.split("&");
    queries.forEach((query) => {
      const [key, value] = query.split("=");
      params[key] = decodeURIComponent(value);
    });
    return params;
  }
  
  async function carregarPerfil() {
    const params = getQueryParams();
    const UserId = params.id;
  
    if (!UserId) {
      alert("ID de usuário não fornecido.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/perfil/${UserId}`);
      if (!response.ok) {
        throw new Error(`Erro ao obter perfil: ${response.statusText}`);
      }
      const content = await response.json();
      if (content.success) {
        const data = content.data;
  
        // Atualizar os elementos da página com os dados do usuário
        document.getElementById("nome-usuario").textContent = data.nome;
        document.getElementById("nickname-usuario").textContent = `@${data.nickname}`;
        document.getElementById("numero-seguidores").textContent = data.totalSeguidores;
        document.getElementById("numero-seguindo").textContent = data.totalSeguindo;
  
        // Configurar o botão de seguir/deixar de seguir
        configurarBotaoSeguir(UserId);
      } else {
        alert(content.message);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao carregar o perfil.');
    }
  }
  
  function configurarBotaoSeguir(userIdPerfil) {
    // Suponha que você tenha o userId do usuário logado armazenado em algum lugar
    const userIdLogado = localStorage.getItem('UserId');
  
    if (!userIdLogado) {
      // Usuário não está logado
      document.getElementById("botao-seguir").style.display = 'none';
      return;
    }
  
    // Não exibir o botão se o usuário estiver vendo seu próprio perfil
    if (userIdLogado == userIdPerfil) {
      document.getElementById("botao-seguir").style.display = 'none';
      return;
    }
  
    // Verificar se o usuário já segue este perfil
    fetch(`http://localhost:3000/api/segue/${userIdLogado}/${userIdPerfil}`)
      .then(response => response.json())
      .then(content => {
        if (content.success) {
          const segue = content.segue;
          const botaoSeguir = document.getElementById("botao-seguir");
          botaoSeguir.textContent = segue ? 'Deixar de Seguir' : 'Seguir';
          botaoSeguir.onclick = () => {
            if (segue) {
              deixarDeSeguir(userIdLogado, userIdPerfil);
            } else {
              seguirUsuario(userIdLogado, userIdPerfil);
            }
          };
        } else {
          console.error(content.message);
        }
      })
      .catch(error => {
        console.error('Erro ao verificar se o usuário segue:', error);
      });
  }
  
  function seguirUsuario(followerId, followingId) {
    fetch('http://localhost:3000/api/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ followerId, followingId })
    })
      .then(response => response.json())
      .then(content => {
        if (content.success) {
          alert('Agora você está seguindo este usuário.');
          location.reload();
        } else {
          alert(content.message);
        }
      })
      .catch(error => {
        console.error('Erro ao seguir o usuário:', error);
      });
  }
  
  function deixarDeSeguir(followerId, followingId) {
    fetch('http://localhost:3000/api/unfollow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ followerId, followingId })
    })
      .then(response => response.json())
      .then(content => {
        if (content.success) {
          alert('Você deixou de seguir este usuário.');
          location.reload();
        } else {
          alert(content.message);
        }
      })
      .catch(error => {
        console.error('Erro ao deixar de seguir o usuário:', error);
      });
  }
  
  // Chama a função para carregar o perfil quando a página é carregada
  document.addEventListener('DOMContentLoaded', carregarPerfil);
  