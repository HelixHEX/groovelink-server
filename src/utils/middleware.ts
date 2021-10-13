import express from 'express'

const SpotifyWebApi = require('spotify-web-api-node');

export const checkAccess = async (req:express.Request) => {
    try {
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(req.body.accessToken)
        spotifyApi.getMe()
            .then(function (data:any) {
                return (req:express.Request, res:express.Response, next:express.NextFunction) => {
                    req.user = data.body
                }
            }, function (err:any) {
                console.log('Something went wrong!', err);
            });

    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}