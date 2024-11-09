// server.js
const express = require('express');
const sequelize = require('./config/config');
const imovelRoutes = require('./routes/index');

const app = express();
app.use(express.json());

app.use('/api', imovelRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log('Banco de dados sincronizado');
}).catch(err => console.log('Erro ao sincronizar banco de dados:', err));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
