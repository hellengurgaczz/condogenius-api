const Resident = require('../dtos/resident');

async function create(name, birth_date, residence_number, floor, block) {
    try {
        const resident = await Resident.create({
            name,
            birth_date,
            residence_number,
            floor,
            block
        });

        return resident;
    } catch ( error ) {
        log.error(error);
        return error
    }
}

module.exports = { create };