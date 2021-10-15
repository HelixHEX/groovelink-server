import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedFollowingandFollowersRelation1634286093543 implements MigrationInterface {
    name = 'AddedFollowingandFollowersRelation1634286093543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_followers_user" ("userUuid_1" uuid NOT NULL, "userUuid_2" uuid NOT NULL, CONSTRAINT "PK_928504bbd87fcd2e641de73f80d" PRIMARY KEY ("userUuid_1", "userUuid_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35e91358e4b025ec855f335830" ON "user_followers_user" ("userUuid_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef124b74a78b655572b94c6c30" ON "user_followers_user" ("userUuid_2") `);
        await queryRunner.query(`CREATE TABLE "playlist_creator_followers_user" ("playlistUuid" uuid NOT NULL, "playlistCreatorUuid" uuid NOT NULL, "userUuid" uuid NOT NULL, CONSTRAINT "PK_1929869096dcc828f15698f72fe" PRIMARY KEY ("playlistUuid", "playlistCreatorUuid", "userUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_70f91aee713ebf2d4d5a24248b" ON "playlist_creator_followers_user" ("playlistUuid", "playlistCreatorUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_6893a0ac2ba59025275f6e9f23" ON "playlist_creator_followers_user" ("userUuid") `);
        await queryRunner.query(`ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_35e91358e4b025ec855f3358301" FOREIGN KEY ("userUuid_1") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_ef124b74a78b655572b94c6c304" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_followers_user" ADD CONSTRAINT "FK_70f91aee713ebf2d4d5a24248b5" FOREIGN KEY ("playlistUuid", "playlistCreatorUuid") REFERENCES "playlist"("uuid","creatorUuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_followers_user" ADD CONSTRAINT "FK_6893a0ac2ba59025275f6e9f239" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_creator_followers_user" DROP CONSTRAINT "FK_6893a0ac2ba59025275f6e9f239"`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_followers_user" DROP CONSTRAINT "FK_70f91aee713ebf2d4d5a24248b5"`);
        await queryRunner.query(`ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_ef124b74a78b655572b94c6c304"`);
        await queryRunner.query(`ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_35e91358e4b025ec855f3358301"`);
        await queryRunner.query(`DROP INDEX "IDX_6893a0ac2ba59025275f6e9f23"`);
        await queryRunner.query(`DROP INDEX "IDX_70f91aee713ebf2d4d5a24248b"`);
        await queryRunner.query(`DROP TABLE "playlist_creator_followers_user"`);
        await queryRunner.query(`DROP INDEX "IDX_ef124b74a78b655572b94c6c30"`);
        await queryRunner.query(`DROP INDEX "IDX_35e91358e4b025ec855f335830"`);
        await queryRunner.query(`DROP TABLE "user_followers_user"`);
    }

}
