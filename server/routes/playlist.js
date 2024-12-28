const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

router.get('/', async (req, res) => {
    try {
        const playlists = await Playlist.find().populate('tracks');
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, trackIds } = req.body;

        const newPlaylist = new Playlist({
            name,
            tracks: trackIds 
        });

        const savedPlaylist = await newPlaylist.save();
        res.json(savedPlaylist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
