const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const spotifyRoutes = require('./server/spotify'); // Import spotify routes

const app = express();

app.use(cors());
app.use(express.json());

// Add Spotify authentication routes
spotifyRoutes(app);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/moodmusic', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

const path = require('path');

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
