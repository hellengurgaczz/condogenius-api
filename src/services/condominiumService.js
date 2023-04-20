const getCepService = require('../utils/services/getCepService');
const condominiumRepository = require('../repositories/condominiumRepository');
const Joi = require('joi');

async function createCondominiumService(req, _) {

    const schema = Joi.object({
        name: Joi.string().required().messages({
          'any.required': 'O campo name é obrigatório.'
        }),
        cep: Joi.string().pattern(new RegExp('^[0-9]{8}$')).messages({
          'string.pattern.base': 'O campo cep deve conter 8 dígitos numéricos.'
        }),
        number: Joi.number().required().messages({
          'any.required': 'O campo number é obrigatório.'
        })
      });
      
    const { error } = schema.validate(req.body, { abortEarly: false });
      
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(' ');
        throw new Error(errorMessage);
    }
    
    const { name, cep, number } = req.body;
    
    const data_cep = await getCepService.getCep(parseInt(cep));

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