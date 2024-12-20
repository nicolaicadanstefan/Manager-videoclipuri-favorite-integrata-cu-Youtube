// Dependințele necesare
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Modelul Video care va crea tabelul 'Videos' în baza de date
const Video = sequelize.define('Video', {
    // Identificator unic pentru fiecare video
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Referinta catre playlist-ul parinte
    playlistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Playlists',
            key: 'id'
        }
    },
    // Titlul videoclipului
    titlu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // URL-ul complet catre videoclipul de pe YouTube
    urlYoutube: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
            // Validam că URL-ul este într-adevar de la YouTube
            isYouTubeUrl(value) {
                if (!value.match(/^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+$/)) {
                    throw new Error('URL-ul trebuie să fie un link valid de YouTube');
                }
            }
        }
    },
    // URL către thumbnail-ul videoclipului
    thumbnail: {
        type: DataTypes.STRING
    },
    // Data și ora când a fost adăugat videoclipul
    dataAdaugarii: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    // Durata videoclipului în format string (ex: "13:37")
    durata: {
        type: DataTypes.STRING
    },
    // Flag pentru marcarea videoclipurilor vizionate
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // implicit videoclipul este nevizionat
    }
});

// Export modelul pentru a-l folosi în alte părți ale aplicației
module.exports = Video;