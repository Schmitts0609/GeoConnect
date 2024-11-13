let button = document.getElementById("submit-arquivo");

button.onclick = async function() {
    let form = document.getElementById("anexador-arquivos");

    let data = new FormData(form);

    data.append("Imagem", form.files[0]);

    console.log(data);

    try {
        console.log("Postando")
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
}