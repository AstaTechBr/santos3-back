// server.js
const express = require('express');
const sequelize = require('./config/config');
const imovelRoutes = require('./routes/index');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images',express.static(path.join(__dirname, 'images')));

app.use('/api', imovelRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log('Banco de dados sincronizado');
}).catch(err => console.log('Erro ao sincronizar banco de dados:', err));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
