const Condominium = require('../dtos/condominium');

async function create(name, address) {
    try {
        const condominium = await Condominium.create({
            name,
            address
        });

        return condominium;
    } catch ( error ) {
        throw new Error('Falha ao cadastrar condomínio')
    }
}

module.exports = { create };