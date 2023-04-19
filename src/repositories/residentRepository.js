const Resident = require('../dtos/resident');

async function create(name, birth_date, residence_number, floor, block) {
    try {
        const resident = await Resident.create({
            name: name,
            birth_date: birth_date,
            residence_number: residence_number,
            floor: floor,
            block: block
        });
        
        return resident;
    } catch ( error ) {
        console.log(error)
        throw new Error('Falha ao cadastrar morador.');
    }
}

async function get(id) {
    if(id) {
        try {
            const resident = await Resident.findByPk(id);
            return resident;
        } catch (error) {
            throw new Error('Falha ao buscar morador.');
        }
    } else {
        try {
            const residents = await Resident.findAll();
            return residents;
        } catch (error) {
            console.log(error)
            throw new Error('Falha ao buscar moradores.');
        }
    }
}

async function destroy(id) {
    Resident.destroy({
        where: { id: id }
      })
      .catch(error => {
        console.log(error)
        throw new Error('Erro ao deletar morador:', error);
      });
}

async function update(id, name, birth_date, residence_number, floor, block) {
    Resident.update({
        name: name,
        birth_date: birth_date,
        residence_number: residence_number,
        floor: floor,
        block: block
      }, {
        where: { id: id }
      }).catch(error => {
        console.log(error)
        throw new Error('Erro ao atualizar morador:', error);
      });
}


module.exports = { create, get, destroy, update };