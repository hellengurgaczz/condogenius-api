require('dotenv').config();
const axios = require('axios');

async function createReservationService(req) {
    try {
        const response = await axios.post(`${process.env.API_CONDOGENIUS_RESERVATION}`, req.body)
        return response.data
    } catch(error) {
        console.error(error)
        return error
    }
}

module.exports = { createReservationService };