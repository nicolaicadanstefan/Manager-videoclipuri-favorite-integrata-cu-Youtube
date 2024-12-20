// Import modelului Video
const { Video } = require('../models');
const youtubeService = require('../services/youtubeService');

const videoController = {
    // Adaugare video nou într-un playlist
    async create(req, res) {
        try {
            const videoId = youtubeService.extractVideoId(req.body.urlYoutube);
            if (!videoId) {
                return res.status(400).json({ error: 'URL YouTube invalid' });
            }
    
            // Obținem detaliile video de la YouTube
            const videoDetails = await youtubeService.getVideoDetails(videoId);
    
            // Creăm videoclipul în baza noastră de date cu informațiile de la YouTube
            const video = await Video.create({
                ...req.body,
                ...videoDetails,
                playlistId: req.params.playlistId
            });
    
            res.status(201).json(video);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Obtinere toate videourile dintr-un playlist
    async getAllByPlaylist(req, res) {
        try {
            const videos = await Video.findAll({
                where: { playlistId: req.params.playlistId }
            });
            res.json(videos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizare status video (vizionat/nevizionat)
    async updateStatus(req, res) {
        try {
            const video = await Video.findByPk(req.params.id);
            if (!video) {
                return res.status(404).json({ message: 'Video negăsit' });
            }
            await video.update({ status: req.body.status });
            res.json(video);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Stergere video
    async delete(req, res) {
        try {
            const video = await Video.findByPk(req.params.id);
            if (!video) {
                return res.status(404).json({ message: 'Video negăsit' });
            }
            await video.destroy();
            res.json({ message: 'Video șters cu succes' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = videoController;