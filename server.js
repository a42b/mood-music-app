const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./server/routes/auth');
const { router: moodPlaylistRoutes } = require('./server/routes/mood'); // Destructure the router


const app = express();

app.use(cors());
app.use(express.json());

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodPlaylistRoutes);

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

// Export the app and mongoose for testing
module.exports = { app, mongoose };

// Start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}
