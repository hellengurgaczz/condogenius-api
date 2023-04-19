require('dotenv').config();

const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const residentService = require('./src/services/residentService');
const condominiumService = require('./src/services/condominiumService');
const reservationsService = require('./src/services/reservationsService');

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

server.post('/condominium', async (req, res) => {
    try {
        response = await condominiumService.createCondominiumService(req)
        res.send(`Condominio cadastrado com sucesso!`, response)
    } catch (error) {
        res.send(error)
    }
});

server.post('/reservations', async(req,res) => {
    try {
        response = await reservationsService.createReservationService(req)
        res.status(200).send('Reserva realizada com sucesso!')
    } catch (error) {
        res.send(error)
    }
})