import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { query } from "express";

export class createPost1596015480427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "post",
            columns: [
                {
                    name: "id",
                    isGenerated: true,
                    isPrimary: true,
                    generationStrategy: "increment",
                    type: "int"
                }, {
                    name: "name",
                    type: "varchar"
                }, {
                    name: "description",
                    type: "varchar"
                }, {
                    name: "views",
                    type: "int"
                }, {
                    name: "videoURL",
                    type: "varchar"
                }, {
                    name: "userId",
                    type: "int"
                }
            ]
        }), true)

        await queryRunner.createForeignKey("post", new TableForeignKey({
            columnNames: ["userId"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("post")
    }

}
