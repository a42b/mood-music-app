const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: '61919dafa042476c900c82e04b740b27',
    clientSecret: '932ff463edc441458dcd93230bd788df',
    redirectUri: 'http://localhost:5000/callback',
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

const spotifyRoutes = (app) => {
    app.get('/login', (req, res) => {
        const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public']; 
        const authUrl = spotifyApi.createAuthorizeURL(scopes); 
        res.redirect(authUrl);
    });
    

    app.get('/callback', async (req, res) => {
        const code = req.query.code || null;
        try {
            const data = await spotifyApi.authorizationCodeGrant(code);
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
            res.redirect('/');
        } catch (error) {
            console.error('Error during authentication:', error);
            res.send('Authentication failed');
        }
    });
};

getAccessToken();

module.exports = spotifyRoutes;
