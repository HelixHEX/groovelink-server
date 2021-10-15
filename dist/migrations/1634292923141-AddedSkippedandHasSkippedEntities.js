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
exports.AddedSkippedandHasSkippedEntities1634292923141 = void 0;
class AddedSkippedandHasSkippedEntities1634292923141 {
    constructor() {
        this.name = 'AddedSkippedandHasSkippedEntities1634292923141';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user_has_skipped_user" ("userUuid_1" uuid NOT NULL, "userUuid_2" uuid NOT NULL, CONSTRAINT "PK_78cfd6ba468d74a4248872e6b4f" PRIMARY KEY ("userUuid_1", "userUuid_2"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_beee5b1ad19a4ea6f668070140" ON "user_has_skipped_user" ("userUuid_1") `);
            yield queryRunner.query(`CREATE INDEX "IDX_7822d0a388c275f74f59f326e1" ON "user_has_skipped_user" ("userUuid_2") `);
            yield queryRunner.query(`CREATE TABLE "playlist_creator_has_skipped_user" ("playlistUuid" uuid NOT NULL, "playlistCreatorUuid" uuid NOT NULL, "userUuid" uuid NOT NULL, CONSTRAINT "PK_ba6d232688eb926c26b019760c1" PRIMARY KEY ("playlistUuid", "playlistCreatorUuid", "userUuid"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_4c5d66c6983dc27653b27d9518" ON "playlist_creator_has_skipped_user" ("playlistUuid", "playlistCreatorUuid") `);
            yield queryRunner.query(`CREATE INDEX "IDX_6856daa84cc2e75a213ee8b405" ON "playlist_creator_has_skipped_user" ("userUuid") `);
            yield queryRunner.query(`ALTER TABLE "user_has_skipped_user" ADD CONSTRAINT "FK_beee5b1ad19a4ea6f6680701406" FOREIGN KEY ("userUuid_1") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "user_has_skipped_user" ADD CONSTRAINT "FK_7822d0a388c275f74f59f326e1c" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "playlist_creator_has_skipped_user" ADD CONSTRAINT "FK_4c5d66c6983dc27653b27d95185" FOREIGN KEY ("playlistUuid", "playlistCreatorUuid") REFERENCES "playlist"("uuid","creatorUuid") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "playlist_creator_has_skipped_user" ADD CONSTRAINT "FK_6856daa84cc2e75a213ee8b4054" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "playlist_creator_has_skipped_user" DROP CONSTRAINT "FK_6856daa84cc2e75a213ee8b4054"`);
            yield queryRunner.query(`ALTER TABLE "playlist_creator_has_skipped_user" DROP CONSTRAINT "FK_4c5d66c6983dc27653b27d95185"`);
            yield queryRunner.query(`ALTER TABLE "user_has_skipped_user" DROP CONSTRAINT "FK_7822d0a388c275f74f59f326e1c"`);
            yield queryRunner.query(`ALTER TABLE "user_has_skipped_user" DROP CONSTRAINT "FK_beee5b1ad19a4ea6f6680701406"`);
            yield queryRunner.query(`DROP INDEX "IDX_6856daa84cc2e75a213ee8b405"`);
            yield queryRunner.query(`DROP INDEX "IDX_4c5d66c6983dc27653b27d9518"`);
            yield queryRunner.query(`DROP TABLE "playlist_creator_has_skipped_user"`);
            yield queryRunner.query(`DROP INDEX "IDX_7822d0a388c275f74f59f326e1"`);
            yield queryRunner.query(`DROP INDEX "IDX_beee5b1ad19a4ea6f668070140"`);
            yield queryRunner.query(`DROP TABLE "user_has_skipped_user"`);
        });
    }
}
exports.AddedSkippedandHasSkippedEntities1634292923141 = AddedSkippedandHasSkippedEntities1634292923141;
//# sourceMappingURL=1634292923141-AddedSkippedandHasSkippedEntities.js.map