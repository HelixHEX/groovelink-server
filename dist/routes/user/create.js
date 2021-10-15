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
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { spotifyId, fName, lName, age, email, picture, city, state } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId } });
        if (!user) {
            let elias = yield User_1.default.findOne({ where: { spotifyId: 'eliwam21' }, relations: ['following', 'followers'] });
            if (elias) {
                const newUser = yield User_1.default.create({
                    spotifyId,
                    name: `${fName} ${lName}`,
                    email,
                    age,
                    picture,
                    city,
                    state,
                    followers: [elias],
                    following: [elias],
                }).save();
                if (newUser) {
                    elias.following.push(newUser);
                    elias.followers.push(newUser);
                }
                elias.save();
            }
            res.json({ success: true }).status(200);
        }
        else {
            res.json({ success: false, error: 'User exists' }).status(204);
        }
    }
    catch (e) {
        console.log(e);
        const errStr = e.toString();
        res.json({ success: false, error: 'An error has occurred' }).status(400);
    }
}));
router.post('/add-friend', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { spotifyId, userId } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId }, relations: ['following'] });
        if (user) {
            const otherUser = yield User_1.default.findOne({ where: { spotifyId: userId } });
            if (otherUser) {
                user.following.push(otherUser);
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
module.exports = router;
//# sourceMappingURL=create.js.map