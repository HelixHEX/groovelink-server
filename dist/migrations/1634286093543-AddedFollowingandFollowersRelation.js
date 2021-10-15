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
exports.AddedFollowingandFollowersRelation1634286093543 = void 0;
class AddedFollowingandFollowersRelation1634286093543 {
    constructor() {
        this.name = 'AddedFollowingandFollowersRelation1634286093543';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user_followers_user" ("userUuid_1" uuid NOT NULL, "userUuid_2" uuid NOT NULL, CONSTRAINT "PK_928504bbd87fcd2e641de73f80d" PRIMARY KEY ("userUuid_1", "userUuid_2"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_35e91358e4b025ec855f335830" ON "user_followers_user" ("userUuid_1") `);
            yield queryRunner.query(`CREATE INDEX "IDX_ef124b74a78b655572b94c6c30" ON "user_followers_user" ("userUuid_2") `);
            yield queryRunner.query(`CREATE TABLE "playlist_creator_followers_user" ("playlistUuid" uuid NOT NULL, "playlistCreatorUuid" uuid NOT NULL, "userUuid" uuid NOT NULL, CONSTRAINT "PK_1929869096dcc828f15698f72fe" PRIMARY KEY ("playlistUuid", "playlistCreatorUuid", "userUuid"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_70f91aee713ebf2d4d5a24248b" ON "playlist_creator_followers_user" ("playlistUuid", "playlistCreatorUuid") `);
            yield queryRunner.query(`CREATE INDEX "IDX_6893a0ac2ba59025275f6e9f23" ON "playlist_creator_followers_user" ("userUuid") `);
            yield queryRunner.query(`ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_35e91358e4b025ec855f3358301" FOREIGN KEY ("userUuid_1") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_ef124b74a78b655572b94c6c304" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "playlist_creator_followers_user" ADD CONSTRAINT "FK_70f91aee713ebf2d4d5a24248b5" FOREIGN KEY ("playlistUuid", "playlistCreatorUuid") REFERENCES "playlist"("uuid","creatorUuid") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "playlist_creator_followers_user" ADD CONSTRAINT "FK_6893a0ac2ba59025275f6e9f239" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "playlist_creator_followers_user" DROP CONSTRAINT "FK_6893a0ac2ba59025275f6e9f239"`);
            yield queryRunner.query(`ALTER TABLE "playlist_creator_followers_user" DROP CONSTRAINT "FK_70f91aee713ebf2d4d5a24248b5"`);
            yield queryRunner.query(`ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_ef124b74a78b655572b94c6c304"`);
            yield queryRunner.query(`ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_35e91358e4b025ec855f3358301"`);
            yield queryRunner.query(`DROP INDEX "IDX_6893a0ac2ba59025275f6e9f23"`);
            yield queryRunner.query(`DROP INDEX "IDX_70f91aee713ebf2d4d5a24248b"`);
            yield queryRunner.query(`DROP TABLE "playlist_creator_followers_user"`);
            yield queryRunner.query(`DROP INDEX "IDX_ef124b74a78b655572b94c6c30"`);
            yield queryRunner.query(`DROP INDEX "IDX_35e91358e4b025ec855f335830"`);
            yield queryRunner.query(`DROP TABLE "user_followers_user"`);
        });
    }
}
exports.AddedFollowingandFollowersRelation1634286093543 = AddedFollowingandFollowersRelation1634286093543;
//# sourceMappingURL=1634286093543-AddedFollowingandFollowersRelation.js.map