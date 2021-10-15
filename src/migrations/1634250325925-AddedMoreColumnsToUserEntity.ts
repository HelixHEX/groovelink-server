import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedMoreColumnsToUserEntity1634250325925 implements MigrationInterface {
    name = 'AddedMoreColumnsToUserEntity1634250325925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "creatorAge" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "creatorCity" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "creatorState" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorName"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "creatorName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorEmail"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "creatorEmail" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorEmail"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "creatorEmail" text`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorName"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "creatorName" text`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" text`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" text`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorState"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorCity"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "creatorAge"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
    }

}
