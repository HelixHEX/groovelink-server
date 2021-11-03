"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
const User_1 = __importDefault(require("../../entities/User"));
router.post('/playlists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { accessToken, spotifyId } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId } });
        if (user && spotifyId.length > 0) {
            spotifyApi.setAccessToken(accessToken);
            spotifyApi.getUserPlaylists()
                .then(function (data) {
                const playlists = data.body.items;
                res.json({ success: true, playlists, highlightedsongs: user.highlightedsongs }).status(200);
            }, function (err) {
                const errMessage = err.body.error.message;
                if (errMessage === 'The access token expired')
                    res.json({ success: false, error: 'User not logged in', type: 'accessToken' }).status(400);
                else
                    res.json({ success: false, error: 'An error has occurred' }).status(400);
            });
        }
        else {
            res.json({ success: false, error: 'User not found' }).status(400);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, error: 'An error has occurred' }).status(400);
    }
}));
router.post('/playlist', (req, res) => {
    const { body } = req;
    const { accessToken, playlistId } = body;
    try {
        if (accessToken) {
            spotifyApi.setAccessToken(accessToken);
            spotifyApi.getPlaylist(playlistId)
                .then(function (data) {
                const playlist = data.body;
                res.json({ success: true, playlist }).status(200);
            }, function (err) {
                if (err.body.error.message === 'The access token expired')
                    res.json({ success: false, error: 'User not logged in', type: 'accessToken' }).status(400);
                else
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
router.post('/search-track', (req, res) => {
    const { body } = req;
    const { accessToken, name } = body;
    try {
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.searchTracks(name)
            .then(function (data) {
            res.json({ success: true, songs: data.body.tracks.items }).status(200);
        }, function (err) {
            console.error(err);
            res.json({ success: false, error: 'An error has occurred' }).status(204);
        });
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, error: 'An error has occurred' }).status(400);
    }
});
module.exports = router;
//# sourceMappingURL=get.js.map