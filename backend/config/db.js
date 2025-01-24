const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database/playlists.db'),
    logging: console.log,
    define: {
        timestamps: true,
        underscored: true
    },
    retry: {
        max: 3
    }
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexiunea la baza de date a fost stabilită cu succes.');
    } catch (error) {
        console.error('Eroare detaliată:', error);
        throw error; // Propagăm eroarea pentru a o vedea în consolă
    }
};

module.exports = {
    sequelize,
    testConnection
};