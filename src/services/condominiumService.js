const getCepService = require('../utils/services/getCepService');
const condominiumRepository = require('../repositories/condominiumRepository');

async function createCondominiumService(req, _) {
    
    const { name, cep, number } = req.body;

    if (!/^[0-9]{8}$/.test(cep)) {

        return res.status(500).send('O campo "cep" deve conter 8 dígitos numéricos.')
    }

    if(!number) {
        throw new Error('O campo "number" deve ser preenchido.');
    }

    data_cep = await getCepService.getCep(parseInt(cep));

    const address = {
        cep: data_cep.cep,
        logradouro: data_cep.logradouro,
        neighborhood: data_cep.bairro,
        number: number,
        city: data_cep.localidade,
        uf: data_cep.uf
    }

    const response = await condominiumRepository.create(name, JSON.stringify(address, null, 2))
    return response
}

module.exports = { createCondominiumService };