import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserInfoColumns1634074382935 implements MigrationInterface {
    name = 'AddUserInfoColumns1634074382935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" text DEFAULT 'test'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" text DEFAULT 'test'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "picture" text DEFAULT 'test'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }

}
