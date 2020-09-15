import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1596015056356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                    type: "int"
                }, {
                    name: "name",
                    type: "varchar"
                }, {
                    name: "description",
                    type: "varchar"
                }, {
                    name: "password",
                    type: "varchar"
                }, {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                }, {
                    name: 'image',
                    type: 'varchar',
                }, {
                    name: "likedPosts",
                    type: "text"
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user")
    }

}
