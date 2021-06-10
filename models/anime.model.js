const{Sequelize, DataTypes} = require('sequelize');
const Model = Sequelize.Model;
const{sequelize} = require('./../config/db');

class Anime extends Model {};

Anime.init({
    //agregar columna name
    nombre: {
        //varchar
        type: DataTypes.STRING,
        //non null
        allowNull: false,
    },
    genero: {
        //varchar
        type: DataTypes.STRING,
        //non null
        allowNull: false,
    },

}, {
    //conexion
    sequelize,
    //renombrar tabla a minusculas
    modelName: 'anime',
});

module.exports = {Anime};