const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const Playlist = sequelize.define('Playlist', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nume: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    descriere: {
        type: DataTypes.TEXT
    },

    dataCrearii: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    categorie: {
        type: DataTypes.STRING
    },

    vizibilitate: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Playlist;