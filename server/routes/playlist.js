const express = require('express');
const router = express.Router();

const playlist = [
    { id: 1, name: "Happy Song", artist: "Artist A" },
    { id: 2, name: "Calm Symphony", artist: "Artist C" },
];

router.get('/', (req, res) => {
    res.json(playlist);
});

module.exports = router;
