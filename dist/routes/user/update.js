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
const User_1 = __importDefault(require("../../entities/User"));
router.post('/add-friend', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { spotifyId, otheruserId } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId }, relations: ['friends'] });
        if (user) {
            const friendUser = yield User_1.default.findOne({ where: { spotifyId: otheruserId }, relations: ['friends'] });
            if (friendUser) {
                user.friends.push(friendUser);
                user.save();
                friendUser.friends.push(user);
                friendUser.save();
                console.log({ user, friendUser });
                res.json({ success: true }).status(200);
            }
            else {
                res.json({ success: false, error: 'Other user not found' }).status(404);
            }
        }
        else {
            res.json({ success: false, error: 'User not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, error: e }).status(400);
    }
}));
router.post('/add-song-to-profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { songId, accessToken, spotifyId, name, artists } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId } });
        if (user) {
            console.log(user.highlightedsongs);
            if (user.highlightedsongs.length < 3) {
                user.highlightedsongs.push({
                    name,
                    spotifyId: songId,
                    artists
                });
                user.save();
                res.json({ success: true }).status(200);
            }
            else {
                res.json({ success: false, error: 'Maximum number of songs reached' }).status(204);
            }
        }
        else {
            res.json({ success: false, error: 'User not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, error: 'An error has occurred' }).status(400);
    }
}));
module.exports = router;
//# sourceMappingURL=update.js.map