const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const Video = sequelize.define('Video', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    playlistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Playlists',
            key: 'id'
        }
    },

    titlu: {
        type: DataTypes.STRING,
        allowNull: false
    },

    urlYoutube: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    thumbnail: {
        type: DataTypes.STRING
    },

    dataAdaugarii: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    durata: {
        type: DataTypes.STRING
    },
    durataFormatata: {
        type: DataTypes.STRING
    },

    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    }
});

module.exports = Video;