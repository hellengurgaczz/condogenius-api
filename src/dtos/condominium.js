const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/db');
 
const Condominium = database.define('comdominium', {
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
    address: {
        type: DataTypes.JSON,
        allowNull: false
    }
})

// cria a tabela no banco de dados
// Condominium.sync()
//     .then(() => {
//         console.log('Tabela comdominium criada com sucesso!');
//     })
//     .catch((error) => {
//         console.error('Erro ao criar tabela comdominium:', error);
//     });
 
module.exports = Condominium;