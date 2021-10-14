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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAccess = void 0;
const SpotifyWebApi = require('spotify-web-api-node');
const checkAccess = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(req.body.accessToken);
        spotifyApi.getMe()
            .then(function (data) {
            return (req, res, next) => {
                req.user = data.body;
            };
        }, function (err) {
            return (_, res) => {
                console.log(err.body.error.message);
                res.json({ success: false, error: err.body.error.message, type: 'accessToken' });
            };
        });
    }
    catch (e) {
        throw new Error(e.body.error.message);
    }
});
exports.checkAccess = checkAccess;
//# sourceMappingURL=middleware.js.map