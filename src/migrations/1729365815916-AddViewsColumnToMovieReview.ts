import { MigrationInterface, QueryRunner } from "typeorm";

export class AddViewsColumnToMovieReview1729365815916 implements MigrationInterface {
    name = 'AddViewsColumnToMovieReview1729365815916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_review\` ADD \`views\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_review\` DROP COLUMN \`views\``);
    }

}
