const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    redirectUri: 'http://localhost:5000/api/auth/callback',
});
router.get('/login', (req, res) => {
    const scopes = ['user-library-read', 'playlist-modify-public', 'playlist-modify-private'];
    const authUrl = spotifyApi.createAuthorizeURL(scopes);
    res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    try {
        const data = await spotifyApi.authorizationCodeGrant(code);
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        res.redirect('http://localhost:3000'); 
    } catch (err) {
        console.error('Error during authentication:', err);
        res.redirect('/error');
    }
});

module.exports = router;
