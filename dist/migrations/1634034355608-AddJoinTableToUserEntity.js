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
exports.AddJoinTableToUserEntity1634034355608 = void 0;
class AddJoinTableToUserEntity1634034355608 {
    constructor() {
        this.name = 'AddJoinTableToUserEntity1634034355608';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user_friends_user" ("userUuid_1" uuid NOT NULL, "userUuid_2" uuid NOT NULL, CONSTRAINT "PK_2433fa52185630f574c9bcd25fa" PRIMARY KEY ("userUuid_1", "userUuid_2"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_0156739602881dfd3d9af765ce" ON "user_friends_user" ("userUuid_1") `);
            yield queryRunner.query(`CREATE INDEX "IDX_4b894e7a1fe793028353380734" ON "user_friends_user" ("userUuid_2") `);
            yield queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_0156739602881dfd3d9af765ce4" FOREIGN KEY ("userUuid_1") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_4b894e7a1fe7930283533807341" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_4b894e7a1fe7930283533807341"`);
            yield queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_0156739602881dfd3d9af765ce4"`);
            yield queryRunner.query(`DROP INDEX "IDX_4b894e7a1fe793028353380734"`);
            yield queryRunner.query(`DROP INDEX "IDX_0156739602881dfd3d9af765ce"`);
            yield queryRunner.query(`DROP TABLE "user_friends_user"`);
        });
    }
}
exports.AddJoinTableToUserEntity1634034355608 = AddJoinTableToUserEntity1634034355608;
//# sourceMappingURL=1634034355608-AddJoinTableToUserEntity.js.map