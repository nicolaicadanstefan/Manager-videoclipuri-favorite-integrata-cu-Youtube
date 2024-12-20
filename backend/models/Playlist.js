// Import tipurile de date din Sequelize pentru a defini structura modelului
const { DataTypes } = require('sequelize');
// Import instanța sequelize configurata anterior
const { sequelize } = require('../config/db');

// Modelul Playlist care va crea tabelul 'Playlist' în baza de date
const Playlist = sequelize.define('Playlist', {
    // Identificator unic generat automat pentru fiecare playlist
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Numele playlist-ului - camp obligatoriu care nu poate fi gol
    nume: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    // Descriere opțională a playlist-ului
    descriere: {
        type: DataTypes.TEXT
    },
    // Data creării - se completează automat cu data curentă
    dataCrearii: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    // Categoria playlist-ului (ex: Muzică, Gaming, etc.)
    categorie: {
        type: DataTypes.STRING
    },
    // Flag pentru vizibilitatea playlist-ului (public/privat)
    vizibilitate: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // implicit playlist-ul este public
    }
});

// Export modelul pentru a-l folosi în alte părți ale aplicației
module.exports = Playlist;