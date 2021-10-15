import {MigrationInterface, QueryRunner} from "typeorm";

export class test1634336972553 implements MigrationInterface {
    name = 'test1634336972553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friendship" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5604964f3bb0a767e793475bdbf" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "age" integer NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "email" character varying NOT NULL, "picture" text, "spotifyId" character varying NOT NULL, "highlightedsongs" jsonb DEFAULT '[]', CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "user_followers_user" ("userUuid_1" uuid NOT NULL, "userUuid_2" uuid NOT NULL, CONSTRAINT "PK_928504bbd87fcd2e641de73f80d" PRIMARY KEY ("userUuid_1", "userUuid_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35e91358e4b025ec855f335830" ON "user_followers_user" ("userUuid_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef124b74a78b655572b94c6c30" ON "user_followers_user" ("userUuid_2") `);
        await queryRunner.query(`CREATE TABLE "user_has_skipped_user" ("userUuid_1" uuid NOT NULL, "userUuid_2" uuid NOT NULL, CONSTRAINT "PK_78cfd6ba468d74a4248872e6b4f" PRIMARY KEY ("userUuid_1", "userUuid_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_beee5b1ad19a4ea6f668070140" ON "user_has_skipped_user" ("userUuid_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_7822d0a388c275f74f59f326e1" ON "user_has_skipped_user" ("userUuid_2") `);
        await queryRunner.query(`ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_35e91358e4b025ec855f3358301" FOREIGN KEY ("userUuid_1") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_ef124b74a78b655572b94c6c304" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_has_skipped_user" ADD CONSTRAINT "FK_beee5b1ad19a4ea6f6680701406" FOREIGN KEY ("userUuid_1") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_has_skipped_user" ADD CONSTRAINT "FK_7822d0a388c275f74f59f326e1c" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_has_skipped_user" DROP CONSTRAINT "FK_7822d0a388c275f74f59f326e1c"`);
        await queryRunner.query(`ALTER TABLE "user_has_skipped_user" DROP CONSTRAINT "FK_beee5b1ad19a4ea6f6680701406"`);
        await queryRunner.query(`ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_ef124b74a78b655572b94c6c304"`);
        await queryRunner.query(`ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_35e91358e4b025ec855f3358301"`);
        await queryRunner.query(`DROP INDEX "IDX_7822d0a388c275f74f59f326e1"`);
        await queryRunner.query(`DROP INDEX "IDX_beee5b1ad19a4ea6f668070140"`);
        await queryRunner.query(`DROP TABLE "user_has_skipped_user"`);
        await queryRunner.query(`DROP INDEX "IDX_ef124b74a78b655572b94c6c30"`);
        await queryRunner.query(`DROP INDEX "IDX_35e91358e4b025ec855f335830"`);
        await queryRunner.query(`DROP TABLE "user_followers_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "friendship"`);
    }

}
