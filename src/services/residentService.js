const residentRepository = require('../services/residentService');

function createResidentService(req, res) {
    const { name, birth_date, residence_number, floor, block  } = req.body;
    residentRepository.create( name, birth_date, residence_number, floor, block )
}

module.exports = { createResidentService };