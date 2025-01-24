const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

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
    categorie: {
        type: DataTypes.STRING
    },
    vizibilitate: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

const Video = sequelize.define('Video', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    playlistId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titlu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    urlYoutube: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING
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

Playlist.hasMany(Video, {
    foreignKey: 'playlistId',
    onDelete: 'CASCADE'
});

Video.belongsTo(Playlist, {
    foreignKey: 'playlistId'
});

module.exports = {
    sequelize,
    Playlist,
    Video
};