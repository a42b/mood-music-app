import React, { useEffect, useState } from 'react';

const TrackList = ({ mood }) => {
    const [tracks, setTracks] = useState([]);
    const [trackMoods, setTrackMoods] = useState({});

    useEffect(() => {
        if (mood) {
            fetch(`/api/mood/${mood}`)
                .then((res) => res.json())
                .then((data) => {
                    setTracks(data);

                    data.forEach((track) => {
                        fetch(`/api/mood/audio-features/${track.id}`)
                            .then((res) => res.json())
                            .then((features) => {
                                setTrackMoods((prev) => ({
                                    ...prev,
                                    [track.id]: features.mood
                                }));
                            });
                    });
                })
                .catch((err) => console.error('Error fetching tracks:', err));
        }
    }, [mood]);

    return (
        <div>
            <h3>Tracks for Mood: "{mood}"</h3>
            <ul>
                {tracks.map((track) => (
                    <li key={track.id}>
                        {track.name} by {track.artist} — Mood: {trackMoods[track.id] || 'Loading...'}
                        <audio controls src={track.preview_url}></audio>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrackList;
