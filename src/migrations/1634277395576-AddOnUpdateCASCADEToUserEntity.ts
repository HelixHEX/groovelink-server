import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOnUpdateCASCADEToUserEntity1634277395576 implements MigrationInterface {
    name = 'AddOnUpdateCASCADEToUserEntity1634277395576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_4b894e7a1fe7930283533807341"`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_friends_user" DROP CONSTRAINT "FK_8da8017d8ae1302ab6b6c57fb68"`);
        await queryRunner.query(`CREATE TABLE "user_added_user" ("userUuid_1" uuid NOT NULL, "userUuid_2" uuid NOT NULL, CONSTRAINT "PK_e39dd907ece0d16b9db84806e69" PRIMARY KEY ("userUuid_1", "userUuid_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7668ae48da8c2832f5f3cf9a69" ON "user_added_user" ("userUuid_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_a57b6fe4a28e0b079c938bf4a7" ON "user_added_user" ("userUuid_2") `);
        await queryRunner.query(`CREATE TABLE "playlist_creator_added_user" ("playlistUuid" uuid NOT NULL, "playlistCreatorUuid" uuid NOT NULL, "userUuid" uuid NOT NULL, CONSTRAINT "PK_1363716b9489a919ae60a17eac9" PRIMARY KEY ("playlistUuid", "playlistCreatorUuid", "userUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9a5b93f5f72d53b5bd7bec635b" ON "playlist_creator_added_user" ("playlistUuid", "playlistCreatorUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_0b24743f2c3f0567c1a6a98caf" ON "playlist_creator_added_user" ("userUuid") `);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_4b894e7a1fe7930283533807341" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_added_user" ADD CONSTRAINT "FK_7668ae48da8c2832f5f3cf9a69a" FOREIGN KEY ("userUuid_1") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_added_user" ADD CONSTRAINT "FK_a57b6fe4a28e0b079c938bf4a72" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_friends_user" ADD CONSTRAINT "FK_8da8017d8ae1302ab6b6c57fb68" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_added_user" ADD CONSTRAINT "FK_9a5b93f5f72d53b5bd7bec635b6" FOREIGN KEY ("playlistUuid", "playlistCreatorUuid") REFERENCES "playlist"("uuid","creatorUuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_added_user" ADD CONSTRAINT "FK_0b24743f2c3f0567c1a6a98caf6" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_creator_added_user" DROP CONSTRAINT "FK_0b24743f2c3f0567c1a6a98caf6"`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_added_user" DROP CONSTRAINT "FK_9a5b93f5f72d53b5bd7bec635b6"`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_friends_user" DROP CONSTRAINT "FK_8da8017d8ae1302ab6b6c57fb68"`);
        await queryRunner.query(`ALTER TABLE "user_added_user" DROP CONSTRAINT "FK_a57b6fe4a28e0b079c938bf4a72"`);
        await queryRunner.query(`ALTER TABLE "user_added_user" DROP CONSTRAINT "FK_7668ae48da8c2832f5f3cf9a69a"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_4b894e7a1fe7930283533807341"`);
        await queryRunner.query(`DROP INDEX "IDX_0b24743f2c3f0567c1a6a98caf"`);
        await queryRunner.query(`DROP INDEX "IDX_9a5b93f5f72d53b5bd7bec635b"`);
        await queryRunner.query(`DROP TABLE "playlist_creator_added_user"`);
        await queryRunner.query(`DROP INDEX "IDX_a57b6fe4a28e0b079c938bf4a7"`);
        await queryRunner.query(`DROP INDEX "IDX_7668ae48da8c2832f5f3cf9a69"`);
        await queryRunner.query(`DROP TABLE "user_added_user"`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_friends_user" ADD CONSTRAINT "FK_8da8017d8ae1302ab6b6c57fb68" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_4b894e7a1fe7930283533807341" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
