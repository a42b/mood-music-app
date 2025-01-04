import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [mood, setMood] = useState("");
  const [playlist, setPlaylist] = useState(null);

  // Handles mood-based playlist generation
  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/mood/${mood}`);
      setPlaylist(response.data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Mood-Based Playlist Generator</h1>

      {/* Spotify Authentication Button */}
      <button
        onClick={() => (window.location.href = "http://localhost:5000/login")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Authenticate with Spotify
      </button>

      {/* Mood Selector Form */}
      <form onSubmit={handleMoodSubmit} style={{ marginTop: "20px" }}>
        <label>
          Choose a Mood:
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", fontSize: "16px" }}
          >
            <option value="">--Select a Mood--</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="calm">Calm</option>
          </select>
        </label>
        <button
          type="submit"
          disabled={!mood}
          style={{
            marginLeft: "10px",
            padding: "5px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Generate Playlist
        </button>
      </form>

      {/* Playlist Display */}
      {playlist && (
        <div style={{ marginTop: "20px" }}>
          <h2>Your Playlist</h2>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {playlist.map((track, index) => (
              <li key={index} style={{ margin: "10px 0" }}>
                <strong>{track.name}</strong> by {track.artist}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
