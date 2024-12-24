import React, { useEffect, useState } from 'react';

const Playlist = () => {
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        fetch('/api/playlist')
            .then((res) => res.json())
            .then((data) => setPlaylist(data));
    }, []);

    return (
        <div>
            <h3>Your Playlist</h3>
            <ul>
                {playlist.map((track) => (
                    <li key={track.id}>
                        {track.name} by {track.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
