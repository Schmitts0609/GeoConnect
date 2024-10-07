const botao_usuario = document.getElementById('enviar-login-usuario');

botao_usuario.onclick = async function(event){
    event.preventDefault();

    const email = document.getElementById('input-email-login-usuario').value;
    const senha = document.getElementById('input-senha-login-usuario').value;

    let data_ = {email, senha}
    const response = await fetch('http://localhost:3000/api/list/usuarios', {
        method: 'POST',
        headers: {'Content-type': 'application/json;chartset=UTF-8'},
        body: JSON.stringify(data_)
    })
    console.log(data_)
    let content = await response.json();

    console.log(content);

    if(content.success) {
        if(content.data.length === 0) {
            alert('Dados inválidos')
        }
        else {
            alert('Login bem sucedido')
            window.location.href = '../index/index.html'
        }
    }
    else {
        alert('Ops, não foi possível buscar os dados na base!')
    }
}