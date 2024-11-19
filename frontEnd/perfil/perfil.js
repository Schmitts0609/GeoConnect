async function carregarPerfil() {
    const UserId = localStorage.getItem('UserId');
  
    if (!UserId) {
      alert("Usuário não está logado.");
      window.location.href = 'login.html'; // Redirecionar para a página de login, se necessário
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
        console.log('Dados recebidos:', data); // Adicione este log para depuração
  
        // Atualizar os elementos da página com os dados do usuário
        document.getElementById("nome-usuario").textContent = data.nome;
        document.getElementById("nickname-usuario").textContent = `@${data.nickname}`;
        document.getElementById("numero-seguidores").textContent = data.totalSeguidores;
        document.getElementById("numero-seguindo").textContent = data.totalSeguindo;
      } else {
        alert(content.message);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao carregar o perfil.');
    }
  }
  
  // Chama a função para carregar o perfil quando a página é carregada
  document.addEventListener('DOMContentLoaded', carregarPerfil);