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
exports.AddUserInfoColumns1634074382935 = void 0;
class AddUserInfoColumns1634074382935 {
    constructor() {
        this.name = 'AddUserInfoColumns1634074382935';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" ADD "name" text DEFAULT 'test'`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "email" text DEFAULT 'test'`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "picture" text DEFAULT 'test'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "picture"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        });
    }
}
exports.AddUserInfoColumns1634074382935 = AddUserInfoColumns1634074382935;
//# sourceMappingURL=1634074382935-AddUserInfoColumns.js.map