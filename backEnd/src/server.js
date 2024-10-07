// Importa a instância do aplicativo Express do arquivo app.js
const app = require('./app');

// Obtém a porta definida no aplicativo Express
const port = app.get('port');

// Inicia o servidor e escuta na porta definida
app.listen(port, () => console.log(`Running on port ${port}!`));