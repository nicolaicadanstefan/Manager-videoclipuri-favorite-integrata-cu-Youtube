const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

const videoRoutes = require('./videos');

router.use('/:playlistId/videos', videoRoutes);

router.get('/', playlistController.getAll);

router.post('/', playlistController.create);

router.get('/:id', playlistController.getById);

router.put('/:id', playlistController.update);

router.delete('/:id', playlistController.delete);

module.exports = router;