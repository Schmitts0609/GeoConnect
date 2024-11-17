let button = document.getElementById("submit-arquivo");
button.onclick = async function(event) {
  event.preventDefault(); // impede o comportamento padrão do formulario

  let inputImagem = document.getElementById("inputImagem");

  if (inputImagem.files.length === 0) {
    alert("Por favor, selecione um arquivo.");
    return;
  }

  let data = new FormData();
  data.append("inputImagem", inputImagem.files[0]);

  // inspecionar o conteudo do FormData
  for (var pair of data.entries()) {
    console.log(pair[0]+ ', ' + pair[1]);
  }

  try {
    console.log("Postando");
    const response = await fetch('http://localhost:3000/api/store/imagem', {
      method: "POST",
      body: data
    });

    let content = await response.json();
    console.log("Server response:", content);

    if(content.success) {
      console.log("Sucesso");
    } else {
      console.log("Erro");
      console.log(content.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
