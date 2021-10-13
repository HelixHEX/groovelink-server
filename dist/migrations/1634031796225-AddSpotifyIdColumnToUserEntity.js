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
exports.AddSpotifyIdColumnToUserEntity1634031796225 = void 0;
class AddSpotifyIdColumnToUserEntity1634031796225 {
    constructor() {
        this.name = 'AddSpotifyIdColumnToUserEntity1634031796225';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" ADD "spotifyId" character varying NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "spotifyId"`);
        });
    }
}
exports.AddSpotifyIdColumnToUserEntity1634031796225 = AddSpotifyIdColumnToUserEntity1634031796225;
//# sourceMappingURL=1634031796225-AddSpotifyIdColumnToUserEntity.js.map