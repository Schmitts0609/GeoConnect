// Seleciona o botão de pesquisa
let buttonSubmit = document.getElementById("submit_pesquisa");

// Adiciona um evento de clique ao botão
buttonSubmit.onclick = async function() {
  try {
    let valorPesquisa = document.getElementById("barra-pesquisa").value.trim();

    // Verifica se o campo de pesquisa não está vazio
    if (!valorPesquisa) {
      alert('Por favor, insira um termo para pesquisa.');
      return;
    }

    let resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '<p>Buscando...</p>';

    const response = await fetch('http://localhost:3000/api/list/pesquisa', {
      method: 'POST',
      headers: {'Content-type': 'application/json;charset=UTF-8'},
      body: JSON.stringify({ valorPesquisa })
    });

    let content = await response.json();
    console.log(content);

    resultsContainer.innerHTML = '';

    if(content.success && content.data.length > 0) {
      content.data.forEach(user => {
        let userDiv = document.createElement('div');
        userDiv.classList.add('user-result');

        userDiv.innerHTML = `
          <p> ${user.Nickname}</p>
          <p> ${user.Nome}</p>
        `;

        resultsContainer.appendChild(userDiv);
      });
    } else {
      let noResults = document.createElement('p');
      noResults.textContent = 'Nenhum resultado encontrado.';
      resultsContainer.appendChild(noResults);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Erro ao conectar com a base');
  }
};
