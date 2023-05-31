require('dotenv').config();
const {DATABASE, USER, PASSWORD, HOST} = process.env;
const Sequelize = require('sequelize');

const database = new Sequelize(DATABASE, 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

database.authenticate().then(() => {
    console.log('Conexão com banco de dados estabelecida');
  }).catch((error) => {
    console.log(error)
  });

module.exports = database;