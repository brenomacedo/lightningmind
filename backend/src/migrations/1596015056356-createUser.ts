import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

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
                    type: "number"
                }, {
                    name: "name",
                    type: "varchar"
                }, {
                    name: "description",
                    type: "varchar"
                }, {
                    name: "login",
                    type: "varchar"
                }, {
                    name: "password",
                    type: "varchar"
                }, {
                    name: "email",
                    type: "varchar"
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user")
    }

}
