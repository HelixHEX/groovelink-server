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
const User_1 = __importDefault(require("../../entities/User"));
const stream_chat_1 = require("stream-chat");
const router = express_1.default.Router();
const serverClient = stream_chat_1.StreamChat.getInstance(process.env.GET_STREAM_KEY, process.env.GET_STREAM_SECRET);
router.post('/chat-token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = body;
    try {
        const token = serverClient.createToken(id);
        if (token) {
            res.json({ success: true, token }).status(200);
        }
        else {
            res.json({ success: false, error: 'Unable to create token' }).status(400);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, error: 'An error has occurred' }).status(400);
    }
}));
router.post('/import-users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield User_1.default.find();
        let members = [];
        for (var i = 0; i < users.length; i++) {
            members.push({
                id: users[i].uuid,
                name: users[i].name,
                picture: users[i].picture,
                email: users[i].email,
                spotifyId: users[i].spotifyId
            });
        }
        yield serverClient.upsertUsers(members);
        res.json({ success: true, message: 'Users created' }).status(200);
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, error: 'An error has occurred' }).status(400);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map