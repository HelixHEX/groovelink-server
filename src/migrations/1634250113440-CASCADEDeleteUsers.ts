import {MigrationInterface, QueryRunner} from "typeorm";

export class CASCADEDeleteUsers1634250113440 implements MigrationInterface {
    name = 'CASCADEDeleteUsers1634250113440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_4b894e7a1fe7930283533807341"`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_friends_user" DROP CONSTRAINT "FK_8da8017d8ae1302ab6b6c57fb68"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_4b894e7a1fe7930283533807341" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_friends_user" ADD CONSTRAINT "FK_8da8017d8ae1302ab6b6c57fb68" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_creator_friends_user" DROP CONSTRAINT "FK_8da8017d8ae1302ab6b6c57fb68"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_4b894e7a1fe7930283533807341"`);
        await queryRunner.query(`ALTER TABLE "playlist_creator_friends_user" ADD CONSTRAINT "FK_8da8017d8ae1302ab6b6c57fb68" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_4b894e7a1fe7930283533807341" FOREIGN KEY ("userUuid_2") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
