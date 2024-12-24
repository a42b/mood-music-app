import React from 'react';

const MoodSelector = ({ setMood }) => {
    const moods = ["happy", "sad", "calm"];
    return (
        <div>
            <h3>Select Mood</h3>
            {moods.map((mood) => (
                <button key={mood} onClick={() => setMood(mood)}>
                    {mood}
                </button>
            ))}
        </div>
    );
};

export default MoodSelector;
