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
const checkAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let message;
    try {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(req.body.accessToken);
        yield spotifyApi.getMe()
            .then(function () {
            message = 'User logged in';
        }, function (err) {
            if (err.body.error.message === 'The access token expired')
                message = 'User not logged in';
            else
                message = err.body.error.message;
        });
        return message;
    }
    catch (e) {
        message = 'An error has occurred';
        return message;
    }
});
exports.checkAccess = checkAccess;
//# sourceMappingURL=middleware.js.map