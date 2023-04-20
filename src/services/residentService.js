const residentRepository = require('../repositories/residentRepository');
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'O campo name é obrigatório.'
    }),
    birth_date: Joi.string().pattern(new RegExp('^[0-9]{8}$')).messages({
      'string.pattern.base': 'O campo birth_date deve conter 8 dígitos numéricos.'
    }),
    residence_number: Joi.number().required().messages({
      'any.required': 'O campo residence_number é obrigatório.'
    })
});

async function createResidentService(req) {
    const { error } = schema.validate(req.body, { abortEarly: false });
      
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(' ');
        throw new Error(errorMessage);
    }

    var { name, birth_date, residence_number, floor, block  } = req.body;
    const response = await residentRepository.create( name, birth_date, residence_number, floor = null, block = null )
    return response
}

async function getAllResidentsService () {
    const response = await residentRepository.get();
    return response
}

async function getResidentByIdService(req) {
    const response = await residentRepository.get(req.params.id)
    return response
}

async function deleteResidentService(req) {
    const response =  await residentRepository.destroy(req.params.id)
    return response
}

function updateResidentService(req) {
    const { error } = schema.validate(req.body, { abortEarly: false });
      
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(' ');
        throw new Error(errorMessage);
    }
    const { name, birth_date, residence_number, floor, block  } = req.body;
    const response = residentRepository.update(req.params.id, name, birth_date, residence_number, floor, block)
    return response
}

module.exports = { createResidentService, getAllResidentsService, getResidentByIdService, deleteResidentService, updateResidentService };