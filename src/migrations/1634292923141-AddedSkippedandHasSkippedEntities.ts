import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedSkippedandHasSkippedEntities1634292923141 implements MigrationInterface {
    name = 'AddedSkippedandHasSkippedEntities1634292923141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_has_skipped_user" ("userUuid_1" uuid NOT NULL, "userUuid_2" uuid NOT NULL, CONSTRAINT "PK_78cfd6ba468d74a4248872e6b4f" PRIMARY KEY ("userUuid_1", "userUuid_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_beee5b1ad19a4ea6f668070140" ON "user_has_skipped_user" ("userUuid_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_7822d0a388c275f74f59f326e1" ON "user_has_skipped_user" ("userUuid_2") `);
        await queryRunner.query(`CREATE TABLE "playlist_creator_has_skipped_user" ("playlistUuid" uuid NOT NULL, "playlistCreatorUuid" uuid NOT NULL, "userUuid" uuid NOT NULL, CONSTRAINT "PK_ba6d232688eb926c26b019760c1" PRIMARY KEY ("playlistUuid", "playlistCreatorUuid", "userUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4c5d66c6983dc27653b27d9518" ON "playlist_creator_has_skipped_user" ("playlistUuid", "playlistCreatorUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_6856daa84cc2e75a213ee8b405" ON "playlist_creator_has_skipped_user" ("userUuid") `);
        await queryRunner.query(`ALTER TABLE "user_has_skipped_user" ADD CONSTRAINT "FK_beee5b1ad19a4ea6f6680701406" FOREIGN KEY ("userUuid_1") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_has_skipped_user" ADD CONSTRAINT "FK_7822d0a388c275f74f59f326e1c" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_has_skipped_user" ADD CONSTRAINT "FK_4c5d66c6983dc27653b27d95185" FOREIGN KEY ("playlistUuid", "playlistCreatorUuid") REFERENCES "playlist"("uuid","creatorUuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_has_skipped_user" ADD CONSTRAINT "FK_6856daa84cc2e75a213ee8b4054" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_creator_has_skipped_user" DROP CONSTRAINT "FK_6856daa84cc2e75a213ee8b4054"`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_has_skipped_user" DROP CONSTRAINT "FK_4c5d66c6983dc27653b27d95185"`);
        await queryRunner.query(`ALTER TABLE "user_has_skipped_user" DROP CONSTRAINT "FK_7822d0a388c275f74f59f326e1c"`);
        await queryRunner.query(`ALTER TABLE "user_has_skipped_user" DROP CONSTRAINT "FK_beee5b1ad19a4ea6f6680701406"`);
        await queryRunner.query(`DROP INDEX "IDX_6856daa84cc2e75a213ee8b405"`);
        await queryRunner.query(`DROP INDEX "IDX_4c5d66c6983dc27653b27d9518"`);
        await queryRunner.query(`DROP TABLE "playlist_creator_has_skipped_user"`);
        await queryRunner.query(`DROP INDEX "IDX_7822d0a388c275f74f59f326e1"`);
        await queryRunner.query(`DROP INDEX "IDX_beee5b1ad19a4ea6f668070140"`);
        await queryRunner.query(`DROP TABLE "user_has_skipped_user"`);
    }

}
