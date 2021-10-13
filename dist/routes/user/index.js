"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const update = require('./update');
const deleteM = require('./delete');
const create = require('./create');
const get = require('./get');
const router = express_1.default.Router();
router.use(update);
router.use(create);
router.use(get);
module.exports = router;
//# sourceMappingURL=index.js.map