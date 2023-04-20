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
        const response = await residentService.createResidentService(req)
        res.status(200).send({
            message: 'Morador cadastrado com sucesso.',
            data: response
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

server.get('/resident', async (_, res) => {
    try {
        response = await residentService.getAllResidentsService()
        res.status(200).send({
            data: response
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

server.get('/resident/:id', async (req, res) => {
    try {
        const response = await residentService.getResidentByIdService(req)
        res.status(200).send({
            data: response
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});


server.delete('/resident/:id', (req, res) => {
    try {
        const response = residentService.deleteResidentService(req)
        res.status(200).send({
            message: 'Morador deletado com sucesso.',
            data: response
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

server.put('/resident/:id', (req, res) => {
    try {
        const response = residentService.updateResidentService(req)
        res.status(200).send({
            message: 'Morador atualizado com sucesso!',
            data: response
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

server.post('/condominium', async (req, res) => {
    try {
        const response = await condominiumService.createCondominiumService(req);
        res.status(200).send({
            message: 'Condomínio cadastrado com sucesso!',
            data: response
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

server.post('/reservations', async(req,res) => {
    try {
        const response = await reservationsService.createReservationService(req);
        res.status(200).send({
            message:'Reserva realizada com sucesso!',
            data: response
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
})