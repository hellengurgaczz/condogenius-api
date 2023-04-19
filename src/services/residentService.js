const residentRepository = require('../repositories/residentRepository');

async function createResidentService(req) {
    console.log(req.body)

    var { name, birth_date, residence_number, floor, block  } = req.body;
    // verificações
    return await residentRepository.create( name, birth_date, residence_number, floor = null, block = null )
}

async function getAllResidentsService () {
    return await residentRepository.get();
}

async function getResidentByIdService(req) {
    return await residentRepository.get(req.params.id)
}

function deleteResidentService(req) {
    residentRepository.destroy(req.params.id)
}

function updateResidentService(req) {
    const { name, birth_date, residence_number, floor, block  } = req.body;
    residentRepository.update(req.params.id, name, birth_date, residence_number, floor, block)
}

module.exports = { createResidentService, getAllResidentsService, getResidentByIdService, deleteResidentService, updateResidentService };