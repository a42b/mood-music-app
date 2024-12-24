const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const moodRoutes = require('./server/routes/mood');
const playlistRoutes = require('./server/routes/playlist');

app.use('/api/mood', moodRoutes);
app.use('/api/playlist', playlistRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
