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
exports.CreateHSTable1634114919372 = void 0;
class CreateHSTable1634114919372 {
    constructor() {
        this.name = 'CreateHSTable1634114919372';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" ADD "highlightedsongs" jsonb DEFAULT '[]'`);
            yield queryRunner.query(`ALTER TABLE "playlist" ADD "creatorHighlightedsongs" jsonb DEFAULT '[]'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorHighlightedsongs"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "highlightedsongs"`);
        });
    }
}
exports.CreateHSTable1634114919372 = CreateHSTable1634114919372;
//# sourceMappingURL=1634114919372-CreateHSTable.js.map