const Sequelize = require('sequelize');
const database = require('../database/db');
 
const Resident = database.define('residents', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,    
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birth_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    residence_number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    floor: {
        type: Sequelize.INTEGER,
    },
    block: {
        type: Sequelize.STRING
    }
})

// cria a tabela no banco de dados
Resident.sync()
    .then(() => {
        console.log('Tabela residents criada com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao criar tabela residents:', error);
    });
 
module.exports = Resident;