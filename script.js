//https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example
//create-qr-code
//read-qr-code

fetch("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example", 
{}).then(response => {
    console.log(response)
});
