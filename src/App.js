import React, { useState } from 'react';
import MoodSelector from './components/MoodSelector';
import TrackList from './components/TrackList';
import Playlist from './components/Playlist';

const App = () => {
    const [mood, setMood] = useState(null);

    return (
        <div>
            <h1>Mood Music App</h1>
            <MoodSelector setMood={setMood} />
            {mood && <TrackList mood={mood} />}
            <Playlist />
        </div>
    );
};

export default App;
