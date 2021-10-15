"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let User = User_1 = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "spotifyId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1, user => user.following),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1, user => user.followers),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "highlightedsongs", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1, user => user.beenSkippedBy),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "hasSkipped", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1, user => user.hasSkipped),
    __metadata("design:type", Array)
], User.prototype, "beenSkippedBy", void 0);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.default = User;
//# sourceMappingURL=User.js.map