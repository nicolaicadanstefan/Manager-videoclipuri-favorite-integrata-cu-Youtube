const { Video } = require('../models');
console.log('Video model loaded:', !!Video);
const youtubeService = require('../services/youtubeService');

const videoController = {
    async create(req, res) {
        try {
            console.log('Starting video creation, body:', req.body);
            console.log('Playlist ID:', req.params.playlistId);
    
            const videoId = youtubeService.extractVideoId(req.body.urlYoutube);
            console.log('Extracted video ID:', videoId);
    
            if (!videoId) {
                return res.status(400).json({ error: 'URL YouTube invalid' });
            }
    
            try {
                const videoDetails = await youtubeService.getVideoDetails(videoId);
                console.log('Video details retrieved:', videoDetails);
    
                const video = await Video.create({
                    ...videoDetails,
                    urlYoutube: req.body.urlYoutube,
                    playlistId: req.params.playlistId
                });
    
                console.log('Video created successfully:', video);
                return res.status(201).json(video);
            } catch (ytError) {
                console.error('YouTube API error:', ytError);
                return res.status(400).json({ error: ytError.message });
            }
        } catch (error) {
            console.error('Video creation error:', error);
            return res.status(400).json({ error: error.message });
        }
    },

    async getAllByPlaylist(req, res) {
        try {
            const videos = await Video.findAll({
                where: { playlistId: req.params.playlistId }
            });
            return res.json(videos);
        } catch (error) {
            console.error('Error getting videos:', error);
            return res.status(500).json({ error: error.message });
        }
    },

    async updateStatus(req, res) {
        try {
            const video = await Video.findByPk(req.params.id);
            if (!video) {
                return res.status(404).json({ error: 'Video negăsit' });
            }
            await video.update({ status: req.body.status });
            return res.json(video);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const video = await Video.findByPk(req.params.id);
            if (!video) {
                return res.status(404).json({ error: 'Video negăsit' });
            }
            await video.destroy();
            return res.json({ message: 'Video șters cu succes' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = videoController;