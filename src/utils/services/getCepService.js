const axios = require('axios');

async function getCep(cep) {

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        return response.data
    } catch(error) {
        throw new Error('Falha ao buscar CEP')
    }

}

module.exports = { getCep };