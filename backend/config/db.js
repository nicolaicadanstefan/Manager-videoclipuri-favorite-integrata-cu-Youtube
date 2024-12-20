// ORM pentru baza de date ca sa folosim obiecte JavaScript in loc de SQL
const { Sequelize } = require('sequelize');
// Pentru manipularea cailor de fisiere
const path = require('path');

const sequelize = new Sequelize({
    // Folosesc SQLite ca baza de date
    dialect: 'sqlite',
    // Locatia bazei de date
    storage: path.join(__dirname, '../../database/playlists.db'),
    // Dezactivam logarea SQL
    logging: false
});

// Functia pentru testarea conexiunii
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexiunea la baza de date a fost stabilită cu succes.');
    } catch (error) {
        console.error('Nu s-a putut realiza conexiunea la baza de date:', error);
    }
};

// Exportam obiectul sequelize pentru a-l folosi in definirea modelelor
module.exports = {
    sequelize,
    testConnection
};