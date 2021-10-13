import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSpotifyIdColumnToUserEntity1634031796225 implements MigrationInterface {
    name = 'AddSpotifyIdColumnToUserEntity1634031796225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "spotifyId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "spotifyId"`);
    }

}
