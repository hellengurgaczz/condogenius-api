const Condominium = require('../dtos/condominium');

async function create(name, address) {
    try {
        const condominium = await Condominium.create({
            name,
            address
        });

        return res.status(200).send(condominium)
    } catch ( error ) {
        return res.status(500).send(error)
    }
}

module.exports = { create };