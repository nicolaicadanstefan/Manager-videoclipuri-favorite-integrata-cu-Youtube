const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams is important here
const videoController = require('../controllers/videoController');

if (!videoController || !videoController.create) {
    console.error('Video controller or create method is undefined!');
}

router.post('/', async (req, res, next) => {
    try {
        await videoController.create(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        await videoController.getAllByPlaylist(req, res);
    } catch (error) {
        next(error);
    }
});

router.put('/:id/status', async (req, res, next) => {
    try {
        await videoController.updateStatus(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await videoController.delete(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;