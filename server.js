require('dotenv').config();

const express = require('express');
const server = express();
const bodyParser = require('body-parser');


server.listen(process.env.PORT), () => {
    console.log(`Servidor rodando na porta de conexão ${process.env.PORT}.`)
};

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Routes
server.get('/', (_, res) => {
    res.send('Servidor condogenius ok!');
})
