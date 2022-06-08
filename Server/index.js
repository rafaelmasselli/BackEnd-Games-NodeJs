// express / cors 
const express = require('express');
const cors = require('cors');
const port = 3000
const crud = require('./routes/index.routes')


const app = express();
app.use(express.json());
app.use(cors());


app.use('/', crud)

app.listen(port, () =>console.log(`Servidor rodando em http://localhost:${port}`));