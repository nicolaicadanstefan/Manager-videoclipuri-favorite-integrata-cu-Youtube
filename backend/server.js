require('dotenv').config();

console.log('Environment check:', {
    port: process.env.PORT,
    hasYoutubeKey: !!process.env.YOUTUBE_API_KEY
});

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

app.use((req, res, next) => {
    const oldJson = res.json;
    res.json = function(data) {
        if (data && data.error) {
            res.status(400);
        }
        return oldJson.call(this, data);
    };
    next();
});

const playlistRoutes = require('./routes/playlists');
app.use('/api/playlists', playlistRoutes);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established');
        
        await sequelize.sync({ force: false });
        console.log('Database models synchronized');
        
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
}

startServer();