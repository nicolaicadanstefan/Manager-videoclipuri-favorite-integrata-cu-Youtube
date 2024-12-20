const express = require('express');
const router = express.Router({ mergeParams: true });
const videoController = require('../controllers/videoController');

// Rute pentru videoclipuri
// POST /api/playlists/:playlistId/videos - Adauga un video într-un playlist
router.post('/', videoController.create);

// GET /api/playlists/:playlistId/videos - Obtine toate videourile dintr-un playlist
router.get('/', videoController.getAllByPlaylist);

// PUT /api/videos/:id/status - Actualizeaza statusul unui video
router.put('/:id/status', videoController.updateStatus);

// DELETE /api/videos/:id - Sterge un video
router.delete('/:id', videoController.delete);

module.exports = router;