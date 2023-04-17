const Sequelize = require('sequelize');
const database = require('../../../db');
 
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
 
module.exports = Resident;