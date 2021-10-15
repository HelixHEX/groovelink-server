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
exports.AddedMoreColumnsToUserEntity1634250325925 = void 0;
class AddedMoreColumnsToUserEntity1634250325925 {
    constructor() {
        this.name = 'AddedMoreColumnsToUserEntity1634250325925';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "city" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "state" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "playlist" ADD "creatorAge" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "playlist" ADD "creatorCity" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "playlist" ADD "creatorState" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorName"`);
            yield queryRunner.query(`ALTER TABLE "playlist" ADD "creatorName" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorEmail"`);
            yield queryRunner.query(`ALTER TABLE "playlist" ADD "creatorEmail" character varying NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorEmail"`);
            yield queryRunner.query(`ALTER TABLE "playlist" ADD "creatorEmail" text`);
            yield queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorName"`);
            yield queryRunner.query(`ALTER TABLE "playlist" ADD "creatorName" text`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "email" text`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "name" text`);
            yield queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorState"`);
            yield queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorCity"`);
            yield queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorAge"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "state"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
        });
    }
}
exports.AddedMoreColumnsToUserEntity1634250325925 = AddedMoreColumnsToUserEntity1634250325925;
//# sourceMappingURL=1634250325925-AddedMoreColumnsToUserEntity.js.map