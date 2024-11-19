document.addEventListener('DOMContentLoaded', function() {
  // Selecionar os elementos do DOM
  const button = document.getElementById("submit-arquivo");
  const inputImagem = document.getElementById("inputImagem");
  const previewContainer = document.getElementById("previewContainer");
  const previewImagem = document.getElementById("previewImagem");

  // Função para exibir a pré-visualização da imagem
  inputImagem.addEventListener('change', function(event) {
      const file = event.target.files[0];

      if (file) {
          // Verificar se o arquivo é uma imagem
          if (file.type.startsWith('image/')) {
              const reader = new FileReader();

              reader.onload = function(e) {
                  previewImagem.src = e.target.result;
                  previewContainer.style.display = 'block'; // Mostrar o contêiner de pré-visualização
              }

              reader.readAsDataURL(file); // Ler o arquivo como uma URL de dados
          } else {
              alert('Por favor, selecione um arquivo de imagem válido.');
              inputImagem.value = ''; // Limpar o campo de entrada
              previewContainer.style.display = 'none'; // Ocultar o contêiner de pré-visualização
          }
      } else {
          previewImagem.src = '#';
          previewContainer.style.display = 'none'; // Ocultar o contêiner se nenhum arquivo for selecionado
      }
  });

  // Função para enviar o formulário via AJAX
  button.onclick = async function(event) {
      event.preventDefault(); // Impedir o comportamento padrão do formulário

      // Verificar se uma imagem foi selecionada
      if (inputImagem.files.length === 0) {
          alert("Por favor, selecione um arquivo.");
          return;
      }

      const file = inputImagem.files[0];

      // Adicionar validações adicionais (tamanho do arquivo, tipo, etc.)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
          alert("O arquivo selecionado excede o tamanho máximo de 5MB.");
          return;
      }

      // Criar um FormData e anexar a imagem
      let data = new FormData();
      data.append("inputImagem", file); // Certifique-se de que o backend espera 'arquivo' como nome do campo

      // Inspecionar o conteúdo do FormData (para desenvolvimento; remova em produção)
      for (let pair of data.entries()) {
          console.log(pair[0] + ': ', pair[1]);
      }

      try {
          console.log("Enviando a imagem para o servidor...");
          const response = await fetch('http://localhost:3000/api/store/imagem', {
              method: "POST",
              body: data
          });

          let content = await response.json();
          console.log("Resposta do servidor:", content);

          if (content.success) {
              alert("Imagem enviada com sucesso!");
              document.getElementById("formCriarPublicacao").reset();
              previewContainer.style.display = 'none';
              previewImagem.src = '#';
          } else {
              alert("Erro ao enviar a imagem: " + content.message);
              console.log("Mensagem de erro:", content.message);
          }
      } catch (error) {
          console.log("Erro ao enviar a imagem:", error);
      }
  };
});
