import express from 'express'

const SpotifyWebApi = require('spotify-web-api-node');

export const checkAccess = async (req: express.Request, res: express.Response) => {
    let message;
    try {
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(req.body.accessToken)
        await spotifyApi.getMe()
            .then(function () {
                message = 'User logged in'
            }, function (err: any) {
                if (err.body.error.message === 'The access token expired')
                    message = 'User not logged in'
                else message = err.body.error.message
            });
        return message
    } catch (e) {
        // console.log(e)
        message = 'An error has occurred'
        return message
    }
}