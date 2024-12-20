const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
// Adăugăm importul pentru rutele video
const videoRoutes = require('./videos');

// Rute pentru playlist-uri
// Adăugăm rutele pentru videoclipuri ca rute încastrate
router.use('/:playlistId/videos', videoRoutes);

// GET /api/playlists - Obtine toate playlist-urile
router.get('/', playlistController.getAll);

// POST /api/playlists - Creează un playlist nou
router.post('/', playlistController.create);

// GET /api/playlists/:id - Obține un playlist specific după ID
router.get('/:id', playlistController.getById);

// PUT /api/playlists/:id - Actualizează un playlist
router.put('/:id', playlistController.update);

// DELETE /api/playlists/:id - Sterge un playlist
router.delete('/:id', playlistController.delete);

module.exports = router;