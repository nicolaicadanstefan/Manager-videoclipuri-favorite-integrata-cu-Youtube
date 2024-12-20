// Import modelele necesare pentru operatiile cu baza de date
const { Playlist, Video } = require('../models');

// Controllerul pentru gestionarea playlist-urilor
const playlistController = {
    // Creare playlist nou
    async create(req, res) {
        try {
            const playlist = await Playlist.create(req.body);
            res.status(201).json(playlist);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Obtinere toate playlist-urile
    async getAll(req, res) {
        try {
            const playlists = await Playlist.findAll({
                include: Video // Include si videoclipurile asociate
            });
            res.json(playlists);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtinere playlist după ID
    async getById(req, res) {
        try {
            const playlist = await Playlist.findByPk(req.params.id, {
                include: Video
            });
            if (!playlist) {
                return res.status(404).json({ message: 'Playlist negăsit' });
            }
            res.json(playlist);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizare playlist
    async update(req, res) {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            if (!playlist) {
                return res.status(404).json({ message: 'Playlist negăsit' });
            }
            await playlist.update(req.body);
            res.json(playlist);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Stergere playlist
    async delete(req, res) {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            if (!playlist) {
                return res.status(404).json({ message: 'Playlist negăsit' });
            }
            await playlist.destroy();
            res.json({ message: 'Playlist șters cu succes' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = playlistController;