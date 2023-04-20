require('dotenv').config();

const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

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

// Configuração do Swagger
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API Condogenius',
        description: 'API de gestão de condomínio Condogenius',
        version: '1.0.0',
      },
    },
    apis: [path.join(__dirname, '*.js')],
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);

 server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes

server.get('/', (_, res) => { 
    res.send('Servidor condogenius ok!')
});

/**
 * @swagger
 * /resident:
 *   post:
 *     summary: Cadastra moradores
 *     description: Rota para cadastro de morador
 *     responses:
 *       200:
 *         description: Morador cadastrado com sucesso.
 *        
 */
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

/**
 * @swagger
 * /resident:
 *   get:
 *     summary: Lista todos os moradores
 *     description: Retorna uma lista de todos os moradores cadastrados
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
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