const residentRepository = require('../repositories/residentRepository');
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'O campo name é obrigatório.'
    }),
    birth_date: Joi.string().required().messages({
        'any.required': 'O campo birth_date é obrigatório.',
        'string.pattern.base': 'O campo birth_date deve conter 8 dígitos numéricos.'
    }),
    contact: Joi.string().required().messages({
        'any.required': 'O campo contato é obrigatório.'
    }),
    residence_number: Joi.number().required().messages({
      'any.required': 'O campo residence_number é obrigatório.'
    }),
    floor: Joi.number().messages({
        'any.required': 'O campo name é obrigatório.'
    }).optional(),
    block: Joi.string().messages({
        'any.required': 'O campo name é obrigatório.'
    }).optional(),
});

async function createResidentService(req) {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(' ');
        throw new Error(errorMessage);
    }
    console.log(req.body)
    var { name, birth_date, contact, residence_number, floor, block  } = req.body;
    const response = await residentRepository.create( name, birth_date, contact, residence_number, floor, block )
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
    const { name, birth_date, contact, residence_number, floor, block  } = req.body;
    const response = residentRepository.update(req.params.id, name, birth_date, contact, residence_number, floor, block)
    return response
}

module.exports = { createResidentService, getAllResidentsService, getResidentByIdService, deleteResidentService, updateResidentService };