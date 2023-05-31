require('dotenv').config();
const axios = require('axios');
const Joi = require('joi');
const sendMessageToQueueService = require('../utils/services/sendMessageToQueue');

const reservationsQueue = 'reservations'

async function createReservationService(req) {

    const schema = Joi.object({
        area_id: Joi.number().required().messages({
          'any.required': 'O campo name é obrigatório.'
        }),
        resident_id : Joi.number().required().messages({
          'any.required': 'O campo resident_id é obrigatório.'
        }),
        reserve_date: Joi.string().required().messages({
          'any.required': 'O campo reserve_date é obrigatório.'
        })
      });
      
    const { error } = schema.validate(req.body, { abortEarly: false });
      
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(' ');
        throw new Error(errorMessage);
    }

    try {
        sendMessageToQueueService.sendMessageToQueue(req.body, reservationsQueue)
        return 'Reserva enviada!'
    } catch(error) {
        throw new Error('Falha ao cadastrar reserva')
    }
}

module.exports = { createReservationService };