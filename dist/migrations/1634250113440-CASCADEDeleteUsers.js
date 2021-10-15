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
exports.CASCADEDeleteUsers1634250113440 = void 0;
class CASCADEDeleteUsers1634250113440 {
    constructor() {
        this.name = 'CASCADEDeleteUsers1634250113440';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_4b894e7a1fe7930283533807341"`);
            yield queryRunner.query(`ALTER TABLE "playlist_creator_friends_user" DROP CONSTRAINT "FK_8da8017d8ae1302ab6b6c57fb68"`);
            yield queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_4b894e7a1fe7930283533807341" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "playlist_creator_friends_user" ADD CONSTRAINT "FK_8da8017d8ae1302ab6b6c57fb68" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "playlist_creator_friends_user" DROP CONSTRAINT "FK_8da8017d8ae1302ab6b6c57fb68"`);
            yield queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_4b894e7a1fe7930283533807341"`);
            yield queryRunner.query(`ALTER TABLE "playlist_creator_friends_user" ADD CONSTRAINT "FK_8da8017d8ae1302ab6b6c57fb68" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_4b894e7a1fe7930283533807341" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.CASCADEDeleteUsers1634250113440 = CASCADEDeleteUsers1634250113440;
//# sourceMappingURL=1634250113440-CASCADEDeleteUsers.js.map