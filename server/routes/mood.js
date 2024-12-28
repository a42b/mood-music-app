const express = require('express');
const router = express.Router();
const spotifyApi = require('../spotify');

router.get('/:mood', async (req, res) => {
    const mood = req.params.mood;

    try {
        const data = await spotifyApi.searchTracks(`mood:${mood}`, { limit: 10 });
        const tracks = data.body.tracks.items;

        const trackFeatures = await Promise.all(
            tracks.map((track) => spotifyApi.getAudioFeaturesForTrack(track.id))
        );

        const classifiedTracks = tracks.map((track, index) => {
            const mood = classifyMood(trackFeatures[index].body);
            return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                preview_url: track.preview_url,
                mood,
            };
        });

        const filteredTracks = classifiedTracks.filter((track) => track.mood === mood);

        res.json(filteredTracks);
    } catch (err) {
        console.error('Error fetching tracks:', err); 
        res.status(500).json({ error: 'Failed to fetch tracks' });
    }
});


function classifyMood(features) {
    const { valence, energy } = features;

    if (valence > 0.6 && energy > 0.5) {
        return 'happy';
    } else if (valence <= 0.4 && energy <= 0.5) {
        return 'sad';
    } else {
        return 'calm';
    }
}

module.exports = router;
module.exports = {
    classifyMood, 
};