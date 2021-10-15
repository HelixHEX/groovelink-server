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
router.post('/remove-song-from-profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { index, spotifyId, songId } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId } });
        if (user) {
            if (songId) {
                console.log(spotifyId);
                user.highlightedsongs = user.highlightedsongs.filter(song => song.spotifyId !== songId);
                user.save();
                console.log(user.highlightedsongs);
                res.json({ success: true }).status(200);
            }
            else if (user.highlightedsongs.length === 1) {
                user.highlightedsongs = [];
                user.save();
                res.json({ success: true }).status(200);
            }
            else {
                console.log('Invalid id', songId);
                res.json({ success: false, error: 'An error has occurred' }).status(400);
            }
        }
        else {
            res.json({ success: false, error: 'User not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, error: 'User not found' }).status(404);
    }
}));
router.post('/add-friend', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { spotifyId, userId } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId }, relations: ['following', 'followers'] });
        if (user) {
            if (!user.following.find(following => following.spotifyId === userId)) {
                if (user.following.find(following => following.spotifyId === userId)) {
                    res.json({ success: false, error: 'Already following' }).status(400);
                }
                else {
                    const otherUser = yield User_1.default.findOne({ where: { spotifyId: userId }, relations: ['following', 'followers'] });
                    if (otherUser) {
                        if (otherUser.following.find(oUser => oUser.spotifyId === user.spotifyId)) {
                            console.log('already following');
                            user.following.push(otherUser);
                            user.followers.push(otherUser);
                            user.save();
                            res.json({ success: true }).status(200);
                        }
                        else {
                            user.following.push(otherUser);
                            user.save();
                            res.json({ success: true }).status(200);
                        }
                    }
                    else {
                        res.json({ success: false, error: "Other user not found" }).status(404);
                    }
                }
            }
            else {
                res.json({ success: false, error: 'Already following' }).status(204);
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
router.post('/skip-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { spotifyId, userId } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId }, relations: ['hasSkipped'] });
        if (user) {
            const otheruser = yield User_1.default.findOne({ where: { spotifyId: userId }, relations: ['beenSkippedBy'] });
            if (otheruser) {
                if (!user.hasSkipped.find(sUser => sUser.spotifyId === userId)) {
                    user.hasSkipped.push(otheruser);
                    user.save();
                    res.json({ success: true }).status(200);
                }
                else {
                    res.json({ success: false, error: 'User already skipped' }).status(400);
                }
            }
            else {
                res.json({ success: false, error: "Other user not found" }).status(404);
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
router.post('/update-info', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { fName, lName, email, age, city, state, spotifyId } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId } });
        if (user) {
            user.name = `${fName} ${lName}`;
            user.email = email;
            user.age = age;
            user.city = city;
            user.state = state;
            user.save();
            res.json({ success: true });
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
router.post('/remove-friend', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { spotifyId, userId } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId }, relations: ['following', 'followers', 'hasSkipped', 'beenSkippedBy'] });
        if (user) {
            const otherUser = yield User_1.default.findOne({ where: { spotifyId: userId }, relations: ['following', 'followers', 'hasSkipped', 'beenSkippedBy'] });
            if (otherUser) {
                user.following = user.following.filter(following => following.uuid !== otherUser.uuid);
                user.followers = user.followers.filter(follower => follower.uuid !== otherUser.uuid);
                user.hasSkipped.push(otherUser);
                user.save();
                console.log(user);
                res.json({ success: true }).status(200);
            }
            else {
                res.json({ success: false, error: 'Other user not found' }).status(400);
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