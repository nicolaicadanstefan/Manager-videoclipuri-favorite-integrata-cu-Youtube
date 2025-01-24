const { Playlist, Video } = require('../models');

const playlistController = {
    async create(req, res) {
        try {
            console.log('Creare playlist nou:', req.body);
            const playlist = await Playlist.create(req.body);
            res.status(201).json(playlist);
        } catch (error) {
            console.error('Eroare la creare playlist:', error);
            res.status(400).json({ error: error.message });
        }
    },

    async getAll(req, res) {
        try {
            console.log('Obținere toate playlist-urile');
            const playlists = await Playlist.findAll({
                include: Video
            });
            res.json(playlists || []);
        } catch (error) {
            console.error('Eroare la obținere playlist-uri:', error);
            res.status(500).json({ error: error.message });
        }
    },

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