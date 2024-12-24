const express = require('express');
const router = express.Router();

// Статичні дані для треків
const tracks = [
    { id: 1, name: "Happy Song", artist: "Artist A", mood: "happy" },
    { id: 2, name: "Sad Ballad", artist: "Artist B", mood: "sad" },
    { id: 3, name: "Calm Symphony", artist: "Artist C", mood: "calm" },
];

// Endpoint для отримання треків на основі настрою
router.get('/:mood', (req, res) => {
    const mood = req.params.mood;
    const filteredTracks = tracks.filter(track => track.mood === mood);
    res.json(filteredTracks);
});

module.exports = router;
