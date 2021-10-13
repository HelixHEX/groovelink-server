"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
router.post('/playlists', (req, res) => {
    const { body } = req;
    const { accessToken } = body;
    console.log(accessToken);
    try {
        if (accessToken) {
            spotifyApi.setAccessToken(accessToken);
            spotifyApi.getUserPlaylists()
                .then(function (data) {
                const playlists = data.body.items;
                console.log(playlists);
                res.json({ success: true, playlists }).status(200);
            }, function (err) {
                console.log(err);
                res.json({ success: false, error: 'An error has occurred' }).status(400);
            });
        }
        else
            res.json({ success: false, error: 'Invalid Access' });
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, error: 'An error has occurred' }).status(400);
    }
});
module.exports = router;
//# sourceMappingURL=get.js.map