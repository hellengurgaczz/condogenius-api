require('dotenv').config();
const {DATABASE, USER, PASSWORD, HOST} = process.env;
const Sequelize = require('Sequelize');

const database = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql'
});

database.authenticate().then(() => {
    console.log('Conexão com banco de dados estabelecida');
  }).catch((error) => {
    console.log(error)
  });

module.exports = database;