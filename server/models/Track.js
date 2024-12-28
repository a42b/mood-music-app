const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    spotifyId: { type: String, required: true },
    name: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    preview_url: { type: String },
    mood: { type: String } 
});

const Track = mongoose.model('Track', trackSchema);
module.exports = Track;
