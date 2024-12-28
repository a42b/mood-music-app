const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: '61919dafa042476c900c82e04b740b27',
    clientSecret: '932ff463edc441458dcd93230bd788df',
    redirectUri: 'http://localhost:3000/callback'
});

const getAccessToken = async () => {
    try {
        const data = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(data.body['access_token']);
        console.log('Access token obtained');
    } catch (err) {
        console.error('Error getting access token:', err);
    }
};

getAccessToken();

module.exports = spotifyApi;
