// Pentru a citi variabilele din .env (API / PORTUL)
const dotenv = require('dotenv');
// Încărcăm variabilele de mediu
dotenv.config();

// Importam framework-ul Express
const express = require('express');
// Permitem request-uri cross-origin (sa comunici backend-ul cu frontend-ul)
const cors = require('cors');

// Importăm rutele
const playlistRoutes = require('./routes/playlists');
const videoRoutes = require('./routes/videos');

const { sequelize, testConnection } = require('./config/db');

// Testez conexiunea și sincronizez modelele cu baza de date
sequelize.sync({ force: false }) // force: false -> nu stergem datele existente
    .then(() => {
        testConnection();
        console.log('Modele sincronizate cu baza de date');
    })
    .catch(err => {
        console.error('Eroare la sincronizarea modelelor:', err);
    });

// Creem aplicatia Express
const app = express();

// Activam CORS pentru toate rutele
app.use(cors());
// Pentru a putea procesa JSON in request-uri
app.use(express.json());

// Utilizam rutele
app.use('/api/playlists', playlistRoutes);


// Configurare port
const PORT = process.env.PORT || 3000;

// Test endpoint
// Cand cineva acceseaza ruta principala
app.get('/', (req, res) => {
    res.json({ message: 'Backend server is running!' });
});

// Gestionarea erorilor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'A apărut o eroare!',
        message: err.message 
    });
});

// Pornim serverul pe portul specificat
app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
});