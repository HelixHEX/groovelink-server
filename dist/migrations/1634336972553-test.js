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
exports.test1634336972553 = void 0;
class test1634336972553 {
    constructor() {
        this.name = 'test1634336972553';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "friendship" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5604964f3bb0a767e793475bdbf" PRIMARY KEY ("uuid"))`);
            yield queryRunner.query(`CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "age" integer NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "email" character varying NOT NULL, "picture" text, "spotifyId" character varying NOT NULL, "highlightedsongs" jsonb DEFAULT '[]', CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`);
            yield queryRunner.query(`CREATE TABLE "user_followers_user" ("userUuid_1" uuid NOT NULL, "userUuid_2" uuid NOT NULL, CONSTRAINT "PK_928504bbd87fcd2e641de73f80d" PRIMARY KEY ("userUuid_1", "userUuid_2"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_35e91358e4b025ec855f335830" ON "user_followers_user" ("userUuid_1") `);
            yield queryRunner.query(`CREATE INDEX "IDX_ef124b74a78b655572b94c6c30" ON "user_followers_user" ("userUuid_2") `);
            yield queryRunner.query(`CREATE TABLE "user_has_skipped_user" ("userUuid_1" uuid NOT NULL, "userUuid_2" uuid NOT NULL, CONSTRAINT "PK_78cfd6ba468d74a4248872e6b4f" PRIMARY KEY ("userUuid_1", "userUuid_2"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_beee5b1ad19a4ea6f668070140" ON "user_has_skipped_user" ("userUuid_1") `);
            yield queryRunner.query(`CREATE INDEX "IDX_7822d0a388c275f74f59f326e1" ON "user_has_skipped_user" ("userUuid_2") `);
            yield queryRunner.query(`ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_35e91358e4b025ec855f3358301" FOREIGN KEY ("userUuid_1") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_ef124b74a78b655572b94c6c304" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_has_skipped_user" ADD CONSTRAINT "FK_beee5b1ad19a4ea6f6680701406" FOREIGN KEY ("userUuid_1") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "user_has_skipped_user" ADD CONSTRAINT "FK_7822d0a388c275f74f59f326e1c" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_has_skipped_user" DROP CONSTRAINT "FK_7822d0a388c275f74f59f326e1c"`);
            yield queryRunner.query(`ALTER TABLE "user_has_skipped_user" DROP CONSTRAINT "FK_beee5b1ad19a4ea6f6680701406"`);
            yield queryRunner.query(`ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_ef124b74a78b655572b94c6c304"`);
            yield queryRunner.query(`ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_35e91358e4b025ec855f3358301"`);
            yield queryRunner.query(`DROP INDEX "IDX_7822d0a388c275f74f59f326e1"`);
            yield queryRunner.query(`DROP INDEX "IDX_beee5b1ad19a4ea6f668070140"`);
            yield queryRunner.query(`DROP TABLE "user_has_skipped_user"`);
            yield queryRunner.query(`DROP INDEX "IDX_ef124b74a78b655572b94c6c30"`);
            yield queryRunner.query(`DROP INDEX "IDX_35e91358e4b025ec855f335830"`);
            yield queryRunner.query(`DROP TABLE "user_followers_user"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TABLE "friendship"`);
        });
    }
}
exports.test1634336972553 = test1634336972553;
//# sourceMappingURL=1634336972553-test.js.map