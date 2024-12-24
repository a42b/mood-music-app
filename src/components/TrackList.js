import React, { useEffect, useState } from 'react';

const TrackList = ({ mood }) => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        if (mood) {
            fetch(`/api/mood/${mood}`)
                .then((res) => res.json())
                .then((data) => setTracks(data));
        }
    }, [mood]);

    return (
        <div>
            <h3>Tracks for "{mood}"</h3>
            <ul>
                {tracks.map((track) => (
                    <li key={track.id}>
                        {track.name} by {track.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrackList;
