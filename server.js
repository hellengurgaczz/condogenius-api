require('dotenv').config();

const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const database = require('./src/database/db');
const residentService = require('./src/services/residentService');

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
    res.send('Servidor condogenius ok!')
});

server.post('/resident', async (req, res) => {
    try {
        resident = await residentService.createResidentService(req)
        res.send(`Morador ${resident.name } cadastrado com sucesso`)
    } catch (error) {
        res.send(error)
    }
});

server.get('/resident', async (_, res) => {
    try {
        residents = await residentService.getAllResidentsService()
        res.send(residents)
    } catch (error) {
        res.send(error)
    }
});

server.get('/resident/:id', async (req, res) => {
    try {
        resident = await residentService.getResidentByIdService(req)
        res.send(resident)
    } catch (error) {
        res.send(error)
    }
});


server.delete('/resident/:id', (req, res) => {
    try {
        residentService.deleteResidentService(req)
        res.send('Morador deletado com sucesso.')
    } catch (error) {
        res.send(error)
    }
});

server.put('/resident/:id', (req, res) => {
    try {
        residentService.updateResidentService(req)
        res.send('Morador atualizado com sucesso.')
    } catch (error) {
        res.send(error)
    }
});