import express from 'express';

const router = express.Router()

const SpotifyWebApi = require('spotify-web-api-node');

// const spotifyApi = new SpotifyWebApi({
//     clientId: '7a93fbe7b2d744ceb6821d128ecb707c',
//     clientSecret: '107bbaed25814cb9bb55bedd66cd2f54',
//     // redirectUri: 'http://www.example.com/callback'
// });
const spotifyApi = new SpotifyWebApi()
import User from '../../entities/User'

router.post('/playlists', async (req, res) => {
    const { body } = req;
    const { accessToken, spotifyId } = body;
    try {
        const user = await User.findOne({ where: { spotifyId } });

        if (user && spotifyId.length > 0) {
            spotifyApi.setAccessToken(accessToken)
            spotifyApi.getUserPlaylists()
                .then(function (data: any) {
                    const playlists = data.body.items
                    res.json({ success: true, playlists, highlightedsongs: user.highlightedsongs }).status(200)
                }, function (err: any) {
                    const errMessage = err.body.error.message
                    if (errMessage === 'The access token expired') res.json({ success: false, error: 'User not logged in', type: 'accessToken' }).status(400)
                    else res.json({ success: false, error: 'An error has occurred' }).status(400)
                });
        } else {
            res.json({ success: false, error: 'User not found' }).status(400)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})


router.post('/playlist', (req, res) => {
    const { body } = req;
    const { accessToken, playlistId } = body;
    console.log(accessToken)
    try {
        if (accessToken) {
            spotifyApi.setAccessToken(accessToken)

            spotifyApi.getPlaylist(playlistId)
                .then(function (data: any) {
                    const playlist = data.body
                    res.json({ success: true, playlist }).status(200)
                }, function (err: any) {
                    // const errMessage = err.body.error.message
                    if (err.body.error.message === 'The access token expired') res.json({ success: false, error: 'User not logged in', type: 'accessToken' }).status(400)
                    else res.json({ success: false, error: 'An error has occurred' }).status(400)
                });
        } else
            res.json({ success: false, error: 'Invalid Access' })
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})


router.post('/search-track', (req, res) => {
    const { body } = req;
    const { accessToken, name } = body;
    try {
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.searchTracks(name)
            .then(function (data:any) {
                console.log(`Search by ${name}`, data.body.tracks.items);
                res.json({success: true, songs: data.body.tracks.items}).status(200)
            }, function (err:any) {
                console.error(err);
                res.json({success: false, error: 'An error has occurred'}).status(204)
            });
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})

module.exports = router