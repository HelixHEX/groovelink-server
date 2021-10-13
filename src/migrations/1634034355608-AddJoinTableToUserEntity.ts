import {MigrationInterface, QueryRunner} from "typeorm";

export class AddJoinTableToUserEntity1634034355608 implements MigrationInterface {
    name = 'AddJoinTableToUserEntity1634034355608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_friends_user" ("userUuid_1" uuid NOT NULL, "userUuid_2" uuid NOT NULL, CONSTRAINT "PK_2433fa52185630f574c9bcd25fa" PRIMARY KEY ("userUuid_1", "userUuid_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0156739602881dfd3d9af765ce" ON "user_friends_user" ("userUuid_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_4b894e7a1fe793028353380734" ON "user_friends_user" ("userUuid_2") `);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_0156739602881dfd3d9af765ce4" FOREIGN KEY ("userUuid_1") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_4b894e7a1fe7930283533807341" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_4b894e7a1fe7930283533807341"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_0156739602881dfd3d9af765ce4"`);
        await queryRunner.query(`DROP INDEX "IDX_4b894e7a1fe793028353380734"`);
        await queryRunner.query(`DROP INDEX "IDX_0156739602881dfd3d9af765ce"`);
        await queryRunner.query(`DROP TABLE "user_friends_user"`);
    }

}
