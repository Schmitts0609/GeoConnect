let id_user = localStorage.getItem('id_user');

async function listSeguindo(id_usuario) {
    const response = await fetch('http://localhost:3000/api/list/seguindo', {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({id_usuario})
        });

        if (!response.ok) {
            console.error('Failed to fetch data:', response.status);
            alert('Error: Could not fetch data.');
            return;
        }

        let content = await response.json();
        console.log(content);

        if(content.success){
            //alert('deu bom')
        }
        else {
            //alert('deu ruim')
        }
}

async function storeSeguindo() {
    let UserId = localStorage.getItem('id_user');
    let SeguindoId = 24
    const response = await fetch('http://localhost:3000/api/store/seguindo', {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({UserId, SeguindoId})
        });

        if (!response.ok) {
            console.error('Failed to fetch data:', response.status);
            alert('Error: Could not fetch data.');
            return;
        }

        let content = await response.json();
        console.log(content);

        if(content.success){
            console.log('deu bom')
        }
        else {
            console.log('deu ruim')
        }
}

listSeguindo(id_user)