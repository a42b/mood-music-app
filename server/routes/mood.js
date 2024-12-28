const express = require('express');
const router = express.Router();
const spotifyApi = require('../spotify');

// Endpoint to classify tracks by mood
router.get('/:mood', async (req, res) => {
    const mood = req.params.mood;

    try {
        // Fetch tracks from Spotify
        const data = await spotifyApi.searchTracks(`mood:${mood}`, { limit: 10 });
        const tracks = data.body.tracks.items;

        // Fetch audio features for each track
        const trackFeatures = await Promise.all(
            tracks.map((track) => spotifyApi.getAudioFeaturesForTrack(track.id))
        );

        // Classify tracks by mood
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

        // Filter tracks by the requested mood
        const filteredTracks = classifiedTracks.filter((track) => track.mood === mood);

        res.json(filteredTracks);
    } catch (err) {
        console.error('Error fetching tracks:', err); // Log the actual error
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
