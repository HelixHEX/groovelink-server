import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateHSTable1634114919372 implements MigrationInterface {
    name = 'CreateHSTable1634114919372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "highlightedsongs" jsonb DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "creatorHighlightedsongs" jsonb DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorHighlightedsongs"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "highlightedsongs"`);
    }

}
