const Resident = require('../dtos/resident');

async function create(name, birth_date, residence_number, floor, block) {
    console.log(name, birth_date, residence_number, floor, block)
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
        throw new Error('Falha ao cadastrar morador.')
    }
}

async function get(id) {
  console.log(id)
    if(id) {
        try {
            const resident = await Resident.findByPk(id);
            console.log(resident)
            return resident;
        } catch (error) {
            throw new Error('Falha ao buscar morador.')
        }
    } else {
        try {
            const residents = await Resident.findAll();
            return residents;
        } catch (error) {
            throw new Error('Falha ao buscar moradores.')
        }
    }
}

async function destroy(id) {
    try {
        const result = await Resident.destroy({
            where: { id: id }
        })

        if (result === 1) {
            return {
              message: 'Morador deletado com sucesso.'
            }
          } else {
            throw new Error('Morador não encontrado.')
        }
    } catch (error) {
        throw new Error('Falha ao deletar morador.')
    
    }
}

async function update(id, name, birth_date, residence_number, floor, block) {
    try {   
        const [result] = await Resident.update(
          {
            name: name,
            birth_date: birth_date,
            residence_number: residence_number,
            floor: floor,
            block: block
          },
          {
            where: { id: id }
          }
        );
    
        if (result === 1) {
          return {
            message: 'Morador atualizado com sucesso.'
          };
        } else {
          throw new Error('Morador não encontrado.');
        }
      } catch (error) {
        throw new Error('Falha ao atualizar morador: ', error);
      }
}


module.exports = { create, get, destroy, update };