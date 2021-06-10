const { Sequelize, DataTypes } = require('sequelize').Sequelize;

const Model = Sequelize.Model;

//database, username, password
const sequelize = new Sequelize('animes', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize
    .authenticate()

    //cuando funcione
    .then(() => {
        console, console.log('MySQL connection succeful');
    })

    //cuando no funcione
    .catch((err) => {
        console.error('MySQL connection error', err)
    });

    sequelize.sync({force: true});

module.exports = {sequelize};